import './index.css';
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { persistTrackingData, trackWhatsAppClick, startIntentTracking, getCookie } from './src/utils/tracking';
import { AcquisitionDashboard } from './src/pages/AcquisitionDashboard';
import { supabase } from './src/lib/supabase';

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
  ShieldCheck,
  Filter
} from 'lucide-react';

// Configuration
const WHATSAPP_URL = "https://wa.me/5519994671493?text=Ol%C3%A1%21+Gostaria+de+entender+como+a+EleveAI+pode+ajudar+meu+neg%C3%B3cio+a+estruturar+a+aquisi%C3%A7%C3%A3o+de+leads+e+converter+mais+oportunidades+em+vendas.";



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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    Object.entries(answers).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const formDataObj = Object.fromEntries(formData);

    const payload = {
      lead_name: formDataObj['Nome'] || '',
      lead_phone: formDataObj['WhatsApp'] || '',
      lead_email: null,
      service_interest: "Diagnóstico estratégico",
      lead_type: "diagnostic_form",
      status: "novo",
      qualification_rule: "diagnostic_modal_completed",
      observacao: `Negócio: ${formDataObj['Nome_Negocio'] || '-'}\nOrigem dos contatos: ${answers['Q1_Origem_Contatos'] || '-'}\nCampanhas/canais: ${answers['Q2_Campanhas_Criativos'] || '-'}\nIntenção do lead: ${answers['Q3_Intencao_Lead'] || '-'}`,
      utm_source: localStorage.getItem('utm_source') || null,
      utm_campaign: localStorage.getItem('utm_campaign') || null,
      utm_content: localStorage.getItem('utm_content') || null,
      landing_page: localStorage.getItem('landing_page') || window.location.pathname,
      current_page: window.location.pathname,
      click_time: new Date().toISOString(),
      valor: null,
      gclid: localStorage.getItem('gclid') || null,
      gbraid: localStorage.getItem('gbraid') || null,
      wbraid: localStorage.getItem('wbraid') || null,
      fbclid: localStorage.getItem('fbclid') || null,
      fbp: getCookie('_fbp') || localStorage.getItem('fbp') || null,
      fbc: getCookie('_fbc') || localStorage.getItem('fbc') || null,
      user_agent: navigator.userAgent || null
    };

    // 1. Primeiro salvar no Supabase
    try {
      const { error } = await supabase.from('leads').insert([payload]);
      if (error) throw error;
      console.log('Diagnostic form saved to Supabase');
    } catch (error) {
      console.error('Supabase diagnostic insert failed', error);
      setStatus('idle');
      alert('Houve um erro ao enviar. Tente novamente ou chame no WhatsApp.');
      return;
    }

    // 2. Se Supabase salvar com sucesso:
    setStatus('success');
    sessionStorage.setItem('eleveai-modal-submitted', 'true');
  };

  const questions = [
    {
      id: "Q1_Origem_Contatos",
      title: "Hoje seu negócio sabe de onde vêm os contatos que chegam pelo WhatsApp?",
      options: ["Sim, com clareza", "Tenho uma noção", "Não sei com precisão"],
      tip: "Entender a origem dos contatos mostra quais canais realmente geram oportunidades e evita investir no escuro."
    },
    {
      id: "Q2_Campanhas_Criativos",
      title: "Vocês conseguem identificar quais campanhas ou canais geram os melhores contatos?",
      options: ["Sim", "Parcialmente", "Não"],
      tip: "Quando o negócio sabe quais campanhas geram contatos melhores, fica mais fácil direcionar verba para o que realmente traz clientes."
    },
    {
      id: "Q3_Intencao_Lead",
      title: "Hoje vocês conseguem separar curiosos de pessoas com real intenção de compra ou contratação?",
      options: ["Sim", "Parcialmente", "Não"],
      tip: "Separar curiosos de contatos com intenção real ajuda a equipe a priorizar quem tem mais chance de virar proposta ou venda."
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
              <p className="text-gray-400">Nossa equipe analisará o rastreamento dos contatos do seu negócio e entrará em contato em breve.</p>
              <button
                onClick={onClose}
                className="mt-8 w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all border border-zinc-800"
              >
                Fechar
              </button>
            </div>
          ) : step <= 3 ? (
            <div key={step}>
              <div className="flex justify-between items-end mb-1">
                <h3 className="text-lg md:text-xl font-bold text-white max-w-xs leading-tight">Avalie o rastreamento dos contatos do seu negócio.</h3>
              </div>
              <p className="text-[11px] text-gray-400 mb-2">São só 3 perguntas rápidas. Leva menos de 15 segundos.</p>
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
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Seu negócio está pronto para crescer de forma previsível?</h3>
              <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
                Receba uma análise estratégica sobre rastreamento, origem dos contatos, intenção real e dados para escalar suas vendas de forma previsível.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label htmlFor="diag-nome" className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Seu Nome</label>
                  <input id="diag-nome" required type="text" name="Nome" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B988BF] transition-all" placeholder="Nome completo" />
                </div>

                <div>
                  <label htmlFor="diag-negocio" className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Nome do Negócio</label>
                  <input id="diag-negocio" required type="text" name="Nome_Negocio" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B988BF] transition-all" placeholder="Como se chama seu negócio?" />
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

