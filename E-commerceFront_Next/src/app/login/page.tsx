'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

export default function AuthPage() {
  const router = useRouter();
  const { user, login, register, isLoading, error, clearError } = useUser();
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user?.isLoggedIn) {
      router.push('/perfil');
    }
  }, [user, router]);

  const toggleAuth = () => {
    setIsLogin(!isLogin);
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
    
    if (!validateForm()) {
      return;
    }

    try {
      if (isLogin) {
        // Login
        await login({
          email: formData.email,
          password: formData.password,
        });
        setSuccessMessage('¡Inicio de sesión exitoso!');
        setTimeout(() => {
          router.push('/perfil');
        }, 1000);
      } else {
        // Register
        await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
        setSuccessMessage('¡Registro exitoso! Redirigiendo...');
        setTimeout(() => {
          router.push('/perfil');
        }, 1500);
      }
    } catch (err: any) {
      // Error is already set in the context
      console.error('Auth error:', err);
    }
  };

  const displayError = localError || error;

  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-20 flex items-center justify-center">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 bg-card border border-border shadow-2xl overflow-hidden min-h-[600px]">
          
          {/* Visual Side (Hidden on mobile) */}
          <div className="hidden lg:block relative bg-muted overflow-hidden">
            <motion.img 
              key={isLogin ? 'login-img' : 'register-img'}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              src={isLogin 
                ? "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200" 
                : "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200"
              }
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
              alt="Auth visual"
            />
            <div className="absolute inset-0 bg-primary/10" />
            <div className="relative z-10 h-full p-16 flex flex-col justify-end text-white">
              <Typography variant="small" className="text-white/60 mb-4 tracking-[0.4em]">NariñoTex Archive</Typography>
              <Typography variant="h2" className="text-white mb-6 editorial-spacing">
                {isLogin ? "Bienvenido de Nuevo" : "Únete al Legado"}
              </Typography>
              <Typography variant="body" className="text-white/80 text-sm font-light leading-relaxed max-w-xs">
                {isLogin 
                  ? "Accede a tu cuenta corporativa para gestionar pedidos y colecciones exclusivas."
                  : "Crea tu perfil profesional para acceder a nuestro catálogo completo y servicios técnicos."
                }
              </Typography>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-8 sm:p-16 flex flex-col justify-center">
            <div className="mb-12">
              <Typography variant="small" className="text-neutral-400 mb-2 tracking-[0.2em] uppercase">Cuenta</Typography>
              <Typography variant="h3" className="font-sans font-light tracking-tight">
                {isLogin ? "Iniciar Sesión" : "Crear Perfil"}
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
                  <p className="text-sm text-red-500">{displayError}</p>
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
                  <p className="text-sm text-green-500">{successMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    key="name-fields"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-6"
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
                          required={!isLogin}
                          className="w-full bg-muted/30 border border-border py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-all placeholder:text-neutral-500"
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
                          required={!isLogin}
                          className="w-full bg-muted/30 border border-border py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-all placeholder:text-neutral-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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
                    className="w-full bg-muted/30 border border-border py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-all placeholder:text-neutral-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">Contraseña</label>
                  {isLogin && (
                    <Link href="#" className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-primary transition-colors">¿Olvidó su contraseña?</Link>
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
                    className="w-full bg-muted/30 border border-border py-4 pl-12 pr-12 text-sm focus:outline-none focus:border-primary transition-all placeholder:text-neutral-500"
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

              <div className="pt-4">
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full py-4" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Procesando...
                    </span>
                  ) : (
                    isLogin ? "Acceder" : "Completar Registro"
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-10 text-center">
              <button 
                onClick={toggleAuth}
                disabled={isLoading}
                className="text-[10px] tracking-widest uppercase font-medium text-neutral-500 hover:text-primary transition-all disabled:opacity-50"
              >
                {isLogin 
                  ? "¿No tiene cuenta? Regístrese aquí" 
                  : "¿Ya tiene cuenta? Inicie sesión"
                }
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
