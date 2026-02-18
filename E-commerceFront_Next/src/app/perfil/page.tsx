'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { useUser } from '@/context/UserContext';
import { User, Phone } from 'lucide-react';
import { withAuth } from '@/components/hoc/withAuth';

function ProfilePage() {
  const { user, updateProfile } = useUser();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || ''
  });

  // Safety check - withAuth should prevent this, but TypeScript needs it
  if (!user) return null;

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditingProfile(false);
  };

  return (
    <main className="min-h-screen bg-background text-primary">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:pt-32 sm:pb-24 sm:px-6 max-w-5xl mx-auto">
        <header className="mb-8 sm:mb-16">
          <Typography variant="small" className="text-neutral-400 mb-4 block tracking-[0.3em] uppercase text-xs sm:text-sm">Gestión de Cuenta</Typography>
          <Typography variant="h1" className="text-3xl sm:text-5xl lg:text-6xl text-primary">Mi Perfil</Typography>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* Personal Info Column */}
          <section className="lg:col-span-1 space-y-8 lg:space-y-12">
            <div className="bg-card border border-border/50 p-6 sm:p-8 space-y-8">
              <div className="flex justify-between items-center">
                <Typography variant="small" className="font-sans text-neutral-400">Información Personal</Typography>
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
                      <Typography variant="body" className="font-sans font-medium break-words">{user.firstName} {user.lastName}</Typography>
                      <Typography variant="small" className="text-neutral-500 lowercase break-all">{user.email}</Typography>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone size={16} strokeWidth={1} className="mt-1 text-neutral-400" />
                    <Typography variant="body" className="font-sans text-neutral-500">{user.phone}</Typography>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-primary/5 p-6 sm:p-8 border border-primary/10">
              <Typography variant="small" className="text-primary tracking-widest uppercase mb-4 block text-[10px] sm:text-xs">Membresía Prime Archivo</Typography>
              <Typography variant="body" className="text-xs text-neutral-500 leading-relaxed italic">
                Como miembro de NariñoTex Archivo, tienes acceso a pre-reservas en todas nuestras Galas de Moda y atención personalizada 24/7.
              </Typography>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default withAuth(ProfilePage);
