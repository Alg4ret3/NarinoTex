'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { useUser, Address } from '@/context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Phone, Plus, Trash2, CheckCircle2, X } from 'lucide-react';
import { withAuth } from '@/components/hoc/withAuth';

function ProfilePage() {
  const { user, updateProfile, addAddress, removeAddress, setDefaultAddress } = useUser();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  
  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || ''
  });

  // Address Form State
  const [addressForm, setAddressForm] = useState<Omit<Address, 'id' | 'isDefault'>>({
    label: '',
    street: '',
    city: '',
    country: 'Colombia'
  });
  
  // Safety check - withAuth should prevent this, but TypeScript needs it
  if (!user) return null;

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditingProfile(false);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({ ...addressForm, isDefault: user.addresses.length === 0 });
    setIsAddingAddress(false);
    setAddressForm({ label: '', street: '', city: '', country: 'Colombia' });
  };

  return (
    <main className="min-h-screen bg-background text-primary">
      <Navbar />
      
      <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        <header className="mb-16">
          <Typography variant="small" className="text-neutral-400 mb-4 block tracking-[0.3em] uppercase">Gestión de Cuenta</Typography>
          <Typography variant="h1" className="text-4xl sm:text-6xl text-primary">Mi Perfil</Typography>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Personal Info Column */}
          <section className="lg:col-span-1 space-y-12">
            <div className="bg-card border border-border/50 p-8 space-y-8">
              <div className="flex justify-between items-center">
                <Typography variant="h3" className="text-xs uppercase tracking-widest font-sans text-neutral-400">Información Personal</Typography>
                {!isEditingProfile && (
                  <button onClick={() => setIsEditingProfile(true)} className="text-[10px] uppercase tracking-widest text-primary border-b border-primary/20 hover:border-primary transition-all">Editar</button>
                )}
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-neutral-500 font-medium">Nombre</label>
                    <input 
                      type="text" 
                      value={profileForm.firstName}
                      onChange={e => setProfileForm({...profileForm, firstName: e.target.value})}
                      className="w-full bg-background border border-border/50 px-4 py-3 text-xs outline-none focus:border-primary transition-all font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-neutral-500 font-medium">Apellido</label>
                    <input 
                      type="text" 
                      value={profileForm.lastName}
                      onChange={e => setProfileForm({...profileForm, lastName: e.target.value})}
                      className="w-full bg-background border border-border/50 px-4 py-3 text-xs outline-none focus:border-primary transition-all font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-neutral-500 font-medium">Teléfono</label>
                    <input 
                      type="text" 
                      value={profileForm.phone}
                      onChange={e => setProfileForm({...profileForm, phone: e.target.value})}
                      className="w-full bg-background border border-border/50 px-4 py-3 text-xs outline-none focus:border-primary transition-all font-sans"
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button type="submit" size="sm" className="flex-1">Guardar</Button>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => setIsEditingProfile(false)}>Cancelar</Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <User size={16} strokeWidth={1} className="mt-1 text-neutral-400" />
                    <div>
                      <Typography variant="body" className="font-sans font-medium">{user.name}</Typography>
                      <Typography variant="small" className="text-neutral-500 lowercase">{user.email}</Typography>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone size={16} strokeWidth={1} className="mt-1 text-neutral-400" />
                    <Typography variant="body" className="font-sans text-neutral-500">{user.phone}</Typography>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-primary/5 p-8 border border-primary/10">
              <Typography variant="small" className="text-primary tracking-widest uppercase mb-4 block">Membresía Prime Archivo</Typography>
              <Typography variant="body" className="text-xs text-neutral-500 leading-relaxed italic">
                Como miembro de NariñoTex Archivo, tienes acceso a pre-reservas en todas nuestras Galas de Moda y atención personalizada 24/7.
              </Typography>
            </div>
          </section>

          {/* Addresses Column */}
          <section className="lg:col-span-2 space-y-8">
            <div className="flex justify-between items-end mb-4">
              <div className="space-y-1">
                <Typography variant="h3" className="text-xs uppercase tracking-widest font-sans text-neutral-400">Libreta de Direcciones</Typography>
                <Typography variant="body" className="text-xs text-neutral-500">Gestiona tus puntos de entrega para pedidos de alta gama.</Typography>
              </div>
              <button 
                onClick={() => setIsAddingAddress(true)}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-primary border-b border-primary/20 hover:border-primary transition-all pb-1"
              >
                <Plus size={12} strokeWidth={1} /> Nueva Dirección
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {user.addresses.map((address) => (
                  <motion.div
                    key={address.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`p-8 border ${address.isDefault ? 'border-primary bg-primary/[0.02]' : 'border-border/50 bg-card'} relative group`}
                  >
                    {address.isDefault && (
                      <div className="absolute top-6 right-6 text-primary">
                        <CheckCircle2 size={16} strokeWidth={1} />
                      </div>
                    )}
                    
                    <Typography variant="small" className="text-primary font-bold tracking-widest uppercase mb-6 block border-b border-border/20 pb-4">{address.label}</Typography>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-4">
                        <MapPin size={14} strokeWidth={1} className="mt-1 text-neutral-400 flex-shrink-0" />
                        <div className="space-y-1">
                          <Typography variant="body" className="text-xs font-sans text-neutral-500 leading-relaxed">{address.street}</Typography>
                          <Typography variant="body" className="text-xs font-sans text-neutral-500">{address.city}, {address.country}</Typography>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-border/20">
                      {!address.isDefault ? (
                        <button 
                          onClick={() => setDefaultAddress(address.id)}
                          className="text-[9px] uppercase tracking-widest text-neutral-400 hover:text-primary transition-colors"
                        >
                          Predeterminada
                        </button>
                      ) : (
                        <span className="text-[9px] uppercase tracking-widest text-primary font-bold">Principal</span>
                      )}
                      
                      <button 
                        onClick={() => removeAddress(address.id)}
                        className="text-neutral-300 hover:text-red-500 transition-colors p-2"
                        aria-label="Eliminar dirección"
                      >
                        <Trash2 size={14} strokeWidth={1} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {user.addresses.length === 0 && !isAddingAddress && (
              <div className="text-center py-20 border border-dashed border-border/50 bg-muted/20">
                <Typography variant="body" className="text-neutral-400 italic">No tienes direcciones registradas.</Typography>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Add Address Modal Overlay */}
      <AnimatePresence>
        {isAddingAddress && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[120]"
              onClick={() => setIsAddingAddress(false)}
            />
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-x-6 top-[15%] sm:top-1/4 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md bg-card border border-border shadow-2xl z-[130] p-10"
            >
              <div className="flex justify-between items-center mb-10">
                <Typography variant="h3" className="text-xs uppercase tracking-widest font-sans text-primary">Nueva Dirección</Typography>
                <button onClick={() => setIsAddingAddress(false)} className="text-neutral-400 hover:text-primary">
                  <X size={20} strokeWidth={1} />
                </button>
              </div>

              <form onSubmit={handleAddAddress} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-neutral-500 font-medium">Etiqueta (Ej: Hogar, Trabajo)</label>
                  <input 
                    required
                    type="text" 
                    value={addressForm.label}
                    onChange={e => setAddressForm({...addressForm, label: e.target.value})}
                    placeholder="Casa de Pasto"
                    className="w-full bg-background border border-border/50 px-4 py-4 text-xs outline-none focus:border-primary transition-all font-sans"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-neutral-500 font-medium">Dirección</label>
                  <input 
                    required
                    type="text" 
                    value={addressForm.street}
                    onChange={e => setAddressForm({...addressForm, street: e.target.value})}
                    placeholder="Carrera 20 #12-34"
                    className="w-full bg-background border border-border/50 px-4 py-4 text-xs outline-none focus:border-primary transition-all font-sans"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-neutral-500 font-medium">Ciudad</label>
                    <input 
                      required
                      type="text" 
                      value={addressForm.city}
                      onChange={e => setAddressForm({...addressForm, city: e.target.value})}
                      placeholder="Ipiales"
                      className="w-full bg-background border border-border/50 px-4 py-4 text-xs outline-none focus:border-primary transition-all font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-neutral-500 font-medium">País</label>
                    <input 
                      required
                      type="text" 
                      value={addressForm.country}
                      onChange={e => setAddressForm({...addressForm, country: e.target.value})}
                      className="w-full bg-background border border-border/50 px-4 py-4 text-xs outline-none focus:border-primary transition-all font-sans"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-6 py-5">Guardar en Archivo</Button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

export default withAuth(ProfilePage);