const Navbar = ({ onHome, onWhatsApp }: { onHome: () => void, onWhatsApp: () => void }) => {
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
      <div className="fixed flex w-full z-50 pt-2 md:pt-3 px-3 md:px-4 top-0 left-0 justify-center" style={{ animation: 'fadeSlideIn 1s ease-out 0.2s both' }}>
        <nav
          className="flex md:gap-8 md:w-auto bg-[#1A1A1E]/90 md:bg-[#1A1A1E]/72 w-full max-w-5xl rounded-xl md:rounded-2xl py-0.5 px-3 md:px-5 shadow-lg md:shadow-[0_8px_24px_rgba(0,0,0,0.14)] backdrop-blur-sm border border-white/5 md:border-white/10 items-center justify-between"
        >
          {/* Logo */}
          <a href="#" aria-label="Voltar para o topo" className="flex items-center cursor-pointer" onClick={(e) => { e.preventDefault(); handleHomeClick(); }}>
            <img
              src="/logo.png"
              alt="EleveAI - Máquinas de Crescimento"
              width="200"
              height="80"
              className="h-[3.4rem] md:h-[3.25rem] w-auto object-contain transition-all hover:brightness-110 drop-shadow-sm brightness-[500%] md:brightness-100"
            />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-5 pr-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action ?? (() => scrollToSection(link.id!))}
                className="group hover:text-[#B988BF] transition-all text-[10px] uppercase tracking-[0.16em] font-bold text-zinc-300 font-manrope py-1 relative"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#B988BF] transition-all group-hover:w-full"></span>
              </button>
            ))}
            <button
              onClick={(e) => { e.preventDefault(); onWhatsApp(); }}
              className="bg-zinc-800/90 hover:bg-black text-white px-5 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-[0.14em] transition-all shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_18px_rgba(0,0,0,0.22)] hover:-translate-y-[1px]"
            >
              Agendar Avaliação
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-zinc-200 hover:text-white transition-colors p-3 -mr-1"
            >
              {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
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
            className="fixed inset-0 z-40 bg-[#0A0A0B]/94 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
          >
            {/* Close button */}
            <button
              aria-label="Fechar menu"
              onClick={closeMenu}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2"
            >
              <Plus className="rotate-45" size={24} aria-hidden="true" />
            </button>

            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={link.action ?? (() => scrollToSection(link.id!))}
                  className="text-xl font-extrabold text-white/65 hover:text-white transition-colors tracking-tight"
                >
                  {link.label}
                </motion.button>
              ))}

              {/* WhatsApp CTA */}
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: navLinks.length * 0.07 }}
                onClick={(e) => { onWhatsApp(); closeMenu(); }}
                className="mt-3 flex items-center gap-3 bg-[#B988BF] hover:bg-[#7a2cb3] text-white px-7 py-3.5 rounded-2xl font-bold text-base transition-all shadow-[0_10px_24px_rgba(185,136,191,0.28)] hover:shadow-[0_14px_30px_rgba(185,136,191,0.36)]"
              >
                Falar no WhatsApp
                <ArrowRight size={18} />
              </motion.button>
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

      <section id="hero" className="relative overflow-hidden pt-12 md:pt-[8.5rem] lg:pt-28 pb-12 lg:pb-16 min-h-[auto] lg:min-h-0">
        {/* Background Subtle Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#6B3FA0]/10 blur-[120px] rounded-full pointer-events-none z-0" />
        
        {/* Main container */}
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center text-center lg:text-left gap-8 lg:gap-16">

             {/* Immersive Background Image (Mobile Only) */}
             <div className="absolute inset-0 z-0 lg:hidden overflow-hidden">
               <img 
                 src="/heroimg.png" 
                 alt="" 
                 className="w-full h-full object-cover brightness-[0.7] contrast-[1.1] scale-110 object-top"
               />
               {/* Darker overlays for contrast and smooth transition */}
               <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/95 via-[#0A0A0B]/10 via-40% to-[#0A0A0B]" />
               <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B] to-transparent" />
             </div>

             {/* ========== LEFT COLUMN ========== */}
             <div className="w-full lg:w-[46%] flex flex-col items-center lg:items-start pt-2 lg:pt-0 relative z-20">
               

               {/* Headline */}
               <motion.h1 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.7, delay: 0.1 }}
                 className="text-[1.85rem] sm:text-[2.4rem] md:text-[3.8rem] lg:text-[3.6rem] font-extrabold leading-[1.05] tracking-tight text-white font-manrope text-center lg:text-left mb-5 lg:mb-6 mt-0 w-[95%] max-w-[500px] lg:max-w-none lg:w-full"
               >
                 {/* Desktop headline */}
                 <span className="hidden lg:inline">
                    Rastreie o caminho do{' '}
                    <span className="text-[#B988BF]">contato até a venda.</span>
                 </span>
                 {/* Mobile headline — kept as was */}
                 <span className="lg:hidden">
                    Rastreie o caminho do contato até a venda.<span className="text-[#B988BF]"></span>
                 </span>
               </motion.h1>

               {/* Subtitle */}
               <motion.p 
                 initial={{ opacity: 0, y: 15 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: 0.3 }}
                 className="text-[14px] sm:text-[15px] md:text-lg text-zinc-400 max-w-[480px] lg:max-w-[440px] mb-8 lg:mb-8 leading-relaxed font-light relative z-10 text-center lg:text-left"
               >
                 {/* Desktop subtitle */}
                 <span className="hidden lg:inline">
                    Conectamos página, WhatsApp, campanhas e acompanhamento comercial para mostrar de onde vêm seus contatos, quais têm intenção real e quais avançam para proposta ou venda.
                 </span>
                 {/* Mobile subtitle */}
                 <span className="lg:hidden">
                    Conectamos página, WhatsApp, campanhas e acompanhamento comercial para mostrar de onde vêm seus contatos, quais têm intenção real e quais avançam para proposta ou venda.
                 </span>
               </motion.p>

               {/* Trust Blocks - Mobile only */}
               <motion.div 
                 initial={{ opacity: 0, y: 15 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: 0.4 }}
                 className="lg:hidden w-full mb-8"
               >
                 <div className="flex items-center justify-center gap-3">
                   <div className="w-8 h-8 rounded-full flex items-center justify-center">
                     <Target size={14} className="text-[#A678CB]" />
                   </div>
                   <div className="text-left">
                     <p className="text-white font-bold text-sm leading-none">Foco total em performance</p>
                   </div>
                 </div>
               </motion.div>

               {/* Methodology strip — desktop only */}
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.45 }}
                 className="hidden lg:flex items-center gap-3 w-full max-w-md mb-8 bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3"
               >
                 <div className="w-8 h-8 flex items-center justify-center shrink-0">
                   <Star size={16} className="text-[#A678CB]" />
                 </div>
                 <p className="text-[13px] text-zinc-400 leading-snug">
                    <strong className="text-white font-semibold">Metodologia exclusiva.</strong> Rastreamento estratégico para decidir com dados, não no escuro.
                 </p>
               </motion.div>

               {/* Methodology Card - Mobile */}
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
                 className="flex lg:hidden items-center gap-4 w-full max-w-md mt-6 mb-8"
               >
                 <div className="w-10 h-10 flex items-center justify-center shrink-0">
                   <Star size={20} className="text-[#A678CB]" />
                 </div>
                 <div className="text-left">
                   <p className="text-[13px] md:text-[14px] text-zinc-300 leading-relaxed">
                      <strong className="text-white">Metodologia exclusiva.</strong> Rastreamento estratégico para entender origem, intenção, proposta e venda.
                   </p>
                 </div>
               </motion.div>

               {/* Spacer for mobile to reveal background image */}
               <div className="lg:hidden w-full min-h-[160px] sm:min-h-[200px]"></div>

               {/* Main CTA + secondary — Desktop Only */}
               <motion.div
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.4, delay: 0.6 }}
                 className="hidden lg:flex flex-col gap-3 w-full mb-6"
               >
                 {/* Primary CTA */}
                 <button
                   onClick={onOpenModal}
                   className="group relative h-[60px] w-full sm:w-auto sm:min-w-[300px] flex items-center justify-center rounded-2xl px-10 outline-none cursor-pointer transition-all active:scale-95 bg-white/5 border-none overflow-hidden z-10 shadow-[0_8px_30px_rgba(91,46,138,0.3)]"
                 >
                   <div className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-0" style={{ background: 'radial-gradient(15% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)', filter: 'blur(15px)' }}></div>
                   <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-100" style={{ background: 'radial-gradient(60.6% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)', filter: 'blur(18px)' }}></div>
                   <div className="pointer-events-none will-change-auto absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-0" style={{ background: 'radial-gradient(10.7% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)' }}></div>
                   <div className="pointer-events-none will-change-auto absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-100" style={{ background: 'radial-gradient(60.1% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)' }}></div>
                   <div className="pointer-events-none absolute inset-0 overflow-hidden">
                     <div className="absolute -inset-[300%] animate-[spin_4s_linear_infinite]" style={{ background: 'conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 90%, #B988BF 100%)' }}></div>
                   </div>
                   <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-r from-[#5B2E8A] to-[#3A1660] group-hover:from-[#6B3FA0] group-hover:to-[#4A2070] transition-colors"></div>
                   <span className="relative z-20 flex items-center justify-center gap-3 font-bold text-[13px] tracking-[0.06em] uppercase text-white font-manrope">
                      Quero rastrear meus contatos
                     <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                   </span>
                 </button>

                 {/* Secondary CTA */}
                 <button
                   onClick={() => document.getElementById('sistema')?.scrollIntoView({ behavior: 'smooth' })}
                   className="group h-[48px] w-full sm:w-auto sm:min-w-[300px] flex items-center justify-center gap-2 rounded-2xl border border-white/10 hover:border-white/20 bg-transparent text-zinc-400 hover:text-white transition-all text-[12px] font-semibold tracking-[0.06em] uppercase"
                 >
                   Ver como funciona
                   <ChevronDown size={14} className="transition-transform group-hover:translate-y-0.5" />
                 </button>
               </motion.div>

               {/* Trust Footer Row - Desktop Only */}
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.6, delay: 0.7 }}
                 className="hidden lg:flex flex-wrap justify-start gap-5 text-zinc-500 text-[10px] font-medium"
               >
                 <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-zinc-600" /> Sem compromisso</span>
                 <span className="flex items-center gap-1.5"><BarChart3 size={13} className="text-zinc-600" /> Análise personalizada</span>
                 <span className="flex items-center gap-1.5"><Clock size={13} className="text-zinc-600" /> Resposta em 24h</span>
               </motion.div>

             </div>

            {/* ========== RIGHT COLUMN — Desktop Dashboard Visual ========== */}
            <div className="hidden lg:flex w-full lg:w-[54%] relative flex-col items-end justify-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="relative w-full max-w-[580px] flex flex-col"
              >
                {/* Glow behind the card */}
                <div className="absolute -inset-6 bg-[#6B3FA0]/15 blur-[60px] rounded-3xl pointer-events-none" />

                {/* Main Dashboard Card */}
                <div className="relative bg-[#0F0F12]/90 border border-white/10 rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm">

                  {/* Card header bar */}
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.07] bg-black/30">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-[#B988BF]" />
                       <span className="text-[11px] font-bold text-white/70 uppercase tracking-[0.18em]">Painel de rastreamento</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-[10px] text-green-400 font-semibold">ao vivo</span>
                    </div>
                  </div>

                  {/* Metric pills row */}
                  <div className="grid grid-cols-4 gap-px bg-white/[0.05] border-b border-white/[0.07]">
                    {[
                      { label: 'Total', value: '24', color: 'text-white' },
                      { label: 'Novos', value: '8', color: 'text-blue-400' },
                      { label: 'Propostas', value: '6', color: 'text-[#B988BF]' },
                      { label: 'Fechados', value: '4', color: 'text-green-400' },
                    ].map((m) => (
                      <div key={m.label} className="bg-[#0F0F12] px-3 py-3 flex flex-col items-center gap-0.5">
                        <span className={`text-lg font-extrabold ${m.color} font-manrope`}>{m.value}</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Financial row */}
                  <div className="grid grid-cols-2 gap-px bg-white/[0.05] border-b border-white/[0.07]">
                    <div className="bg-[#0F0F12] px-4 py-3 flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#B988BF]/10 flex items-center justify-center shrink-0">
                        <TrendingUp size={13} className="text-[#B988BF]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Em proposta</p>
                        <p className="text-sm font-extrabold text-[#B988BF] font-manrope">R$ 22.400</p>
                      </div>
                    </div>
                    <div className="bg-[#0F0F12] px-4 py-3 flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                        <BarChart3 size={13} className="text-green-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Valor fechado</p>
                        <p className="text-sm font-extrabold text-green-400 font-manrope">R$ 9.800</p>
                      </div>
                    </div>
                  </div>

                  {/* Lead list */}
                  <div className="divide-y divide-white/[0.05]">
                    {[
                      { name: 'Marcos Oliveira', origem: 'google', campanha: 'search-brand', service: 'Estrutura completa', status: 'proposta', statusColor: 'bg-[#B988BF]/20 text-[#B988BF]', valor: 'R$ 4.800' },
                      { name: 'Juliana Ramos', origem: 'instagram', campanha: 'stories-maio', service: 'Intenção real', status: 'novo', statusColor: 'bg-blue-500/15 text-blue-400', valor: '—' },
                      { name: 'Ricardo Alves', origem: 'whatsapp', campanha: 'direto', service: 'Venda rastreada', status: 'fechado', statusColor: 'bg-green-500/15 text-green-400', valor: 'R$ 3.200' },
                      { name: 'Camila Souza', origem: 'google', campanha: 'pmax-sp', service: 'Origem clara', status: 'conversou', statusColor: 'bg-amber-500/15 text-amber-400', valor: '—' },
                    ].map((lead, i) => (
                      <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors">
                        {/* Avatar */}
                        <div className="w-7 h-7 rounded-full bg-[#B988BF]/10 border border-white/10 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-[#B988BF]">{lead.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-[12px] font-semibold text-white truncate">{lead.name}</p>
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full shrink-0 ${lead.statusColor}`}>{lead.status}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-zinc-500 font-mono bg-white/5 px-1.5 py-0.5 rounded">{lead.origem}</span>
                            <span className="text-[10px] text-zinc-600 truncate">{lead.campanha}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[11px] font-bold text-zinc-300">{lead.valor}</p>
                          <p className="text-[9px] text-zinc-600 truncate max-w-[80px]">{lead.service}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-2.5 border-t border-white/[0.07] flex items-center justify-between bg-black/20">
                    <span className="text-[10px] text-zinc-600">Atualizado agora mesmo</span>
                    <span className="text-[10px] text-[#B988BF] font-semibold cursor-pointer hover:underline">Ver todas →</span>
                  </div>
                </div>

                {/* Horizontal Origin breakdown — Positioned BELOW the dashboard, FULL WIDTH */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="mt-4 w-full bg-[#0F0F12]/95 border border-white/10 rounded-xl p-4 shadow-2xl backdrop-blur-md flex items-center justify-between gap-6"
                >
                  <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 whitespace-nowrap">Origem dos contatos</p>
                  <div className="flex-1 flex items-center gap-5">
                    {[
                      { label: 'Google Ads', pct: 54, color: 'bg-[#B988BF]' },
                      { label: 'Instagram', pct: 29, color: 'bg-blue-400' },
                      { label: 'WhatsApp', pct: 17, color: 'bg-green-400' },
                    ].map((o) => (
                      <div key={o.label} className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-[10px] text-zinc-400">{o.label}</span>
                          <span className="text-[10px] text-white font-bold">{o.pct}%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full ${o.color} rounded-full`} style={{ width: `${o.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Floating card — WhatsApp quick action */}
                <motion.div
                  initial={{ opacity: 0, y: 10, x: 10 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="absolute -right-6 top-[55%] bg-[#0F0F12]/95 border border-white/10 rounded-xl p-3 shadow-2xl backdrop-blur-md flex items-center gap-2.5 w-[168px]"
                >
                  <div className="w-8 h-8 rounded-xl bg-green-500/15 flex items-center justify-center shrink-0">
                    <WhatsAppIcon size={16} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white leading-tight">Marcos Oliveira</p>
                    <p className="text-[9px] text-zinc-500 leading-tight">Proposta enviada · aguardando</p>
                  </div>
                </motion.div>
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
          className="w-full lg:hidden flex flex-col items-center -mt-20 mb-8 overflow-hidden relative z-20"
        >
          <p className="text-[11px] text-[#A678CB] font-bold uppercase tracking-[0.2em] mb-6 px-5 text-center">
            O QUE NEGÓCIOS PERCEBEM APÓS ESTRUTURAR A AQUISIÇÃO
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
                    { quote: "A gente investia em anúncios, mas não sabia quais canais realmente geravam clientes. Depois da estrutura, ficou claro de onde vinham os contatos.", author: "Rafael M.", info: "prestação de serviços – SP" },
                    { quote: "Percebemos que o problema não era só tráfego, e sim o atendimento sem contexto. Ajustando isso, começamos a converter muito mais.", author: "Ana C.", info: "comércio local – interior de SP" },
                    { quote: "Começamos a ter mais consistência nas vendas, não só picos. Hoje entendemos melhor qual campanha traz o lead certo.", author: "Felipe S.", info: "serviços B2C – capital" }
                  ].map((testi, i) => (
                    <div key={i} className="w-[280px] p-4 flex flex-col shrink-0">
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

        {/* Mobile CTA - Positioned below testimonials */}
        <div className="w-full lg:hidden flex flex-col items-center px-5 pb-8 relative z-20">
          <motion.button 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            onClick={onOpenModal}
            className="group relative flex h-[60px] w-full items-center justify-center rounded-2xl px-6 outline-none cursor-pointer transition-all active:scale-95 bg-white/5 border-none overflow-hidden mb-6 z-10 shadow-[0_8px_30px_rgba(91,46,138,0.3)]"
          >
            <div className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-0" style={{ background: 'radial-gradient(15% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)', filter: 'blur(15px)' }}></div>
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-100" style={{ background: 'radial-gradient(60.6% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)', filter: 'blur(18px)' }}></div>
            <div className="pointer-events-none will-change-auto absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-0" style={{ background: 'radial-gradient(10.7% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)' }}></div>
            <div className="pointer-events-none will-change-auto absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-100" style={{ background: 'radial-gradient(60.1% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)' }}></div>
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -inset-[300%] animate-[spin_4s_linear_infinite]" style={{ background: 'conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 90%, #B988BF 100%)' }}></div>
            </div>
            <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-r from-[#5B2E8A] to-[#3A1660] group-hover:from-[#6B3FA0] group-hover:to-[#4A2070] transition-colors"></div>
            <span className="relative z-20 flex items-center justify-center gap-3 font-bold text-[13px] tracking-[0.05em] uppercase text-white font-manrope">
              Quero rastrear meus contatos
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </span>
          </motion.button>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4 text-zinc-500 text-[10px] font-medium"
          >
            <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-zinc-600" /> Sem compromisso</span>
            <span className="flex items-center gap-1.5"><BarChart3 size={13} className="text-zinc-600" /> Análise personalizada</span>
            <span className="flex items-center gap-1.5"><Clock size={13} className="text-zinc-600" /> Resposta em 24h</span>
          </motion.div>
        </div>
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
}
const GoogleAdsPremium = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const mockupFlowVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.28
      }
    }
  };
  const mockupCardVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 14 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut" as const
      }
    }
  };
  const mockupConnectorVariants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: {
        duration: 0.45,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section className="py-24 lg:py-32 relative px-6 overflow-hidden bg-ice border-y border-black/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* ── Left Column ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start"
        >
          {/* Badge */}
          <div className="flex gap-2 mb-8">
            <span className="px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.15em]">
              Estruturação Comercial
            </span>
          </div>

          {/* Title - Refined for desktop */}
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-graphite mb-6 lg:mb-8 leading-[1.15] lg:leading-[1.2] tracking-tight font-manrope max-w-[600px]">
            O problema não é receber contatos. <br className="hidden lg:block" />
            <span className="text-primary">É operar no escuro depois que eles chegam.</span>
          </h2>

          {/* Body copy - Improved hierarchy and line-height */}
          <div className="space-y-4 lg:space-y-5 text-gray-500 max-w-[500px]">
            <p className="text-graphite font-semibold text-lg lg:text-[1.15rem] leading-[1.4]">
              Muitas empresas recebem mensagens todos os dias, mas não sabem quais canais trazem bons contatos, quais conversas viram proposta e quais vendas poderiam ser repetidas.
            </p>
            <p className="text-base lg:text-[1.05rem] leading-[1.7] font-light">
              Sem contexto comercial, o atendimento depende de memória, percepção e tentativa. A decisão sobre investimento fica presa em volume de mensagens, não em qualidade de oportunidade.
            </p>
          </div>

          {/* Highlight - Lighter visual weight */}
          <div className="mt-8 lg:mt-10 border-l-[3px] border-primary/30 pl-5 py-1">
            <p className="text-[11px] lg:text-[12px] uppercase font-bold text-primary/80 tracking-[0.15em]">
              O volume aparece. A qualidade, o avanço e o aprendizado ficam invisíveis.
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={onOpenModal}
            className="group relative flex h-[56px] lg:h-[60px] w-full sm:min-w-[300px] sm:w-auto mt-10 px-10 items-center justify-center rounded-2xl outline-none cursor-pointer transition-all active:scale-95 hover:scale-[1.02] bg-[#0A0A0B] border-none overflow-hidden shadow-[0_15px_40px_rgba(10,10,11,0.12)]"
            type="button"
          >
            <div className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-0" style={{ background: 'radial-gradient(15% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)', filter: 'blur(15px)' }}></div>
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-100" style={{ background: 'radial-gradient(60.6% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)', filter: 'blur(18px)' }}></div>
            <div className="absolute inset-[1px] rounded-2xl bg-[#0F0F12] hover:bg-[#1A1A1E] transition-colors"></div>
            <span className="relative z-20 flex items-center justify-center text-white text-[11px] font-bold tracking-[0.15em] uppercase font-manrope">
              Quero rastrear meus contatos
              <ArrowRight size={18} className="ml-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>

        {/* ── Right Column: Commercial Structure Mockup ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex justify-center lg:justify-end w-full mt-10 lg:mt-0"
        >
           {/* Structure Mockup container */}
           <div className="relative w-full max-w-[540px] bg-white rounded-[2rem] border border-black/[0.08] shadow-[0_24px_70px_rgba(15,15,18,0.09)] overflow-hidden flex flex-col p-5 sm:p-8 lg:p-9">
             
             {/* Background accents */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[50px] pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/5 rounded-full blur-[50px] pointer-events-none" />

             {/* Header */}
             <div className="mb-7 sm:mb-8 relative z-10">
               <div className="flex items-start justify-between gap-4 mb-3">
                 <div className="flex items-center gap-3">
                   <span className="relative flex h-2 w-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                   </span>
                   <p className="text-[15px] sm:text-base lg:text-[17px] font-extrabold text-graphite tracking-tight uppercase leading-snug">O que um rastreamento correto revela</p>
                 </div>
                 <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center text-primary shrink-0">
                   <Target size={15} />
                 </div>
               </div>
               <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed font-medium max-w-[440px]">
                 O painel é apenas a forma visual de conectar os sinais que mostram qualidade comercial.
               </p>
             </div>

             {/* Flow Container */}
             <motion.div
               className="flex-1 flex flex-col gap-4 sm:gap-5 relative z-10"
               variants={mockupFlowVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.35 }}
             >
               
               {/* 1. Origin Step */}
               <motion.div
                 variants={mockupCardVariants}
                 className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(15,15,18,0.06)] border border-gray-200/80 flex flex-col gap-3 relative"
               >
                 <div className="flex items-center gap-3.5 relative z-10 bg-white">
                   <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-200 text-gray-700">
                     <Filter size={17} />
                   </div>
                   <p className="text-[18px] sm:text-xl font-extrabold text-graphite leading-tight">1. Origem do contato</p>
                 </div>
                 <p className="text-[15px] sm:text-base text-gray-700 leading-relaxed pl-[3.35rem] pr-1 relative z-10">
                   Você sabe se o contato veio do Google, Instagram, anúncio, orgânico ou indicação.
                 </p>
                 <div className="flex flex-wrap gap-2 pl-[3.35rem] mt-1 relative z-10">
                   <span className="text-[10px] sm:text-[11px] font-extrabold bg-primary/10 text-primary px-2.5 py-1 rounded-md uppercase tracking-wider border border-primary/10">Google Ads</span>
                   <span className="text-[10px] sm:text-[11px] font-extrabold bg-blue-500/10 text-blue-700 px-2.5 py-1 rounded-md uppercase tracking-wider border border-blue-500/10">Instagram</span>
                   <span className="text-[10px] sm:text-[11px] font-extrabold bg-green-500/10 text-green-700 px-2.5 py-1 rounded-md uppercase tracking-wider border border-green-500/10">WhatsApp</span>
                 </div>
                 {/* Connector line down */}
                 <motion.div
                   variants={mockupConnectorVariants}
                   className="absolute left-[38px] top-[52px] bottom-[-28px] w-[3px] origin-top bg-gradient-to-b from-gray-300 to-transparent z-0"
                 />
               </motion.div>

               {/* 2. Lead Context Step */}
               <motion.div
                 variants={mockupCardVariants}
                 className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(15,15,18,0.06)] border border-gray-200/80 flex flex-col gap-3 relative z-10 sm:ml-4"
               >
                 <div className="flex items-center gap-3.5 relative z-10 bg-white">
                   <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0 border border-green-200">
                     <WhatsAppIcon size={17} className="text-green-600" />
                   </div>
                   <p className="text-[18px] sm:text-xl font-extrabold text-graphite leading-tight">2. Intenção real</p>
                 </div>
                 <p className="text-[15px] sm:text-base text-gray-700 leading-relaxed pl-[3.35rem] pr-1 relative z-10">
                   Você identifica quem apenas clicou e quem demonstrou interesse suficiente para virar oportunidade.
                 </p>
                 <div className="pl-[3.35rem] mt-1 relative z-10">
                   <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5">
                     <p className="text-sm font-extrabold text-graphite mb-1">Marcos Albuquerque</p>
                     <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">"Quero entender melhor antes de pedir uma proposta."</p>
                   </div>
                 </div>
                 {/* Connector line down */}
                 <motion.div
                   variants={mockupConnectorVariants}
                   className="absolute left-[38px] top-[52px] bottom-[-28px] w-[3px] origin-top bg-gradient-to-b from-gray-300 to-transparent z-0"
                 />
               </motion.div>

               {/* 3. Commercial Progress Step */}
               <motion.div
                 variants={mockupCardVariants}
                 className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_12px_34px_rgba(104,37,154,0.08)] border border-primary/25 flex flex-col gap-3 relative z-10 sm:ml-8"
               >
                 <div className="flex items-center gap-3.5 relative z-10 bg-white">
                   <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                     <BarChart3 size={17} className="text-primary" />
                   </div>
                   <p className="text-[18px] sm:text-xl font-extrabold text-graphite leading-tight">3. Avanço comercial</p>
                 </div>
                 <p className="text-[15px] sm:text-base text-gray-700 leading-relaxed pl-[3.35rem] pr-1 relative z-10">
                   Você acompanha se o contato virou conversa, proposta, venda ou perda.
                 </p>
                 <div className="pl-[3.35rem] mt-3 relative z-10">
                   {/* Progress tracker */}
                   <div className="flex items-center justify-between relative mb-4 mx-1 sm:mx-2">
                     <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-gray-200 -z-10 rounded-full" />
                     <motion.div
                       variants={{
                         hidden: { width: "0%" },
                         visible: {
                           width: "66.666%",
                           transition: { duration: 0.55, ease: "easeOut" as const }
                         }
                       }}
                       className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] bg-primary -z-10 rounded-full"
                     />
                     
                     <div className="w-4 h-4 rounded-full bg-primary ring-[3px] ring-white shadow-sm" />
                     <div className="w-4 h-4 rounded-full bg-primary ring-[3px] ring-white shadow-sm" />
                     <div className="w-4 h-4 rounded-full bg-primary ring-[3px] ring-white shadow-sm" />
                     <div className="w-4 h-4 rounded-full bg-gray-300 ring-[3px] ring-white shadow-sm" />
                   </div>
                   <div className="grid grid-cols-4 gap-1 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wide text-gray-600">
                     <span className="text-primary">Novo</span>
                     <span className="text-primary text-center">Conversa</span>
                     <span className="text-primary text-center">Proposta</span>
                     <span className="text-right">Fechado</span>
                   </div>
                 </div>
                 {/* Connector line down */}
                 <motion.div
                   variants={mockupConnectorVariants}
                   className="absolute left-[38px] top-[52px] bottom-[-28px] w-[3px] origin-top bg-gradient-to-b from-gray-300 to-transparent z-0"
                 />
               </motion.div>

               {/* 4. Next Step */}
               <motion.div
                 variants={mockupCardVariants}
                 className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(15,15,18,0.06)] border border-gray-200/80 flex flex-col gap-3 relative z-10 sm:ml-12"
               >
                 <div className="flex items-center gap-3.5 relative z-10 bg-white">
                   <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-200">
                     <Clock size={17} className="text-orange-600" />
                   </div>
                   <p className="text-[18px] sm:text-xl font-extrabold text-graphite leading-tight">4. Decisão com dados</p>
                 </div>
                 <p className="text-[15px] sm:text-base text-gray-700 leading-relaxed pl-[3.35rem] pr-1 relative z-10">
                   Você entende quais canais trazem clientes melhores e onde vale investir mais.
                 </p>
               </motion.div>

             </motion.div>
           </div>
        </motion.div>

      </div>
    </section>





  );
};

const PacientesQualificados = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const steps = [
    { tag: "1", icon: Target, title: "Sinal de origem", desc: "Mostra de qual canal, campanha, página ou busca o contato veio." },
    { tag: "2", icon: MessageCircle, title: "Sinal de intenção", desc: "Ajuda a separar curiosidade de procura real por solução, prazo ou orçamento." },
    { tag: "3", icon: UserCheck, title: "Sinal comercial", desc: "Indica se houve conversa, prioridade, follow-up e proposta em andamento." },
    { tag: "4", icon: CheckCircle2, title: "Sinal de resultado", desc: "Registra o que virou venda, perda ou oportunidade ainda aberta." },
    { tag: "5", icon: BarChart3, title: "Sinal para otimização", desc: "Mostra o que deve receber mais verba, ajuste ou atenção comercial." }
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
            Antes de escalar campanhas, organize os sinais que mostram qualidade.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-sans leading-relaxed"
          >
            Cliques, visitas e mensagens não contam a história inteira. Para melhorar campanhas, você precisa saber quais contatos têm intenção real, quais avançam para proposta e quais realmente viram venda.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-5 relative">
          <div className="hidden lg:block absolute top-[4.5rem] left-[7%] right-[7%] h-[2px] bg-primary/10 -z-10" />

          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white p-7 rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col items-center text-center relative group"
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
              "Campanhas só melhoram de verdade quando o negócio sabe o que vira oportunidade e venda."
            </p>
          </div>

          <button
            onClick={onOpenModal}
            className="group relative flex h-[60px] w-full sm:w-auto items-center justify-center rounded-xl px-10 outline-none cursor-pointer transition-all active:scale-95 bg-[#0A0A0B] border-none overflow-hidden shadow-[0_15px_40px_rgba(10,10,11,0.15)]"
            type="button"
          >
            <div className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-0" style={{ background: 'radial-gradient(15% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)', filter: 'blur(15px)' }}></div>
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-100" style={{ background: 'radial-gradient(60.6% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)', filter: 'blur(18px)' }}></div>
            <div className="pointer-events-none will-change-auto absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-0" style={{ background: 'radial-gradient(10.7% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)' }}></div>
            <div className="pointer-events-none will-change-auto absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-100" style={{ background: 'radial-gradient(60.1% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)' }}></div>
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -inset-[300%] animate-[spin_4s_linear_infinite]" style={{ background: 'conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 90%, #B988BF 100%)' }}></div>
            </div>
            <div className="absolute inset-[1px] rounded-[11px] bg-[#68259A] hover:bg-[#7a32b3] transition-colors shadow-[0_10px_30px_rgba(104,37,154,0.3)]"></div>
            <span className="relative z-20 flex items-center justify-center text-white text-[11px] md:text-[12px] font-bold tracking-[0.15em] uppercase font-manrope">
              Quero rastrear meus contatos →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const WhatsAppFunnel = () => {
  const cards = [
    { icon: Target, title: "Entrada com contexto", desc: "O contato chega com origem, campanha, página e interesse associados à conversa." },
    { icon: Zap, title: "Atendimento com prioridade", desc: "A equipe identifica quem merece resposta mais rápida e abordagem mais consultiva." },
    { icon: TrendingUp, title: "Proposta acompanhada", desc: "Oportunidades em negociação ficam visíveis para follow-up e próxima ação." },
    { icon: CheckCircle2, title: "Venda registrada", desc: "Fechamentos e perdas voltam para a leitura comercial e ajudam a melhorar decisões." },
  ];

  return (
    <section className="py-24 md:py-32 relative px-6 overflow-hidden bg-graphite border-y border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[560px] h-[560px] bg-green-500/[0.05] blur-[140px] rounded-full pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex mb-6 rounded-full border border-green-400/15 bg-green-400/[0.06] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-green-300">
              WhatsApp no funil
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 font-manrope tracking-tight leading-[1.08]">
              Se o WhatsApp é onde a venda começa, ele precisa fazer parte do rastreamento.
            </h2>
            <p className="text-zinc-400 max-w-2xl text-lg md:text-xl font-sans leading-relaxed">
              Sem origem, intenção e avanço comercial, o WhatsApp vira apenas uma caixa de mensagens - não uma fonte de aprendizado para vendas.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {cards.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="bg-white/[0.035] border border-white/[0.08] rounded-2xl p-6 hover:border-green-400/25 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-green-400/10 text-green-300 flex items-center justify-center mb-5">
                  <item.icon size={22} />
                </div>
                <h3 className="text-white font-manrope text-lg font-bold mb-3 leading-snug">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
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
            Oportunidades esfriam quando chegam <span className="text-primary font-manrope">sem contexto.</span>
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl font-sans leading-relaxed">
            A perda nem sempre acontece por falta de interesse. Muitas vezes ela nasce de pequenos vazamentos na rotina comercial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: CheckCircle2, title: "Resposta sem prioridade", desc: "Todos parecem iguais quando a equipe não sabe origem, urgência ou nível de intenção." },
            { icon: MessageCircle, title: "Conversa sem histórico", desc: "O atendimento recomeça do zero e perde contexto sobre campanha, busca ou necessidade." },
            { icon: TrendingUp, title: "Proposta sem acompanhamento", desc: "Negociações abertas dependem de lembrança individual e podem esfriar sem follow-up." },
            { icon: BarChart3, title: "Venda sem registro", desc: "O negócio fecha clientes, mas não transforma o resultado em aprendizado para decidir melhor." },
            { icon: Target, title: "Canal sem leitura", desc: "Google, Instagram, indicação e orgânico são comparados por volume, não por qualidade." },
            { icon: Zap, title: "Equipe dependente da memória", desc: "Quando o processo vive na cabeça do time, a operação perde consistência e leitura." },
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





const FAQItem = ({ question, answer, isOpen, toggle, index }: any) => {
  return (
    <div className="bg-white/[0.035] border border-white/[0.08] rounded-2xl overflow-hidden relative group transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.055]">
      <button
        className="w-full p-5 md:p-6 text-left flex justify-between items-center gap-5 transition-colors"
        onClick={toggle}
      >
        <span className="flex items-start gap-4">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-[10px] font-extrabold text-primary">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-base md:text-lg font-bold text-white font-manrope leading-snug">{question}</span>
        </span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-primary">
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 md:px-6 md:pb-7 md:pl-[4.75rem] text-zinc-400 leading-relaxed text-sm md:text-[15px]">
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
    "ESTRUTURA COMERCIAL",
    "INTELIGÊNCIA ARTIFICIAL",
    "AQUISIÇÃO DE LEADS",
    "AUTOMAÇÃO DE VENDAS",
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

const FAQ = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Isso é gestão de tráfego?",
      answer: "Não. A gestão de tráfego pode usar os dados depois, mas a entrega principal é organizar a leitura comercial: origem, intenção, atendimento, proposta e venda."
    },
    {
      question: "Isso é só um CRM?",
      answer: "Não. O CRM é uma parte da operação. O foco é criar rastreamento estratégico para entender qualidade de contato, avanço comercial e resultado."
    },
    {
      question: "Preciso investir em anúncios?",
      answer: "Não necessariamente. A estrutura também ajuda negócios que recebem contatos por orgânico, indicação, Google, Instagram ou WhatsApp direto. Anúncios entram melhor quando os sinais de qualidade já estão claros."
    },
    {
      question: "O que vou conseguir enxergar?",
      answer: "Você enxerga de onde veio cada contato, qual intenção apareceu, se houve atendimento, proposta, fechamento ou perda, e quais canais geram oportunidades com mais qualidade."
    },
    {
      question: "Minha equipe precisa preencher tudo manualmente?",
      answer: "Não. Parte dos dados de origem e contexto entra automaticamente. O preenchimento humano fica concentrado no avanço comercial, como proposta, venda ou perda."
    },
    {
      question: "Isso ajuda Google e Meta?",
      answer: "Ajuda a criar sinais mais úteis para otimização. Em vez de olhar só clique ou lead, a operação passa a separar quais contatos viraram oportunidade, proposta ou venda."
    },
    {
      question: "Para quais empresas serve?",
      answer: "Serve para negócios que vendem por atendimento, orçamento, proposta ou conversa consultiva, especialmente quando o WhatsApp é parte importante da jornada comercial."
    },
    {
      question: "Qual é o primeiro passo?",
      answer: "O primeiro passo é um diagnóstico simples da sua estrutura atual: como os contatos chegam, onde eles se perdem, quais canais você usa e como sua equipe acompanha propostas e fechamentos."
    }
  ];

  return (
    <section id="faq" className="py-24 md:py-32 px-6 scroll-mt-32 bg-graphite relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-primary/[0.06] blur-[140px] rounded-full pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14 md:mb-16">
          <span className="inline-flex mb-5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            Perguntas frequentes
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight font-manrope leading-tight">
            Dúvidas antes de estruturar o rastreamento
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-sans max-w-2xl mx-auto">
            Respostas diretas para entender o que é, o que não é e como a estrutura ajuda a operação comercial.
          </p>
        </div>
        <div className="grid gap-3 md:gap-4">
          {faqs.map((f, i) => (
            <FAQItem
              key={i}
              {...f}
              index={i}
              isOpen={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
        <div className="mt-12 md:mt-14 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-white font-bold text-xl md:text-2xl font-manrope tracking-tight">
              Veja quais perguntas sua operação ainda não consegue responder.
            </p>
            <p className="mt-2 text-sm md:text-base text-zinc-400">
              O diagnóstico indica quais sinais precisam ser organizados primeiro.
            </p>
          </div>
          <button
            onClick={onOpenModal}
            className="group relative flex h-[54px] w-full md:w-auto md:min-w-[280px] items-center justify-center rounded-xl px-7 outline-none cursor-pointer transition-all active:scale-95 bg-white/5 border-none overflow-hidden"
            type="button"
          >
            <div className="absolute inset-[1px] rounded-[11px] bg-[#68259A] group-hover:bg-[#7a32b3] transition-colors shadow-[0_10px_28px_rgba(104,37,154,0.26)]"></div>
            <span className="relative z-20 flex items-center justify-center gap-3 text-white text-[11px] md:text-[12px] font-bold tracking-[0.12em] uppercase font-manrope">
              Quero rastrear meus contatos
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

const SEOGuides = () => {
  return (
    <section className="py-16 md:py-20 px-6 bg-graphite relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 md:p-8"
        >
          <div className="flex flex-col gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex mb-4 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Guias EleveAI
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-manrope">
                Guias para vender com mais clareza
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Como ter mais clientes entendendo o que realmente gera vendas",
                  text: "Entenda por que mais contatos não bastam se você não sabe de onde vêm, quais têm intenção real e quais viram venda.",
                  href: "/como-ter-mais-clientes/"
                },
                {
                  title: "Como atrair o cliente certo e parar de depender de contatos sem intenção",
                  text: "Entenda como diferenciar contatos curiosos de pessoas com maior chance de avançar para proposta ou venda.",
                  href: "/atrair-cliente-certo/"
                },
                {
                  title: "Lead qualificado: como identificar contatos com real intenção",
                  text: "Entenda por que nem todo contato tem a mesma chance de virar proposta ou venda.",
                  href: "/lead-qualificado/"
                }
              ].map((guide) => (
                <a
                  key={guide.href}
                  href={guide.href}
                  className="group block rounded-xl border border-white/[0.08] bg-black/20 p-5 md:p-6 transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.045]"
                >
                  <h3 className="font-manrope text-lg md:text-xl font-bold text-white leading-snug">
                    {guide.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-zinc-400">
                    {guide.text}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-primary transition-colors group-hover:text-white">
                    Ler guia
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
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
            Você já recebe contatos. <br className="hidden md:block" />
            <span className="text-[#B988BF]">Agora precisa rastrear o que vira proposta e venda.</span>
          </h2>

          <p className="text-zinc-400 text-lg md:text-2xl leading-relaxed font-manrope max-w-2xl mb-14 font-light">
            Organize a leitura entre origem, intenção, atendimento e resultado para decidir com mais clareza onde investir e o que melhorar.
          </p>

          <div className="flex flex-col items-start gap-8">
            <button
              onClick={onOpenModal}
              className="group relative flex h-[68px] w-full sm:w-auto items-center justify-center rounded-xl outline-none cursor-pointer transition-all active:scale-95 bg-white/5 border-none overflow-hidden px-12"
              type="button"
            >
              <div className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-0" style={{ background: 'radial-gradient(15% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)', filter: 'blur(15px)' }}></div>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-100" style={{ background: 'radial-gradient(60.6% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)', filter: 'blur(18px)' }}></div>
              <div className="pointer-events-none will-change-auto absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-0" style={{ background: 'radial-gradient(10.7% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)' }}></div>
              <div className="pointer-events-none will-change-auto absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-in-out group-hover:opacity-100" style={{ background: 'radial-gradient(60.1% 50% at 50% 100%, #B988BF 0%, rgba(185, 136, 191, 0) 100%)' }}></div>
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -inset-[300%] animate-[spin_4s_linear_infinite]" style={{ background: 'conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 90%, #B988BF 100%)' }}></div>
              </div>
              <div className="absolute inset-[1px] rounded-[11px] bg-gradient-to-r from-[#5B2E8A] to-[#3A1660] group-hover:from-[#6B3FA0] group-hover:to-[#4A2070] transition-colors shadow-[0_10px_40px_rgba(91,46,138,0.3)]"></div>
              <span className="relative z-20 flex items-center justify-center text-white text-[12px] md:text-[13px] font-bold tracking-[0.1em] uppercase font-manrope">
                Quero rastrear meus contatos →
              </span>
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

const Footer = ({ onPrivacy, onTerms, onHome, onWhatsApp }: { onPrivacy: () => void, onTerms: () => void, onHome: () => void, onWhatsApp: () => void }) => {
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
                { icon: WhatsAppIcon, isWhatsApp: true, color: "text-[#4ADE80]" }
              ].map((btn, i) => (
                <motion.button
                  key={i}
                  whileHover={{ y: -3, backgroundColor: "rgba(185, 136, 191, 0.2)" }}
                  onClick={btn.isWhatsApp ? onWhatsApp : undefined}
                  className={`w-12 h-12 rounded-full bg-white/5 border border-zinc-800 flex items-center justify-center ${btn.color} hover:text-white hover:border-[#B988BF]/50 transition-all`}
                >
                  <btn.icon size={20} className="group-hover:scale-110 transition-transform" />
                </motion.button>
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

const WhatsAppFloat = ({ onWhatsApp }: { onWhatsApp: () => void }) => {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">


      {/* WhatsApp Button */}
      <motion.button
        onClick={(e) => { e.preventDefault(); onWhatsApp(); }}
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
      </motion.button>
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
            Raio-X do seu rastreamento comercial
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed font-sans max-w-3xl mx-auto">
            Antes de investir mais, veja se sua operação consegue responder às perguntas certas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <motion.div whileHover={{ y: -6 }} className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-[#B988BF]/40 transition-all flex flex-col items-start text-left relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#B988BF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
            <div className="w-11 h-11 rounded-xl bg-[#B988BF]/10 flex items-center justify-center mb-5 text-[#B988BF] group-hover:scale-110 transition-transform duration-300">
              <Target size={22} />
            </div>
            <h3 className="text-white font-manrope text-base font-bold tracking-tight uppercase mb-3">1. Visibilidade</h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">Sem clareza de origem, o negócio não sabe quais canais realmente geram boas oportunidades.</p>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-[#EEC6A2]/40 transition-all flex flex-col items-start text-left relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#EEC6A2] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
            <div className="w-11 h-11 rounded-xl bg-[#EEC6A2]/10 flex items-center justify-center mb-5 text-[#EEC6A2] group-hover:scale-110 transition-transform duration-300">
              <TrendingUp size={22} />
            </div>
            <h3 className="text-white font-manrope text-base font-bold tracking-tight uppercase mb-3">2. Intenção</h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">A operação consegue diferenciar interesse real de curiosidade antes de tratar todos da mesma forma?</p>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-[#B988BF]/40 transition-all flex flex-col items-start text-left relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#B988BF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
            <div className="w-11 h-11 rounded-xl bg-[#B988BF]/10 flex items-center justify-center mb-5 text-[#B988BF] group-hover:scale-110 transition-transform duration-300">
              <MessageCircle size={22} />
            </div>
            <h3 className="text-white font-manrope text-base font-bold tracking-tight uppercase mb-3">3. Acompanhamento</h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">Sem um funil simples, contatos viram conversas soltas e propostas deixam de ser acompanhadas.</p>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-[#EEC6A2]/40 transition-all flex flex-col items-start text-left relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#EEC6A2] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>
            <div className="w-11 h-11 rounded-xl bg-[#EEC6A2]/10 flex items-center justify-center mb-5 text-[#EEC6A2] group-hover:scale-110 transition-transform duration-300">
              <BarChart3 size={22} />
            </div>
            <h3 className="text-white font-manrope text-base font-bold tracking-tight uppercase mb-3">4. Aprendizado</h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">Vendas e perdas voltam para a estratégia ou ficam isoladas no histórico de atendimento?</p>
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
              Quero rastrear meus contatos →
              <ArrowRight size={22} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

const WhatsAppQuickModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    service: 'Site + estrutura de conversão'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const payload = {
      lead_name: formData.nome,
      lead_phone: formData.whatsapp,
      lead_email: null,
      service_interest: formData.service,
      lead_type: "whatsapp_quick",
      status: "novo",
      qualification_rule: "whatsapp_quick_form",
      utm_source: localStorage.getItem('utm_source') || null,
      utm_campaign: localStorage.getItem('utm_campaign') || null,
      utm_content: localStorage.getItem('utm_content') || null,
      landing_page: localStorage.getItem('landing_page') || window.location.pathname,
      current_page: window.location.pathname,
      click_time: new Date().toISOString(),
      valor: null,
      observacao: "Lead capturado pelo formulário rápido antes do WhatsApp",
      gclid: localStorage.getItem('gclid') || null,
      gbraid: localStorage.getItem('gbraid') || null,
      wbraid: localStorage.getItem('wbraid') || null,
      fbclid: localStorage.getItem('fbclid') || null,
      fbp: getCookie('_fbp') || localStorage.getItem('fbp') || null,
      fbc: getCookie('_fbc') || localStorage.getItem('fbc') || null,
      user_agent: navigator.userAgent || null
    };

    try {
      const { error } = await supabase.from('leads').insert([payload]);
      if (error) throw error;
      
      sessionStorage.setItem('eleveai_qualified_lead_saved', 'true');

      if (typeof window !== 'undefined') {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: 'qualified_lead',
          qualification_rule: 'whatsapp_quick_form',
          utm_source: payload.utm_source,
          utm_campaign: payload.utm_campaign,
          utm_content: payload.utm_content,
          landing_page: payload.landing_page,
          current_page: payload.current_page,
          click_time: payload.click_time
        });
      }
    } catch (error) {
      console.error('WhatsApp quick lead insert failed', error);
    }

    trackWhatsAppClick();
    
    const message = `Olá, vim pelo site da EleveAI.\nNome: ${formData.nome}\nServiço de interesse: ${formData.service}`;
    const url = `https://wa.me/5519994671493?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
    onClose();
    setStatus('idle');
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="relative w-full max-w-md bg-black/70 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-2xl z-10 rounded-[2rem]"
            role="dialog"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Antes de te direcionar</h3>
              <p className="text-xs md:text-sm text-gray-400">Preencha rapidinho para começarmos com mais contexto. Leva menos de 10 segundos.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Seu Nome</label>
                <input required type="text" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B988BF] transition-all" placeholder="Como podemos te chamar?" />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">WhatsApp</label>
                <input required type="tel" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B988BF] transition-all" placeholder="(00) 00000-0000" />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">Serviço de interesse</label>
                <select required value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B988BF] transition-all appearance-none cursor-pointer">
                  <option value="Site + estrutura de conversão" className="bg-[#1A1A1E]">Site + estrutura de conversão</option>
                  <option value="Rastreamento e eventos" className="bg-[#1A1A1E]">Rastreamento e eventos</option>
                  <option value="Campanhas com Google Ads" className="bg-[#1A1A1E]">Campanhas com Google Ads</option>
                  <option value="CRM e gestão de leads" className="bg-[#1A1A1E]">CRM e gestão de leads</option>
                  <option value="Diagnóstico estratégico" className="bg-[#1A1A1E]">Diagnóstico estratégico</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="group relative inline-flex w-full mt-6 h-[56px] px-8 items-center justify-center overflow-hidden rounded-xl outline-none cursor-pointer transition-all active:scale-95 bg-[#25D366] text-white font-bold tracking-[0.1em] uppercase text-[12px] hover:bg-[#1fae54] shadow-[0_10px_25px_rgba(37,211,102,0.25)]"
              >
                <span className="relative z-20 flex items-center justify-center gap-3">
                  {status === 'submitting' ? 'Aguarde...' : 'Continuar no WhatsApp'}
                  {status !== 'submitting' && <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />}
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms' | 'crm'>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  useEffect(() => {
    if (window.location.pathname === '/crm') {
      setCurrentPage('crm');
      return;
    }

    persistTrackingData();
    startIntentTracking();
    // Prevent browser from restoring previous scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Ensure the site always goes to home position (top) on load
    window.scrollTo(0, 0);
    setTimeout(() => window.scrollTo(0, 0), 100);
  }, []);



  const handleOpenModal = () => {
    if (typeof window !== 'undefined' && !(window as any).diagnosticoStartFired) {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'diagnostico_start'
      });
      (window as any).diagnosticoStartFired = true;
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
      <WhatsAppQuickModal isOpen={isWhatsAppModalOpen} onClose={() => setIsWhatsAppModalOpen(false)} />
      <PrivacyPolicy isOpen={currentPage === 'privacy'} onClose={() => setCurrentPage('home')} />
      <TermsOfUse isOpen={currentPage === 'terms'} onClose={() => setCurrentPage('home')} />

      {currentPage === 'crm' ? (
        <AcquisitionDashboard />
      ) : (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar onHome={() => setCurrentPage('home')} onWhatsApp={() => setIsWhatsAppModalOpen(true)} />
        <main>
          <>
            <Hero onOpenModal={handleOpenModal} />
            <GoogleAdsPremium onOpenModal={handleOpenModal} />
            <PacientesQualificados onOpenModal={handleOpenModal} />
            <WhatsAppFunnel />
            <AutomacaoClinica />
            <RaioXSection onOpenModal={handleOpenModal} />

            <FAQ onOpenModal={handleOpenModal} />
            <SEOGuides />
            <FinalCTA onOpenModal={handleOpenModal} />
          </>
        </main>
        <Footer
          onPrivacy={() => setCurrentPage('privacy')}
          onTerms={() => setCurrentPage('terms')}
          onHome={() => setCurrentPage('home')}
          onWhatsApp={() => setIsWhatsAppModalOpen(true)}
        />
        <WhatsAppFloat onWhatsApp={() => setIsWhatsAppModalOpen(true)} />
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
