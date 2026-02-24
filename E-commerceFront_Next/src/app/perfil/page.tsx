'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { useUser } from '@/context/UserContext';
import { User, Phone, MapPin, Plus, X, Check } from 'lucide-react';
import { withAuth } from '@/components/hoc/withAuth';

import type { Address } from '@/context/UserContext';

function ProfilePage() {
  const { user, updateProfile, createAddress, deleteAddress, updateAddress, isLoading } = useUser();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [showSuccessTick, setShowSuccessTick] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });

  // Address Form State
  const [addressForm, setAddressForm] = useState({
    addressName: '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    street: '',
    city: '',
    country: 'co',
    province: '',
    postalCode: '',
    phone: user?.phone || '',
  });

  const startEditingAddress = (address: Address) => {
    setEditingAddressId(address.id);
    setAddressForm({
      addressName: address.label,
      firstName: address.firstName || '',
      lastName: address.lastName || '',
      street: address.street,
      city: address.city,
      country: address.country,
      province: address.province || '',
      postalCode: address.postalCode || '',
      phone: address.phone || '',
    });
    setIsAddingAddress(true);
  };

  const [addressError, setAddressError] = useState<string | null>(null);

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Cargando...
      </main>
    );
  }

  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      });

      setAddressForm((prev) => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      }));
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(profileForm);
      setShowSuccessTick(true);
      setTimeout(() => {
        setShowSuccessTick(false);
        setIsEditingProfile(false);
      }, 1500);
    } catch {
      // el error ya lo maneja el context
    }
  };

  const handleCreateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddressError(null);
    try {
      if (editingAddressId) {
        await updateAddress(editingAddressId, addressForm);
      } else {
        await createAddress(addressForm);
      }

      setIsAddingAddress(false);
      setEditingAddressId(null);

      setAddressForm({
        addressName: '',
        firstName: user.firstName,
        lastName: user.lastName,
        street: '',
        city: '',
        country: 'co',
        province: '',
        postalCode: '',
        phone: user.phone,
      });
    } catch (err: any) {
      setAddressError(err.message || 'Error al crear la dirección');
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar esta dirección?")) return;

    setDeletingId(id);
    // Simulate animation time before actually deleting
    setTimeout(async () => {
      try {
        await deleteAddress(id);
      } catch (err) {
        console.error(err);
      } finally {
        setDeletingId(null);
      }
    }, 300);
  };

  const inputClass =
    'peer w-full bg-transparent border-b border-border/50 px-0 py-2 text-xs outline-none focus:border-transparent transition-all font-sans';
  const labelClass = 'text-[9px] uppercase tracking-widest text-neutral-500 font-medium';

  return (
    <main className="min-h-screen bg-background text-primary">
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out forwards;
        }
        .shimmer-bg {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:pt-32 sm:pb-24 sm:px-6 max-w-6xl mx-auto flex flex-col lg:flex-row relative">
        {/* Vertical Golden Rule (Desktop) */}
        <div className="lg:absolute lg:left-0 lg:top-0 lg:bottom-0 lg:w-[1px] lg:h-full lg:bg-[#D4AF37] lg:opacity-50 hidden lg:block" />

        <div className="flex-1 lg:pl-16 relative z-10 w-full">
          <header className="mb-10 sm:mb-16">
            <Typography variant="small" className="text-neutral-400 mb-4 block tracking-[0.3em] uppercase text-xs sm:text-sm">
              Gestión de Cuenta
            </Typography>
            <h1 className="text-4xl sm:text-6xl lg:text-[5.5rem] text-primary font-serif tracking-tighter leading-none">
              <span className="font-light">MI</span> <span className="font-bold">PERFIL</span>
            </h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border/50 border-y border-border/50">
            {/* ── Personal Info Column ── */}
            <section className="lg:col-span-1 py-8 lg:p-10 lg:pl-0 space-y-10 lg:space-y-12">
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <Typography variant="small" className="font-sans text-neutral-400">
                    Información Personal
                  </Typography>
                  {!isEditingProfile && (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="text-[10px] uppercase tracking-widest transition-all cursor-pointer"
                    >
                      Editar
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="space-y-1 relative group">
                      <label className={labelClass}>Nombre</label>
                      <input
                        type="text"
                        value={profileForm.firstName}
                        onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                        className={inputClass}
                      />
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </div>
                    <div className="space-y-1 relative group">
                      <label className={labelClass}>Apellido</label>
                      <input
                        type="text"
                        value={profileForm.lastName}
                        onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                        className={inputClass}
                      />
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </div>
                    <div className="space-y-1 relative group">
                      <label className={labelClass}>Teléfono</label>
                      <input
                        type="text"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className={inputClass}
                      />
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </div>
                    <div className="flex gap-4 pt-4">
                      {showSuccessTick ? (
                        <div className="flex-1 flex items-center justify-center bg-green-900/10 text-green-500 border border-green-500/30 h-10 text-xs uppercase tracking-widest font-medium transition-all">
                          <Check size={16} className="mr-2" /> Guardado
                        </div>
                      ) : (
                        <Button type="submit" size="sm" className="flex-1 h-10">Guardar</Button>
                      )}
                      {!showSuccessTick && (
                        <Button variant="outline" size="sm" className="flex-1 h-10" onClick={() => setIsEditingProfile(false)} type="button">
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-start gap-5">
                      <div className="relative">
                        <div className="absolute inset-0 border border-[#D4AF37]/50 rounded-full animate-ping opacity-75"></div>
                        <div className="relative bg-background rounded-full p-2 border border-[#D4AF37]/30">
                          <User size={26} strokeWidth={1} className="text-neutral-400" />
                        </div>
                      </div>
                      <div className="pt-1">
                        <Typography variant="body" className="font-sans font-medium break-words text-lg text-primary">
                          {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="small" className="text-neutral-500 lowercase break-all">
                          {user.email}
                        </Typography>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 pl-2">
                      <Phone size={14} strokeWidth={1} className="text-neutral-400" />
                      <Typography variant="body" className="font-sans text-neutral-400 text-sm">
                        {user.phone || 'Sin registrar'}
                      </Typography>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative overflow-hidden bg-primary/5 p-6 sm:p-8 border border-primary/20 group">
                <div className="absolute inset-0 shimmer-bg mix-blend-overlay pointer-events-none"></div>
                <Typography variant="small" className="text-[#D4AF37] tracking-widest uppercase mb-4 block text-[10px] sm:text-xs font-semibold relative z-10">
                  Membresía Prime Archivo
                </Typography>
                <Typography variant="body" className="text-xs text-neutral-400 leading-relaxed italic relative z-10">
                  Como miembro de NariñoTex Archivo, tienes acceso a pre-reservas en todas nuestras Galas de Moda y
                  atención personalizada 24/7.
                </Typography>
              </div>
            </section>

            {/* ── Addresses Column ── */}
            <section className="lg:col-span-2 py-8 lg:p-10 lg:pr-0 space-y-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
                <Typography variant="small" className="font-sans text-neutral-400">
                  Mis Direcciones
                </Typography>
                {!isAddingAddress && (
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest border border-primary text-primary px-5 py-2.5 hover:bg-primary hover:text-background transition-colors duration-300 w-full sm:w-auto"
                  >
                    <Plus size={12} />
                    Nueva dirección
                  </button>
                )}
              </div>

              {/* ── Add Address Form ── */}
              {isAddingAddress && (
                <div className="border border-border/50 p-6 sm:p-8 animate-slideDown bg-card shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <Typography variant="small" className="font-sans text-neutral-300 uppercase tracking-widest text-[10px] border-b border-[#D4AF37]/50 pb-1">
                      Nueva Dirección
                    </Typography>
                    <button onClick={() => setIsAddingAddress(false)}>
                      <X size={18} className="text-neutral-500 hover:text-[#D4AF37] transition-colors" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateAddress} className="space-y-6">
                    <div className="flex flex-col sm:grid sm:grid-cols-2 gap-6 sm:gap-x-8 sm:gap-y-6">
                      {/* Nombre de la dirección */}
                      <div className="sm:col-span-2 space-y-1 relative group">
                        <label className={labelClass}>Nombre de la dirección *</label>
                        <input
                          required
                          type="text"
                          placeholder="Ej: Casa, Oficina…"
                          value={addressForm.addressName}
                          onChange={(e) => setAddressForm({ ...addressForm, addressName: e.target.value })}
                          className={`${inputClass} mt-2 placeholder:text-neutral-800`}
                        />
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </div>

                      {/* Nombre y Apellido */}
                      <div className="space-y-1 relative group">
                        <label className={labelClass}>Nombre *</label>
                        <input
                          required
                          type="text"
                          value={addressForm.firstName}
                          onChange={(e) => setAddressForm({ ...addressForm, firstName: e.target.value })}
                          className={`${inputClass} mt-2`}
                        />
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </div>
                      <div className="space-y-1 relative group">
                        <label className={labelClass}>Apellido *</label>
                        <input
                          required
                          type="text"
                          value={addressForm.lastName}
                          onChange={(e) => setAddressForm({ ...addressForm, lastName: e.target.value })}
                          className={`${inputClass} mt-2`}
                        />
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </div>

                      {/* Calle */}
                      <div className="sm:col-span-2 space-y-1 relative group">
                        <label className={labelClass}>Dirección *</label>
                        <input
                          required
                          type="text"
                          placeholder="Calle, número, barrio…"
                          value={addressForm.street}
                          onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                          className={`${inputClass} mt-2 placeholder:text-neutral-800`}
                        />
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </div>

                      {/* Ciudad y Departamento */}
                      <div className="space-y-1 relative group">
                        <label className={labelClass}>Ciudad *</label>
                        <input
                          required
                          type="text"
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                          className={`${inputClass} mt-2`}
                        />
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </div>
                      <div className="space-y-1 relative group">
                        <label className={labelClass}>Departamento</label>
                        <input
                          type="text"
                          value={addressForm.province}
                          onChange={(e) => setAddressForm({ ...addressForm, province: e.target.value })}
                          className={`${inputClass} mt-2`}
                        />
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </div>

                      {/* Código postal y Teléfono */}
                      <div className="space-y-1 relative group">
                        <label className={labelClass}>Código Postal</label>
                        <input
                          type="text"
                          value={addressForm.postalCode}
                          onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                          className={`${inputClass} mt-2`}
                        />
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </div>
                      <div className="space-y-1 relative group">
                        <label className={labelClass}>Teléfono</label>
                        <input
                          type="text"
                          value={addressForm.phone}
                          onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                          className={`${inputClass} mt-2`}
                        />
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </div>
                    </div>

                    {addressError && (
                      <Typography variant="small" className="text-red-500 text-xs mt-2 block">
                        {addressError}
                      </Typography>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button type="submit" size="sm" className="w-full sm:w-1/2 h-11" disabled={isLoading}>
                        {isLoading ? 'Guardando…' : 'Guardar dirección'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-1/2 h-11"
                        onClick={() => setIsAddingAddress(false)}
                        type="button"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* ── Address List ── */}
              {user.addresses.length === 0 && !isAddingAddress ? (
                <div className="border border-dashed border-border/50 p-12 flex flex-col items-center justify-center gap-4 text-center">
                  <MapPin size={24} strokeWidth={1} className="text-neutral-600 mb-2" />
                  <Typography variant="small" className="text-neutral-500 text-xs font-serif italic">
                    El registro de sus direcciones está vacío.
                  </Typography>
                </div>
              ) : (
                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-6">
                  {user.addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border border-border/50 p-6 space-y-4 transition-all duration-300 bg-card ${deletingId === address.id ? 'scale-95 opacity-0 pointer-events-none' : 'scale-100 opacity-100 hover:border-primary/30'
                        }`}
                    >
                      <div className="flex items-center justify-between border-b border-border/30 pb-3">
                        <Typography
                          variant="small"
                          className="font-sans uppercase tracking-widest text-[10px] text-[#D4AF37]"
                        >
                          {address.label}
                        </Typography>

                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => startEditingAddress(address)}
                            className="text-[9px] uppercase tracking-widest text-neutral-500 hover:text-primary transition-colors cursor-pointer"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => handleDeleteAddress(address.id)}
                            className="text-[9px] uppercase tracking-widest text-neutral-500 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 pt-1">
                        <MapPin size={16} strokeWidth={1} className="mt-0.5 text-[#D4AF37] shrink-0" />
                        <div className="space-y-1">
                          <Typography variant="small" className="font-sans text-xs font-medium text-primary uppercase">
                            {address.firstName} {address.lastName}
                          </Typography>
                          <Typography variant="small" className="font-sans text-xs text-neutral-400">
                            {address.street}
                          </Typography>
                          <Typography variant="small" className="font-sans text-xs text-neutral-400">
                            {address.city}{address.province ? `, ${address.province}` : ''} {address.postalCode}
                          </Typography>
                          {address.phone && (
                            <Typography variant="small" className="font-sans text-xs text-neutral-400 mt-2 block">
                              TEL: {address.phone}
                            </Typography>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default withAuth(ProfilePage);