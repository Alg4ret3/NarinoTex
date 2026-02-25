'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Typography } from '@/components/atoms/Typography'
import { Button } from '@/components/atoms/Button'
import { Calendar, MapPin, Clock, Users, Info, ChevronRight, ArrowLeft } from 'lucide-react'
import { TicketSelectionModal } from '@/components/molecules/TicketSelectionModal'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

interface Props {
    product: any
}

export default function EventClientView({ product }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const firstImage =
        product.thumbnail || product.images?.[0]?.url

    const metadata = product.metadata || {}

    const formatPrice = (amount?: number) => {
        if (!amount) return 'Sin precio'
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
        }).format(amount)
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            {/* HERO */}
            <section className="relative h-[60vh] min-h-[400px] flex items-end">
                {firstImage && (
                    <Image
                        src={firstImage}
                        alt={product.title}
                        fill
                        className="object-cover"
                        priority
                    />
                )}

                <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />

                <Link
                    href="/boleteria"
                    className="absolute top-32 left-8 z-20 flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                >
                    <ArrowLeft size={16} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">
                        Volver a Eventos
                    </span>
                </Link>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-12">
                    <Typography
                        variant="small"
                        className="text-primary uppercase tracking-[0.3em] mb-4 block font-bold text-[10px]"
                    >
                        {product.collection?.title}
                    </Typography>

                    <Typography
                        variant="h1"
                        className="text-4xl sm:text-7xl font-serif text-foreground mb-6 leading-tight tracking-tighter"
                    >
                        {product.title}
                    </Typography>

                    <Button
                        onClick={() => setIsModalOpen(true)}
                        size="lg"
                        className="px-12 py-7 bg-primary text-background"
                    >
                        Comprar Boletas
                    </Button>
                </div>
            </section>

            {/* INFO GRID */}
            <section className="py-20 border-b border-border">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <InfoItem icon={<Calendar size={16} />} label="Fecha del Evento" value={metadata.date} />
                    <InfoItem icon={<Clock size={16} />} label="Apertura Puertas" value={metadata.door_time} />
                    <InfoItem icon={<MapPin size={16} />} label="Lugar / Venue" value={metadata.location} />
                    <InfoItem icon={<Users size={16} />} label="Edad Mínima" value={metadata.min_age} />
                </div>
            </section>

            {/* DESCRIPTION + PRECIOS */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                    <div className="lg:col-span-2 space-y-16">

                        {/* Description */}
                        <div>
                            <Typography variant="small" className="mb-8 block text-primary uppercase text-[10px] font-bold">
                                Sobre el Evento
                            </Typography>
                            <Typography variant="body" className="text-lg leading-relaxed">
                                {product.description}
                            </Typography>
                        </div>

                        {/* Variants as tickets */}
                        <div>
                            <Typography variant="small" className="mb-8 block text-primary uppercase text-[10px] font-bold">
                                Tabla de Precios
                            </Typography>

                            <div className="border border-border">
                                {product.variants?.map((variant: any, i: number) => {
                                    const price = variant.calculated_price?.calculated_amount

                                    return (
                                        <div
                                            key={variant.id}
                                            className={`flex justify-between p-6 ${i !== product.variants.length - 1 ? 'border-b border-border' : ''
                                                }`}
                                        >
                                            <Typography variant="h4" className="uppercase">
                                                {variant.title}
                                            </Typography>

                                            <span className="text-xl font-bold text-primary">
                                                {formatPrice(price)}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* SIDE PLAN IMAGE */}
                    {metadata.plan_image && (
                        <div>
                            <Typography variant="small" className="mb-8 block text-primary uppercase text-[10px] font-bold">
                                Plano del Recinto
                            </Typography>

                            <div className="relative aspect-square border border-border overflow-hidden">
                                <Image
                                    src={metadata.plan_image}
                                    alt="Plano"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* MODAL */}
            <TicketSelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                event={{
                    id: product.id,
                    name: product.title,
                    image: firstImage,
                    category: product.collection?.title,
                    price: product.variants[0]?.calculated_price?.calculated_amount
                }}
            />
            <Footer />
        </main>
    )
}

function InfoItem({ icon, label, value }: any) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary">
                {icon}
                <span className="text-[10px] uppercase font-bold">{label}</span>
            </div>
            <span className="text-lg font-serif">{value || 'No definido'}</span>
        </div>
    )
}