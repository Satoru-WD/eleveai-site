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
  Sparkles
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
          className="flex md:gap-12 md:w-auto bg-[#1A1A1E]/95 md:bg-[#1A1A1E]/80 w-full max-w-6xl rounded-2xl md:rounded-full py-2 px-5 md:px-8 shadow-2xl md:shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-md border border-white/5 md:border-white/10 items-center justify-between" 
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
  return (
    <>
      <div className="gradient-blur" style={{ height: '120px' }}>
        <div></div><div></div><div></div><div></div><div></div><div></div>
      </div>

      <section id="hero" className="h-auto min-h-[900px] flex flex-col md:pt-24 overflow-hidden w-full pt-[8.5rem] pb-16 relative items-center justify-start bg-[#141417]" style={{ maskImage: 'linear-gradient(180deg, transparent, black 0%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(180deg, transparent, black 0%, black 95%, transparent)' }}>
        
        {/* Vertical Light Beam (Raio-X Style) */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] -translate-x-1/2 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 w-[6px] h-[500px] mix-blend-screen" 
               style={{ 
                 background: 'linear-gradient(to bottom, transparent, rgba(185, 136, 191, 0.7), rgba(96, 165, 250, 0.6), transparent)',
                 transform: 'translateX(-50%)',
                 boxShadow: '0 0 60px 25px rgba(185, 136, 191, 0.4), 0 0 100px 35px rgba(96, 165, 250, 0.3)',
                 filter: 'blur(10px)',
                 opacity: 0.8,
                 animation: 'beamFall 6s linear infinite',
                 willChange: 'transform'
               }}>
          </div>
        </div>
        
        <div className="z-10 max-w-7xl mt-12 md:mt-16 mx-auto px-6 md:px-8 relative w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-10">
          
          {/* Left Column - Copy */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-20">
            <div className="[animation:fadeSlideIn_1s_ease-out_0.8s_both] inline-flex transition-transform hover:scale-105 cursor-pointer group bg-zinc-800/60 backdrop-blur-sm rounded-full mb-8 py-1.5 px-6 shadow-sm items-center justify-center">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-zinc-300 uppercase font-sans">Seja bem-vinda, Dra. Seja bem-vindo, Dr.</span>
            </div>
            
            <h1 className="leading-[1.15] text-[2.5rem] md:text-[4rem] lg:text-[4.5rem] cursor-default font-extrabold tracking-tight mb-12 text-white font-manrope max-w-[18ch] md:max-w-2xl" style={{ animation: 'fadeSlideIn 1s ease-out 1s both' }}>
              Sua clínica precisa de <span className="text-[#B988BF]">estrutura</span>, <br className="md:hidden" /> não apenas anúncios.
            </h1>

            <p className="leading-relaxed md:text-xl text-lg font-normal text-zinc-400 tracking-wide font-sans max-w-xl mb-14" style={{ animation: 'fadeSlideIn 1s ease-out 1.2s both' }}>
              Sem site, <strong className="font-bold text-zinc-200">Pixel, Analytics e remarketing</strong>, sua clínica perde pacientes todos os dias sem perceber.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 w-full lg:w-auto mt-2" style={{ animation: 'fadeSlideIn 1s ease-out 1.4s both' }}>
              <button 
                onClick={onOpenModal}
                className="group relative flex h-[62px] w-full sm:w-auto sm:min-w-[300px] px-12 items-center justify-center overflow-hidden rounded-2xl transition-all hover:-translate-y-1 active:scale-95 bg-gradient-to-br from-zinc-800 to-[#1A1A1E] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(185,136,191,0.25)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B988BF]/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                <span className="relative z-10 flex items-center justify-center gap-5 text-[12px] sm:text-[13px] font-bold tracking-[0.2em] uppercase font-manrope text-white whitespace-nowrap">
                  <span>Solicitar análise estratégica</span>
                  <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>

              <button 
                onClick={() => document.getElementById('sistema')?.scrollIntoView({ behavior: 'smooth' })} 
                className="group relative flex h-[60px] w-full sm:w-auto sm:min-w-[240px] px-10 items-center justify-center rounded-2xl bg-transparent hover:bg-white/5 backdrop-blur-sm transition-all hover:-translate-y-0.5 text-zinc-300 hover:text-white border border-transparent hover:border-white/10"
              >
                <span className="relative z-20 flex items-center justify-center gap-4 text-[12px] font-bold tracking-[0.15em] uppercase font-manrope">
                  <span>Ver como funciona</span>
                  <ChevronDown size={16} className="transition-transform duration-300 group-hover:translate-y-1" />
                </span>
              </button>
            </div>
          </div>

          {/* Right Column - Tech Visualization */}
          <div className="flex-1 relative w-full h-[550px] lg:h-[700px] flex items-center justify-center perspective-[1000px] mt-8 lg:mt-0" style={{ animation: 'fadeSlideIn 1s ease-out 1.6s both' }}>
            {/* Core Glow */}
            <motion.div 
              animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] bg-[#B988BF] rounded-full blur-[140px] opacity-30"></motion.div>
            
            {/* Main Phone Mockup Element pt 2*/}
            <motion.div 
              initial={{ y: 30, opacity: 0, rotateY: 5, rotateX: 5 }}
              animate={{ y: 0, opacity: 1, rotateY: 0, rotateX: 0 }}
              transition={{ duration: 1.2, delay: 1.8, type: "spring" }}
              className="relative z-20 w-[275px] lg:w-[290px] h-[570px] lg:h-[580px] rounded-[3.5rem] border-[10px] border-[#0A0A0B] bg-[#141417]/80 backdrop-blur-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col"
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-[#0A0A0B] rounded-b-3xl z-30 flex items-center justify-center">
                <div className="w-16 h-1.5 bg-white/10 rounded-full mt-2"></div>
              </div>
              
              {/* UI Mockup Details - Live Conversation Simulation */}
              <div className="pt-14 px-4 pb-6 flex-1 flex flex-col gap-4 w-full">
                {/* Chat Header */}
                <div className="flex items-center gap-3 mb-2 px-2">
                  <div className="w-8 h-8 rounded-full bg-[#B988BF]/20 flex items-center justify-center">
                    <MessageCircle size={16} className="text-[#B988BF]" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-16 bg-white/20 rounded-full"></div>
                    <div className="h-1.5 w-10 bg-white/10 rounded-full mt-1.5"></div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 flex-1">
                  {/* Patient Message */}
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: [0, 0, 1, 1, 0] }}
                    transition={{ 
                      duration: 12, 
                      repeat: Infinity, 
                      times: [0, 2/12, 2.5/12, 11/12, 1] 
                    }}
                    className="bg-zinc-800/80 rounded-2xl rounded-tl-none p-3 max-w-[85%] border border-white/5 shadow-sm"
                  >
                    <p className="text-[10px] text-zinc-300 leading-tight">Olá, queria saber sobre avaliação.</p>
                  </motion.div>

                  {/* IA Message */}
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: [0, 0, 1, 1, 0] }}
                    transition={{ 
                      duration: 12, 
                      repeat: Infinity, 
                      times: [0, 4/12, 4.5/12, 11/12, 1] 
                    }}
                    className="bg-[#B988BF]/20 border border-[#B988BF]/30 rounded-2xl rounded-tr-none p-3 max-w-[85%] ml-auto shadow-sm"
                  >
                    <div className="flex items-center gap-1.5 mb-1 opacity-80">
                      <Sparkles size={10} className="text-[#B988BF]" />
                      <span className="text-[8px] font-bold text-[#B988BF] uppercase tracking-wider">IA EleveAI</span>
                    </div>
                    <p className="text-[10px] text-[#EAD5EB] leading-tight">Olá! Posso te ajudar com seu agendamento.</p>
                  </motion.div>

                  {/* Patient Message 2 */}
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: [0, 0, 1, 1, 0] }}
                    transition={{ 
                      duration: 12, 
                      repeat: Infinity, 
                      times: [0, 6/12, 6.5/12, 11/12, 1] 
                    }}
                    className="bg-zinc-800/80 rounded-2xl rounded-tl-none p-3 max-w-[85%] border border-white/5 shadow-sm"
                  >
                    <p className="text-[10px] text-zinc-300 leading-tight">Tem horário esta semana?</p>
                  </motion.div>

                  {/* IA Message 2 */}
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: [0, 0, 1, 1, 0] }}
                    transition={{ 
                      duration: 12, 
                      repeat: Infinity, 
                      times: [0, 8/12, 8.5/12, 11/12, 1] 
                    }}
                    className="bg-[#B988BF]/20 border border-[#B988BF]/30 rounded-2xl rounded-tr-none p-3 max-w-[85%] ml-auto shadow-sm"
                  >
                    <p className="text-[10px] text-[#EAD5EB] leading-tight">Temos sim. Qual período você prefere?</p>
                  </motion.div>

                  {/* Typing Indicator */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0, 1, 0, 0, 1, 0, 0] }}
                    transition={{ 
                      duration: 12, 
                      repeat: Infinity, 
                      times: [0, 3/12, 3.1/12, 3.9/12, 7/12, 7.1/12, 7.9/12, 1] 
                    }}
                    className="flex gap-1 ml-auto mr-4"
                  >
                    <div className="w-1 h-1 bg-[#B988BF]/60 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-[#B988BF]/60 rounded-full animate-pulse delay-75"></div>
                    <div className="w-1 h-1 bg-[#B988BF]/60 rounded-full animate-pulse delay-150"></div>
                  </motion.div>
                </div>

                {/* Chat Input Placeholder */}
                <div className="mt-auto h-10 rounded-xl bg-white/5 border border-white/10 flex items-center px-4">
                  <div className="h-1.5 w-1/2 bg-white/10 rounded-full"></div>
                </div>
              </div>
            </motion.div>

            {/* Floating WhatsApp Notification */}
            <motion.div 
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1, y: [0, -8, 0] }}
              transition={{ 
                x: { duration: 0.8, delay: 2.2, type: "spring", stiffness: 100 },
                opacity: { duration: 0.8, delay: 2.2 },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 3 }
              }}
              className="absolute top-[18%] right-2 lg:-right-10 z-30 bg-[#1A1A1E]/95 backdrop-blur-xl border border-white/[0.03] p-3.5 lg:p-4 rounded-2xl flex items-center gap-4 shadow-xl"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-zinc-800 flex items-center justify-center shadow-inner">
                <WhatsAppIcon size={22} className="text-green-500 drop-shadow-sm" />
              </div>
              <div className="pr-2">
                <p className="text-zinc-200 text-sm font-bold tracking-wide">Novo Paciente</p>
                <p className="text-zinc-500 text-xs font-semibold mt-0.5">Avaliação Confirmada</p>
              </div>
            </motion.div>

            {/* Dashboard Floating Widget */}
            <motion.div 
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1, y: [0, -10, 0] }}
              transition={{ 
                x: { duration: 0.8, delay: 2.4, type: "spring", stiffness: 100 },
                opacity: { duration: 0.8, delay: 2.4 },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 3.2 }
              }}
              className="hidden sm:block absolute bottom-[18%] left-2 lg:-left-12 z-30 bg-[#1A1A1E]/90 backdrop-blur-xl border border-[#B988BF]/20 p-5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-[#B988BF]/20 p-1.5 rounded-md">
                  <TrendingUp className="text-[#B988BF] w-4 h-4" />
                </div>
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.15em]">Taxa Vendas</span>
              </div>
              <div className="text-4xl font-extrabold text-white drop-shadow-md">+142<span className="text-2xl text-[#B988BF]">%</span></div>
            </motion.div>

            {/* Floating Tags for Capabilities */}
            <motion.div 
              initial={{ y: -30, opacity: 0 }} 
              animate={{ y: [0, -12, 0], opacity: 1 }} 
              transition={{ 
                y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2.6 },
                opacity: { delay: 2.6, duration: 0.8 }
              }} 
              className="absolute py-1.5 px-4 lg:py-2 lg:px-5 -top-6 right-[10%] lg:right-[32%] bg-[#1A1A1E]/90 rounded-full border border-blue-500/40 backdrop-blur-md shadow-[0_0_25px_rgba(37,99,235,0.4)] z-50 rotate-3 hover:rotate-0 transition-transform"
            >
              <span className="text-[9px] lg:text-[11px] font-extrabold text-blue-400 uppercase flex items-center gap-2 tracking-widest"><CheckCircle2 size={12} className="text-blue-500" /> Pixel Ativo</span>
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0, opacity: 0 }} 
              animate={{ scale: [0, 1, 1], y: [0, -8, 0], opacity: 1 }} 
              transition={{ 
                scale: { delay: 2.7, duration: 0.5 },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 3.2 },
                opacity: { delay: 2.7, duration: 0.5 }
              }} 
              className="absolute py-1.5 px-4 lg:py-2 lg:px-5 bottom-[4%] right-2 lg:right-4 bg-[#1A1A1E]/80 rounded-full border border-amber-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.2)] z-30 -rotate-6 hover:rotate-0 transition-transform"
            >
              <span className="text-[9px] lg:text-[11px] font-extrabold text-amber-400 uppercase flex items-center gap-2 tracking-widest"><Target size={12} className="text-amber-500" /> Remarketing</span>
            </motion.div>
 
            <motion.div 
              initial={{ scale: 0, opacity: 0 }} 
              animate={{ scale: [0, 1, 1], y: [0, -10, 0], opacity: 1 }} 
              transition={{ 
                scale: { delay: 2.8, duration: 0.5 },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 3.3 },
                opacity: { delay: 2.8, duration: 0.5 }
              }} 
              className="absolute py-1.5 px-4 lg:py-2 lg:px-5 top-[35%] -left-2 lg:-left-16 bg-[#1A1A1E]/80 rounded-full border border-emerald-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.2)] z-20 -rotate-3 hover:rotate-0 transition-transform"
            >
              <span className="text-[9px] lg:text-[11px] font-extrabold text-emerald-400 uppercase flex items-center gap-2 tracking-widest"><MessageCircle size={12} className="text-emerald-500" /> WhatsApp</span>
            </motion.div>
 
            <motion.div 
              initial={{ scale: 0, opacity: 0 }} 
              animate={{ scale: [0, 1, 1], y: [0, -6, 0], opacity: 1 }} 
              transition={{ 
                scale: { delay: 3.0, duration: 0.5 },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 3.5 },
                opacity: { delay: 3.0, duration: 0.5 }
              }} 
              className="hidden sm:flex absolute py-1.5 px-4 lg:py-2 lg:px-5 bottom-0 left-[15%] lg:left-[25%] bg-[#1A1A1E]/80 rounded-full border border-purple-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.2)] z-40 rotate-[12deg] hover:rotate-0 transition-transform"
            >
              <span className="text-[9px] lg:text-[11px] font-extrabold text-purple-400 uppercase flex items-center gap-2 tracking-widest"><BarChart2 size={12} className="text-purple-500" /> Analytics</span>
            </motion.div>

          </div>
        </div>

      </section>
    </>
  );
};



