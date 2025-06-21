import Link from 'next/link';
import { ShoppingCart, ArrowRight } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed w-full z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
          SHOPSOULS
        </Link>
        <div className="flex items-center space-x-8">
          <Link href="/categories" className="text-gray-700 hover:text-purple-600 font-medium flex items-center">
            Categorías <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          <Link href="/cart" className="relative p-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 hover:shadow-lg transition">
            <ShoppingCart className="h-6 w-6 text-purple-600" />
            <span className="absolute -top-1 -right-1 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};