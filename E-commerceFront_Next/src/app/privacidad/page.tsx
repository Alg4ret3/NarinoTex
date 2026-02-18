'use client';

import React from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { privacyPolicyContent } from '@/constants/content/privacy';

const iconMap = {
  Shield,
  Lock,
  Eye,
  FileText
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <Typography variant="small" className="text-primary uppercase tracking-[0.4em] mb-6 block font-bold text-[10px]">
            {privacyPolicyContent.hero.subtitle}
          </Typography>
          <Typography variant="h1" className="text-4xl sm:text-6xl font-serif mb-8 tracking-tight">
            {privacyPolicyContent.hero.title}
          </Typography>
          <Typography variant="body" className="text-secondary font-light text-lg leading-relaxed max-w-2xl mx-auto">
            {privacyPolicyContent.hero.description}
          </Typography>
          <p className="text-xs text-neutral-400 mt-6 uppercase tracking-widest">
            Última actualización: {privacyPolicyContent.hero.lastUpdate}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {privacyPolicyContent.sections.map((section) => {
            const IconComponent = iconMap[section.icon as keyof typeof iconMap];
            
            return (
              <div key={section.id} className="flex gap-8 items-start">
                <div className="shrink-0 w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <IconComponent className="text-primary" size={20} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <Typography variant="h3" className="text-2xl font-serif mb-4 uppercase tracking-tight">
                    {section.title}
                  </Typography>
                  <Typography variant="body" className="text-secondary font-light leading-relaxed mb-4">
                    {section.description}
                  </Typography>
                  <ul className="space-y-2 text-secondary font-light leading-relaxed ml-6">
                    {section.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

          {/* Contact Section */}
          <div className="pt-12 border-t border-border">
            <Typography variant="h3" className="text-2xl font-serif mb-6 uppercase tracking-tight">
              {privacyPolicyContent.contact.title}
            </Typography>
            <Typography variant="body" className="text-secondary font-light leading-relaxed mb-6">
              {privacyPolicyContent.contact.description}
            </Typography>
            <div className="bg-muted/20 border border-border p-6 space-y-2">
              {privacyPolicyContent.contact.channels.map((channel, index) => (
                <p key={index} className="text-sm">
                  <span className="text-neutral-400 uppercase tracking-widest text-[10px] mr-4">
                    {channel.label}:
                  </span>
                  <a href={channel.href} className="text-primary hover:underline">
                    {channel.value}
                  </a>
                </p>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
