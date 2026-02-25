import { getProductById } from '@/services/medusa/products'
import { Navbar } from '@/components/organisms/Navbar'
import { Footer } from '@/components/organisms/Footer'
import EventClientView from '@/components/organisms/EventClientView'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function EventPage({ params }: Props) {
  const { id } = await params

  if (!id) {
    return <div>ID no válido</div>
  }

  const product = await getProductById(id)

  if (!product) {
    return <div>Producto no encontrado</div>
  }

  return (
    <main>
      <EventClientView product={product} />
    </main>
  )
}