const InvestirNoEscuro = () => {
  return (
    <section className="py-32 relative px-6 overflow-hidden bg-ice border-b border-black/5">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-graphite mb-6 tracking-tight font-manrope font-bold leading-[1.1]">
            A maioria das <span className="text-primary font-manrope">clínicas</span> investe no escuro.
          </h2>
          <p className="text-gray-600 text-lg md:text-xl font-sans leading-relaxed max-w-3xl mx-auto">
            Sem Pixel, Analytics e rastreamento, sua clínica não sabe quais anúncios funcionam, quem entrou no site e quem estava pronto para agendar.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: X, title: "Sem Pixel" },
            { icon: X, title: "Sem Analytics" },
            { icon: X, title: "Sem Remarketing" },
            { icon: X, title: "Sem WhatsApp" },
            { icon: X, title: "Sem Previsibilidade" },
          ].map((item, idx) => (
             <motion.div key={idx} initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} transition={{delay: idx*0.1}} className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-black/[0.03] flex flex-col items-center text-center group hover:border-[#EF4444]/30 hover:shadow-2xl transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#EF4444]/10 to-[#EF4444]/20 text-[#EF4444] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#EF4444] group-hover:text-white transition-all shadow-sm">
                  <item.icon size={28} className="stroke-[2.5]" />
                </div>
                <h4 className="font-bold text-graphite text-[14px] md:text-base font-manrope tracking-tight">{item.title}</h4>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
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
          <div className="space-y-4 text-gray-500 text-base md:text-lg leading-relaxed max-w-lg">
            <p>
              Quando alguém entra no seu site, clica no WhatsApp ou pesquisa sua clínica no Google, sua clínica precisa saber quem demonstrou interesse.
            </p>
            <p className="text-sm font-medium opacity-80">
              Sem Pixel, Analytics, Tag Manager e remarketing, você perde dados, oportunidades e pacientes.
            </p>
          </div>

          {/* Highlight */}
          <div className="mt-8 border-l-4 border-primary pl-5 py-2">
            <p className="text-lg font-bold text-graphite mb-2 font-manrope leading-snug">
              Sua clínica não sabe quem entrou no site, clicou no WhatsApp ou estava pronto para agendar.
            </p>
            <p className="text-[14px] uppercase font-bold text-primary tracking-widest mt-3">Você está investindo no escuro.</p>
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


const PacientesQualificados = () => {
  return (
    <section id="sistema" className="py-32 relative px-6 overflow-hidden scroll-mt-24 bg-ice">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-graphite mb-6 font-manrope tracking-tight leading-[1.1]"
          >
            Pacientes qualificados não aparecem <span className="text-primary font-manrope">por acaso.</span>
          </motion.h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-sans leading-relaxed">
            Pacientes de alto valor seguem uma jornada previsível até a sua clínica. Nós construímos esse caminho.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-4 lg:gap-2">
          {[
            { tag: "1", icon: Target, title: "Vê Anúncio", desc: "No Google ou Meta" },
            { tag: "2", icon: LayoutDashboard, title: "Entra no Site", desc: "Estrutura premium" },
            { tag: "3", icon: MessageCircle, title: "WhatsApp", desc: "Inicia atendimento" },
            { tag: "4", icon: Smartphone, title: "Remarketing", desc: "Retenção ativa" },
            { tag: "5", icon: Shield, title: "Confiança", desc: "Deseja seu serviço" },
            { tag: "6", icon: Calendar, title: "Agenda", desc: "Paciente Realizado" }
          ].map((item, idx, arr) => (
             <React.Fragment key={idx}>
                <motion.div 
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{delay: idx * 0.1}}
                  viewport={{once: true}}
                  whileHover={{ y: -5 }} 
                  className="bg-white p-6 w-full lg:w-[15%] rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-black/[0.04] flex flex-col items-center text-center relative group"
                >
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm shadow-md">{item.tag}</div>
                  <div className="w-16 h-16 rounded-full bg-primary/5 text-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-[15px] font-bold text-graphite mb-1 font-manrope leading-tight">{item.title}</h3>
                  <p className="text-[12px] text-gray-500 font-sans">{item.desc}</p>
                </motion.div>
                {idx < arr.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center text-primary/30">
                    <ArrowRight size={24} className="animate-pulse" />
                  </div>
                )}
                {idx < arr.length - 1 && (
                  <div className="flex lg:hidden items-center justify-center py-2 text-primary/30">
                    <ArrowRight size={24} className="rotate-90 animate-pulse" />
                  </div>
                )}
             </React.Fragment>
          ))}
        </div>
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
            Sua clínica precisa de <span className="text-primary font-manrope">automação</span>, não apenas atendimento manual.
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl font-sans leading-relaxed">
            Confirmações, lembretes e follow-ups automáticos ajudam sua clínica a reduzir faltas, organizar a agenda e melhorar a experiência do paciente.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
           {[
             { icon: CheckCircle2, title: "Confirmação Automática", desc: "Mensagens eficientes, evitando horários vagos e retrabalho manual na recepção." },
             { icon: Clock, title: "Lembrete de Consulta", desc: "Notificação inteligente horas antes para reduzir drasticamente o número de cancelamentos e 'no-shows'." },
             { icon: Calendar, title: "Reagendamento", desc: "Roteiro simplificado no WhatsApp para reagendar sem gargalos de comunicação." },
             { icon: MessageCircle, title: "Follow-up Ativo", desc: "Retome o contato com leads não fechados de modo passivo e aumente o LTV." },
             { icon: Smartphone, title: "WhatsApp Automatizado", desc: "Triagem 24/7 de todos os contatos provenientes do fluxo Google e Meta Ads." },
             { icon: TrendingUp, title: "Menos Faltas", desc: "Mais lucratividade mantendo a sua agenda otimizada e previsível todos os dias." },
           ].map((item, idx) => (
              <motion.div key={idx} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} transition={{delay: idx*0.1}} viewport={{once: true}} className="bg-white p-8 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-black/[0.04] hover:shadow-xl hover:-translate-y-1 transition-all">
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



const PorQueEleveAI = () => {
  return (
    <section className="py-32 px-6 overflow-hidden bg-graphite relative">
      {/* Subtle depth gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-8 font-manrope leading-[1.1] tracking-tight">
            O que sua clínica precisa <span className="text-primary block sm:inline font-manrope">para crescer.</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed font-sans">
            Não focamos em ações isoladas. Construímos a estrutura que permite que sua clínica seja encontrada, desejada e escolhida pelo paciente ideal.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: LayoutDashboard, title: "Estrutura Digital", desc: "Site, Pixel, Analytics e rastreamento funcionando.", color: "text-primary" },
            { icon: Target, title: "Captação Inteligente", desc: "Google Ads, Meta Ads e remarketing estratégico.", color: "text-secondary" },
            { icon: Zap, title: "Automação", desc: "WhatsApp, lembretes, confirmações e follow-up.", color: "text-primary" },
            { icon: TrendingUp, title: "Crescimento", desc: "Mais previsibilidade, mais autoridade e mais pacientes.", color: "text-secondary" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/[0.03] backdrop-blur-sm p-10 border border-white/[0.04] hover:border-primary/40 transition-all group relative overflow-hidden flex flex-col items-start"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              <div className={`w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary transition-all duration-500 ${item.color}`}>
                <item.icon size={30} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-manrope tracking-tight">{item.title}</h3>
              <p className="text-zinc-400 leading-relaxed text-[15px] font-sans">{item.desc}</p>
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
      answer: "Não. Nós estruturamos a automação e o funil de aquisição de forma que você ou um pequeno time consiga lidar apenas com os fechamentos de alto valor."
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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-8 tracking-tight font-manrope leading-tight">Dúvidas Frequentes</h2>
          <p className="text-gray-400 text-lg leading-relaxed font-sans max-w-2xl mx-auto">Tudo o que você precisa saber sobre a estruturação do seu crescimento digital.</p>
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

const FinalCTA = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-graphite">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto bg-black/40 backdrop-blur-md p-14 md:p-24 text-center relative z-10 border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] rounded-[2.5rem]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-10 tracking-tight font-manrope leading-[1.15] max-w-4xl mx-auto flex flex-col items-center">
            <span className="font-manrope font-black text-white text-[32px] md:text-[50px] tracking-tight block drop-shadow-sm mb-2">Sua clínica precisa de</span>
            <span className="font-manrope font-extrabold text-primary uppercase text-[26px] md:text-[36px] tracking-[0.10em] md:tracking-[0.15em] block drop-shadow-lg">Mais previsibilidade?</span>
          </h2>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-sans max-w-3xl mx-auto mb-16">
            Solicite uma análise estratégica e descubra como gerar mais pacientes com rastreamento, automação e estrutura.
          </p>
          
          <div className="flex justify-center">
            <button
              onClick={onOpenModal}
              className="group relative flex h-[64px] w-full sm:min-w-[380px] sm:w-auto items-center justify-center bg-primary text-white text-[12px] font-bold tracking-[0.25em] rounded-full uppercase transition-all hover:scale-105 hover:shadow-[0_20px_60px_rgba(104,37,154,0.4)] shadow-2xl border border-white/10 px-12"
              type="button"
            >
              Receber análise estratégica
              <ArrowRight size={22} className="ml-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
          <p className="mt-10 text-xs text-gray-500 font-bold uppercase tracking-widest opacity-60">Análise técnica • Sem compromisso</p>
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
    { title: "1. Coleta de Dados", icon: <Target size={22} />, content: "Coletamos informações fornecidas voluntariamente por você através de nossos formulários de contato, incluindo nome, e-mail e número de telefone (\"leads\")." },
    { title: "2. Uso das Informações", icon: <TrendingUp size={22} />, content: "Os dados coletados são utilizados exclusivamente para entrar em contato com você, fornecer informações sobre nossos serviços, realizar triagens estratégicas e para fins de marketing direto (como envio de propostas e novidades)." },
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
              <p className="text-center text-[10px] text-gray-600 mt-4 uppercase font-bold tracking-widest">Ao clicar, você confirma a leitura completa deste documento</p>
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
              <p className="text-center text-[10px] text-gray-600 mt-4 uppercase font-bold tracking-widest">Ao continuar navegando, você declara aceitar as diretrizes acima</p>
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
                  Usamos cookies, Pixel e ferramentas de rastreamento para melhorar sua experiência e entender como os visitantes interagem com o site.
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
                className="flex-[2] py-3 bg-[#B988BF] text-white font-bold uppercase tracking-[0.15em] text-[9px] hover:bg-[#a372ab] transition-all active:scale-95 rounded-2xl shadow-[0_4px_12px_rgba(185,136,191,0.3)]"
              >
                Aceitar
              </button>
              <button
                onClick={() => { setIsVisible(false); onPrivacy(); }}
                className="flex-1 py-3 bg-white/5 border border-white/10 text-zinc-500 font-bold uppercase tracking-[0.15em] text-[9px] hover:bg-white/10 hover:text-zinc-200 transition-all active:scale-95 rounded-2xl"
              >
                Configurações
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
              Quero analisar minha estrutura
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
      {/* Global Vertical Beam */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] -translate-x-1/2">
          <div className="absolute top-0 left-1/2 w-[6px] h-[500px] mix-blend-screen" 
               style={{ 
                 background: 'linear-gradient(to bottom, transparent, rgba(185, 136, 191, 0.7), rgba(96, 165, 250, 0.6), transparent)',
                 transform: 'translateX(-50%)',
                 boxShadow: '0 0 60px 25px rgba(185, 136, 191, 0.4), 0 0 100px 35px rgba(96, 165, 250, 0.3)',
                 filter: 'blur(10px)',
                 opacity: 0.8,
                 animation: 'beamFall 6s linear infinite',
                 willChange: 'transform'
               }}>
          </div>
        </div>
      </div>

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
            <InvestirNoEscuro />
            <GoogleAdsPremium onOpenModal={handleOpenModal} />
            <PacientesQualificados />
            <AutomacaoClinica />
            <RaioXSection onOpenModal={handleOpenModal} />
            <PorQueEleveAI />
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
