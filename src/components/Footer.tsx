import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h4 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              SHOPSOULS
            </h4>
            <p className="mt-2 text-gray-400">Innovación y estilo en tus manos.</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h5 className="font-bold text-lg mb-4">Compañía</h5>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">Sobre Nosotros</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-lg mb-4">Legal</h5>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacidad</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Términos</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} SHOPSOULS. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};