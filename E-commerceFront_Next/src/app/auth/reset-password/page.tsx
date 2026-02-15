"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { resetPassword, isLoading, error, clearError } = useUser();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validatePasswordStrength = (password: string) => {
    const rules = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
    const score = Object.values(rules).filter(Boolean).length;
    return { rules, score };
  };

  const { rules, score } = validatePasswordStrength(password);

  const passwordsMatch = password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalError(null);

    if (!email || !token) {
      setLocalError("Token inválido o expirado.");
      return;
    }

    if (score < 4) {
      setLocalError("La contraseña no cumple los requisitos de seguridad.");
      return;
    }

    if (!passwordsMatch) {
      setLocalError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await resetPassword(email, token, password);
      setSuccess(true);
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch {}
  };

  const strengthLabel = ["Muy débil", "Débil", "Aceptable", "Fuerte", "Muy fuerte"][score];

  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="bg-card border border-border shadow-xl p-12">

          <div className="mb-10">
            <Typography variant="small" className="text-neutral-400 uppercase tracking-widest">
              Seguridad
            </Typography>
            <Typography variant="h3" className="font-light">
              Restablecer contraseña
            </Typography>
          </div>

          <AnimatePresence>
            {(localError || error) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 flex gap-3"
              >
                <AlertCircle size={18} className="text-red-500" />
                <p className="text-sm text-red-500">
                  {localError || error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {success ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6">
              <CheckCircle2 className="mx-auto text-green-500" size={40} />
              <Typography variant="body">
                Contraseña actualizada correctamente. Redirigiendo...
              </Typography>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-neutral-500">
                  Nueva contraseña
                </label>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-muted/30 border border-border py-4 pl-12 pr-12 text-sm focus:outline-none focus:border-primary"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Strength bar */}
                <div className="h-2 bg-muted rounded overflow-hidden">
                  <div
                    className="h-full transition-all"
                    style={{ width: `${(score / 4) * 100}%` }}
                  />
                </div>

                <p className="text-xs text-neutral-500">
                  Fortaleza: {strengthLabel}
                </p>

                {/* Rules */}
                <ul className="text-xs space-y-1 mt-2">
                  <li className={rules.length ? "text-green-500" : "text-neutral-400"}>
                    ✓ Mínimo 8 caracteres
                  </li>
                  <li className={rules.uppercase ? "text-green-500" : "text-neutral-400"}>
                    ✓ Una mayúscula
                  </li>
                  <li className={rules.number ? "text-green-500" : "text-neutral-400"}>
                    ✓ Un número
                  </li>
                  <li className={rules.special ? "text-green-500" : "text-neutral-400"}>
                    ✓ Un carácter especial
                  </li>
                </ul>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-neutral-500">
                  Confirmar contraseña
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full bg-muted/30 border py-4 px-4 text-sm focus:outline-none transition-all ${
                    confirmPassword && !passwordsMatch
                      ? "border-red-500"
                      : "border-border focus:border-primary"
                  }`}
                  placeholder="Repita la contraseña"
                />

                {confirmPassword && !passwordsMatch && (
                  <p className="text-xs text-red-500">
                    Las contraseñas no coinciden
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Actualizando..." : "Actualizar contraseña"}
              </Button>

            </form>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}