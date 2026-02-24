'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { ColombiaLocationSelect } from '@/components/molecules/ColombiaLocationSelect';
import { useUser } from '@/context/UserContext';
import { User, Phone, MapPin, Plus, X, Check, Trash2 } from 'lucide-react';
import { withAuth } from '@/components/hoc/withAuth';
import type { Address } from '@/context/UserContext';

// ─── Delete Confirmation Modal ────────────────────────────────────────────────

function DeleteConfirmModal({
  addressLabel,
  onConfirm,
  onCancel,
}: {
  addressLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Panel */}
      <div className="relative w-full max-w-sm bg-card border border-border/60 p-8 shadow-2xl animate-slideDown">
        {/* Close */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-neutral-500 hover:text-primary transition-colors"
        >
          <X size={16} />
        </button>

        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 border border-red-500/30 bg-red-500/5 mb-6 mx-auto">
          <Trash2 size={20} strokeWidth={1} className="text-red-400" />
        </div>

        {/* Text */}
        <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 text-center mb-2">
          Confirmar eliminación
        </p>
        <p className="text-sm text-primary text-center font-serif mb-1">
          ¿Eliminar dirección?
        </p>
        <p className="text-xs text-neutral-500 text-center mb-8">
          <span className="text-[#D4AF37]">"{addressLabel}"</span> se eliminará
          permanentemente y no podrá recuperarse.
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 h-10 text-[10px] uppercase tracking-widest border border-border/50 text-neutral-400 hover:border-primary hover:text-primary transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-10 text-[10px] uppercase tracking-widest bg-red-500/10 border border-red-500/40 text-red-400 hover:bg-red-500/20 hover:border-red-500/70 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Validation helpers ───────────────────────────────────────────────────────

const PHONE_RE = /^[0-9\s\+\-\(\)]{7,15}$/;
const POSTAL_RE = /^[0-9]{4,10}$/;

function validateProfileForm(form: {
  firstName: string;
  lastName: string;
  phone: string;
}) {
  const errors: Partial<typeof form> = {};
  if (!form.firstName.trim()) errors.firstName = 'El nombre es requerido';
  else if (form.firstName.trim().length < 2) errors.firstName = 'Mínimo 2 caracteres';

  if (!form.lastName.trim()) errors.lastName = 'El apellido es requerido';
  else if (form.lastName.trim().length < 2) errors.lastName = 'Mínimo 2 caracteres';

  if (form.phone && !PHONE_RE.test(form.phone))
    errors.phone = 'Teléfono inválido (7–15 dígitos)';

  return errors;
}

function validateAddressForm(form: {
  addressName: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
}) {
  const errors: Partial<Record<keyof typeof form, string>> = {};

  if (!form.addressName.trim()) errors.addressName = 'Dale un nombre a esta dirección';
  else if (form.addressName.trim().length < 2) errors.addressName = 'Mínimo 2 caracteres';

  if (!form.firstName.trim()) errors.firstName = 'El nombre es requerido';
  else if (form.firstName.trim().length < 2) errors.firstName = 'Mínimo 2 caracteres';

  if (!form.lastName.trim()) errors.lastName = 'El apellido es requerido';
  else if (form.lastName.trim().length < 2) errors.lastName = 'Mínimo 2 caracteres';

  if (!form.street.trim()) errors.street = 'La dirección es requerida';
  else if (form.street.trim().length < 5) errors.street = 'Ingresa una dirección más completa';

  if (!form.province) errors.province = 'Selecciona un departamento';
  if (!form.city) errors.city = 'Selecciona una ciudad';

  if (form.postalCode && !POSTAL_RE.test(form.postalCode))
    errors.postalCode = 'Código postal inválido (4–10 dígitos)';

  if (form.phone && !PHONE_RE.test(form.phone))
    errors.phone = 'Teléfono inválido (7–15 dígitos)';

  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────

function ProfilePage() {
  const { user, updateProfile, createAddress, deleteAddress, updateAddress, isLoading } = useUser();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [showSuccessTick, setShowSuccessTick] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  // ── Delete modal state ──
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; label: string } | null>(null);

  // ── Profile form ──
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });
  const [profileTouched, setProfileTouched] = useState<Partial<Record<keyof typeof profileForm, boolean>>>({});
  const profileErrors = validateProfileForm(profileForm);
  const profileTouchedErrors = Object.fromEntries(
    Object.entries(profileErrors).filter(([k]) => profileTouched[k as keyof typeof profileForm])
  ) as typeof profileErrors;

  const touchProfile = (field: keyof typeof profileForm) =>
    setProfileTouched((prev) => ({ ...prev, [field]: true }));

  // ── Address form ──
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
  const [addressTouched, setAddressTouched] = useState<Partial<Record<string, boolean>>>({});
  const addressErrors = validateAddressForm(addressForm);
  const addressTouchedErrors = Object.fromEntries(
    Object.entries(addressErrors).filter(([k]) => addressTouched[k])
  ) as typeof addressErrors;

  const touchAddress = (field: string) =>
    setAddressTouched((prev) => ({ ...prev, [field]: true }));

  const touchAddressSelect = (field: 'province' | 'city') =>
    setAddressTouched((prev) => ({ ...prev, [field]: true }));

  // ── Sync user data ──
  useEffect(() => {
    if (user) {
      setProfileForm({ firstName: user.firstName, lastName: user.lastName, phone: user.phone });
      setAddressForm((prev) => ({ ...prev, firstName: user.firstName, lastName: user.lastName, phone: user.phone }));
    }
  }, [user]);

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
    setAddressTouched({});
    setIsAddingAddress(true);
  };

  const [addressApiError, setAddressApiError] = useState<string | null>(null);

  if (!user) {
    return <main className="min-h-screen flex items-center justify-center">Cargando...</main>;
  }

  // ── Handlers ──
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileTouched({ firstName: true, lastName: true, phone: true });
    if (Object.keys(profileErrors).length > 0) return;
    try {
      await updateProfile(profileForm);
      setShowSuccessTick(true);
      setTimeout(() => { setShowSuccessTick(false); setIsEditingProfile(false); }, 1500);
    } catch { /* handled by context */ }
  };

  const handleCreateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddressApiError(null);
    setAddressTouched({
      addressName: true, firstName: true, lastName: true,
      street: true, province: true, city: true, postalCode: true, phone: true,
    });
    if (Object.keys(addressErrors).length > 0) return;
    try {
      if (editingAddressId) {
        await updateAddress(editingAddressId, addressForm);
      } else {
        await createAddress(addressForm);
      }
      setIsAddingAddress(false);
      setEditingAddressId(null);
      setAddressTouched({});
      setAddressForm({
        addressName: '', firstName: user.firstName, lastName: user.lastName,
        street: '', city: '', country: 'co', province: '', postalCode: '', phone: user.phone,
      });
    } catch (err: any) {
      setAddressApiError(err.message || 'Error al guardar la dirección');
    }
  };

  // ── Delete handler — usa modal en lugar de confirm() ──
  const handleDeleteAddress = (id: string, label: string) => {
    setConfirmDelete({ id, label });
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;
    const { id } = confirmDelete;
    setConfirmDelete(null);
    setDeletingId(id);
    setTimeout(async () => {
      try { await deleteAddress(id); }
      catch (err) { console.error(err); }
      finally { setDeletingId(null); }
    }, 300);
  };

  // ── Styles ──
  const inputBase = 'peer w-full bg-transparent border-b px-0 py-2 text-xs outline-none transition-all font-sans';

  const inputCls = (field: string, touched: Record<string, boolean | undefined>, errors: Record<string, string | undefined>) =>
    `${inputBase} ${touched[field] && errors[field] ? 'border-red-500/70' : 'border-border/50 focus:border-transparent'}`;

  const labelClass = 'text-[9px] uppercase tracking-widest text-neutral-500 font-medium';

  const FieldError = ({ msg }: { msg?: string }) =>
    msg ? <p className="text-[10px] text-red-400 mt-1">{msg}</p> : null;

  return (
    <main className="min-h-screen bg-background text-primary">
      {/* Delete confirmation modal */}
      {confirmDelete && (
        <DeleteConfirmModal
          addressLabel={confirmDelete.label}
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      <style jsx global>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-slideDown { animation: slideDown 0.4s ease-out forwards; }
        .shimmer-bg {
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:pt-32 sm:pb-24 sm:px-6 max-w-6xl mx-auto flex flex-col lg:flex-row relative">
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

            {/* ── Personal Info ── */}
            <section className="lg:col-span-1 py-8 lg:p-10 lg:pl-0 space-y-10 lg:space-y-12">
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <Typography variant="small" className="font-sans text-neutral-400">Información Personal</Typography>
                  {!isEditingProfile && (
                    <button onClick={() => setIsEditingProfile(true)} className="text-[10px] uppercase tracking-widest transition-all cursor-pointer">
                      Editar
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleUpdateProfile} className="space-y-6" noValidate>
                    <div className="space-y-1 relative group">
                      <label className={labelClass}>Nombre</label>
                      <input
                        type="text"
                        value={profileForm.firstName}
                        onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                        onBlur={() => touchProfile('firstName')}
                        className={inputCls('firstName', profileTouched, profileTouchedErrors)}
                      />
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left" />
                      <FieldError msg={profileTouchedErrors.firstName} />
                    </div>

                    <div className="space-y-1 relative group">
                      <label className={labelClass}>Apellido</label>
                      <input
                        type="text"
                        value={profileForm.lastName}
                        onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                        onBlur={() => touchProfile('lastName')}
                        className={inputCls('lastName', profileTouched, profileTouchedErrors)}
                      />
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left" />
                      <FieldError msg={profileTouchedErrors.lastName} />
                    </div>

                    <div className="space-y-1 relative group">
                      <label className={labelClass}>Teléfono</label>
                      <input
                        type="text"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        onBlur={() => touchProfile('phone')}
                        className={inputCls('phone', profileTouched, profileTouchedErrors)}
                      />
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left" />
                      <FieldError msg={profileTouchedErrors.phone} />
                    </div>

                    <div className="flex gap-4 pt-4">
                      {showSuccessTick ? (
                        <div className="flex-1 flex items-center justify-center bg-green-900/10 text-green-500 border border-green-500/30 h-10 text-xs uppercase tracking-widest font-medium">
                          <Check size={16} className="mr-2" /> Guardado
                        </div>
                      ) : (
                        <Button type="submit" size="sm" className="flex-1 h-10">Guardar</Button>
                      )}
                      {!showSuccessTick && (
                        <Button variant="outline" size="sm" className="flex-1 h-10" onClick={() => { setIsEditingProfile(false); setProfileTouched({}); }} type="button">
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-start gap-5">
                      <div className="relative">
                        <div className="absolute inset-0 border border-[#D4AF37]/50 rounded-full animate-ping opacity-75" />
                        <div className="relative bg-background rounded-full p-2 border border-[#D4AF37]/30">
                          <User size={26} strokeWidth={1} className="text-neutral-400" />
                        </div>
                      </div>
                      <div className="pt-1">
                        <Typography variant="body" className="font-sans font-medium break-words text-lg text-primary">
                          {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="small" className="text-neutral-500 lowercase break-all">{user.email}</Typography>
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
                <div className="absolute inset-0 shimmer-bg mix-blend-overlay pointer-events-none" />
                <Typography variant="small" className="text-[#D4AF37] tracking-widest uppercase mb-4 block text-[10px] sm:text-xs font-semibold relative z-10">
                  Membresía Prime Archivo
                </Typography>
                <Typography variant="body" className="text-xs text-neutral-400 leading-relaxed italic relative z-10">
                  Como miembro de NariñoTex Archivo, tienes acceso a pre-reservas en todas nuestras Galas de Moda y atención personalizada 24/7.
                </Typography>
              </div>
            </section>

            {/* ── Addresses ── */}
            <section className="lg:col-span-2 py-8 lg:p-10 lg:pr-0 space-y-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
                <Typography variant="small" className="font-sans text-neutral-400">Mis Direcciones</Typography>
                {!isAddingAddress && (
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest border border-primary text-primary px-5 py-2.5 hover:bg-primary hover:text-background transition-colors duration-300 w-full sm:w-auto"
                  >
                    <Plus size={12} /> Nueva dirección
                  </button>
                )}
              </div>

              {/* ── Address Form ── */}
              {isAddingAddress && (
                <div className="border border-border/50 p-6 sm:p-8 animate-slideDown bg-card shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <Typography variant="small" className="font-sans text-neutral-300 uppercase tracking-widest text-[10px] border-b border-[#D4AF37]/50 pb-1">
                      {editingAddressId ? 'Editar Dirección' : 'Nueva Dirección'}
                    </Typography>
                    <button onClick={() => { setIsAddingAddress(false); setAddressTouched({}); }}>
                      <X size={18} className="text-neutral-500 hover:text-[#D4AF37] transition-colors" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateAddress} className="space-y-6" noValidate>
                    <div className="flex flex-col sm:grid sm:grid-cols-2 gap-6 sm:gap-x-8 sm:gap-y-6">

                      <div className="sm:col-span-2 space-y-1 relative group">
                        <label className={labelClass}>Nombre de la dirección *</label>
                        <input
                          type="text"
                          placeholder="Ej: Casa, Oficina…"
                          value={addressForm.addressName}
                          onChange={(e) => setAddressForm((prev) => ({ ...prev, addressName: e.target.value }))}
                          onBlur={() => touchAddress('addressName')}
                          className={`${inputCls('addressName', addressTouched, addressTouchedErrors)} mt-2 placeholder:text-neutral-800`}
                        />
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left" />
                        <FieldError msg={addressTouchedErrors.addressName} />
                      </div>

                      <div className="space-y-1 relative group">
                        <label className={labelClass}>Nombre *</label>
                        <input
                          type="text"
                          value={addressForm.firstName}
                          onChange={(e) => setAddressForm((prev) => ({ ...prev, firstName: e.target.value }))}
                          onBlur={() => touchAddress('firstName')}
                          className={`${inputCls('firstName', addressTouched, addressTouchedErrors)} mt-2`}
                        />
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left" />
                        <FieldError msg={addressTouchedErrors.firstName} />
                      </div>

                      <div className="space-y-1 relative group">
                        <label className={labelClass}>Apellido *</label>
                        <input
                          type="text"
                          value={addressForm.lastName}
                          onChange={(e) => setAddressForm((prev) => ({ ...prev, lastName: e.target.value }))}
                          onBlur={() => touchAddress('lastName')}
                          className={`${inputCls('lastName', addressTouched, addressTouchedErrors)} mt-2`}
                        />
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left" />
                        <FieldError msg={addressTouchedErrors.lastName} />
                      </div>

                      <div className="sm:col-span-2 space-y-1 relative group">
                        <label className={labelClass}>Dirección *</label>
                        <input
                          type="text"
                          placeholder="Calle, número, barrio…"
                          value={addressForm.street}
                          onChange={(e) => setAddressForm((prev) => ({ ...prev, street: e.target.value }))}
                          onBlur={() => touchAddress('street')}
                          className={`${inputCls('street', addressTouched, addressTouchedErrors)} mt-2 placeholder:text-neutral-800`}
                        />
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left" />
                        <FieldError msg={addressTouchedErrors.street} />
                      </div>

                      <ColombiaLocationSelect
                        departamento={addressForm.province}
                        ciudad={addressForm.city}
                        onDepartamentoChange={(val) => {
                          setAddressForm((prev) => ({ ...prev, province: val, city: '' }));
                          touchAddressSelect('province');
                        }}
                        onCiudadChange={(val) => {
                          setAddressForm((prev) => ({ ...prev, city: val }));
                          touchAddressSelect('city');
                        }}
                        errorDepartamento={addressTouchedErrors.province}
                        errorCiudad={addressTouchedErrors.city}
                      />

                      <div className="space-y-1 relative group">
                        <label className={labelClass}>Código Postal</label>
                        <input
                          type="number"
                          value={addressForm.postalCode}
                          onChange={(e) => setAddressForm((prev) => ({ ...prev, postalCode: e.target.value }))}
                          onBlur={() => touchAddress('postalCode')}
                          className={`${inputCls('postalCode', addressTouched, addressTouchedErrors)} mt-2`}
                        />
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left" />
                        <FieldError msg={addressTouchedErrors.postalCode} />
                      </div>

                      <div className="space-y-1 relative group">
                        <label className={labelClass}>Teléfono</label>
                        <input
                          type="number"
                          value={addressForm.phone}
                          onChange={(e) => setAddressForm((prev) => ({ ...prev, phone: e.target.value }))}
                          onBlur={() => touchAddress('phone')}
                          className={`${inputCls('phone', addressTouched, addressTouchedErrors)} mt-2`}
                        />
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-left" />
                        <FieldError msg={addressTouchedErrors.phone} />
                      </div>
                    </div>

                    {addressApiError && (
                      <Typography variant="small" className="text-red-500 text-xs mt-2 block">
                        {addressApiError}
                      </Typography>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button type="submit" size="sm" className="w-full sm:w-1/2 h-11" disabled={isLoading}>
                        {isLoading ? 'Guardando…' : 'Guardar dirección'}
                      </Button>
                      <Button
                        variant="outline" size="sm" className="w-full sm:w-1/2 h-11"
                        onClick={() => { setIsAddingAddress(false); setAddressTouched({}); }}
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
                      className={`border border-border/50 p-6 space-y-4 transition-all duration-300 bg-card ${
                        deletingId === address.id
                          ? 'scale-95 opacity-0 pointer-events-none'
                          : 'scale-100 opacity-100 hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-border/30 pb-3">
                        <Typography variant="small" className="font-sans uppercase tracking-widest text-[10px] text-[#D4AF37]">
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
                            onClick={() => handleDeleteAddress(address.id, address.label)}
                            className="text-[9px] uppercase tracking-widest text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
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
                          <Typography variant="small" className="font-sans text-xs text-neutral-400">{address.street}</Typography>
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