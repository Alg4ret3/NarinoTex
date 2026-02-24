'use client';

import React from 'react';
import { getDepartamentos, getCiudadesByDepartamento } from '@/lib/colombiaLocation';

interface Props {
  departamento: string;
  ciudad: string;
  onDepartamentoChange: (value: string) => void;
  onCiudadChange: (value: string) => void;
}

export function ColombiaLocationSelect({
  departamento,
  ciudad,
  onDepartamentoChange,
  onCiudadChange,
}: Props) {
  const departamentos = getDepartamentos();
  const ciudades = departamento ? getCiudadesByDepartamento(departamento) : [];

  const labelCls = 'text-[9px] uppercase tracking-widest text-neutral-500 font-medium block';

  const selectCls = [
    'w-full bg-transparent border-b border-border/50',
    'px-0 py-2 text-xs font-sans outline-none',
    'transition-colors focus:border-[#D4AF37]',
    'text-primary cursor-pointer',
    // Estilos para las opciones del desplegable nativo
    '[&>option]:bg-neutral-900 [&>option]:text-primary',
  ].join(' ');

  const handleDepartamentoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onDepartamentoChange(e.target.value);
    onCiudadChange('');
  };

  return (
    <>
      {/* Departamento */}
      <div className="space-y-1">
        <label className={labelCls}>Departamento *</label>
        <select
          required
          value={departamento}
          onChange={handleDepartamentoChange}
          className={selectCls}
        >
          <option value="" disabled>Seleccionar…</option>
          {departamentos.map((dep) => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>
      </div>

      {/* Ciudad */}
      <div className="space-y-1">
        <label className={labelCls}>Ciudad *</label>
        <select
          required
          value={ciudad}
          onChange={(e) => onCiudadChange(e.target.value)}
          disabled={!departamento}
          className={`${selectCls} disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <option value="" disabled>
            {departamento ? 'Seleccionar…' : 'Primero elige departamento'}
          </option>
          {ciudades.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </>
  );
}