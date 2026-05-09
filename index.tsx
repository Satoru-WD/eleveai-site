import './index.css';
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
  X,
  Shield,
  UserCheck,
  BarChart2,
  ShieldAlert,
  Lock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Quote,
  ShieldCheck
} from 'lucide-react';

// Configuration
const WHATSAPP_URL = "https://wa.me/5519994671493?text=Ol%C3%A1%21+Gostaria+de+conhecer+o+atendimento+automatizado+da+EleveAI+e+elevar+meu+neg%C3%B3cio.";

const trackWhatsAppClick = () => {
  if (typeof window !== 'undefined' && !(window as any).whatsAppLeadFired && (window as any).fbq) {
    (window as any).fbq('track', 'Lead');
    (window as any).whatsAppLeadFired = true;
  }
};

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.554 4.189 1.605 6.006L0 24l6.117-1.605a11.803 11.803 0 005.925 1.586h.005c6.635 0 12.032-5.396 12.035-12.03a11.8 11.8 0 00-3.669-8.498" />
  </svg>
);

// --- Components ---

const DiagnosticModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = (questionIndex: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
    setStep(prev => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    Object.entries(answers).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    fetch('https://formsubmit.co/ajax/satorukubota01@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData))
    })
      .then(response => response.json())
      .then(() => {
        setStatus('success');
        sessionStorage.setItem('eleveai-modal-submitted', 'true');
      })
      .catch(error => {
        console.error(error);
        setStatus('idle');
        alert("Houve um erro ao enviar. Tente novamente ou chame no WhatsApp.");
      });
  };

  const questions = [
    {
      id: "Q1_Rastreamento",
      title: "Sua clínica já possui rastreamento configurado?",
      options: ["Sim, já possuo", "Não, ainda não"],
      tip: "Pixel, Analytics, Tag Manager e remarketing ajudam sua clínica a entender quem entrou no site e quem estava pronto para agendar."
    },
    {
      id: "Q2_Precisao",
      title: "Hoje sua clínica sabe exatamente quantos pacientes chegam pelo site ou WhatsApp?",
      options: ["Sim", "Não", "Tenho uma noção, mas não com precisão"],
      tip: "Saber a origem exata do paciente permite investir apenas nos canais que realmente trazem retorno financeiro para a clínica."
    },
    {
      id: "Q3_Automacao",
      title: "Sua clínica já envia lembretes e confirmações automáticas?",
      options: ["Sim", "Não", "Parcialmente"],
      tip: "Automações reduzem faltas em até 40% e liberam sua secretária para focar em atendimentos mais complexos."
    }
  ];

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
          className="relative w-full max-w-lg bg-black/70 backdrop-blur-xl border border-white/10 p-6 md:p-10 shadow-2xl z-10 rounded-[2.5rem]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button
            onClick={onClose}
            aria-label="Fechar diagnóstico"
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
          >
            <X size={20} aria-hidden="true" />
          </button>

          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Análise Solicitada</h3>
              <p className="text-gray-400">Nossa equipe estratégica analisará os dados da sua clínica e entrará em contato em breve.</p>
              <button
                onClick={onClose}
                className="mt-8 w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all border border-zinc-800"
              >
                Fechar
              </button>
            </div>
          ) : step <= 3 ? (
            <div key={step}>
              <div className="flex justify-between items-end mb-2">
                <h3 className="text-lg md:text-xl font-bold text-white max-w-xs leading-tight">Avalie a maturidade digital da sua clínica.</h3>
              </div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Passo {step} de {totalSteps}</span>
                <span className="text-[10px] text-[#B988BF] font-bold uppercase tracking-wider">Diagnóstico Estratégico</span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mb-8">
                <div
                  className="bg-gradient-to-r from-[#B988BF] to-[#96649c] h-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mb-8">
                <h4 id="modal-title" className="text-xl md:text-2xl font-semibold text-white leading-snug">
                  {questions[step - 1].title}
                </h4>
              </div>

              <div className="space-y-4">
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed bg-white/5 p-4 border border-white/5 rounded-xl">
                  <strong className="text-gray-300">Dica Estratégica:</strong> {questions[step - 1].tip}
                </p>
                {questions[step - 1].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNext(questions[step - 1].id, option)}
                    className="w-full text-center px-8 py-5 rounded-2xl border border-white/10 bg-white/5 hover:border-[#B988BF] hover:bg-[#B988BF]/10 text-gray-300 hover:text-white transition-all font-bold uppercase tracking-[0.15em] text-[11px] backdrop-blur-sm"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="w-16 h-16 bg-[#B988BF]/10 text-[#B988BF] rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                <Sparkles size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Sua clínica está preparada para crescer?</h3>
              <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
                Receba uma análise estratégica sobre site, rastreamento, anúncios e automação para escalar seus agendamentos de forma previsível.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <input type="hidden" name="_subject" value="Novo Diagnóstico de Clínica - EleveAI" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <div>
                  <label htmlFor="diag-nome" className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Seu Nome</label>
                  <input id="diag-nome" required type="text" name="Nome" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B988BF] transition-all" placeholder="Nome completo" />
                </div>

                <div>
                  <label htmlFor="diag-clinica" className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Nome da Clínica</label>
                  <input id="diag-clinica" required type="text" name="Nome_Clinica" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B988BF] transition-all" placeholder="Como se chama sua clínica?" />
                </div>

                <div>
                  <label htmlFor="diag-whatsapp" className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">WhatsApp</label>
                  <input id="diag-whatsapp" required type="tel" name="WhatsApp" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B988BF] transition-all" placeholder="(00) 00000-0000" />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group relative inline-flex w-full mt-6 h-[64px] px-12 items-center justify-center overflow-hidden rounded-2xl outline-none cursor-pointer transition-all active:scale-95 bg-[#B988BF] text-white font-bold tracking-[0.2em] uppercase text-[11px] hover:bg-[#a372ab] shadow-[0_10px_25px_rgba(185,136,191,0.25)]"
                >
                  <span className="relative z-20 flex items-center justify-center gap-5">
                    {status === 'submitting' ? 'Enviando...' : 'Receber análise estratégica'}
                    {status !== 'submitting' && <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />}
                  </span>
                </button>
                <p className="text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-4 opacity-60">Análise técnica • Sem compromisso</p>
              </form>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const TypingEffect = ({ texts, className = "", cursorClassName = "" }: { texts: string[], className?: string, cursorClassName?: string }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2500);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 30 : 60);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  return (
    <span className={`${className} inline-block`}>
      {texts[index].substring(0, subIndex)}
      <span className={`animate-pulse border-r-2 ml-1 ${cursorClassName}`}></span>
    </span>
  );
};

