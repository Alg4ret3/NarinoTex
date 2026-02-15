"use client";

import { useState } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const { requestPasswordReset, isLoading, error, clearError } = useUser();

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError("Por favor ingrese un email válido");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!validateEmail()) return;

    await requestPasswordReset(email);

    // Siempre mostramos éxito por seguridad
    setSuccess(true);
  };

  const displayError = localError || error;

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
              Recuperar contraseña
            </Typography>
          </div>

          <AnimatePresence>
            {displayError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 flex gap-3"
              >
                <AlertCircle size={18} className="text-red-500" />
                <p className="text-sm text-red-500">{displayError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {success ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-6"
            >
              <CheckCircle2 className="mx-auto text-green-500" size={40} />
              <Typography variant="body">
                Si el correo existe, recibirás un enlace para restablecer tu contraseña.
              </Typography>

              <Link href="/auth/login">
                <Button variant="primary">Volver al login</Button>
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-neutral-500">
                  Email
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-muted/30 border border-border py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary"
                    placeholder="ejemplo@email.com"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Enviar enlace de recuperación"}
              </Button>

            </form>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
