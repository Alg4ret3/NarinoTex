'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { CheckCircle2, QrCode, Printer, Home, Download, Calendar, MapPin, Ticket } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import Link from 'next/link';

interface OrderItem {
    id: string;
    name: string;
    price: string;
    quantity: number;
    type: string;
    metadata?: any;
}

interface Order {
    id: string;
    date: string;
    items: OrderItem[];
    total: number;
}

export default function SuccessPage() {
    const { id } = useParams();
    const router = useRouter();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Retrieve order from localStorage
        const savedOrders = localStorage.getItem('narinotex-orders');
        if (savedOrders) {
            const orders = JSON.parse(savedOrders);
            const foundOrder = orders.find((o: Order) => o.id === id);

            if (foundOrder) {
                setOrder(foundOrder);
            } else {
                // Order not found, redirect to home after a delay
                setTimeout(() => router.push('/'), 3000);
            }
        } else {
            setTimeout(() => router.push('/'), 3000);
        }
        setLoading(false);
    }, [id, router]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center animate-pulse">
                    <div className="w-16 h-16 bg-muted rounded-full mb-4"></div>
                    <div className="h-4 w-32 bg-muted rounded"></div>
                </div>
            </main>
        );
    }

    if (!order) {
        return (
            <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
                <Typography variant="h2" className="mb-4">Pedido no encontrado</Typography>
                <Typography variant="body" className="mb-8 text-secondary">Redirigiendo al inicio...</Typography>
                <Button variant="outline" onClick={() => router.push('/')}>Volver al Inicio</Button>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background print:bg-white">
            <div className="print:hidden">
                <Navbar />
            </div>

            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                {/* Success Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-8 border border-green-500/20">
                        <CheckCircle2 size={40} className="text-green-500" strokeWidth={1.5} />
                    </div>
                    <Typography variant="small" className="mb-4 text-green-500 uppercase tracking-[0.3em] font-medium text-xs">
                        Pago Exitoso
                    </Typography>
                    <Typography variant="h1" className="mb-6 text-4xl sm:text-5xl font-serif">
                        ¡Gracias por tu compra!
                    </Typography>
                    <Typography variant="body" className="text-secondary max-w-xl text-sm leading-relaxed">
                        Tu orden ha sido confirmada. Hemos generado un código QR único para tu entrada.
                        Por favor preséntalo al ingreso del evento.
                    </Typography>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

                    {/* Order Details */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-card border border-border p-8 md:p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <QrCode size={120} />
                            </div>

                            <div className="flex justify-between items-start mb-8 border-b border-border/50 pb-8">
                                <div>
                                    <Typography variant="small" className="text-neutral-400 uppercase tracking-widest text-[9px] mb-2">Orden ID</Typography>
                                    <span className="font-mono text-sm uppercase text-primary">{order.id.slice(0, 8)}</span>
                                </div>
                                <div className="text-right">
                                    <Typography variant="small" className="text-neutral-400 uppercase tracking-widest text-[9px] mb-2">Fecha</Typography>
                                    <span className="text-sm text-secondary">{new Date(order.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-start">
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 flex items-center justify-center bg-primary/5 rounded-full text-primary shrink-0">
                                                <span className="text-xs font-bold">{item.quantity}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-serif text-lg leading-tight mb-1">{item.name}</h4>
                                                <div className="flex flex-wrap gap-2 text-[10px] text-neutral-400 uppercase tracking-wide">
                                                    {item.type === 'ticket' && <span>Entrada Digital</span>}
                                                    {item.type === 'stand' && <span>Reserva de Espacio</span>}

                                                    {item.metadata?.location && (
                                                        <span className="flex items-center gap-1 border-l border-border pl-2">
                                                            <MapPin size={10} /> {item.metadata.location}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="font-medium text-secondary">{item.price}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-border flex justify-between items-end">
                                <Typography variant="small" className="text-neutral-400 uppercase tracking-widest text-[10px]">Total Pagado</Typography>
                                <Typography variant="h3" className="text-2xl font-sans">${order.total.toLocaleString('es-CO')}</Typography>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 print:hidden">
                            <Button variant="outline" onClick={handlePrint} className="flex-1 flex items-center justify-center gap-2 uppercase tracking-widest text-[10px]">
                                <Printer size={14} /> Imprimir Comprobante
                            </Button>
                            <Link href="/" className="flex-1">
                                <Button variant="primary" className="w-full flex items-center justify-center gap-2 uppercase tracking-widest text-[10px]">
                                    <Home size={14} /> Volver al Inicio
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* QR Code Card */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-8 border border-border flex flex-col items-center text-center shadow-2xl relative">
                            <div className="w-full aspect-square bg-white flex items-center justify-center mb-6 relative">
                                <div className="absolute inset-0 border-2 border-black border-dashed opacity-20"></div>
                                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-black"></div>
                                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-black"></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-black"></div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-black"></div>

                                {/* The QR Code */}
                                <QRCodeSVG
                                    value={JSON.stringify({ id: order.id, type: 'access_pass' })}
                                    size={200}
                                    level="H"
                                    includeMargin={true}
                                />
                            </div>

                            <Typography variant="h4" className="text-black text-lg font-serif mb-2 uppercase">Acceso Digital</Typography>
                            <Typography variant="body" className="text-neutral-500 text-xs mb-6">
                                Muestra este código QR en la entrada del evento para validar tu ingreso.
                            </Typography>

                            <div className="w-full text-[9px] uppercase tracking-[0.2em] text-neutral-400 py-3 border-t border-dashed border-neutral-300">
                                Válido para 1 ingreso
                            </div>
                        </div>

                        <div className="mt-6 bg-muted/50 p-4 border border-border text-center print:hidden">
                            <Typography variant="small" className="text-secondary text-[10px]">
                                Hemos enviado una copia de este recibo y el código QR a tu correo electrónico.
                            </Typography>
                        </div>
                    </div>

                </div>
            </div>
            <div className="print:hidden">
                <Footer />
            </div>
        </main>
    );
}