const Navbar = ({ onHome }: { onHome: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);
  const handleHomeClick = () => {
    onHome();
    closeMenu();
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  };

  const scrollToSection = (id: string) => {
    onHome();
    closeMenu();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const navLinks = [
    { label: 'Home', action: handleHomeClick },
    { label: 'Sistema', id: 'sistema' },
    { label: 'Soluções', id: 'diagnostico' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <>
      <div className="fixed flex w-full z-50 pt-0 md:pt-4 pr-4 pl-4 top-0 left-0 justify-center" style={{ animation: 'fadeSlideIn 1s ease-out 0.2s both' }}>
        <nav
          className="flex md:gap-12 md:w-auto bg-[#1A1A1E]/95 md:bg-[#1A1A1E]/80 w-full max-w-6xl rounded-2xl md:rounded-full py-1 px-5 md:px-8 shadow-2xl md:shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-md border border-white/5 md:border-white/10 items-center justify-between"
        >
          {/* Logo */}
          <a href="#" aria-label="Voltar para o topo" className="flex items-center cursor-pointer" onClick={(e) => { e.preventDefault(); handleHomeClick(); }}>
            <img
              src="/logo.png"
              alt="EleveAI - Máquinas de Crescimento"
              width="200"
              height="80"
              className="h-[5.5rem] md:h-[4.5rem] w-auto object-contain transition-all hover:brightness-110 drop-shadow-md brightness-[500%] md:brightness-100"
            />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 pr-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action ?? (() => scrollToSection(link.id!))}
                className="group hover:text-[#B988BF] transition-all text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-300 font-manrope py-1 relative drop-shadow-sm"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#B988BF] transition-all group-hover:w-full"></span>
              </button>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 hover:bg-black text-white px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-all shadow-[0_4px_14px_0_rgba(0,0,0,0.12)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:-translate-y-[1px]"
            >
              Agendar Avaliação
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-zinc-200 hover:text-white transition-colors p-4 -mr-2"
            >
              {isMobileMenuOpen ? <X size={32} aria-hidden="true" /> : <Menu size={32} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </div>

      {/* ====== FULLSCREEN OVERLAY MENU (Mobile Only) ====== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0A0A0B]/95 backdrop-blur-2xl flex flex-col items-center justify-center md:hidden"
          >
            {/* Close button */}
            <button
              aria-label="Fechar menu"
              onClick={closeMenu}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2"
            >
              <Plus className="rotate-45" size={32} aria-hidden="true" />
            </button>

            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={link.action ?? (() => scrollToSection(link.id!))}
                  className="text-2xl font-extrabold text-white/60 hover:text-white transition-colors tracking-tight"
                >
                  {link.label}
                </motion.button>
              ))}

              {/* WhatsApp CTA */}
              <motion.a
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: navLinks.length * 0.07 }}
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="mt-4 flex items-center gap-5 bg-[#B988BF] hover:bg-[#7a2cb3] text-white px-10 py-5 rounded-full font-bold text-xl transition-all shadow-[0_15px_35px_rgba(185, 136, 191,0.4)] hover:shadow-[0_20px_45px_rgba(185, 136, 191,0.5)]"
              >
                Falar no WhatsApp
                <ArrowRight size={22} />
              </motion.a>
            </nav>

            {/* Decorative glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-[#B988BF]/20 blur-[80px] rounded-full pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="gradient-blur" style={{ height: '120px' }}>
        <div></div><div></div><div></div><div></div><div></div><div></div>
      </div>

      <section id="hero" className="relative overflow-hidden pt-4 md:pt-[8.5rem] lg:pt-28 pb-12 lg:pb-16 min-h-[auto] lg:min-h-0">
        {/* Background Subtle Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#6B3FA0]/10 blur-[120px] rounded-full pointer-events-none z-0" />
        
        {/* Main container */}
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center text-center lg:text-left gap-8 lg:gap-20">

             {/* Immersive Background Image (Mobile Only) */}
             <div className="absolute inset-0 z-0 lg:hidden overflow-hidden">
               <img 
                 src="/heroimg.png" 
                 alt="" 
                 className="w-full h-full object-cover brightness-[0.4] contrast-[1.1] scale-110"
               />
               {/* Darker overlays for contrast */}
               <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/80 via-[#0A0A0B]/20 to-[#0A0A0B]" />
               <div className="absolute inset-0 bg-[#0A0A0B]/30" />
             </div>

             {/* ========== CONTENT OVERLAY ========== */}
             <div className="w-full lg:w-[48%] flex flex-col items-center lg:items-start pt-0 lg:pt-0 relative z-20 -mt-2 sm:-mt-4">
               
               {/* Headline - Maximized Top Position */}
               <motion.h1 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.7, delay: 0.1 }}
                 className="text-[1.85rem] sm:text-[2.3rem] md:text-[3.3rem] lg:text-[3.6rem] font-bold leading-[1.15] tracking-tight text-white font-manrope text-center lg:text-left mb-6 lg:mb-6 mt-0 lg:mt-0"
               >
                 Sem um processo claro, sua clínica gera interesse — mas <span className="text-[#B988BF]">não transforma em agendamentos.</span>
               </motion.h1>

               {/* Desktop only image - removed from mobile flow here to avoid duplication */}
               <div className="hidden lg:block w-full mb-8">
                 {/* ... content stays the same for desktop ... */}
               </div>

              {/* 2. Authority Strategy Line */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-[14px] sm:text-[15px] md:text-lg text-zinc-400 max-w-[480px] lg:max-w-xl mb-8 lg:mb-8 leading-relaxed font-light relative z-10"
              >
                Estratégia construída com base em mais de 10 anos em vendas e conversão.
              </motion.p>

              {/* Trust Blocks - Single Focused Block (Reduced) */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="lg:hidden w-full mb-4"
              >
                <div className="bg-[#140c24]/30 border border-[#2a1b42]/50 rounded-2xl p-3 flex items-center justify-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#6B3FA0]/10 flex items-center justify-center border border-[#6B3FA0]/20">
                    <Target size={14} className="text-[#A678CB]" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-bold text-sm leading-none">Foco total em performance</p>
                  </div>
                </div>
              </motion.div>

              {/* 5. Methodology Card - Identical to Print */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-[#140c24]/40 border border-[#2a1b42]/60 backdrop-blur-sm rounded-2xl p-5 flex items-center gap-4 w-full max-w-md lg:mt-6 mb-8 lg:mb-8"
              >
                <div className="w-10 h-10 rounded-xl bg-[#6B3FA0]/10 flex items-center justify-center shrink-0 border border-[#6B3FA0]/20">
                  <Star size={20} className="text-[#A678CB]" />
                </div>
                <div className="text-left">
                  <p className="text-[13px] md:text-[14px] text-zinc-300 leading-relaxed">
                    <strong className="text-white">Metodologia exclusiva.</strong> Estratégia e tecnologia para atrair, converter e fidelizar pacientes.
                  </p>
                </div>
              </motion.div>

              {/* Main CTA - Same as Print */}
              <motion.button 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                onClick={onOpenModal}
                className="group w-full sm:w-auto bg-gradient-to-r from-[#5B2E8A] to-[#3A1660] hover:from-[#6B3FA0] hover:to-[#4A2070] text-white rounded-2xl px-6 lg:px-12 py-5 lg:py-6 flex items-center justify-center gap-3 font-bold text-[13px] md:text-[14px] tracking-[0.05em] uppercase transition-all shadow-[0_8px_30px_rgba(91,46,138,0.3)] mb-6 font-manrope relative z-10"
              >
                Quero um diagnóstico da minha clínica
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </motion.button>

              {/* Trust Footer Row */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4 text-zinc-500 text-[10px] font-medium"
              >
                <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-zinc-600" /> Sem compromisso</span>
                <span className="flex items-center gap-1.5"><BarChart3 size={13} className="text-zinc-600" /> Análise personalizada</span>
                <span className="flex items-center gap-1.5"><Clock size={13} className="text-zinc-600" /> Resposta em 24h</span>
              </motion.div>


            </div>

            {/* ========== RIGHT COLUMN ========== */}
            <div className="hidden lg:flex w-full lg:w-[55%] relative -mt-16 lg:-mt-12 flex-col items-center lg:items-start lg:translate-x-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative w-full max-w-[600px] lg:max-w-[780px] mb-8 lg:mb-0 scale-[1.2] lg:scale-125 origin-top lg:origin-right"
              >
                <div className="relative" style={{
                  maskImage: 'linear-gradient(to right, transparent 5%, black 45%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 5%, black 45%)'
                }}>
                  {/* Subtle purple tint for harmony */}
                  <div className="absolute inset-0 bg-[#68259A]/5 mix-blend-soft-light z-20 pointer-events-none" />

                  <img
                    src="/hero.img.mobile.png"
                    alt="Marketing Estratégico"
                    className="relative z-10 w-full h-auto object-contain brightness-[0.95] contrast-[1.1]"
                  />

                  {/* Minimal bottom fade for blending */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A0A0B] to-transparent z-20 pointer-events-none" />
                </div>
              </motion.div>



              {/* 7. Prova Social Mobile (abaixo da imagem e depoimentos) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex lg:hidden items-center justify-center gap-3 mt-2 w-full"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1a1028] flex items-center justify-center">
                  <BarChart3 size={16} className="text-[#9b6bbd]" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-base leading-none font-manrope">+R$ 500 mil</p>
                  <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-wider mt-0.5">gerados para clínicas</p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Depoimentos Mobile (Carrossel) - Positioned below main container for mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:hidden flex flex-col items-center mt-12 mb-8 overflow-hidden"
        >
          <p className="text-[11px] text-[#A678CB] font-bold uppercase tracking-[0.2em] mb-6 px-5 text-center">
            O QUE CLÍNICAS PERCEBEM APÓS ESTRUTURAR O MARKETING
          </p>

          <div className="w-full relative py-2 overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex gap-4 w-fit"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...Array(2)].map((_, setIdx) => (
                <div key={setIdx} className="flex gap-4 px-2">
                  {[
                    { quote: "A gente investia em anúncios, mas não sabia o que estava funcionando. Depois da estrutura, ficou claro de onde vinham os pacientes.", author: "Dra. Mariana", info: "clínica estética – SP" },
                    { quote: "Percebemos que o problema não era só tráfego, e sim o atendimento. Ajustando isso, começamos a converter muito mais.", author: "Dr. Rafael", info: "odontologia – interior de SP" },
                    { quote: "Começamos a ter mais consistência nos agendamentos, não só picos. Hoje entendemos melhor o processo todo.", author: "Dr. Felipe", info: "clínica médica – capital" }
                  ].map((testi, i) => (
                    <div key={i} className="w-[280px] bg-[#121215]/60 backdrop-blur-sm border border-[#2a2433] rounded-2xl p-6 flex flex-col shrink-0">
                      <Quote size={16} className="text-[#6B3FA0] mb-4" />
                      <p className="text-[13px] text-zinc-300 mb-5 leading-relaxed flex-grow italic">
                        "{testi.quote}"
                      </p>
                      <p className="text-[12px] text-white font-bold">
                        — {testi.author}
                        <span className="block text-[10px] text-zinc-500 font-normal mt-1">{testi.info}</span>
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Scroll fix CSS specifically for this component if needed */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </>
  );
};





const GoogleAdsPremium = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const searches = [
    {
      query: "clínica de estética em campinas",
      results: [
        {
          url: "esteticacampinas.com.br",
          title: "Clínica de Estética em Campinas | Avaliação Gratuita",
          desc: "Especialistas em harmonização facial, botox e rejuvenescimento.",
          chips: ["Avaliação Gratuita", "Tecnologia Avançada", "Protocolos Exclusivos"],
        },
        {
          url: "harmonizacaofacialcps.com.br",
          title: "Botox e Harmonização Facial | Agende Sua Consulta",
          desc: "Resultados naturais, atendimento personalizado e tecnologia avançada.",
          chips: ["Botox", "Preenchimento", "Especialistas"],
        },
      ],
    },
  ];

  const [searchIndex, setSearchIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'showing' | 'clearing'>('typing');

  const currentSearch = searches[searchIndex];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const fullQuery = currentSearch.query;

    if (phase === 'typing') {
      if (displayText.length < fullQuery.length) {
        timeout = setTimeout(() => {
          setDisplayText(fullQuery.slice(0, displayText.length + 1));
        }, 75);
      } else {
        timeout = setTimeout(() => setPhase('showing'), 700);
      }
    } else if (phase === 'showing') {
      timeout = setTimeout(() => setPhase('clearing'), 4500);
    } else if (phase === 'clearing') {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
      } else {
        setSearchIndex((prev) => (prev + 1) % searches.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, phase, searchIndex]);

  return (
    <section className="py-32 relative px-6 overflow-hidden bg-ice border-y border-black/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* ── Left Column ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start"
        >
          {/* Badges */}
          <div className="flex gap-2 mb-8">
            <span className="px-4 py-1.5 rounded-none bg-primary/5 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
              Tráfego Pago
            </span>
            <span className="px-4 py-1.5 rounded-none bg-secondary/5 border border-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-widest">
              Google Ads
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-graphite mb-6 leading-[1.1] tracking-tight font-manrope">
            Anunciar sem rastreamento é <span className="text-primary">investir no escuro.</span>
          </h2>

          {/* Body copy */}
          <div className="space-y-6 text-gray-500 text-lg md:text-xl leading-relaxed max-w-xl">
            <p className="text-graphite font-medium">
              Sua clínica gera interesse todos os dias. <br />
              Mas você não sabe quem realmente quer agendar.
            </p>
            <p>
              Sem o rastreamento correto, você atrai pessoas mas não entende o comportamento delas. Quem clicou no botão? Quem viu o preço? Quem está pronto para a consulta?
            </p>
          </div>

          {/* Highlight */}
          <div className="mt-10 border-l-4 border-primary pl-6 py-2">
            <p className="text-[14px] uppercase font-bold text-primary tracking-widest">Você está investindo no escuro.</p>
          </div>

          {/* CTA */}
          <button
            onClick={onOpenModal}
            className="group relative flex h-[60px] w-full sm:min-w-[320px] sm:w-auto mt-10 px-12 items-center justify-center bg-primary text-white rounded-2xl text-[11px] font-bold tracking-[0.2em] uppercase transition-all hover:scale-105 shadow-[0_15px_35px_rgba(185,136,191,0.3)] hover:shadow-[0_20px_45px_rgba(185,136,191,0.45)] border border-[#B988BF]/50"
            type="button"
          >
            Quero anunciar com rastreamento
            <ArrowRight size={20} className="ml-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* ── Right Column: Search Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex justify-center lg:justify-end"
        >
          {/* Card */}
          <div className="w-full max-w-[480px] bg-white rounded-none shadow-[0_24px_80px_rgba(0,0,0,0.22)] overflow-hidden">

            {/* Card Header */}
            <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-gray-100">
              {/* Google-like logo */}
              <div className="flex items-center gap-[3px]">
                <span className="font-extrabold text-[22px] leading-none" style={{ color: '#4285F4' }}>G</span>
                <span className="font-extrabold text-[22px] leading-none" style={{ color: '#EA4335' }}>o</span>
                <span className="font-extrabold text-[22px] leading-none" style={{ color: '#FBBC05' }}>o</span>
                <span className="font-extrabold text-[22px] leading-none" style={{ color: '#4285F4' }}>g</span>
                <span className="font-extrabold text-[22px] leading-none" style={{ color: '#34A853' }}>l</span>
                <span className="font-extrabold text-[22px] leading-none" style={{ color: '#EA4335' }}>e</span>
              </div>
              {/* Purple button */}
              <div className="w-8 h-8 rounded-full bg-[#B988BF] flex items-center justify-center shadow-[0_4px_12px_rgba(185, 136, 191,0.35)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="white" />
                </svg>
              </div>
            </div>

            {/* Search Bar */}
            <div className="px-6 py-4">
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-5 py-3 shadow-sm">
                <span className="flex-1 text-sm text-gray-700 font-normal min-h-[20px] flex items-center gap-[2px]">
                  {displayText}
                  <span
                    className="inline-block w-[2px] h-[15px] bg-[#4285F4] ml-[1px]"
                    style={{ animation: 'blink 1s step-end infinite' }}
                  />
                </span>
                <svg className="text-gray-400 flex-shrink-0" width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3 5.91 3 3 5.91 3 9.5 3 13.09 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.27V15.5l5 4.99L20.49 19l-5-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor" />
                </svg>
              </div>
            </div>

            {/* Results Area */}
            <div className="px-6 pb-6 min-h-[300px]">
              <AnimatePresence mode="wait">
                {phase === 'showing' ? (
                  <motion.div
                    key={`results-${searchIndex}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="space-y-5"
                  >
                    {currentSearch.results.map((result, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.12, duration: 0.4 }}
                        className={`${i < currentSearch.results.length - 1 ? 'pb-5 border-b border-gray-100' : ''}`}
                      >
                        {/* Ad label + URL */}
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-semibold text-gray-500 border border-gray-300 rounded px-1.5 py-0.5 leading-none">Anúncio</span>
                          <span className="text-[11px] text-gray-400 truncate">{result.url}</span>
                        </div>
                        {/* Title */}
                        <p className="text-[#1a0dab] text-[15px] font-medium leading-snug mb-1.5 hover:underline cursor-pointer">
                          {result.title}
                        </p>
                        {/* Description */}
                        <p className="text-[#4d5156] text-[13px] leading-relaxed mb-3">
                          {result.desc}
                        </p>
                        {/* Chips */}
                        <div className="flex flex-wrap gap-1.5">
                          {result.chips.map((chip, ci) => (
                            <span
                              key={ci}
                              className="px-3 py-1 bg-gray-100 text-gray-600 text-[11px] font-medium rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col justify-center items-center gap-4 py-16"
                  >
                    <div className="w-10 h-10 rounded-full border-[3px] border-gray-100 border-t-[#B988BF] animate-spin" />
                    <div className="text-center">
                      <p className="text-xs text-gray-400 mb-1">Buscando por</p>
                      <p className="text-sm font-semibold text-[#B988BF] max-w-[220px] leading-snug">
                        "{displayText || currentSearch.query}"
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>

      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};


const PacientesQualificados = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const steps = [
    { tag: "1", icon: Target, title: "Atrai o público certo", desc: "A comunicação filtra quem realmente tem interesse." },
    { tag: "2", icon: MessageCircle, title: "Organiza o primeiro contato", desc: "A conversa começa com direção." },
    { tag: "3", icon: UserCheck, title: "Identifica quem está pronto", desc: "Você entende quem tem perfil para avançar." },
    { tag: "4", icon: Calendar, title: "Conduz até o agendamento", desc: "Só os pacientes certos chegam à consulta." }
  ];

  return (
    <section id="sistema" className="py-24 md:py-32 relative px-6 overflow-hidden scroll-mt-24 bg-ice">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 md:mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2.2rem] sm:text-4xl md:text-5xl lg:text-[4rem] font-extrabold text-graphite mb-8 font-manrope tracking-tight leading-[1.05] max-w-5xl mx-auto"
          >
            Você não precisa de mais leads. <br className="hidden md:block" />
            <span className="text-primary font-manrope">Precisa parar de falar com quem não vai fechar.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-sans leading-relaxed"
          >
            Sua clínica já gera interesse. O problema é o desperdício de tempo com contatos desqualificados.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
          <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-[2px] bg-primary/10 -z-10" />

          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col items-center text-center relative group"
            >
              <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-[15px] shadow-[0_4px_15px_rgba(104,37,154,0.3)]">{item.tag}</div>
              <div className="w-20 h-20 rounded-full bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <item.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-[17px] md:text-lg font-bold text-graphite mb-2 font-manrope tracking-tight leading-tight">
                {item.title}
              </h3>
              <p className="text-[13px] md:text-[14px] text-gray-500 font-sans leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 md:mt-24 flex flex-col items-center"
        >
          <div className="inline-block bg-white shadow-xl border border-black/5 rounded-2xl p-6 md:p-8 max-w-3xl relative overflow-hidden text-left sm:text-center mb-10">
            <div className="absolute top-0 left-0 w-1 sm:w-full sm:h-1 h-full bg-primary"></div>
            <p className="text-graphite font-bold text-[16px] md:text-xl font-manrope tracking-tight leading-snug">
              "Você não precisa de mais leads. Precisa de mais clareza sobre quem realmente vale a pena atender."
            </p>
          </div>

          <button
            onClick={onOpenModal}
            className="group relative flex h-[60px] w-full sm:w-auto items-center justify-center bg-primary text-white text-[11px] md:text-[12px] font-bold tracking-[0.15em] rounded-xl uppercase transition-all shadow-[0_10px_30px_rgba(104,37,154,0.3)] hover:shadow-[0_15px_40px_rgba(104,37,154,0.4)] px-10 font-manrope active:scale-95"
            type="button"
          >
            Analisar meu processo →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const AutomacaoClinica = () => {
  return (
    <section id="beneficios" className="py-32 relative px-6 overflow-hidden scroll-mt-32 bg-ice border-t border-black/5">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-graphite mb-6 font-manrope tracking-tight max-w-4xl mx-auto leading-[1.1]"
          >
            Sua clínica perde pacientes no <span className="text-primary font-manrope">tempo de resposta.</span>
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl font-sans leading-relaxed">
            Cada minuto de demora no WhatsApp diminui drasticamente a chance de agendamento. Automatizamos para que você nunca mais perca um lead por lentidão.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: CheckCircle2, title: "Resposta Instantânea", desc: "Triagem 24/7 de todos os contatos. O paciente é atendido no segundo que demonstra interesse." },
            { icon: MessageCircle, title: "Follow-up Ativo", desc: "O sistema retoma o contato com quem não agendou, garantindo que nenhum lead seja esquecido." },
            { icon: Clock, title: "Lembretes Inteligentes", desc: "Redução drástica de faltas com notificações automáticas antes da consulta." },
            { icon: Calendar, title: "Reagendamento Fluido", desc: "Processo simplificado para horários desmarcados, mantendo sua agenda sempre otimizada." },
            { icon: Smartphone, title: "Triagem Estratégica", desc: "O bot identifica quem tem perfil para agendamento imediato e encaminha para a recepção." },
            { icon: TrendingUp, title: "Máxima Conversão", desc: "Transformamos o fluxo de mensagens em uma máquina previsível de novos pacientes." },
          ].map((item, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} className="bg-white p-8 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-black/[0.04] hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                <item.icon size={26} />
              </div>
              <h4 className="text-xl font-bold text-graphite mb-3 font-manrope leading-snug">{item.title}</h4>
              <p className="text-gray-500 font-sans text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};





const FAQItem = ({ question, answer, isOpen, toggle }: any) => {
  return (
    <div className="bg-white/5 border border-white/10 overflow-hidden relative group transition-all duration-300">
      <button
        className="w-full p-6 md:p-8 text-left flex justify-between items-center transition-colors group-hover:bg-white/[0.02]"
        onClick={toggle}
      >
        <span className="text-base md:text-xl font-bold text-white pr-8 font-manrope">{question}</span>
        {isOpen ? <Minus className="text-primary shrink-0" size={20} /> : <Plus className="text-primary shrink-0" size={20} />}
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
    <div className="relative py-10 overflow-hidden bg-graphite border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-graphite via-transparent to-graphite z-10 pointer-events-none" />

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
            <span className="text-sm md:text-base font-black text-white/10 tracking-[0.3em] uppercase transition-colors cursor-default hover:text-[#B988BF]/40 font-manrope">
              {word}
            </span>
            <Star className="text-[#B988BF]/30 fill-[#B988BF]/10" size={14} />
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
      question: "Quanto tempo leva para estruturar esse sistema?",
      answer: "A implantação do sistema primário costuma levar entre 7 e 15 dias, podendo ser mais rápido ou prolongar até 20 dias, dependendo do estágio atual do seu negócio. Nesse período, já criamos as fundações para que sua empresa comece a ser encontrada."
    },
    {
      question: "Preciso já investir em anúncios?",
      answer: "Recomendamos um orçamento inicial para acelerar a aquisição de clientes. Porém, durante o diagnóstico, orientaremos o montante ideal, sempre focando no retorno sobre o investimento (ROI) e na previsibilidade."
    },
    {
      question: "Isso serve para empresas pequenas?",
      answer: "Com certeza. Nossos sistemas são desenhados para dar escala a negócios de todos os tamanhos, permitindo que as pequenas empresas se posicionem com o mesmo profissionalismo de líderes de mercado."
    },
    {
      question: "Preciso ter equipe interna?",
      answer: "Não. Nós estruturamos a automação e o funil de aquisição de forma que você time consiga lidar apenas com os fechamentos de alto valor."
    },
    {
      question: "Como funciona a implantação?",
      answer: "Mapeamos seu cenário no Raio-X inicial, desenhamos a arquitetura ideal e em seguida nossa equipe técnica assume a construção da estrutura de atração, conversão e automação."
    },
    {
      question: "O contato é sem compromisso?",
      answer: "Sim. O diagnóstico inicial é isento de custos e focado em apresentar os gargalos do seu crescimento estrutural."
    }
  ];

  return (
    <section id="faq" className="py-32 px-6 scroll-mt-32 bg-graphite">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-8 tracking-tight font-manrope leading-tight">Dúvidas Frequentes</h2>
          <p className="text-gray-400 text-lg leading-relaxed font-sans max-w-2xl mx-auto">Tudo o que você precisa saber sobre a estruturação do seu crescimento digital.</p>
        </div>
        <div className="space-y-6">
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

const FinalCTA = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <section className="py-24 md:py-40 px-6 relative overflow-hidden bg-graphite">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-extrabold text-white mb-10 tracking-tight font-manrope leading-[1.05]">
            Você já está atraindo pacientes. <br className="hidden md:block" />
            <span className="text-[#B988BF]">Só não está convertendo.</span>
          </h2>

          <p className="text-zinc-400 text-lg md:text-2xl leading-relaxed font-manrope max-w-2xl mb-14 font-light">
            Sua clínica gera interesse. O problema está no que acontece depois.
          </p>

          <div className="flex flex-col items-start gap-8">
            <button
              onClick={onOpenModal}
              className="group relative flex h-[68px] w-full sm:w-auto items-center justify-center bg-gradient-to-r from-[#5B2E8A] to-[#3A1660] hover:from-[#6B3FA0] hover:to-[#4A2070] text-white text-[12px] md:text-[13px] font-bold tracking-[0.1em] rounded-xl uppercase transition-all shadow-[0_10px_40px_rgba(91,46,138,0.3)] px-12 font-manrope"
              type="button"
            >
              Quero entender onde estou perdendo pacientes →
            </button>
            <p className="text-zinc-500 text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] opacity-70">
              Análise estratégica personalizada. Sem compromisso.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = ({ onPrivacy, onTerms, onHome }: { onPrivacy: () => void, onTerms: () => void, onHome: () => void }) => {
  return (
    <footer className="relative bg-graphite pt-32 pb-16 overflow-hidden border-t border-white/5">
      {/* Decorative Top Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-primary shadow-[0_0_40px_10px_rgba(104,37,154,0.4)]" />

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-80 bg-[#B988BF]/30 sm:bg-[#B988BF]/20 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          <div className="md:col-span-5">
            <div className="flex justify-center md:justify-start items-center gap-2 mb-8 cursor-pointer group pt-2" onClick={onHome}>
              <img
                src="/logo.png"
                alt="EleveAI - Marketing Estratégico"
                className="h-28 sm:h-36 w-auto object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-150 origin-center md:origin-left"
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
                  whileHover={{ y: -3, backgroundColor: "rgba(185, 136, 191, 0.2)" }}
                  href={btn.href}
                  target={btn.target ? btn.target : undefined}
                  rel={btn.target === "_blank" ? "noopener noreferrer" : undefined}
                  className={`w-12 h-12 rounded-full bg-white/5 border border-zinc-800 flex items-center justify-center ${btn.color} hover:text-white hover:border-[#B988BF]/50 transition-all`}
                >
                  <btn.icon size={20} className="group-hover:scale-110 transition-transform" />
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
            <h4 className="text-white font-bold mb-6 text-lg tracking-tight text-left">Atendimento</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex justify-between border-b border-zinc-800 pb-2">
                <span>Segunda a Sexta</span> <span className="text-gray-300">09h - 17h</span>
              </li>
              <li className="flex justify-between border-b border-zinc-800 pb-2">
                <span>Sábados</span> <span className="text-gray-300">09h - 12h</span>
              </li>
              <li className="flex items-center gap-2 text-[#EEC6A2] font-semibold pt-2 justify-start">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Agente AI: 24h / 7 dias
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium">
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


      {/* WhatsApp Button */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Atendimento via WhatsApp"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 25px 50px rgba(37,211,102,0.5)" }}
        whileTap={{ scale: 0.9 }}
        className="relative w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white shadow-[0_15px_30px_rgba(0,0,0,0.3)] overflow-hidden group bg-gradient-to-br from-[#25D366] via-[#25D366] to-[#128C7E]"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <WhatsAppIcon size={26} className="relative z-10 text-white drop-shadow-lg md:scale-110" />

        {/* Pulsing glow around the button */}
        <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping opacity-20 pointer-events-none" />
      </motion.a>
    </div>
  );
};



const PrivacyPolicy = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);
    }
  };

  const sections = [
    { title: "1. Coleta de Dados", icon: <Target size={22} />, content: "Coletamos informações fornecidas voluntariamente por vocêssos formulários de contato, incluindo nome, e-mail e número de telefone (\"leads\")." },
    { title: "2. Uso das Informações", icon: <TrendingUp size={22} />, content: "Os dados coletados são utilizados exclusivamente para entrar em contato com vocêormações sobre nossos serviços, realizar triagens estratégicas e para fins de marketing direto (como envio de propostas e novidades)." },
    { title: "3. Cookies e Tecnologias", icon: <Cpu size={22} />, content: "Utilizamos cookies, Google Analytics e Meta Pixel para analisar o tráfego do site, melhorar sua experiência de navegação e exibir anúncios personalizados em outras plataformas." },
    { title: "4. Segurança dos Dados", icon: <Shield size={22} />, content: "Empregamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acessos não autorizados, perda ou alteração. Seus dados são tratados com total confidencialidade." },
    { title: "5. Seus Direitos", icon: <UserCheck size={22} />, content: "Você tem o direito de solicitar a qualquer momento a remoção, correção ou acesso aos seus dados pessoais em nossa base. Basta entrar em contato através dos nossos canais." }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          className="relative w-full max-w-3xl h-[85vh] flex flex-col bg-[#0A0A0B] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 overflow-hidden"
        >
          {/* Sticky Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-black/40 backdrop-blur-xl z-20">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight uppercase font-manrope">Política de <span className="text-[#B988BF]">Privacidade</span></h2>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Sua segurança é nossa prioridade</p>
            </div>
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors hover:bg-white/5 rounded-none border border-transparent hover:border-white/10">
              <X size={24} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-0.5 w-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#B988BF] to-[#96649c]"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Scrollable Content */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12 scrollbar-hide"
          >
            {sections.map((section, idx) => (
              <motion.section
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#B988BF] group-hover:bg-[#B988BF]/10 transition-colors">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white font-manrope">{section.title}</h3>
                </div>
                <p className="text-gray-400 leading-relaxed font-sans text-sm md:text-base pl-14">
                  {section.content}
                </p>
              </motion.section>
            ))}

            <div className="pt-12 pb-6">
              <button
                onClick={onClose}
                className="w-full py-5 bg-[#B988BF] text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-[0_10px_30px_rgba(185,136,191,0.3)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)] rounded-2xl"
              >
                Compreendo e Aceito os Termos
              </button>
              <p className="text-center text-[10px] text-gray-600 mt-4 uppercase font-bold tracking-widest">Ao clicar, vocêitura completa deste documento</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const TermsOfUse = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);
    }
  };

  const sections = [
    { title: "1. Uso Informativo", icon: <BarChart2 size={22} />, content: "Este site tem caráter estritamente informativo sobre os serviços de inteligência artificial e marketing estratégico da EleveAI. O acesso e uso deste site não constituem uma relação contratual imediata." },
    { title: "2. Propriedade Intelectual", icon: <Lock size={22} />, content: "Todos os textos, imagens, logotipos e designs presentes neste site são de propriedade exclusiva da EleveAI. É proibida a reprodução total ou parcial sem autorização prévia por escrito." },
    { title: "3. Contratação de Serviços", icon: <CheckCircle2 size={22} />, content: "A formalização de qualquer serviço apresentado só ocorre mediante a assinatura de um contrato específico e/ou aceitação de proposta comercial formalizada pela nossa equipe." },
    { title: "4. Limitação de Resp.", icon: <ShieldAlert size={22} />, content: "A EleveAI busca a máxima precisão, porém não se responsabiliza por decisões tomadas exclusivamente com base no conteúdo deste site. Os resultados de performance mencionados são estimativas." }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          className="relative w-full max-w-3xl h-[85vh] flex flex-col bg-[#0A0A0B] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 overflow-hidden"
        >
          {/* Sticky Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-black/40 backdrop-blur-xl z-20">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight uppercase font-manrope">Termos de <span className="text-[#B988BF]">Uso</span></h2>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Acordo de navegação e transparência</p>
            </div>
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors hover:bg-white/5 rounded-none border border-transparent hover:border-white/10">
              <X size={24} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-0.5 w-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#B988BF] to-[#96649c]"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Scrollable Content */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12 scrollbar-hide"
          >
            {sections.map((section, idx) => (
              <motion.section
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#B988BF] group-hover:bg-[#B988BF]/10 transition-colors">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white font-manrope">{section.title}</h3>
                </div>
                <p className="text-gray-400 leading-relaxed font-sans text-sm md:text-base pl-14">
                  {section.content}
                </p>
              </motion.section>
            ))}

            <div className="pt-12 pb-6">
              <button
                onClick={onClose}
                className="w-full py-5 bg-[#B988BF] text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-[0_10px_30px_rgba(185,136,191,0.3)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)] rounded-2xl"
              >
                Compreendo e Aceito os Termos
              </button>
              <p className="text-center text-[10px] text-gray-600 mt-4 uppercase font-bold tracking-widest">Ao continuar navegaçãocÃÂª declara aceitar as diretrizes acima</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
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
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-[100] w-[calc(100%-3rem)] max-w-[340px]"
        >
          <div className="bg-[#0A0A0B]/80 backdrop-blur-2xl border border-[#B988BF]/20 p-4 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col gap-4 relative overflow-hidden rounded-[2rem] group font-manrope">
            {/* Subtle glow effect */}
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#B988BF]/10 blur-[40px] rounded-full pointer-events-none" />

            <div className="flex items-start gap-3 relative z-10">
              <div className="w-8 h-8 shrink-0 bg-[#B988BF]/5 border border-[#B988BF]/10 flex items-center justify-center text-[#B988BF] rounded-xl">
                <Shield size={14} />
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                  Usamos cookies e ferramentas de rastreamento para melhorar sua experiência e entender como os visitantes interagem com o site.
                </p>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="text-zinc-600 hover:text-white transition-colors"
                aria-label="Fechar"
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex gap-2 relative z-10">
              <button
                onClick={handleAccept}
                className="w-full py-3 bg-[#B988BF] text-white font-bold uppercase tracking-[0.15em] text-[9px] hover:bg-[#a372ab] transition-all active:scale-95 rounded-2xl shadow-[0_4px_12px_rgba(185,136,191,0.3)]"
              >
                Aceitar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const RaioXSection = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <section id="diagnostico" className="py-24 relative px-6 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 tracking-tighter font-manrope leading-[1.1]">
            Raio-X Estratégico da <span className="text-gradient hover-glow">Sua Clínica</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed font-sans max-w-3xl mx-auto">
            O problema não é apenas atrair pacientes. É criar uma estrutura que permita rastrear, responder, confirmar e escalar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div whileHover={{ y: -10 }} className="bg-black/60 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:border-[#B988BF]/50 transition-all flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#B988BF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
            <div className="w-14 h-14 rounded-full bg-[#B988BF]/10 flex items-center justify-center mb-6 text-[#B988BF] group-hover:scale-110 transition-transform duration-300">
              <Target size={28} />
            </div>
            <h3 className="text-white font-manrope text-xl md:text-2xl font-semibold tracking-tight uppercase mb-4">1. Visibilidade</h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">Clínicas sem Pixel, Analytics e Tag Manager não sabem quais anúncios realmente geram pacientes.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="bg-black/60 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:border-[#EEC6A2]/50 transition-all flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#EEC6A2] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
            <div className="w-14 h-14 rounded-full bg-[#EEC6A2]/10 flex items-center justify-center mb-6 text-[#EEC6A2] group-hover:scale-110 transition-transform duration-300">
              <TrendingUp size={28} />
            </div>
            <h3 className="text-white font-manrope text-xl md:text-2xl font-semibold tracking-tight uppercase mb-4">2. Atendimento</h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">Quando o WhatsApp demora para responder, muitos pacientes desistem e procuram outra clínica.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="bg-black/60 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:border-[#B988BF]/50 transition-all flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#B988BF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
            <div className="w-14 h-14 rounded-full bg-[#B988BF]/10 flex items-center justify-center mb-6 text-[#B988BF] group-hover:scale-110 transition-transform duration-300">
              <MessageCircle size={28} />
            </div>
            <h3 className="text-white font-manrope text-xl md:text-2xl font-semibold tracking-tight uppercase mb-4">3. Confirmação</h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">Sem lembretes e confirmações automáticas, faltas e cancelamentos se tornam frequentes.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="bg-black/60 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:border-[#EEC6A2]/50 transition-all flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#EEC6A2] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
            <div className="w-14 h-14 rounded-full bg-[#EEC6A2]/10 flex items-center justify-center mb-6 text-[#EEC6A2] group-hover:scale-110 transition-transform duration-300">
              <BarChart3 size={28} />
            </div>
            <h3 className="text-white font-manrope text-xl md:text-2xl font-semibold tracking-tight uppercase mb-4">4. Previsibilidade</h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">Sem rastreamento e automação, a clínica cresce sem saber exatamente o que está funcionando.</p>
          </motion.div>
        </div>

        <div className="text-center">
          <button
            onClick={onOpenModal}
            className="group relative flex h-[64px] w-auto sm:min-w-[340px] mx-auto items-center justify-center rounded-2xl px-12 outline-none cursor-pointer transition-all active:scale-95 bg-white/5 border-none overflow-hidden"
            type="button"
          >
            <div className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-0" style={{ background: 'radial-gradient(15% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)', filter: 'blur(15px)' }}></div>
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-100" style={{ background: 'radial-gradient(60.6% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)', filter: 'blur(18px)' }}></div>
            <div className="pointer-events-none will-change-auto absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-0" style={{ background: 'radial-gradient(10.7% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)' }}></div>
            <div className="pointer-events-none will-change-auto absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-100" style={{ background: 'radial-gradient(60.1% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)' }}></div>
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -inset-[300%] animate-[spin_4s_linear_infinite]" style={{ background: 'conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 90%, #B988BF 100%)' }}></div>
            </div>
            <div className="absolute inset-[1px] rounded-2xl bg-black"></div>
            <span className="relative z-20 flex items-center justify-center gap-4 text-base md:text-lg font-bold text-white tracking-wide uppercase font-manrope">
              Quero ver onde estou perdendo pacientes →
              <ArrowRight size={22} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms'>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Prevent browser from restoring previous scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Ensure the site always goes to home position (top) on load
    window.scrollTo(0, 0);
    setTimeout(() => window.scrollTo(0, 0), 100);
  }, []);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('eleveai-modal-closed');
    const hasSubmitted = sessionStorage.getItem('eleveai-modal-submitted');
    if (hasSeenModal || hasSubmitted) return;

    // 50-second timer trigger
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 50000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleOpenModal = () => {
    if (typeof window !== 'undefined' && !(window as any).leadFired && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
      (window as any).leadFired = true;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    sessionStorage.setItem('eleveai-modal-closed', 'true');
  };

  return (
    <div className="min-h-screen relative">


      <DiagnosticModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <PrivacyPolicy isOpen={currentPage === 'privacy'} onClose={() => setCurrentPage('home')} />
      <TermsOfUse isOpen={currentPage === 'terms'} onClose={() => setCurrentPage('home')} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar onHome={() => setCurrentPage('home')} />
        <main>
          <>
            <Hero onOpenModal={handleOpenModal} />
            <GoogleAdsPremium onOpenModal={handleOpenModal} />
            <PacientesQualificados onOpenModal={handleOpenModal} />
            <AutomacaoClinica />
            <RaioXSection onOpenModal={handleOpenModal} />

            <FAQ />
            <FinalCTA onOpenModal={handleOpenModal} />
          </>
        </main>
        <Footer
          onPrivacy={() => setCurrentPage('privacy')}
          onTerms={() => setCurrentPage('terms')}
          onHome={() => setCurrentPage('home')}
        />
        <WhatsAppFloat />
        <CookieConsent />
      </motion.div>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
