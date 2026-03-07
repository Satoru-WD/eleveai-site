import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView
} from 'framer-motion';
import {
  ArrowRight,
  TrendingUp,
  Cpu,
  BarChart3,
  CheckCircle2,
  Instagram,
  Smartphone,
  Tablet,
  Laptop,
  ChevronDown,
  Plus,
  Minus,
  Star,
  Users,
  LayoutDashboard,
  Zap,
  Target,
  Menu,
  Calendar,
  Clock,
  MessageCircle,
  X
} from 'lucide-react';

// Configuration
const WHATSAPP_URL = "https://wa.me/5519994671493?text=Ol%C3%A1%21+Gostaria+de+conhecer+o+atendimento+automatizado+da+EleveAI+e+elevar+meu+neg%C3%B3cio.";

const trackWhatsAppClick = () => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Contact');
  }
};

// Branded WhatsApp SVG Icon for a professional look
const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.554 4.189 1.605 6.006L0 24l6.117-1.605a11.803 11.803 0 005.925 1.586h.005c6.635 0 12.032-5.396 12.035-12.03a11.8 11.8 0 00-3.669-8.498" />
  </svg>
);

// --- Components ---

const FormModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    fetch('https://formsubmit.co/ajax/satorukubota01@gmail.com', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData))
    })
    .then(response => response.json())
    .then(data => {
      setStatus('success');
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead');
      }
    })
    .catch(error => {
      console.error(error);
      setStatus('idle');
      alert("Houve um erro ao enviar. Tente novamente ou chame no WhatsApp.");
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#0A0A0B]/80 backdrop-blur-sm" 
          onClick={onClose} 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md glass rounded-[2rem] border-white/10 p-6 md:p-8 shadow-2xl z-10"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
          >
            <X size={20} />
          </button>

          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Solicitação Recebida</h3>
              <p className="text-gray-400">Nossa equipe estratégica analisará seu perfil e entrará em contato em breve.</p>
              <button 
                onClick={onClose}
                className="mt-8 w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors"
              >
                Fechar
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Raio-X Estratégico</h3>
                <p className="text-sm text-gray-400">Descubra as alavancas de crescimento do seu negócio.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="_subject" value="Novo contato do site - Raio X" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 ml-1">Nome</label>
                  <input required type="text" name="Nome" className="w-full bg-[#0A0A0B]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B988BF] transition-colors" placeholder="Seu nome completo" />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 ml-1">E-mail</label>
                  <input required type="email" name="Email" className="w-full bg-[#0A0A0B]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B988BF] transition-colors" placeholder="seu@email.com" />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 ml-1">WhatsApp</label>
                  <input required type="tel" name="WhatsApp" className="w-full bg-[#0A0A0B]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B988BF] transition-colors" placeholder="(00) 00000-0000" />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 ml-1">Motivo do contato</label>
                  <select required name="Motivo" defaultValue="" className="w-full bg-[#0A0A0B]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B988BF] transition-colors appearance-none [&>option]:text-gray-900">
                    <option value="" disabled>Selecione uma opção</option>
                    <option value="Quero escalar minhas vendas">Quero escalar minhas vendas</option>
                    <option value="Preciso estruturar meu comercial">Preciso estruturar meu processo comercial</option>
                    <option value="Melhorar meu posicionamento">Melhorar meu posicionamento</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full mt-4 py-4 bg-[#68259A] hover:bg-[#72578C] text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Enviando...' : 'Solicitar Raio-X Gratuito'}
                  {status !== 'submitting' && <ArrowRight size={18} />}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const TypingEffect = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  return (
    <span className="text-gradient min-h-[1.2em] inline-block">
      {texts[index].substring(0, subIndex)}
      <span className="animate-pulse border-r-4 border-[#B988BF] ml-1"></span>
    </span>
  );
};

const Navbar = ({ onHome }: { onHome: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);
  const handleHomeClick = () => { onHome(); closeMenu(); };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${isScrolled ? 'bg-[#0A0A0B]/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleHomeClick}>
          <img src="/logo.png" alt="EleveAI - Agência de Marketing Digital e Automação para Clínicas" className="h-16 md:h-20 w-auto object-contain" />
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#beneficios" onClick={onHome} className="hover:text-white transition-colors">Benefícios</a>
          <a href="#solucoes" onClick={onHome} className="hover:text-white transition-colors">Soluções</a>
          <a href="#faq" onClick={onHome} className="hover:text-white transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            className="hidden sm:flex bg-[#68259A] hover:bg-[#72578C] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-[0_0_15px_rgba(104,37,154,0.4)] items-center gap-2"
          >
            Iniciar
            <ArrowRight size={16} />
          </a>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <Plus className="rotate-45" size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0A0B]/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              <a href="#beneficios" onClick={closeMenu} className="text-gray-300 hover:text-white text-lg font-medium">Benefícios</a>
              <a href="#solucoes" onClick={closeMenu} className="text-gray-300 hover:text-white text-lg font-medium">Soluções</a>
              <a href="#faq" onClick={closeMenu} className="text-gray-300 hover:text-white text-lg font-medium">FAQ</a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#68259A] text-white px-6 py-4 rounded-2xl text-center font-bold flex items-center justify-center gap-2"
                onClick={(e) => { trackWhatsAppClick(); closeMenu(); }}
              >
                Iniciar
                <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-44 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#68259A] rounded-full bg-glow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#B988BF] rounded-full bg-glow" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left flex flex-col items-center md:items-start"
        >
          <div className="inline-block px-4 py-1.5 rounded-full glass border-white/10 text-[#EEC6A2] text-xs font-bold uppercase tracking-widest mb-6">
            Consultoria Estratégica de Crescimento
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6">
            Arquitetura Estratégica de <br />
            <TypingEffect texts={["Crescimento", "Escala", "Previsibilidade"]} />
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-xl max-w-lg mb-8 leading-relaxed">
            Estruturamos posicionamento, aquisição e automação para transformar o crescimento do seu negócio em um sistema mais inteligente e previsível.
          </p>
          <div className="flex flex-col items-center md:items-start gap-3">
            <motion.button
              onClick={onOpenModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 md:px-10 md:py-5 bg-[#68259A] text-white rounded-2xl font-bold text-base md:text-lg text-center shadow-[0_10px_30px_rgba(104,37,154,0.3)] hover:shadow-[0_10px_40px_rgba(104,37,154,0.5)] transition-all flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              Ver o Raio-X do Meu Negócio
              <ArrowRight size={22} className="text-white" />
            </motion.button>
            <span className="text-xs text-gray-500 font-medium max-w-[280px] md:max-w-md text-center md:text-left">Uma análise inicial para revelar gargalos, oportunidades e pontos de alavancagem do seu crescimento.</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mt-12 md:mt-0"
        >
            <div className="relative z-10 rounded-[1.5rem] md:rounded-[3rem] overflow-hidden glass border-white/10 shadow-[0_0_50px_rgba(104,37,154,0.3)]">
            <img
              src="/strategic-funnel-pt.png"
              alt="Estratégia de Funil de Vendas: Atração, Conversão e Retenção"
              className="w-full h-auto brightness-50 hover:brightness-100 transition-all duration-700"
              width="600"
              height="400"
              fetchPriority="high"
            />
          </div>
          {/* Overlay UI elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute top-10 -right-4 glass p-5 rounded-2xl border-white/20 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-green-500/20 rounded-lg"><TrendingUp size={24} className="text-green-500" /></div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Crescimento Previsível</div>
                <div className="text-xl font-black text-white">+42% ROI</div>
              </div>
            </div>
          </motion.div>
          {/* Glowing backlights */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#68259A] rounded-full blur-[80px] opacity-40"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#B988BF] rounded-full blur-[80px] opacity-40"></div>
        </motion.div>
      </div>
    </section>
  );
};

const BenefitCard = ({ icon: Icon, title, description, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
      className="glass p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border-white/5 hover:border-[#68259A]/40 transition-all group"
    >
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#68259A]/10 flex items-center justify-center mb-6 group-hover:bg-[#68259A] transition-colors duration-500">
        <Icon className="text-[#B988BF] group-hover:text-white transition-colors duration-500" size={24} />
      </div>
      <h3 className="text-lg md:text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
        {description}
      </p>
    </motion.div>
  );
};

const Benefits = () => {
  return (
    <section id="beneficios" className="py-24 relative px-6 overflow-hidden scroll-mt-32">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-6"
          >
            Domínio Completo do <span className="text-gradient">Digital</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Não fazemos apenas "posts". Construímos ecossistemas de vendas e autoridade.
          </p>
        </div>

        <div className="space-y-24">
          {/* Social Media Feature */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#68259A]/10 border border-[#68259A]/20 text-[#B988BF] text-sm font-bold mb-6">
                <Instagram size={18} />
                <span>Branding & Conteúdo</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
                Posicionamento Premium que <br /> <span className="text-gradient">Gera Desejo</span>
              </h3>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                Transformamos sua marca em uma vitrine de alto padrão. Roteiros estratégicos e design sofisticado que transmitem a excelência do seu negócio antes mesmo da primeira reunião.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={20} className="text-[#68259A]" />
                  <span>Identidade Visual Exclusiva</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={20} className="text-[#68259A]" />
                  <span>Roteiros de Alta Conversão</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={20} className="text-[#68259A]" />
                  <span>Gestão de Comunidade Ativa</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#68259A]/20 to-transparent rounded-[2.5rem] blur-2xl -z-10" />
              <img
                src="/social-media-visual.png"
                alt="Gestão de Marketing Estratégico no Instagram: Conteúdo de Alta Conversão e Branding"
                className="w-full h-auto rounded-[2.5rem] border border-white/10 shadow-2xl hover:scale-[1.02] transition-transform duration-700"
                loading="lazy"
                decoding="async"
                width="600"
                height="400"
              />
            </motion.div>
          </div>

          {/* Traffic Feature */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-[#EEC6A2]/10 to-transparent rounded-[2.5rem] blur-2xl -z-10" />
              <img
                src="/traffic-growth-visual.png"
                alt="Dashboard de Tráfego Pago e Performance para Negócios"
                className="w-full h-auto rounded-[2.5rem] border border-white/10 shadow-2xl hover:scale-[1.02] transition-transform duration-700"
                loading="lazy"
                decoding="async"
                width="600"
                height="400"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEC6A2]/10 border border-[#EEC6A2]/20 text-[#EEC6A2] text-sm font-bold mb-6">
                <TrendingUp size={18} />
                <span>Tráfego & Performance</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
                Leads Qualificados, <br /> <span className="text-[#EEC6A2]">Não Curiosos</span>
              </h3>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                Chega de curiosos perguntando preço. Nossas campanhas filtram e atraem leads prontos para fechar contratos e serviços de alto valor (High Ticket).
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={20} className="text-[#EEC6A2]" />
                  <span>Segmentação de Alto Padrão</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={20} className="text-[#EEC6A2]" />
                  <span>Otimização Diária de ROI</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={20} className="text-[#EEC6A2]" />
                  <span>Dashboards de Transparência</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductPresentation = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 0.5], [10, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section id="solucoes" ref={sectionRef} className="py-24 bg-gradient-to-b from-transparent to-[#0A0A0B]/50 px-6 overflow-hidden scroll-mt-32">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-8"
          style={{ opacity }}
        >
          Estrutura Operacional <span className="text-gradient">de Alto Nível</span>
        </motion.h2>
        <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base md:text-lg mb-12">
          Substituímos o caos por processos. Visualize sua operação rodando com previsibilidade através de um planejamento estratégico personalizado e automações invisíveis.
        </p>
      </div>

      <motion.div
        style={{ rotateX: rotate, scale, opacity }}
        className="relative max-w-5xl mx-auto flex flex-col items-center gap-12"
      >
        <div className="relative w-full aspect-video glass rounded-[2.5rem] border-white/10 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 left-0 right-0 h-10 glass border-b border-white/10 flex items-center px-4 gap-2 z-20">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            <div className="mx-auto bg-white/5 px-12 py-1 rounded text-[10px] text-gray-500 font-mono tracking-widest uppercase">gestao.eleveai.com</div>
          </div>

          <img
            src="/operational-flow-visual.png"
            alt="Estrutura Operacional Automatizada: Fluxo de Atendimento e Triagem Inteligente"
            className="w-full h-full object-cover mt-10 p-2 rounded-[1.5rem] brightness-[0.8] hover:brightness-100 transition-all duration-700"
            loading="lazy"
            decoding="async"
            width="800"
            height="600"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent pointer-events-none"></div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="absolute bottom-10 right-10 glass p-6 rounded-2xl border-white/20 max-w-xs z-30"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#68259A]/20 rounded-lg text-[#B988BF] shrink-0">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold text-[13px] mb-1">Fluxo Automatizado Ativo</h4>
                <p className="text-gray-400 text-[11px]">Redução de 70% no tempo manual de triagem.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <motion.div whileHover={{ scale: 1.05 }} className="glass p-4 rounded-3xl flex flex-col items-center justify-center gap-3 text-center group h-full">
            <Calendar className="text-[#B988BF] group-hover:scale-110 transition-transform" size={24} />
            <span className="text-xs md:text-sm font-semibold leading-tight">Agendamento Automático</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="glass p-4 rounded-3xl flex flex-col items-center justify-center gap-3 text-center group h-full">
            <Clock className="text-[#EEC6A2] group-hover:scale-110 transition-transform" size={24} />
            <span className="text-xs md:text-sm font-semibold leading-tight">Follow-up Inteligente</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="glass p-4 rounded-3xl flex flex-col items-center justify-center gap-3 text-center group h-full">
            <div className="flex gap-1 text-[#68259A]">
              <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
              <Star size={20} className="text-yellow-500 fill-yellow-500 group-hover:rotate-12 transition-transform" />
            </div>
            <span className="text-xs md:text-sm font-semibold leading-tight">Pós-Venda + NPS Automático</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="glass p-4 rounded-3xl flex flex-col items-center justify-center gap-3 text-center group h-full border border-[#68259A]/40 bg-[#68259A]/10">
            <Plus className="text-white group-hover:rotate-90 transition-transform" size={24} />
            <span className="text-xs md:text-sm font-bold text-white leading-tight">E isso é só o básico...</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const SocialProof = () => {
  const statements = [
    {
      title: "Maturidade Digital",
      text: "Negócios que automatizam sua aquisição e atendimento reduzem o ciclo de venda e elevam drasticamente a conversão de leads.",
      author: "Estudo de Mercado EleveAI"
    },
    {
      title: "Eficiência Operacional",
      text: "A reestruturação estratégica não é apenas sobre vender mais, é sobre gastar menos tempo com processos que não geram escala para a empresa.",
      author: "Diagnóstico Estratégico"
    },
    {
      title: "Autoridade de Marca",
      text: "O posicionamento digital correto permite que negócios cobrem o preço justo por suas soluções, saindo definitivamente da guerra de preços.",
      author: "Análise Competitiva"
    }
  ];

  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-5xl font-extrabold text-white mb-6">Por que a EleveAI é <span className="text-gradient">Indispensável?</span></h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl">Não oferecemos apenas marketing. Oferecemos uma nova arquitetura de negócios para a sua empresa.</p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar snap-x">
          {statements.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="min-w-[300px] md:min-w-[400px] glass p-10 rounded-[2.5rem] border-white/5 snap-center flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 text-[#EEC6A2] mb-6">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{s.title}</h4>
                <p className="text-gray-400 italic leading-relaxed">"{s.text}"</p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#68259A] to-[#B988BF]" />
                <span className="text-sm font-bold text-gray-300 uppercase tracking-tighter">{s.author}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer, isOpen, toggle }: any) => {
  return (
    <div className="mb-4">
      <button
        onClick={toggle}
        className={`w-full text-left p-5 md:p-6 rounded-[1.2rem] md:rounded-[1.5rem] flex justify-between items-center transition-all ${isOpen ? 'bg-[#68259A]/10 border border-[#68259A]/30' : 'glass border-white/5 hover:border-white/15'}`}
      >
        <span className="text-base md:text-lg font-bold text-white pr-8">{question}</span>
        {isOpen ? <Minus className="text-[#B988BF] shrink-0" size={20} /> : <Plus className="text-[#B988BF] shrink-0" size={20} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 text-gray-400 leading-relaxed text-sm">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InfiniteTicker = () => {
  const words = [
    "AGÊNCIA DIGITAL ESTRATÉGICA",
    "INTELIGÊNCIA ARTIFICIAL",
    "PERFORMANCE CLÍNICA",
    "AUTOMAÇÃO DE LEADS",
    "DESIGN PREMIUM",
    "RESULTADOS EXPONENCIAIS",
    "ESTRATÉGIA DATA-DRIVEN",
    "ELEVANDO PADRÕES"
  ];

  return (
    <div className="relative py-6 overflow-hidden bg-[#0A0A0B] border-y border-white/5 bg-gradient-to-r from-transparent via-[#68259A]/5 to-transparent">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B] via-transparent to-[#0A0A0B] z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap gap-10 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...words, ...words].map((word, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="text-sm md:text-base font-black text-white/10 tracking-[0.3em] uppercase transition-colors cursor-default hover:text-[#B988BF]/40">
              {word}
            </span>
            <Star className="text-[#68259A]/30 fill-[#68259A]/10" size={14} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Como funciona o processo da EleveAI?",
      answer: "Iniciamos com um Diagnóstico Completo: avaliamos sua autoridade digital (Instagram, Google) e seus processos internos. Desenhamos então um plano híbrido: estratégias de conteúdo para atrair e automação inteligente para converter."
    },
    {
      question: "A EleveAI cuida da minha imagem nas redes sociais?",
      answer: "Sim. Não fazemos apenas 'posts', construímos autoridade. Criamos identidade visual premium e roteiros estratégicos que posicionam seu negócio como referência, atraindo clientes que valorizam qualidade, não apenas menor preço."
    },
    {
      question: "Para quem somos indicados?",
      answer: "Para negócios que desejam profissionalizar e escalar suas vendas. Se o seu marketing não reflete a excelência do que você entrega, ou se sua equipe perde muito tempo com curiosos, nossa metodologia é a solução exata."
    },
    {
      question: "A automação substitui o atendimento humano?",
      answer: "Jamais. Ela potencializa. Enquanto nossa tecnologia cuida da atração e triagem inicial 24/7, sua equipe comercial foca em negociações estratégicas e em um fechamento mais consultivo e assertivo."
    }
  ];

  return (
    <section id="faq" className="py-24 px-6 scroll-mt-32">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-6">Dúvidas Frequentes</h2>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base">Entenda como podemos construir um crescimento previsível para sua empresa.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <FAQItem
              key={i}
              {...f}
              isOpen={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#68259A]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto glass rounded-[3rem] p-12 md:p-20 text-center relative z-10 border-white/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-extrabold text-white mb-8">
            Acelere seu Crescimento <br />
            <span className="text-gradient">hoje mesmo.</span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base md:text-xl max-w-2xl mx-auto mb-12">
            O futuro da sua empresa não depende da sorte, depende de arquitetura estratégica. Fale conosco e entenda nossas soluções de posicionamento e escala para o seu negócio.
          </p>
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(104,37,154,0.4)" }}
            whileTap={{ scale: 0.95 }}
            href={WHATSAPP_URL}
            onClick={trackWhatsAppClick}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 md:gap-4 bg-white text-[#68259A] px-6 py-3 md:px-12 md:py-6 rounded-full font-black text-base md:text-xl shadow-2xl transition-all"
          >
            Conversar Agora
            <WhatsAppIcon size={20} className="text-[#68259A] scale-100 md:scale-110" />
          </motion.a>
          <p className="mt-8 text-sm text-gray-500 font-medium">Atendimento imediato e estratégico disponível 24/7</p>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = ({ onPrivacy, onTerms, onHome }: { onPrivacy: () => void, onTerms: () => void, onHome: () => void }) => {
  return (
    <footer className="relative bg-[#050506] pt-24 pb-12 overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#68259A] to-transparent opacity-50" />

      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#68259A]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-8 cursor-pointer group" onClick={onHome}>
              <img
                src="/logo.png"
                alt="EleveAI - Marketing Estratégico"
                className="h-12 w-auto object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                loading="lazy"
                decoding="async"
                width="150"
                height="50"
              />
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed max-w-sm">
              Consultoria especializada em transformar empresas em líderes de mercado através de marketing estratégico e automações inteligentes.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "https://www.instagram.com/eleveaii?igsh=c3FlZGZwcGp6cHc1", target: "_blank", color: "text-[#B988BF]" },
                { icon: WhatsAppIcon, href: WHATSAPP_URL, target: "_blank", color: "text-[#4ADE80]" }
              ].map((btn, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -3, backgroundColor: "rgba(104, 37, 154, 0.2)" }}
                  href={btn.href}
                  target={btn.target ? btn.target : undefined}
                  rel={btn.target === "_blank" ? "noopener noreferrer" : undefined}
                  className={`w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center ${btn.color} hover:text-white hover:border-[#68259A]/30 transition-all`}
                >
                  <btn.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-white font-bold mb-6 text-lg tracking-tight">Sobre a Empresa</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li className="hover:text-[#B988BF] transition-colors cursor-default tracking-tighter">CNPJ: 50.306.758/0001-20</li>
              <li className="hover:text-[#B988BF] transition-colors cursor-default">Agência Digital Estratégica</li>
              <li className="hover:text-[#B988BF] transition-colors cursor-default text-xs">Foco em Performance Escalonável</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white font-bold mb-6 text-lg tracking-tight text-right md:text-left">Atendimento</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Segunda a Sexta</span> <span className="text-gray-300">09h - 17h</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Sábados</span> <span className="text-gray-300">09h - 12h</span>
              </li>
              <li className="flex items-center gap-2 text-[#EEC6A2] font-semibold pt-2 justify-end md:justify-start">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Agente AI: 24h / 7 dias
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-medium">
          <p>© 2024 EleveAI. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <button onClick={onTerms} className="hover:text-[#B988BF] transition-colors">Termos de Uso</button>
            <button onClick={onPrivacy} className="hover:text-[#B988BF] transition-colors">Política de Privacidade</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppFloat = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      {/* Label Tooltip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="glass px-4 py-2 rounded-xl border-white/10 text-[10px] font-bold text-white shadow-2xl tracking-wider uppercase mb-[-4px] mr-1 pointer-events-none whitespace-nowrap"
      >
        Iniciar
      </motion.div>

      {/* WhatsApp Button */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 20px 40px rgba(37,211,102,0.4)" }}
        whileTap={{ scale: 0.9 }}
        className="relative w-11 h-11 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden group bg-gradient-to-br from-[#25D366] via-[#25D366] to-[#128C7E] border-2 border-white/20"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <WhatsAppIcon size={24} className="relative z-10 text-white drop-shadow-lg md:scale-125" />

        {/* Pulsing glow around the button */}
        <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping opacity-20 pointer-events-none" />
      </motion.a>
    </div>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-[#0A0A0B] flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mb-8"
      >
        <div className="w-32 h-32 rounded-full bg-[#68259A]/20 blur-2xl absolute inset-0 animate-pulse"></div>
        <img src="/logo.png" alt="EleveAI Carregando" className="h-24 w-auto relative z-10" />
      </motion.div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 200 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="h-1 bg-gradient-to-r from-[#68259A] to-[#B988BF] rounded-full"
      />
    </motion.div>
  );
};

const PrivacyPolicy = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-[#B988BF] mb-12 hover:text-white transition-colors group"
        >
          <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={20} />
          Voltar para Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-16 border-white/5"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-8 tracking-tight text-center md:text-left">Política de <span className="text-gradient">Privacidade</span></h1>

          <div className="space-y-6 md:space-y-8 text-gray-400 leading-relaxed text-base md:text-lg">
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">1. Coleta de Dados</h2>
              <p>Coletamos informações fornecidas voluntariamente por você através de nossos formulários de contato, incluindo nome, e-mail e número de telefone ("leads").</p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">2. Uso das Informações</h2>
              <p>Os dados coletados são utilizados exclusivamente para entrar em contato com você, fornecer informações sobre nossos serviços, realizar triagens estratégicas e para fins de marketing direto (como envio de propostas e novidades).</p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">3. Cookies e Tecnologias de Rastreio</h2>
              <p>Utilizamos cookies, Google Analytics e Meta Pixel para analisar o tráfego do site, melhorar sua experiência de navegação e exibir anúncios personalizados em outras plataformas com base no seu interesse em nossa agência.</p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">4. Segurança dos Dados</h2>
              <p>Empregamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acessos não autorizados, perda ou alteração. Seus dados são tratados com total confidencialidade.</p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">5. Seus Direitos</h2>
              <p>Você tem o direito de solicitar a qualquer momento a remoção, correção ou acesso aos seus dados pessoais em nossa base. Para isso, basta entrar em contato através dos nossos canais de comunicação oficiais.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const TermsOfUse = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-[#B988BF] mb-12 hover:text-white transition-colors group"
        >
          <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={20} />
          Voltar para Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-16 border-white/5"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-8 tracking-tight text-center md:text-left">Termos de <span className="text-gradient">Uso</span></h1>

          <div className="space-y-6 md:space-y-8 text-gray-400 leading-relaxed text-base md:text-lg">
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">1. Uso Informativo</h2>
              <p>Este site tem caráter estritamente informativo sobre os serviços de inteligência artificial e marketing estratégico da EleveAI. O acesso e uso deste site não constituem uma relação contratual imediata.</p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">2. Propriedade Intelectual</h2>
              <p>Todos os textos, imagens, logotipos e designs presentes neste site são de propriedade exclusiva da EleveAI ou licenciados para tal. É proibida a reprodução total ou parcial sem autorização prévia por escrito.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Contratação de Serviços</h2>
              <p>A formalização de qualquer serviço apresentado só ocorre mediante a assinatura de um contrato específico e/ou aceitação de proposta comercial formalizada pela nossa equipe.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Limitação de Responsabilidade</h2>
              <p>A EleveAI busca a máxima precisão nas informações, porém não se responsabiliza por decisões tomadas exclusivamente com base no conteúdo deste site. Os resultados de performance mencionados são estimativas baseadas em casos de sucesso e podem variar de acordo com cada projeto.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('eleveai-cookie-consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 3000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('eleveai-cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-8 md:right-auto md:max-w-sm z-[60]"
        >
          <div className="glass p-5 rounded-[1.5rem] border-white/10 shadow-2xl flex flex-col gap-3">
            <p className="text-[13px] text-gray-300 leading-relaxed">
              Utilizamos cookies para personalizar métricas de crescimento e melhorar sua experiência. Ao continuar, você concorda com nossa <span className="text-white font-semibold">Política de Privacidade</span>.
            </p>
            <button
              onClick={handleAccept}
              className="w-full py-2.5 bg-[#68259A] text-white rounded-xl font-bold text-xs hover:bg-[#7a2cb3] transition-all shadow-lg active:scale-95"
            >
              Aceitar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const RaioXSection = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <section className="py-24 relative px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-6"
          >
            Raio-X Estratégico de <span className="text-gradient">Crescimento</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Negócios não têm apenas problema de marketing. Têm problema de estrutura de crescimento.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div whileHover={{ y: -10 }} className="glass p-8 rounded-[2rem] border-white/5 hover:border-[#68259A]/40 transition-all flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#68259A]/10 flex items-center justify-center mb-6">
              <Target className="text-[#B988BF]" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">1. Aquisição</h3>
            <p className="text-sm text-gray-400 leading-relaxed">Negócios que até geram visitas, mas não atraem as oportunidades certas para vendas de alto ticket.</p>
          </motion.div>
          
          <motion.div whileHover={{ y: -10 }} className="glass p-8 rounded-[2rem] border-white/5 hover:border-[#68259A]/40 transition-all flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#EEC6A2]/10 flex items-center justify-center mb-6">
              <TrendingUp className="text-[#EEC6A2]" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">2. Conversão</h3>
            <p className="text-sm text-gray-400 leading-relaxed">Negócios que recebem contatos, mas não transformam o interesse em um avanço comercial previsível.</p>
          </motion.div>
          
          <motion.div whileHover={{ y: -10 }} className="glass p-8 rounded-[2rem] border-white/5 hover:border-[#68259A]/40 transition-all flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#68259A]/10 flex items-center justify-center mb-6">
              <MessageCircle className="text-[#B988BF]" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">3. Relacionamento</h3>
            <p className="text-sm text-gray-400 leading-relaxed">Negócios que não mantêm continuidade com leads interessados e acabam perdendo o timing ideal da venda.</p>
          </motion.div>
          
          <motion.div whileHover={{ y: -10 }} className="glass p-8 rounded-[2rem] border-white/5 hover:border-[#68259A]/40 transition-all flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#EEC6A2]/10 flex items-center justify-center mb-6">
              <BarChart3 className="text-[#EEC6A2]" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">4. Escala</h3>
            <p className="text-sm text-gray-400 leading-relaxed">Negócios que crescem no improviso, dependem demais dos sócios e não possuem uma estrutura replicável.</p>
          </motion.div>
        </div>

        <div className="text-center">
          <motion.button
            onClick={onOpenModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 md:px-10 md:py-5 bg-[#68259A] text-white rounded-2xl font-bold text-base md:text-lg text-center shadow-[0_10px_30px_rgba(104,37,154,0.3)] hover:shadow-[0_10px_40px_rgba(104,37,154,0.5)] transition-all inline-flex items-center justify-center gap-3"
          >
            Ver o Raio-X do Meu Negócio
            <ArrowRight size={22} className="text-white" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms'>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if user has already seen or closed the modal this session
    const hasSeenModal = sessionStorage.getItem('eleveai-modal-closed');
    if (!hasSeenModal && !loading) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    sessionStorage.setItem('eleveai-modal-closed', 'true');
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <FormModal isOpen={isModalOpen} onClose={handleCloseModal} />

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar onHome={() => setCurrentPage('home')} />
          <main>
            {currentPage === 'home' && (
              <>
                <Hero onOpenModal={handleOpenModal} />
                <RaioXSection onOpenModal={handleOpenModal} />
                <Benefits />
                <ProductPresentation />
                <SocialProof />
                <InfiniteTicker />
                <FAQ />
                <FinalCTA />
              </>
            )}
            {currentPage === 'privacy' && <PrivacyPolicy onBack={() => setCurrentPage('home')} />}
            {currentPage === 'terms' && <TermsOfUse onBack={() => setCurrentPage('home')} />}
          </main>
          <Footer
            onPrivacy={() => setCurrentPage('privacy')}
            onTerms={() => setCurrentPage('terms')}
            onHome={() => setCurrentPage('home')}
          />
          <WhatsAppFloat />
          <CookieConsent />
        </motion.div>
      )}
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
