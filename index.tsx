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
  Lock
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

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleNext = (questionIndex: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
    if (step < totalSteps) {
      setStep(prev => prev + 1);
    } else {
      setStep(6);
    }
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
      .then(data => {
        setStatus('success');
      })
      .catch(error => {
        console.error(error);
        setStatus('idle');
        alert("Houve um erro ao enviar. Tente novamente ou chame no WhatsApp.");
      });
  };

  const questions = [
    {
      id: "Q1_Investe_Aquisicao",
      title: "Seu negócio já investe em aquisição de clientes online?",
      options: ["Sim", "Ainda não", "De forma inconsistente"]
    },
    {
      id: "Q2_Processo_Transformacao",
      title: "Hoje sua empresa possui um processo estruturado para transformar visitantes em clientes?",
      options: ["Sim", "Parcialmente", "Não"]
    },
    {
      id: "Q3_Automacao_Relacionamento",
      title: "Existe automação no relacionamento com clientes ou vendas?",
      options: ["Sim", "Apenas ferramentas isoladas", "Não"]
    },
    {
      id: "Q4_Objetivo_Atual",
      title: "Qual é o principal objetivo do negócio hoje?",
      options: ["Gerar mais clientes", "Melhorar conversão", "Estruturar presença digital", "Escalar vendas"]
    },
    {
      id: "Q5_Faturamento",
      title: "Qual o faturamento médio mensal da empresa?",
      options: ["Até 10 mil", "10 mil a 50 mil", "50 mil a 100 mil", "Acima de 100 mil"]
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
          className="relative w-full max-w-lg bg-black/70 backdrop-blur-xl border border-white/10 p-6 md:p-10 shadow-2xl z-10 rounded-none"
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
              <p className="text-gray-400">Nossa equipe estratégica analisará seu negócio e entrará em contato em breve.</p>
              <button
                onClick={onClose}
                className="mt-8 w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-none font-medium transition-colors border border-zinc-800"
              >
                Fechar
              </button>
            </div>
          ) : step <= 5 ? (
            <>
              <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                  <h3 className="text-lg md:text-xl font-bold text-white">Antes de sair, veja como está a geração de clientes do seu negócio.</h3>
                </div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs text-gray-400">Leva menos de 30 segundos.</span>
                  <span className="text-xs text-[#B988BF] font-semibold">Pergunta {step} de 5</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#B988BF] to-[#B988BF] h-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-1 text-right text-[10px] text-gray-400 font-medium">{progress}% concluído</div>
              </div>

              <div className="mb-8">
                <h4 id="modal-title" className="text-xl md:text-2xl font-semibold text-white leading-snug">
                  {questions[step - 1].title}
                </h4>
              </div>

              <div className="space-y-3">
                {questions[step - 1].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNext(questions[step - 1].id, option)}
                    className="w-full text-left px-5 py-4 rounded-none border border-white/10 bg-white/5 hover:border-[#B988BF] hover:bg-[#B988BF]/10 text-gray-300 hover:text-white transition-all font-medium backdrop-blur-sm"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <div className="w-16 h-16 bg-[#B988BF]/20 text-[#B988BF] rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Análise Finalizada</h3>
              <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
                Seu negócio ainda depende de ações isoladas para gerar novos clientes. Com a estrutura correta, é possível transformar aquisição de clientes em um processo previsível.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <input type="hidden" name="_subject" value="Novo Diagnóstico de Negócio - EleveAI" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <div>
                  <label htmlFor="diag-nome" className="block text-xs font-semibold text-gray-400 mb-1.5 ml-1">Nome</label>
                  <input id="diag-nome" required type="text" name="Nome" className="w-full bg-[#0A0A0B]/50 border border-zinc-800 rounded-none px-4 py-3 text-white focus:outline-none focus:border-[#B988BF] transition-colors" placeholder="Seu nome completo" />
                </div>

                <div>
                  <label htmlFor="diag-whatsapp" className="block text-xs font-semibold text-gray-400 mb-1.5 ml-1">WhatsApp</label>
                  <input id="diag-whatsapp" required type="tel" name="WhatsApp" className="w-full bg-[#0A0A0B]/50 border border-zinc-800 rounded-none px-4 py-3 text-white focus:outline-none focus:border-[#B988BF] transition-colors" placeholder="(00) 00000-0000" />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group relative inline-flex w-full mt-4 h-[50px] items-center justify-center overflow-hidden rounded-none outline-none cursor-pointer transition-transform active:scale-95 bg-white/5 border border-[#B988BF] text-[#B988BF] hover:bg-[#B988BF] hover:text-white disabled:opacity-50"
                >
                  <span className="relative z-20 flex items-center justify-center gap-2 text-xs font-bold tracking-wide uppercase">
                    {status === 'submitting' ? 'Enviando...' : 'Receber análise estratégica'}
                    {status !== 'submitting' && <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />}
                  </span>
                </button>
                <p className="text-center text-xs text-gray-400 mt-2">Sem compromisso.</p>
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
      <div className="fixed flex w-full z-50 pt-6 pr-4 pl-4 top-0 left-0 justify-center" style={{ animation: 'fadeSlideIn 1s ease-out 1s both' }}>
        <nav 
          className="shadow-black/50 flex md:gap-12 md:w-auto bg-black/60 w-full max-w-6xl rounded-none pt-2 pr-2 pb-2 pl-3 shadow-2xl backdrop-blur-lg gap-x-8 gap-y-8 items-center justify-between" 
          style={{ position: 'relative', '--border-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2))', '--border-radius-before': '0px' } as React.CSSProperties}
        >
          {/* Logo */}
          <a href="#" aria-label="Voltar para o topo" className="flex items-center cursor-pointer px-2" onClick={(e) => { e.preventDefault(); handleHomeClick(); }}>
            <img
              src="/logo.png"
              alt="EleveAI - Máquinas de Crescimento"
              width="150"
              height="56"
              className="h-[3rem] md:h-[3.5rem] w-auto object-contain transition-all origin-left"
            />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 pr-4">
            <button onClick={handleHomeClick} className="group hover:text-white transition-colors text-sm font-medium text-gray-400 font-sans py-1 relative">Home</button>
            <button onClick={() => scrollToSection('sistema')} className="group hover:text-white transition-colors text-sm font-medium text-gray-400 font-sans py-1 relative">Sistema</button>
            <button onClick={() => scrollToSection('diagnostico')} className="group hover:text-white transition-colors text-sm font-medium text-gray-400 font-sans py-1 relative">Soluções</button>
            <button onClick={() => scrollToSection('faq')} className="group hover:text-white transition-colors text-sm font-medium text-gray-400 font-sans py-1 relative">FAQ</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden pr-2">
            <button
              aria-label="Toggle menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <Plus className="rotate-45" size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
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
                className="mt-4 flex items-center gap-3 bg-[#B988BF] hover:bg-[#7a2cb3] text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_10px_30px_rgba(185, 136, 191,0.35)] hover:shadow-[0_10px_40px_rgba(185, 136, 191,0.5)]"
              >
                Falar no WhatsApp
                <ArrowRight size={20} />
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

      <section id="hero" className="h-auto min-h-[800px] flex flex-col md:pt-20 overflow-hidden w-full pt-20 relative items-center justify-start" style={{ maskImage: 'linear-gradient(180deg, transparent, black 0%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(180deg, transparent, black 0%, black 95%, transparent)' }}>
        
        {/* Subtle Pulsating Halo Background */}
        <div className="absolute top-[10%] left-1/2 w-[80vw] max-w-[800px] h-[80vw] max-h-[800px] rounded-full pointer-events-none -z-10" 
             style={{ 
               background: 'radial-gradient(circle, rgba(185,136,191,0.15) 0%, rgba(185,136,191,0) 70%)',
               filter: 'blur(80px)',
               transform: 'translate(-50%, 0)',
               animation: 'haloPulse 8s ease-in-out infinite' 
             }}>
        </div>



        <div className="z-10 text-center max-w-5xl mt-2 sm:mt-6 md:mt-24 mx-auto px-6 relative flex flex-col items-center">

          <div className="[animation:fadeSlideIn_1s_ease-out_0.8s_both] inline-flex transition-transform hover:scale-105 cursor-pointer group bg-gradient-to-b from-white/20 via-white/0 to-white/10 rounded-full mb-4 md:mb-10 pt-1.5 pr-3 pb-1.5 pl-3 backdrop-blur-sm gap-x-2 gap-y-2 items-center" style={{ position: 'relative', '--border-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1))', '--border-radius-before': '9999px' } as any}>
            <span className="flex h-1.5 w-1.5 rounded-full group-hover:animate-pulse bg-[#B988BF] shadow-[0_0_10px_rgba(185, 136, 191,0.5)]"></span>
            <span className="text-xs font-medium tracking-wide group-hover:text-white transition-colors font-sans text-purple-100/80">Estratégia e Performance</span>
          </div>
          
          <h1 className="text-center leading-[1.2] md:text-6xl cursor-default text-4xl font-semibold tracking-tighter font-manrope mb-4 md:mb-8 text-white" style={{ animation: 'fadeSlideIn 1s ease-out 1s both', textShadow: '0 2px 24px rgba(0,0,0,0.95)' }}>
            <span className="block">Você está preparado</span>
            <span className="block">para <span className="text-[#B988BF]">dominar</span> na internet</span>
            <span className="block">ou apenas estar presente?</span>
          </h1>

          <p className="leading-relaxed md:text-2xl text-base font-medium text-gray-400 tracking-normal font-manrope max-w-3xl mx-auto mb-6 md:mb-12" style={{ animation: 'fadeSlideIn 1s ease-out 1.2s both' }}>
            Em poucos segundos analisamos os pontos que podem estar limitando a geração de contatos para o seu negócio.
          </p>

          <div className="flex flex-col md:flex-row mb-12 gap-6 items-center justify-center" style={{ animation: 'fadeSlideIn 1s ease-out 1.4s both' }}>
            <button onClick={onOpenModal} className="group relative flex h-[50px] w-auto sm:min-w-[220px] items-center justify-center rounded-none px-6 outline-none cursor-pointer transition-transform active:scale-95" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: 'none' }} type="button">
              <div className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-0" style={{ background: 'radial-gradient(15% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)', filter: 'blur(15px)' }}></div>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-100" style={{ background: 'radial-gradient(60.6% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)', filter: 'blur(15px)' }}></div>
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-none opacity-100">
                <div className="absolute -inset-[300%] animate-[spin_4s_linear_infinite]" style={{ background: 'conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 90%, #B988BF 100%)' }}></div>
              </div>
              <div className="absolute inset-[1px] rounded-none bg-black"></div>
              <span className="relative z-20 flex items-center justify-center gap-2 text-xs font-medium text-white tracking-wide uppercase">
                <span style={{ WebkitFontSmoothing: 'antialiased', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>VER DIAGNÓSTICO</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </button>

            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={trackWhatsAppClick} className="group relative inline-flex h-[50px] sm:min-w-[220px] items-center justify-center overflow-hidden rounded-none outline-none cursor-pointer transition-transform active:scale-95 px-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 75%, #B988BF 100%)' }}></span>
              <span className="absolute inset-0 rounded-none bg-zinc-800 transition-opacity duration-300 group-hover:opacity-0"></span>
              <span className="absolute inset-[1px] rounded-none bg-black z-10"></span>
              <span className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10" style={{ background: 'radial-gradient(50% 50% at 50% 100%, rgba(185, 136, 191, 0.3) 0%, transparent 100%)' }}></span>
              <span className="relative z-20 flex items-center justify-center gap-2 text-xs font-medium text-white tracking-wide uppercase">
                <span>FALAR NO WHATSAPP</span>
                <WhatsAppIcon size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 text-white" />
              </span>
            </a>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto px-6 mb-16 relative z-10">
          
          <section className="flex-1 bg-black/60 backdrop-blur-md border border-white/10 border-dashed relative p-8 flex flex-col justify-between group hover:border-[#B988BF]/50 transition-all duration-500 rounded-sm [animation:fadeSlideIn_1s_ease-out_0.2s_both]">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#B988BF]"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#B988BF]"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#B988BF]"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#B988BF]"></div>
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 border-dashed">
                <span className="font-mono text-[10px] text-[#B988BF] tracking-widest uppercase font-bold">[ Status da Análise ]</span>
                <div className="flex gap-1.5"><div className="w-1.5 h-1.5 bg-[#B988BF] animate-pulse rounded-none"></div><div className="w-1.5 h-1.5 bg-zinc-800 rounded-none"></div><div className="w-1.5 h-1.5 bg-zinc-800 rounded-none"></div></div>
              </div>
              <div>
                <h2 className="text-zinc-500 text-[10px] font-mono mb-2 uppercase tracking-wider">Média de Aumento no ROI</h2>
                <div className="flex items-baseline gap-2"><p className="text-5xl font-medium text-white font-manrope tracking-tighter">42</p><span className="text-white text-3xl font-manrope tracking-tighter">%</span></div>
                <p className="text-xs text-zinc-400 mt-2 font-sans">Empresas otimizadas com sistema de vendas inteligente.</p>
              </div>
            </div>
            <button onClick={onOpenModal} className="mt-8 w-full bg-transparent border border-[#B988BF] text-[#B988BF] hover:bg-[#B988BF] hover:text-white transition-all uppercase text-[11px] font-bold tracking-widest py-4 px-4 flex items-center justify-center gap-3 group/btn rounded-none">
              <span>Iniciar Avaliação</span>
              <svg className="w-3 h-3 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2"></path></svg>
            </button>
          </section>

          <section className="lg:flex-[1.6] min-h-[400px] md:min-h-[500px] group overflow-hidden border-zinc-800 border rounded-none relative [animation:fadeSlideIn_1s_ease-out_0.4s_both]">
            <img 
              alt="Representação visual de máquina de crescimento e funil de vendas estratégico" 
              className="group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 opacity-60 mix-blend-normal w-full h-full object-cover absolute inset-0" 
              src="/strategic-funnel-pt.webp" 
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="800"
              height="600"
            />
            <div className="flex flex-col z-20 p-6 md:p-8 absolute inset-0 justify-between">
              <div className="flex items-start justify-between">
                <div className="bg-black/60 backdrop-blur-md border-white/10 border p-4 shadow-xl">
                  <div className="flex gap-2 mb-2 items-center"><span className="w-1.5 h-1.5 bg-[#B988BF]"></span><p className="text-zinc-300 font-mono text-[10px] uppercase tracking-widest">Growth Engine</p></div>
                  <h2 className="text-white font-manrope text-xl md:text-2xl font-semibold tracking-tight uppercase">Sistema Inteligente</h2>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="bg-black/60 backdrop-blur-md border-l-4 border-[#B988BF] p-5 max-w-sm shadow-2xl">
                  <p className="text-zinc-300 text-sm leading-relaxed font-sans">Atraímos o público certo e o conduzimos até a venda através de inteligência de dados e conversão.</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 right-8 w-16 h-16 md:w-24 md:h-24 border-r border-b border-[#B988BF]/30 z-10"></div>
          </section>

          <section className="flex-1 flex flex-col bg-black/60 backdrop-blur-md border border-white/10 rounded-none relative [animation:fadeSlideIn_1s_ease-out_0.6s_both]">
            <div className="p-5 border-b border-zinc-800 border-dashed flex justify-between items-center bg-zinc-900/10">
              <span className="font-mono text-[10px] text-white uppercase tracking-widest font-bold">Metodologia EleveAI</span>
              <div className="flex gap-1"><div className="w-0.5 h-3 bg-[#B988BF]"></div><div className="w-0.5 h-3 bg-zinc-800"></div><div className="w-0.5 h-3 bg-zinc-800"></div></div>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 border-b border-zinc-800 p-5 flex items-center justify-between group hover:bg-zinc-900/60 transition-colors relative overflow-hidden cursor-default">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#B988BF]"></div>
                <div className="pl-2">
                  <span className="block text-[10px] text-[#B988BF] font-mono mb-1 font-semibold tracking-widest">01</span>
                  <h4 className="text-base text-white font-manrope font-medium tracking-tight group-hover:translate-x-1 transition-transform duration-300">Posicionamento</h4>
                </div>
              </div>
              <div className="flex-1 border-b border-zinc-800 p-5 flex items-center justify-between group hover:bg-zinc-900/60 transition-colors relative overflow-hidden cursor-default">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#B988BF]"></div>
                <div className="pl-2">
                  <span className="block text-[10px] text-[#B988BF] font-mono mb-1 font-semibold tracking-widest">02</span>
                  <h4 className="text-base text-white font-manrope font-medium tracking-tight group-hover:translate-x-1 transition-transform duration-300">Aquisição</h4>
                </div>
              </div>
              <div className="flex-1 border-b border-zinc-800 p-5 flex items-center justify-between group hover:bg-zinc-900/60 transition-colors relative overflow-hidden cursor-default">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#EEC6A2]"></div>
                <div className="pl-2">
                  <span className="block text-[10px] text-[#EEC6A2] font-mono mb-1 font-semibold tracking-widest">03</span>
                  <h4 className="text-base text-white font-manrope font-medium tracking-tight group-hover:translate-x-1 transition-transform duration-300">Conversão</h4>
                </div>
              </div>
              <div className="flex-1 p-5 flex items-center justify-between group hover:bg-zinc-900/60 transition-colors relative overflow-hidden cursor-default">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-400"></div>
                <div className="pl-2">
                  <span className="block text-[10px] text-zinc-400 font-mono mb-1 font-semibold tracking-widest">04</span>
                  <h4 className="text-base text-white font-manrope font-medium tracking-tight group-hover:translate-x-1 transition-transform duration-300">Automação</h4>
                </div>
              </div>
            </div>
          </section>
        </div>

      </section>
    </>
  );
};

const DiagnosticBanner = () => {
  return (
    <section className="py-20 relative px-6 bg-black/40 backdrop-blur-md border-y border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-5xl font-medium text-white mb-4 tracking-tighter leading-tight font-manrope">
            A maioria dos sites parece profissional...<br className="hidden md:block" />
            <span className="text-[#B988BF]">mas não gera nenhum cliente.</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl font-sans mb-8">
            Entenda o que está travando os resultados.
          </p>
          <a
            href="/porque-seu-site-nao-gera-clientes"
            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-[#B988BF]/30 text-[#B988BF] text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#B988BF] hover:text-white transition-colors duration-300"
          >
            Entenda o porquê
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const EmpresasNotaveis = () => {
  return (
    <section className="py-24 relative px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-black/60 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-sm [animation:fadeSlideIn_1s_ease-out_both] shadow-2xl relative"
        >
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#B988BF]"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#B988BF]"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#B988BF]"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#B988BF]"></div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium text-white mb-6 tracking-tighter font-manrope leading-[1.1]">
            Empresas comuns disputam atenção. <br className="hidden md:block" />
            <span className="text-white">Empresas notáveis são procuradas.</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl font-sans leading-relaxed max-w-3xl mx-auto">
            Se o seu negócio parece igual a todos os outros, o cliente escolhe pelo preço.
            Negócios que constroem presença e autoridade deixam de disputar atenção e passam a ser procurados.
            Essa é a diferença entre correr atrás de clientes e construir um sistema que atrai clientes.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const GoogleAdsPremium = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const searches = [
    {
      query: "contador para mei",
      results: [
        {
          url: "contabilizasp.com.br",
          title: "Contabilidade para MEI | Sem Burocracia",
          desc: "Abertura de MEI, emissão de DAS e declarações anuais com suporte especializado. Atendimento 100% online.",
          chips: ["MEI Grátis", "DASN Anual", "Certificado Digital"],
        },
        {
          url: "contajuridica.com.br",
          title: "Contador MEI – Regularize Agora",
          desc: "Consultoria contábil para microempreendedores. Planos a partir de R$59/mês com suporte dedicado.",
          chips: ["Consultoria Grátis", "Plano Mensal"],
        },
      ],
    },
    {
      query: "abertura de empresa",
      results: [
        {
          url: "abreempresa.com.br",
          title: "Abra sua Empresa em 48h | Online",
          desc: "CNPJ, alvará e contrato social em até 2 dias úteis. Escritório digital com suporte jurídico.",
          chips: ["Abertura Rápida", "100% Online", "LTDA e SA"],
        },
        {
          url: "juridicobiz.com.br",
          title: "Abertura de CNPJ – Assessoria Completa",
          desc: "Do registro à regularização fiscal. Consultores especializados aguardam seu contato.",
          chips: ["CNPJ Express", "Suporte Jurídico"],
        },
      ],
    },
    {
      query: "advogado trabalhista",
      results: [
        {
          url: "advtrabalhista.com.br",
          title: "Advogado Trabalhista | Consulta Grátis",
          desc: "Defesa em ações trabalhistas, rescisões e acordos. Mais de 1.200 casos resolvidos na região.",
          chips: ["Consulta Grátis", "Rescisão", "Horas Extras"],
        },
        {
          url: "mouraaadvocacia.com.br",
          title: "Escritório Trabalhista – Agende Agora",
          desc: "Especialistas em direito do trabalho para empresas e colaboradores. Atendimento presencial e remoto.",
          chips: ["Para Empresas", "Para Funcionários"],
        },
      ],
    },
    {
      query: "advogado inventário",
      results: [
        {
          url: "inventariocampinas.com.br",
          title: "Inventário e Partilha | Rápido e Seguro",
          desc: "Inventário judicial e extrajudicial. Regularize bens e herança com assessoria jurídica especializada.",
          chips: ["Inventário Extrajudicial", "Partilha", "Consulta Grátis"],
        },
        {
          url: "herdeirosadv.com.br",
          title: "Advogado de Inventário – Fale Agora",
          desc: "Habilitação de herdeiros, formal de partilha e alvará judicial. Processo simplificado e transparente.",
          chips: ["Herdeiros", "Alvará Judicial"],
        },
      ],
    },
    {
      query: "apartamento na planta",
      results: [
        {
          url: "mrv.com.br/campinas",
          title: "Apartamentos na Planta | Entrada Fácil",
          desc: "Empreendimentos com MCMV, FGTS e parcelamento direto com a construtora. Unidades a partir de R$220k.",
          chips: ["MCMV", "FGTS", "Entrada Facilitada"],
        },
        {
          url: "vivacampinas.com.br",
          title: "Lançamentos 2025 – Reserve sua Unidade",
          desc: "Localizações estratégicas, plantas modernas e lazer completo. Simule seu financiamento agora.",
          chips: ["Lançamento 2025", "Simule Agora"],
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
    <section className="py-24 relative px-6 overflow-hidden bg-black/40 backdrop-blur-lg border-y border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B988BF]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#EEC6A2]/5 rounded-full blur-[100px]" />
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
            <span className="px-4 py-1.5 rounded-full bg-[#B988BF]/10 border border-[#B988BF]/25 text-[#B988BF] text-[10px] font-bold uppercase tracking-widest">
              Tráfego Pago
            </span>
            <span className="px-4 py-1.5 rounded-full bg-[#EEC6A2]/10 border border-[#EEC6A2]/25 text-[#EEC6A2] text-[10px] font-bold uppercase tracking-widest">
              Google Ads
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-8 leading-[1.15] tracking-tight font-manrope">
            Quer vender mais,<br />
            <span className="text-gradient">mas não sabe como?</span>
          </h2>

          {/* Body copy */}
          <div className="space-y-5 text-gray-400 text-base md:text-lg leading-relaxed max-w-lg">
            <p>
              Quando alguém pesquisa pelo seu serviço no Google, ela já decidiu comprar. Se o seu negócio não aparece ali, você está entregando esse cliente ao concorrente.
            </p>
            <p>
              Aparecer no topo não é sorte — é posicionamento. Colocamos a sua empresa na frente de quem já está procurando o que você oferece.
            </p>
          </div>

          {/* Highlight */}
          <p className="mt-8 text-lg md:text-xl font-bold text-white border-l-4 border-[#B988BF] pl-4">
            Aumente suas vendas com <span className="text-[#B988BF]">Google Ads</span>
          </p>

          {/* CTA */}
          <button
            onClick={onOpenModal}
            className="group relative flex h-[50px] w-full sm:min-w-[280px] sm:w-auto mt-8 self-center items-center justify-center rounded-none px-6 outline-none cursor-pointer transition-transform active:scale-95 bg-white/5 border-none"
            type="button"
          >
            <div className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-0" style={{ background: 'radial-gradient(15% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)', filter: 'blur(15px)' }}></div>
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-100" style={{ background: 'radial-gradient(60.6% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)', filter: 'blur(18px)' }}></div>
            <div className="pointer-events-none will-change-auto absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-0" style={{ background: 'radial-gradient(10.7% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)' }}></div>
            <div className="pointer-events-none will-change-auto absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-100" style={{ background: 'radial-gradient(60.1% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)' }}></div>
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-none">
              <div className="absolute -inset-[300%] animate-[spin_4s_linear_infinite]" style={{ background: 'conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 90%, #B988BF 100%)' }}></div>
            </div>
            <div className="absolute inset-[1px] rounded-none bg-black"></div>
            <span className="relative z-20 flex items-center justify-center gap-3 text-sm font-bold text-white tracking-wide uppercase">
              Quero aparecer no Google
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
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


const SistemaDeClientes = () => {
  return (
    <section id="sistema" className="py-24 relative px-6 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-6 font-manrope"
          >
            Clientes não aparecem por acaso.
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-xl">
            Empresas que crescem constroem um sistema.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div whileHover={{ y: -10 }} className="bg-black p-8 rounded-none border border-zinc-800 hover:border-[#B988BF]/50 transition-all flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#B988BF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
            <div className="w-14 h-14 rounded-full bg-[#B988BF]/10 flex items-center justify-center mb-6 text-[#B988BF] group-hover:scale-110 transition-transform duration-300">
              <Star size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-manrope">Posicionamento forte</h3>
            <p className="text-sm text-gray-400">Ser lembrado antes de ser comparado.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="bg-black p-8 rounded-none border border-zinc-800 hover:border-[#B988BF]/50 transition-all flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#B988BF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
            <div className="w-14 h-14 rounded-full bg-[#EEC6A2]/10 flex items-center justify-center mb-6 text-[#EEC6A2] group-hover:scale-110 transition-transform duration-300">
              <Target size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-manrope">Captação inteligente</h3>
            <p className="text-sm text-gray-400">Ser encontrado por quem já está procurando.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="bg-black p-8 rounded-none border border-zinc-800 hover:border-[#B988BF]/50 transition-all flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#B988BF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
            <div className="w-14 h-14 rounded-full bg-[#B988BF]/10 flex items-center justify-center mb-6 text-[#B988BF] group-hover:scale-110 transition-transform duration-300">
              <BarChart3 size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-manrope">Engajamento direcionado</h3>
            <p className="text-sm text-gray-400">Transformar interesse em clientes.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="bg-black/60 backdrop-blur-md p-8 rounded-none border border-white/10 hover:border-[#B988BF]/50 transition-all flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#B988BF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
            <div className="w-14 h-14 rounded-full bg-[#EEC6A2]/10 flex items-center justify-center mb-6 text-[#EEC6A2] group-hover:scale-110 transition-transform duration-300">
              <Cpu size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-manrope">Automação</h3>
            <p className="text-sm text-gray-400">Criar consistência no crescimento.</p>
          </motion.div>
        </div>
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
      className="bg-black/60 backdrop-blur-md p-6 md:p-8 rounded-none border border-white/10 hover:border-[#B988BF]/50 transition-all group relative overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#B988BF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#B988BF]/10 flex items-center justify-center mb-6 group-hover:bg-[#B988BF] transition-colors duration-500">
        <Icon className="text-[#B988BF] group-hover:text-white transition-colors duration-500" size={24} />
      </div>
      <h3 className="text-lg md:text-xl font-bold text-white mb-4 font-manrope">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-xs md:text-sm font-sans">
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
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-6 font-manrope"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B988BF]/10 border border-[#B988BF]/20 text-[#B988BF] text-sm font-bold mb-6">
                <Instagram size={18} />
                <span>Branding & Conteúdo</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 font-manrope">
                Posicionamento Premium que <br /> <span className="text-gradient">Gera Desejo</span>
              </h3>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                Transformamos sua marca em uma vitrine de alto padrão. Roteiros estratégicos e design sofisticado que transmitem a excelência do seu negócio antes mesmo da primeira reunião.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={20} className="text-[#B988BF]" />
                  <span>Identidade Visual Exclusiva</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={20} className="text-[#B988BF]" />
                  <span>Roteiros de Alta Conversão</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={20} className="text-[#B988BF]" />
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
              <div className="absolute inset-0 bg-gradient-to-tr from-[#B988BF]/20 to-transparent rounded-none blur-2xl -z-10" />
              <img
                src="/social-media-new.webp?v=1.1"
                alt="Instagram Marketing e Branding Estratégico"
                className="w-full h-auto rounded-none border border-zinc-800 shadow-2xl hover:scale-[1.02] transition-transform duration-700"
                width="600"
                height="600"
                loading="lazy"
                decoding="async"
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
              <div className="absolute inset-0 bg-gradient-to-bl from-[#EEC6A2]/10 to-transparent rounded-none blur-2xl -z-10" />
              <img
                src="/performance-new.webp?v=1.1"
                alt="Performance e Tráfego Pago"
                className="w-full h-auto rounded-none border border-zinc-800 shadow-2xl hover:scale-[1.02] transition-transform duration-700"
                width="600"
                height="600"
                loading="lazy"
                decoding="async"
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
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 font-manrope">
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



const PorQueEleveAI = () => {
  return (
    <section className="py-24 px-6 overflow-hidden bg-gradient-to-b from-transparent to-[#0A0A0B]/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-6 font-manrope">
            O que torna a <span className="text-gradient">EleveAI diferente.</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-xl max-w-2xl">
            Não focamos em ações isoladas. Construímos a estrutura que permite que seu negócio seja encontrado, desejado e escolhido.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/40 backdrop-blur-md p-8 md:p-10 rounded-none border border-white/10 hover:border-[#B988BF]/50 transition-all group relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#B988BF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
            <div className="w-14 h-14 rounded-full bg-[#B988BF]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Star className="text-[#B988BF]" size={28} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-manrope">Clareza de posicionamento</h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base font-sans">Mostramos o valor único do seu negócio para que o preço deixe de ser a única variável na decisão do cliente.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/40 backdrop-blur-md p-8 md:p-10 rounded-none border border-white/10 hover:border-[#EEC6A2]/50 transition-all group relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#EEC6A2] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
            <div className="w-14 h-14 rounded-full bg-[#EEC6A2]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Target className="text-[#EEC6A2]" size={28} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-manrope">Estratégia de atração de clientes</h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base font-sans">Desenhamos campanhas que trazem não apenas cliques, mas oportunidades reais e qualificadas de venda todos os dias.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/40 backdrop-blur-md p-8 md:p-10 rounded-none border border-white/10 hover:border-[#B988BF]/50 transition-all group relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#B988BF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
            <div className="w-14 h-14 rounded-full bg-[#B988BF]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Cpu className="text-[#B988BF]" size={28} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-manrope">Processos automatizados de crescimento</h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base font-sans">Implementamos sistemas que organizam seu relacionamento com o cliente, triplicando as chances de fechamento sem aumentar a carga da equipe.</p>
          </motion.div>
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
        className={`w-full text-left p-5 md:p-6 rounded-none flex justify-between items-center transition-all border ${isOpen ? 'bg-[#B988BF]/10 border-[#B988BF]/50 border-l-4 backdrop-blur-sm' : 'bg-black/40 backdrop-blur-md border-white/10 hover:border-[#B988BF]/30 hover:bg-white/5'}`}
      >
        <span className="text-base md:text-lg font-bold text-white pr-8 font-manrope">{question}</span>
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
    <div className="relative py-6 overflow-hidden bg-black/30 backdrop-blur-sm border-y border-white/5 bg-gradient-to-r from-transparent via-[#B988BF]/5 to-transparent">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10 pointer-events-none" />

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
    <section id="faq" className="py-24 px-6 scroll-mt-32">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 tracking-tighter font-manrope leading-[1.1]">Dúvidas Frequentes</h2>
          <p className="text-zinc-400 text-lg leading-relaxed font-sans max-w-3xl mx-auto">Entenda como podemos construir um crescimento previsível para sua empresa.</p>
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
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#B988BF]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto bg-black/60 backdrop-blur-md rounded-none p-12 md:p-20 text-center relative z-10 border border-white/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-8 tracking-tighter font-manrope leading-[1.1]">
            Seu negócio precisa de <span className="text-gradient">mais esforço</span> ou de <br className="hidden md:block" /> <span className="text-gradient">mais estrutura?</span>
          </h2>

          <p className="text-zinc-400 text-lg leading-relaxed font-sans max-w-3xl mx-auto mb-12">
            Empresas que crescem constroem sistemas de geração de clientes. Solicite seu diagnóstico e descubra como criar previsibilidade de vendas.
          </p>
          <div className="flex justify-center">
            <button
              onClick={onOpenModal}
              className="group relative flex h-[60px] w-auto sm:min-w-[320px] items-center justify-center rounded-none px-8 outline-none cursor-pointer transition-transform active:scale-95 bg-white/5 border-none"
              type="button"
            >
              <div className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-0" style={{ background: 'radial-gradient(15% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)', filter: 'blur(15px)' }}></div>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-100" style={{ background: 'radial-gradient(60.6% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)', filter: 'blur(18px)' }}></div>
              <div className="pointer-events-none will-change-auto absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-0" style={{ background: 'radial-gradient(10.7% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)' }}></div>
              <div className="pointer-events-none will-change-auto absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-100" style={{ background: 'radial-gradient(60.1% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)' }}></div>
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-none">
                <div className="absolute -inset-[300%] animate-[spin_4s_linear_infinite]" style={{ background: 'conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 90%, #B988BF 100%)' }}></div>
              </div>
              <div className="absolute inset-[1px] rounded-none bg-black"></div>
              <span className="relative z-20 flex items-center justify-center gap-3 text-base md:text-lg font-bold text-white tracking-wide uppercase">
                Receber análise estratégica
                <ArrowRight size={22} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </div>
          <p className="mt-8 text-sm text-gray-500 font-medium">Sem compromisso.</p>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = ({ onPrivacy, onTerms, onHome }: { onPrivacy: () => void, onTerms: () => void, onHome: () => void }) => {
  return (
    <footer className="relative bg-black/80 backdrop-blur-xl pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#B988BF] to-transparent shadow-[0_0_30px_rgba(185, 136, 191,0.8)]" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#B988BF] opacity-50" />

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-80 bg-[#B988BF]/30 sm:bg-[#B988BF]/20 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <div className="flex justify-center md:justify-start items-center gap-2 mb-8 cursor-pointer group pt-2" onClick={onHome}>
              <img
                src="/logo.png"
                alt="EleveAI - Marketing Estratégico"
                className="h-20 sm:h-32 w-auto object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-150 origin-center md:origin-left"
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
                  className={`w-12 h-12 rounded-none bg-white/5 border border-zinc-800 flex items-center justify-center ${btn.color} hover:text-white hover:border-[#B988BF]/50 transition-all`}
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
        whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 20px 40px rgba(37,211,102,0.4)" }}
        whileTap={{ scale: 0.9 }}
        className="relative w-11 h-11 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden group bg-gradient-to-br from-[#25D366] via-[#25D366] to-[#128C7E] border-2 border-zinc-700"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <WhatsAppIcon size={24} className="relative z-10 text-white drop-shadow-lg md:scale-125" />

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
                  <div className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#B988BF] group-hover:bg-[#B988BF]/10 transition-colors">
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
                className="w-full py-5 bg-[#B988BF] text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-[0_10px_30px_rgba(185,136,191,0.3)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)]"
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
                  <div className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#B988BF] group-hover:bg-[#B988BF]/10 transition-colors">
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
                className="w-full py-5 bg-[#B988BF] text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-[0_10px_30px_rgba(185,136,191,0.3)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)]"
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
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.9 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-[100] w-[calc(100%-3rem)] max-w-[400px]"
        >
          <div className="bg-black/60 backdrop-blur-2xl border border-white/10 p-5 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-5 relative overflow-hidden group">
            {/* Subtle light effect */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B988BF]/50 to-transparent" />
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 shrink-0 bg-[#B988BF]/10 flex items-center justify-center text-[#B988BF]">
                <Shield size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-gray-300 leading-snug font-medium pr-4">
                  Utilizamos cookies para otimizar sua experiência e personalizar nossas métricas de crescimento.
                </p>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAccept}
                className="flex-1 py-3 bg-[#B988BF] text-black font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all active:scale-95 shadow-lg"
              >
                Aceitar e Continuar
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
            Raio-X Estratégico de <span className="text-gradient hover-glow">Mercado</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed font-sans max-w-3xl mx-auto">
            Seu desafio não é apenas atrair cliques. É construir uma base sólida de vendas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div whileHover={{ y: -10 }} className="bg-black/60 backdrop-blur-md p-8 rounded-none border border-white/10 hover:border-[#B988BF]/50 transition-all flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#B988BF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
            <div className="w-14 h-14 rounded-full bg-[#B988BF]/10 flex items-center justify-center mb-6 text-[#B988BF] group-hover:scale-110 transition-transform duration-300">
              <Target size={28} />
            </div>
            <h3 className="text-white font-manrope text-xl md:text-2xl font-semibold tracking-tight uppercase mb-4">1. Visibilidade</h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">Negócios que até geram visitas, mas não atraem as oportunidades certas para vendas de alto ticket.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="bg-black/60 backdrop-blur-md p-8 rounded-none border border-white/10 hover:border-[#EEC6A2]/50 transition-all flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#EEC6A2] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
            <div className="w-14 h-14 rounded-full bg-[#EEC6A2]/10 flex items-center justify-center mb-6 text-[#EEC6A2] group-hover:scale-110 transition-transform duration-300">
              <TrendingUp size={28} />
            </div>
            <h3 className="text-white font-manrope text-xl md:text-2xl font-semibold tracking-tight uppercase mb-4">2. Fechamento</h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">Negócios que recebem contatos, mas não transformam o interesse em um avanço comercial previsível.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="bg-black/60 backdrop-blur-md p-8 rounded-none border border-white/10 hover:border-[#B988BF]/50 transition-all flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#B988BF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
            <div className="w-14 h-14 rounded-full bg-[#B988BF]/10 flex items-center justify-center mb-6 text-[#B988BF] group-hover:scale-110 transition-transform duration-300">
              <MessageCircle size={28} />
            </div>
            <h3 className="text-white font-manrope text-xl md:text-2xl font-semibold tracking-tight uppercase mb-4">3. Relacionamento</h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">Negócios que não mantêm continuidade com leads interessados e acabam perdendo o timing ideal da venda.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="bg-black/60 backdrop-blur-md p-8 rounded-none border border-white/10 hover:border-[#EEC6A2]/50 transition-all flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#EEC6A2] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
            <div className="w-14 h-14 rounded-full bg-[#EEC6A2]/10 flex items-center justify-center mb-6 text-[#EEC6A2] group-hover:scale-110 transition-transform duration-300">
              <BarChart3 size={28} />
            </div>
            <h3 className="text-white font-manrope text-xl md:text-2xl font-semibold tracking-tight uppercase mb-4">4. Escala</h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">Negócios que crescem no improviso, dependem demais dos sócios e não possuem uma estrutura replicável.</p>
          </motion.div>
        </div>

        <div className="text-center">
          <button
            onClick={onOpenModal}
            className="group relative flex h-[60px] w-auto sm:min-w-[320px] mx-auto items-center justify-center rounded-none px-8 outline-none cursor-pointer transition-transform active:scale-95 bg-white/5 border-none"
            type="button"
          >
            <div className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-0" style={{ background: 'radial-gradient(15% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)', filter: 'blur(15px)' }}></div>
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-100" style={{ background: 'radial-gradient(60.6% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)', filter: 'blur(18px)' }}></div>
            <div className="pointer-events-none will-change-auto absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-0" style={{ background: 'radial-gradient(10.7% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)' }}></div>
            <div className="pointer-events-none will-change-auto absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-100" style={{ background: 'radial-gradient(60.1% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)' }}></div>
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-none">
              <div className="absolute -inset-[300%] animate-[spin_4s_linear_infinite]" style={{ background: 'conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 90%, #B988BF 100%)' }}></div>
            </div>
            <div className="absolute inset-[1px] rounded-none bg-black"></div>
            <span className="relative z-20 flex items-center justify-center gap-3 text-base md:text-lg font-bold text-white tracking-wide uppercase font-manrope">
              Ver o Raio-X do Meu Negócio
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

    // 30-second timer trigger
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 30000);

    // 50% scroll trigger
    const handleScroll = () => {
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (maxScroll <= 0) return;
      const scrollPercent = (scrolled / maxScroll) * 100;

      if (scrollPercent >= 50) {
        setIsModalOpen(true);
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timer);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check immediately on mount in case of reload

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
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
            <EmpresasNotaveis />
            <DiagnosticBanner />
            <GoogleAdsPremium onOpenModal={handleOpenModal} />
            <SistemaDeClientes />
            <Benefits />
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
