import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  const featuredProducts = [
    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar /> 

      {/* Hero Section (se puede extraer también si lo deseas) */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* ... (código existente del hero) ... */}
      </section>

      {/* Productos Destacados */}
      <section className="container mx-auto px-6 py-16">
        {/* ... (código existente de productos) ... */}
      </section>

      

      <Footer />
    </div>
  );
}