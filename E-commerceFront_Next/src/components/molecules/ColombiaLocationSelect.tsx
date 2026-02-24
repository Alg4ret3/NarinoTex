'use client';

import React from 'react';
import { getDepartamentos, getCiudadesByDepartamento } from '@/lib/colombiaLocation';

interface Props {
  departamento: string;
  ciudad: string;
  onDepartamentoChange: (value: string) => void;
  onCiudadChange: (value: string) => void;
  errorDepartamento?: string;
  errorCiudad?: string;
}

export function ColombiaLocationSelect({
  departamento,
  ciudad,
  onDepartamentoChange,
  onCiudadChange,
  errorDepartamento,
  errorCiudad,
}: Props) {
  const departamentos = getDepartamentos();
  const ciudades = departamento ? getCiudadesByDepartamento(departamento) : [];

  const labelCls =
    'text-[9px] uppercase tracking-widest text-neutral-500 font-medium block';

  const selectCls = (hasError: boolean) =>
    [
      'w-full bg-transparent border-b px-0 py-2 text-xs font-sans outline-none',
      'transition-colors focus:border-[#D4AF37] cursor-pointer',
      // Light mode: fondo blanco, texto oscuro
      '[&>option]:bg-white [&>option]:text-neutral-900',
      // Dark mode: fondo oscuro, texto claro
      'dark:[&>option]:bg-neutral-900 dark:[&>option]:text-primary',
      hasError ? 'border-red-500/70' : 'border-border/50',
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
          value={departamento}
          onChange={handleDepartamentoChange}
          className={selectCls(!!errorDepartamento)}
        >
          <option value="" disabled>Seleccionar…</option>
          {departamentos.map((dep) => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>
        {errorDepartamento && (
          <p className="text-[10px] text-red-400 mt-1">{errorDepartamento}</p>
        )}
      </div>

      {/* Ciudad */}
      <div className="space-y-1">
        <label className={labelCls}>Ciudad *</label>
        <select
          value={ciudad}
          onChange={(e) => onCiudadChange(e.target.value)}
          disabled={!departamento}
          className={`${selectCls(!!errorCiudad)} disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <option value="" disabled>
            {departamento ? 'Seleccionar…' : 'Primero elige departamento'}
          </option>
          {ciudades.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errorCiudad && (
          <p className="text-[10px] text-red-400 mt-1">{errorCiudad}</p>
        )}
      </div>
    </>
  );
}