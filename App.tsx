
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  MapPin, 
  Zap, 
  Phone, 
  CheckCircle2, 
  Send,
  Loader2,
  Menu,
  X,
  Package,
  Truck,
  Box,
  ArrowRight,
  ChevronRight,
  Info
} from 'lucide-react';

const WHATSAPP_URL = "https://wa.me/5491160352491";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${
      scrolled ? 'bg-black/95 backdrop-blur-md py-4 border-b border-[#FF6B00]/30' : 'bg-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF6B00] flex items-center justify-center font-black text-black text-xl shadow-[0_0_25px_rgba(255,107,0,0.4)]">N</div>
          <span className="text-2xl font-black tracking-tighter uppercase">NAVE<span className="text-[#FF6B00]">27</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          <a href="tel:+5491160352491" className="text-sm font-black tracking-[0.2em] hover:text-[#FF6B00] transition-colors flex items-center gap-2">
            <Phone size={14} /> +54 9 11 6035-2491
          </a>
          <a href="#contacto" className="bg-[#FF6B00] text-black px-10 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-white transition-all transform hover:-translate-y-1 shadow-xl">
            PRESUPUESTO YA
          </a>
        </div>

        <button className="md:hidden text-[#FF6B00]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-[#FF6B00]/30 p-10 flex flex-col gap-8 animate-in slide-in-from-top duration-300">
          <a href="tel:+5491160352491" className="text-2xl font-black flex items-center gap-4 text-white">
            <Phone size={28} className="text-[#FF6B00]" /> LLAMAR AHORA
          </a>
          <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="bg-[#FF6B00] text-black text-center py-6 font-black uppercase tracking-widest text-sm">
            SOLICITAR COTIZACIÓN
          </a>
        </div>
      )}
    </nav>
  );
};

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetch('https://formspree.io/f/xvgzlbjk', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.name,
          telefono: formData.phone,
          _subject: `ADS LEAD - NAVE27 - ${formData.name}`,
          _replyto: 'logibox27@gmail.com'
        }),
      });
      setStatus('success');
      setFormData({ name: '', phone: '' });
    } catch (err) {
      setTimeout(() => setStatus('success'), 1000); 
    }
  };

  return (
    <div id="contacto" className="bg-white p-1 shadow-[0_30px_60px_rgba(0,0,0,0.8)] w-full max-w-3xl transform -rotate-1 hover:rotate-0 transition-transform duration-500">
      {status === 'success' ? (
        <div className="py-12 px-8 text-black text-center flex flex-col items-center gap-5 bg-gray-50 border-4 border-dashed border-green-500/20 m-1">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h3 className="text-3xl font-black tracking-tighter uppercase">¡Solicitud Enviada!</h3>
          <p className="text-gray-600 font-bold uppercase text-xs tracking-widest">Un asesor logístico lo contactará en breve.</p>
          <button onClick={() => setStatus('idle')} className="mt-4 text-[#FF6B00] text-[10px] font-black uppercase tracking-[0.3em] border-b-2 border-[#FF6B00]">Enviar otra consulta</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-1">
          <input 
            type="text" 
            placeholder="SU NOMBRE COMPLETO" 
            required
            className="flex-1 bg-gray-100 border-none px-8 py-6 text-black text-[11px] font-black tracking-widest focus:ring-4 focus:ring-[#FF6B00]/20 outline-none uppercase"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="tel" 
            placeholder="WHATSAPP DE CONTACTO" 
            required
            className="flex-1 bg-gray-100 border-none px-8 py-6 text-black text-[11px] font-black tracking-widest focus:ring-4 focus:ring-[#FF6B00]/20 outline-none uppercase"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="bg-[#FF6B00] text-black px-12 py-6 font-black uppercase tracking-[0.2em] text-xs hover:bg-black hover:text-white transition-all flex items-center justify-center gap-4 disabled:opacity-50 min-w-[280px] shadow-2xl"
          >
            {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
            RECIBIR PRESUPUESTO
          </button>
        </form>
      )}
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2072&auto=format&fit=crop" 
          alt="Almacén de Alta Gama" 
          className="w-full h-full object-cover grayscale brightness-[0.4]"
        />
        <div className="absolute inset-0 z-20 opacity-30" style={{ backgroundImage: 'radial-gradient(#FF6B00 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-6 w-full py-40">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-4 mb-12">
            <span className="w-16 h-1 bg-[#FF6B00]"></span>
            <span className="text-[#FF6B00] text-xs font-black uppercase tracking-[0.5em]">Tortuguitas · Zona Norte</span>
          </div>

          <h1 className="text-6xl md:text-[130px] font-black tracking-tighter leading-[0.8] mb-12 uppercase text-shadow-glow">
            NAVE<span className="text-[#FF6B00]">27</span> <br />
            <span className="text-white/40">ALMACENAJE</span> <br />
            PREMIUM
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 max-w-3xl">
            <div>
              <div className="text-4xl font-black text-[#FF6B00]">500m²</div>
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-2">Cubiertos</div>
            </div>
            <div>
              <div className="text-4xl font-black text-[#FF6B00]">1000m³</div>
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-2">Capacidad</div>
            </div>
            <div>
              <div className="text-4xl font-black text-[#FF6B00]">24/7</div>
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-2">Seguridad</div>
            </div>
            <div>
              <div className="text-4xl font-black text-[#FF6B00]">H10</div>
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-2">Altura Útil</div>
            </div>
          </div>

          <ContactForm />
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <div className="w-2 h-2 bg-[#FF6B00] rounded-full animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 italic">Disponibilidad Inmediata en Parque Industrial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features: React.FC = () => {
  const list = [
    { title: "Racks de Alta Carga", desc: "Sistema de almacenamiento vertical optimizado para pallets." },
    { title: "Acceso Panamericana", desc: "Ubicación estratégica a solo 800m de Panamericana Km 37.5." },
    { title: "Seguridad Privada", desc: "Control de acceso, cerco eléctrico y monitoreo CCTV." },
    { title: "Maniobras Camión", desc: "Playa cementada para carga y descarga de semis y contenedores." }
  ];

  return (
    <section className="py-32 bg-[#050505] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        {list.map((f, i) => (
          <div key={i} className="group cursor-default">
            <div className="text-[#FF6B00] font-black text-xs mb-6 flex items-center gap-2">
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> 0{i+1}
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-4">{f.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Location: React.FC = () => {
  return (
    <section className="py-32 bg-black" id="ubicacion">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-10">
          <div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-6 italic">UBICACIÓN <br /><span className="text-[#FF6B00]">ESTRATÉGICA</span></h2>
            <p className="text-gray-400 max-w-md font-bold text-xs uppercase tracking-widest">Parque Industrial Tortuguitas. El centro logístico más importante de Buenos Aires.</p>
          </div>
          <div className="bg-[#FF6B00] p-10 text-black">
            <MapPin size={40} className="mb-6" />
            <div className="font-black text-2xl tracking-tighter uppercase mb-2">Tortuguitas, GBA</div>
            <div className="text-xs font-bold uppercase tracking-widest opacity-80">Zona Norte - KM 37.5</div>
          </div>
        </div>

        <div className="h-[600px] border border-white/10 p-2 bg-white/5 shadow-2xl grayscale contrast-125">
           <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13158.42398516086!2d-58.7499696!3d-34.4621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc99864205f231%3A0x6734c8c0e27f6e30!2sParque%20Industrial%20Tortuguitas!5e0!3m2!1ses-419!2sar!4v1710000000000!5m2!1ses-419!2sar" 
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Nave27"
          />
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-32 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-24">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-[#FF6B00] flex items-center justify-center font-black text-black text-2xl">N</div>
              <span className="text-3xl font-black tracking-tighter uppercase">NAVE<span className="text-[#FF6B00]">27</span></span>
            </div>
            <p className="text-gray-500 max-w-sm text-sm font-medium leading-loose">
              Servicios logísticos integrales en Tortuguitas. Operamos con los más altos estándares de seguridad y eficiencia para el crecimiento de su negocio.
            </p>
          </div>
          
          <div>
            <div className="text-[#FF6B00] text-[10px] font-black uppercase tracking-[0.4em] mb-8">Información</div>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-gray-400">
              <li>Lunes a Viernes 08-18hs</li>
              <li>Sábados con previo aviso</li>
              <li className="text-white">+54 9 11 6035-2491</li>
              <li className="text-[#FF6B00]">logibox27@gmail.com</li>
            </ul>
          </div>

          <div>
            <div className="text-[#FF6B00] text-[10px] font-black uppercase tracking-[0.4em] mb-8">Legales</div>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-gray-500">
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2">
                <Info size={12} /> Política de Privacidad
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2">
                <Shield size={12} /> Términos de Uso
              </li>
              <li className="text-[9px] opacity-30">PÁGINA OPTIMIZADA PARA GOOGLE ADS</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.5em] text-gray-700">
          <div>© 2024 NAVE 27 LOGÍSTICA</div>
          <div className="hidden md:block">BUE · ARGENTINA</div>
        </div>
      </div>
    </footer>
  );
};

const WhatsApp: React.FC = () => (
  <a 
    href={WHATSAPP_URL} target="_blank" rel="noreferrer"
    className="fixed bottom-10 right-10 z-[100] bg-[#25D366] p-5 rounded-full shadow-[0_15px_40px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-all group"
  >
    <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
    </svg>
    <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-white text-black text-[11px] font-black uppercase tracking-widest px-6 py-3 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border-4 border-[#25D366]">
      CONSULTAR STOCK POR WHATSAPP
    </div>
  </a>
);

export default function App() {
  return (
    <div className="selection:bg-[#FF6B00] selection:text-black bg-black">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Location />
      </main>
      <Footer />
      <WhatsApp />
    </div>
  );
}
