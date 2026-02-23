'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { useUser } from '@/context/UserContext';
import { User, Phone, MapPin, Plus, X } from 'lucide-react';
import { withAuth } from '@/components/hoc/withAuth';

function ProfilePage() {
  const { user, updateProfile, createAddress, isLoading } = useUser();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

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

  const [addressError, setAddressError] = useState<string | null>(null);

  if (!user) return null;

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditingProfile(false);
  };

  const handleCreateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddressError(null);
    try {
      await createAddress(addressForm);
      setIsAddingAddress(false);
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

  const inputClass =
    'w-full bg-background border border-border/50 px-4 py-3 text-xs outline-none focus:border-primary transition-all font-sans';
  const labelClass = 'text-[9px] uppercase tracking-widest text-neutral-500 font-medium';

  return (
    <main className="min-h-screen bg-background text-primary">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:pt-32 sm:pb-24 sm:px-6 max-w-5xl mx-auto">
        <header className="mb-8 sm:mb-16">
          <Typography variant="small" className="text-neutral-400 mb-4 block tracking-[0.3em] uppercase text-xs sm:text-sm">
            Gestión de Cuenta
          </Typography>
          <Typography variant="h1" className="text-3xl sm:text-5xl lg:text-6xl text-primary">
            Mi Perfil
          </Typography>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* ── Personal Info Column ── */}
          <section className="lg:col-span-1 space-y-8 lg:space-y-12">
            <div className="bg-card border border-border/50 p-6 sm:p-8 space-y-8">
              <div className="flex justify-between items-center">
                <Typography variant="small" className="font-sans text-neutral-400">
                  Información Personal
                </Typography>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="text-[10px] uppercase tracking-widest text-primary border-b border-primary/20 hover:border-primary transition-all"
                  >
                    Editar
                  </button>
                )}
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="space-y-2">
                    <label className={labelClass}>Nombre</label>
                    <input
                      type="text"
                      value={profileForm.firstName}
                      onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Apellido</label>
                    <input
                      type="text"
                      value={profileForm.lastName}
                      onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Teléfono</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button type="submit" size="sm" className="flex-1">Guardar</Button>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => setIsEditingProfile(false)}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <User size={16} strokeWidth={1} className="mt-1 text-neutral-400" />
                    <div>
                      <Typography variant="body" className="font-sans font-medium break-words">
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography variant="small" className="text-neutral-500 lowercase break-all">
                        {user.email}
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone size={16} strokeWidth={1} className="mt-1 text-neutral-400" />
                    <Typography variant="body" className="font-sans text-neutral-500">
                      {user.phone}
                    </Typography>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-primary/5 p-6 sm:p-8 border border-primary/10">
              <Typography variant="small" className="text-primary tracking-widest uppercase mb-4 block text-[10px] sm:text-xs">
                Membresía Prime Archivo
              </Typography>
              <Typography variant="body" className="text-xs text-neutral-500 leading-relaxed italic">
                Como miembro de NariñoTex Archivo, tienes acceso a pre-reservas en todas nuestras Galas de Moda y
                atención personalizada 24/7.
              </Typography>
            </div>
          </section>

          {/* ── Addresses Column ── */}
          <section className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <Typography variant="small" className="font-sans text-neutral-400">
                Mis Direcciones
              </Typography>
              {!isAddingAddress && (
                <button
                  onClick={() => setIsAddingAddress(true)}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-primary border-b border-primary/20 hover:border-primary transition-all"
                >
                  <Plus size={12} />
                  Nueva dirección
                </button>
              )}
            </div>

            {/* ── Add Address Form ── */}
            {isAddingAddress && (
              <div className="bg-card border border-border/50 p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                  <Typography variant="small" className="font-sans text-neutral-400 uppercase tracking-widest text-[10px]">
                    Nueva Dirección
                  </Typography>
                  <button onClick={() => setIsAddingAddress(false)}>
                    <X size={16} className="text-neutral-400 hover:text-primary transition-colors" />
                  </button>
                </div>

                <form onSubmit={handleCreateAddress} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Nombre de la dirección */}
                    <div className="sm:col-span-2 space-y-2">
                      <label className={labelClass}>Nombre de la dirección *</label>
                      <input
                        required
                        type="text"
                        placeholder="Ej: Casa, Oficina…"
                        value={addressForm.addressName}
                        onChange={(e) => setAddressForm({ ...addressForm, addressName: e.target.value })}
                        className={inputClass}
                      />
                    </div>

                    {/* Nombre y Apellido */}
                    <div className="space-y-2">
                      <label className={labelClass}>Nombre *</label>
                      <input
                        required
                        type="text"
                        value={addressForm.firstName}
                        onChange={(e) => setAddressForm({ ...addressForm, firstName: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Apellido *</label>
                      <input
                        required
                        type="text"
                        value={addressForm.lastName}
                        onChange={(e) => setAddressForm({ ...addressForm, lastName: e.target.value })}
                        className={inputClass}
                      />
                    </div>

                    {/* Calle */}
                    <div className="sm:col-span-2 space-y-2">
                      <label className={labelClass}>Dirección *</label>
                      <input
                        required
                        type="text"
                        placeholder="Calle, número, barrio…"
                        value={addressForm.street}
                        onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                        className={inputClass}
                      />
                    </div>

                    {/* Ciudad y Departamento */}
                    <div className="space-y-2">
                      <label className={labelClass}>Ciudad *</label>
                      <input
                        required
                        type="text"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Departamento</label>
                      <input
                        type="text"
                        value={addressForm.province}
                        onChange={(e) => setAddressForm({ ...addressForm, province: e.target.value })}
                        className={inputClass}
                      />
                    </div>

                    {/* Código postal y Teléfono */}
                    <div className="space-y-2">
                      <label className={labelClass}>Código Postal</label>
                      <input
                        type="text"
                        value={addressForm.postalCode}
                        onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Teléfono</label>
                      <input
                        type="text"
                        value={addressForm.phone}
                        onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {addressError && (
                    <Typography variant="small" className="text-red-500 text-xs">
                      {addressError}
                    </Typography>
                  )}

                  <div className="flex gap-4 pt-2">
                    <Button type="submit" size="sm" className="flex-1" disabled={isLoading}>
                      {isLoading ? 'Guardando…' : 'Guardar dirección'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
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
              <div className="border border-dashed border-border/50 p-10 flex flex-col items-center justify-center gap-4 text-center">
                <MapPin size={24} strokeWidth={1} className="text-neutral-400" />
                <Typography variant="small" className="text-neutral-400 text-xs">
                  Aún no tienes direcciones guardadas.
                </Typography>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.addresses.map((address) => (
                  <div
                    key={address.id}
                    className="bg-card border border-border/50 p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <Typography variant="small" className="font-sans uppercase tracking-widest text-[10px] text-primary">
                        {address.label}
                      </Typography>
                      {address.isDefault && (
                        <span className="text-[9px] uppercase tracking-widest text-neutral-400 border border-border/50 px-2 py-0.5">
                          Principal
                        </span>
                      )}
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={14} strokeWidth={1} className="mt-0.5 text-neutral-400 shrink-0" />
                      <div className="space-y-0.5">
                        <Typography variant="small" className="font-sans text-xs">
                          {address.firstName} {address.lastName}
                        </Typography>
                        <Typography variant="small" className="font-sans text-xs text-neutral-500">
                          {address.street}
                        </Typography>
                        <Typography variant="small" className="font-sans text-xs text-neutral-500">
                          {address.city}{address.province ? `, ${address.province}` : ''} {address.postalCode}
                        </Typography>
                        {address.phone && (
                          <Typography variant="small" className="font-sans text-xs text-neutral-500">
                            {address.phone}
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

      <Footer />
    </main>
  );
}

export default withAuth(ProfilePage);