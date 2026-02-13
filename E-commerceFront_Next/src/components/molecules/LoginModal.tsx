'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { X, Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login, register, sendOtp, verifyOtp, isLoading, error, clearError } = useUser();
  
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1); 
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [otpCode, setOtpCode] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const toggleAuth = () => {
    setIsLogin(!isLogin);
    setStep(1);
    setOtpCode('');
    setLocalError(null);
    setSuccessMessage(null);
    clearError();
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setLocalError(null);
    setSuccessMessage(null);
    clearError();
  };

  const validateForm = (): boolean => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setLocalError('Por favor ingrese un email válido');
      return false;
    }

    // Password validation
    if (formData.password.length < 8) {
      setLocalError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }

    // Name validation for registration
    if (!isLogin) {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        setLocalError('Por favor ingrese su nombre completo');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      if (!validateForm()) return;
      try {
        await login({
          email: formData.email,
          password: formData.password,
        });
        setSuccessMessage('¡Inicio de sesión exitoso!');
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1000);
      } catch (err) {
        console.error('Login error:', err);
      }
      return;
    }

    // Registration flow
    if (step === 1) {
      // Step 1: Send OTP
      if (!formData.email) {
        setLocalError('Por favor ingrese un email');
        return;
      }
      try {
        await sendOtp(formData.email);
        setStep(2);
        setSuccessMessage('Código enviado a tu correo');
      } catch (err) {
        console.error('Send OTP error:', err);
      }
    } else if (step === 2) {
      // Step 2: Verify OTP
      if (otpCode.length < 6) {
        setLocalError('El código debe tener 6 caracteres');
        return;
      }
      try {
        await verifyOtp(formData.email, otpCode);
        setStep(3);
        setSuccessMessage('Email verificado correctamente');
      } catch (err) {
        console.error('Verify OTP error:', err);
      }
    } else if (step === 3) {
      // Step 3: Complete registration
      if (!validateForm()) return;
      try {
        await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
        setSuccessMessage('¡Registro exitoso!');
        setTimeout(() => {
            onSuccess();
            onClose();
        }, 1500);
      } catch (err) {
        console.error('Registration error:', err);
      }
    }
  };

  const displayError = localError || error;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-card border border-border p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-secondary hover:text-primary transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          <div className="flex flex-col items-center mb-6">
            <Typography variant="small" className="text-neutral-400 mb-2 tracking-[0.2em] uppercase">Cuenta</Typography>
            <Typography variant="h3" className="font-sans font-light tracking-tight text-center">
                {isLogin ? "Iniciar Sesión" : "Crear Perfil"}
            </Typography>
            <Typography variant="body" className="text-center text-xs text-secondary mt-2">
                {isLogin ? "Para continuar con tu compra" : "Regístrate para finalizar tu pedido"}
            </Typography>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {displayError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 flex items-start gap-3"
              >
                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-xs text-red-500">{displayError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Message */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-green-500/10 border border-green-500/20 flex items-start gap-3"
              >
                <CheckCircle2 className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-xs text-green-500">{successMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-4" onSubmit={handleSubmit}>
              {!isLogin && step === 1 && (
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">Email de Registro</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors" size={16} strokeWidth={1} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ejemplo@email.com"
                      required
                      className="w-full bg-muted/30 border border-border py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-primary transition-all placeholder:text-neutral-500"
                    />
                  </div>
                </div>
              )}

              {!isLogin && step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">Código de Verificación</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors" size={16} strokeWidth={1} />
                      <input
                        type="text"
                        name="otp"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="Ingrese el código de 6 dígitos"
                        maxLength={6}
                        required
                        className="w-full bg-muted/30 border border-border py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-primary transition-all placeholder:text-neutral-500 tracking-[0.5em] font-mono"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[9px] uppercase tracking-widest text-neutral-400 hover:text-primary transition-colors"
                  >
                    ← Cambiar correo
                  </button>
                </div>
              )}

              {(isLogin || (!isLogin && step === 3)) && (
                <>
                  <AnimatePresence mode="wait">
                    {!isLogin && step === 3 && (
                      <motion.div
                        key="name-fields"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 mb-4"
                      >
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">Nombre</label>
                          <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors" size={16} strokeWidth={1} />
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="Juan"
                              required
                              className="w-full bg-muted/30 border border-border py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-primary transition-all placeholder:text-neutral-500"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">Apellido</label>
                          <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors" size={16} strokeWidth={1} />
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="Pérez"
                              required
                              className="w-full bg-muted/30 border border-border py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-primary transition-all placeholder:text-neutral-500"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isLogin && (
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">Email</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors" size={16} strokeWidth={1} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="ejemplo@email.com"
                          required
                          className="w-full bg-muted/30 border border-border py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-primary transition-all placeholder:text-neutral-500"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">Contraseña</label>
                      {isLogin && (
                        <Link href="#" className="text-[9px] uppercase tracking-widest text-neutral-400 hover:text-primary transition-colors">¿Olvidó su contraseña?</Link>
                      )}
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors" size={16} strokeWidth={1} />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        required
                        minLength={8}
                        className="w-full bg-muted/30 border border-border py-3 pl-10 pr-12 text-xs focus:outline-none focus:border-primary transition-all placeholder:text-neutral-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} strokeWidth={1} /> : <Eye size={16} strokeWidth={1} />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-3 text-[10px] uppercase tracking-[0.2em] font-bold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                       <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
                      />
                      Procesando...
                    </span>
                  ) : (
                    isLogin
                      ? "Acceder"
                      : step === 1
                        ? "Enviar Código"
                        : step === 2
                          ? "Verificar Código"
                          : "Completar Registro"
                  )}
                </Button>
              </div>
          </form>

            <div className="mt-8 text-center">
              <button
                onClick={toggleAuth}
                disabled={isLoading}
                className="text-[9px] tracking-widest uppercase font-medium text-neutral-500 hover:text-primary transition-all disabled:opacity-50"
              >
                {isLogin
                  ? "¿No tiene cuenta? Regístrese aquí"
                  : "¿Ya tiene cuenta? Inicie sesión"
                }
              </button>
            </div>
          
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
