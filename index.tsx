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
      formData.append(key, value);
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
          className="relative w-full max-w-lg glass rounded-[2rem] border-white/10 p-6 md:p-10 shadow-2xl z-10"
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
              <h3 className="text-2xl font-bold text-white mb-2">Análise Solicitada</h3>
              <p className="text-gray-400">Nossa equipe estratégica analisará seu negócio e entrará em contato em breve.</p>
              <button
                onClick={onClose}
                className="mt-8 w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors"
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
                    className="bg-gradient-to-r from-[#68259A] to-[#B988BF] h-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-1 text-right text-[10px] text-gray-500 font-medium">{progress}% concluído</div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl md:text-2xl font-semibold text-white leading-snug">
                  {questions[step - 1].title}
                </h4>
              </div>

              <div className="space-y-3">
                {questions[step - 1].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNext(questions[step - 1].id, option)}
                    className="w-full text-left px-5 py-4 rounded-xl border border-white/10 hover:border-[#B988BF] hover:bg-[#68259A]/10 text-gray-300 hover:text-white transition-all font-medium"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <div className="w-16 h-16 bg-[#68259A]/20 text-[#B988BF] rounded-full flex items-center justify-center mx-auto mb-6">
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
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 ml-1">Nome</label>
                  <input required type="text" name="Nome" className="w-full bg-[#0A0A0B]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B988BF] transition-colors" placeholder="Seu nome completo" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 ml-1">WhatsApp</label>
                  <input required type="tel" name="WhatsApp" className="w-full bg-[#0A0A0B]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B988BF] transition-colors" placeholder="(00) 00000-0000" />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full mt-4 py-4 bg-[#68259A] hover:bg-[#72578C] text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Enviando...' : 'Receber análise estratégica'}
                  {status !== 'submitting' && <ArrowRight size={18} />}
                </button>
                <p className="text-center text-xs text-gray-500 mt-2">Sem compromisso.</p>
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-3 ${isScrolled ? 'bg-[#0A0A0B]/90 backdrop-blur-lg border-b border-white/10 shadow-lg' : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={handleHomeClick}>
            <img
              src="/logo.png"
              alt="EleveAI"
              className="h-[4rem] md:h-[5rem] w-auto object-contain transition-all scale-[1.3] origin-left"
            />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <button onClick={handleHomeClick} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => scrollToSection('sistema')} className="hover:text-white transition-colors">Sistema</button>
            <button onClick={() => scrollToSection('diagnostico')} className="hover:text-white transition-colors">Soluções</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors">FAQ</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <Plus className="rotate-45" size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </motion.nav>

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
              onClick={closeMenu}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2"
            >
              <Plus className="rotate-45" size={32} />
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
                className="mt-4 flex items-center gap-3 bg-[#68259A] hover:bg-[#7a2cb3] text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_10px_30px_rgba(104,37,154,0.35)] hover:shadow-[0_10px_40px_rgba(104,37,154,0.5)]"
              >
                Falar no WhatsApp
                <ArrowRight size={20} />
              </motion.a>
            </nav>

            {/* Decorative glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-[#68259A]/20 blur-[80px] rounded-full pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
          <div className="inline-block px-4 py-1.5 rounded-full glass border-[#B988BF]/30 text-[#B988BF] text-xs font-bold uppercase tracking-widest mb-6">
            Empresas que crescem não dependem da sorte. Elas constroem um sistema de clientes.
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-[3.5rem] font-extrabold text-white leading-snug md:leading-[1.15] mb-6">
            Transformamos seu negócio em um <span className="text-gradient">sistema previsível</span> de geração de clientes.
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-xl max-w-lg mb-8 leading-relaxed">
            Estruturamos posicionamento, aquisição e automação para que sua empresa seja encontrada, desejada e escolhida.
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-10">
            <span className="px-4 py-1.5 rounded-full bg-[#68259A]/10 border border-[#68259A]/30 text-xs font-bold text-gray-300">Posicionamento</span>
            <span className="px-4 py-1.5 rounded-full bg-[#B988BF]/10 border border-[#B988BF]/30 text-xs font-bold text-gray-300">Aquisição</span>
            <span className="px-4 py-1.5 rounded-full bg-[#EEC6A2]/10 border border-[#EEC6A2]/30 text-xs font-bold text-gray-300">Conversão</span>
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-300">Automação</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 w-full sm:w-auto">
            <motion.button
              onClick={onOpenModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 md:px-10 md:py-5 bg-[#68259A] text-white rounded-2xl font-bold text-base md:text-lg text-center shadow-[0_10px_30px_rgba(104,37,154,0.3)] hover:shadow-[0_10px_40px_rgba(104,37,154,0.5)] transition-all flex items-center justify-center w-full sm:w-auto"
            >
              Ver diagnóstico do meu negócio
            </motion.button>
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
              src="/strategic-funnel-pt.webp"
              alt="Sistema Previsível de Geração de Clientes"
              className="w-full h-auto brightness-50 hover:brightness-100 transition-all duration-700"
              width="600"
              height="400"
              fetchPriority="high"
            />
          </div>
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
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#68259A] rounded-full blur-[80px] opacity-40"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#B988BF] rounded-full blur-[80px] opacity-40"></div>
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
          className="glass p-8 md:p-12 rounded-[2rem] border-white/5"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Empresas comuns disputam atenção. <br className="hidden md:block" />
            <span className="text-gradient">Empresas notáveis são procuradas.</span>
          </h2>
          <p className="text-gray-400 text-base md:text-xl leading-relaxed">
            Se o seu negócio parece igual a todos os outros, o cliente escolhe pelo preço.
            Negócios que constroem presença e autoridade deixam de disputar atenção e passam a ser procurados.
            Essa é a diferença entre correr atrás de clientes e construir um sistema que atrai clientes.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const GoogleSearchMockup = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const phoneLinks = [
    { label: '01. Sistema de Clientes', sub: 'Como construir previsibilidade', id: 'sistema', color: '#B988BF' },
    { label: '02. Raio-X do Negócio', sub: 'Diagnóstico estratégico', id: 'diagnostico', color: '#EEC6A2' },
    { label: '03. Por que EleveAI', sub: 'Nossa diferença metodológica', id: 'porque', color: '#B988BF' },
    { label: '04. FAQ', sub: 'Dúvidas frequentes', id: 'faq', color: '#EEC6A2' },
  ];

  return (
    <section className="py-24 relative px-6 overflow-hidden bg-[#0A0A0B]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#68259A]/10 via-[#0A0A0B] to-[#0A0A0B] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-6 mt-4">
          Seu cliente já está procurando. <br className="hidden md:block" /><span className="text-gradient">A pergunta é: ele encontra você?</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg">
          Todos os dias pessoas pesquisam exatamente pelo que sua empresa vende.<br className="hidden md:block" /> Quem aparece primeiro leva o cliente.
        </p>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Google Search Mockup */}
        <div>
          <div className="mb-4 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite o nome do seu negócio"
              className="w-full bg-[#202124] border border-[#5f6368] rounded-full px-6 py-4 text-white text-base focus:outline-none focus:border-[#8ab4f8] focus:bg-[#303134] transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9aa0a6]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor" />
              </svg>
            </div>
          </div>

          <AnimatePresence>
            {searchTerm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#202124] rounded-2xl p-6 border border-[#3c4043] shadow-2xl text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[13px] font-bold text-white">Patrocinado</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#1A73E8] flex items-center justify-center text-white font-bold text-sm">
                    {searchTerm.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-[#bdc1c6] text-[11px]">{`https://www.${searchTerm.toLowerCase().replace(/\s/g, '')}.com.br`}</div>
                    <div className="text-[#8ab4f8] text-[17px] font-medium hover:underline cursor-pointer line-clamp-1">{searchTerm} | Estrutura de Vendas</div>
                  </div>
                </div>
                <div className="text-[#bdc1c6] text-[13px] leading-snug">
                  Não dependa mais da sorte. A <span className="font-bold">{searchTerm}</span> constrói sistemas de atração e conversão previsíveis.
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#3c4043]">
                  <div className="text-[#8ab4f8] text-[13px] hover:underline cursor-pointer" onClick={onOpenModal}>Diagnóstico Gratuito</div>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[#8ab4f8] text-[13px] hover:underline">Fale com Especialista</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={onOpenModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-4 w-full bg-[#68259A] text-white rounded-2xl font-bold text-base shadow-[0_10px_30px_rgba(104,37,154,0.3)] hover:shadow-[0_10px_40px_rgba(104,37,154,0.5)] transition-all flex items-center justify-center gap-3"
          >
            Quero aplicar isso no meu negócio
            <ArrowRight size={20} />
          </motion.button>
        </div>

        {/* Right: Phone Mockup */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-[260px] sm:w-[300px]"
          >
            {/* Phone shell */}
            <div className="relative bg-[#111] rounded-[3rem] border-[6px] border-[#2a2a2a] shadow-[0_30px_80px_rgba(0,0,0,0.7)] overflow-hidden">
              {/* Status bar */}
              <div className="flex justify-between items-center px-6 pt-4 pb-2">
                <span className="text-[10px] text-gray-500 font-bold">9:41</span>
                <div className="w-16 h-4 bg-[#1a1a1a] rounded-full mx-auto" />
                <div className="flex gap-1 items-center">
                  <div className="w-1 h-1 rounded-full bg-gray-500" />
                  <div className="w-1 h-1.5 rounded-full bg-gray-500" />
                  <div className="w-1 h-2 rounded-full bg-gray-400" />
                  <div className="w-1 h-2.5 rounded-full bg-white" />
                </div>
              </div>

              {/* App header */}
              <div className="px-5 pt-3 pb-4 bg-gradient-to-b from-[#68259A]/20 to-transparent">
                <p className="text-[9px] text-gray-500 uppercase tracking-widest">EleveAI</p>
                <p className="text-white font-extrabold text-[15px] leading-tight mt-0.5">Seu sistema de<br />crescimento</p>
              </div>

              {/* Menu items */}
              <div className="px-4 pb-6 flex flex-col gap-3">
                {phoneLinks.map((link, i) => (
                  <motion.button
                    key={i}
                    onClick={() => scrollTo(link.id)}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="w-full text-left bg-white/5 hover:bg-[#68259A]/20 border border-white/5 hover:border-[#68259A]/40 rounded-2xl px-4 py-3 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-bold text-white group-hover:text-[#B988BF] transition-colors">{link.label}</p>
                        <p className="text-[9px] text-gray-500 mt-0.5">{link.sub}</p>
                      </div>
                      <ArrowRight size={12} className="text-gray-600 group-hover:text-[#B988BF] transition-colors" />
                    </div>
                  </motion.button>
                ))}

                <motion.button
                  onClick={onOpenModal}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full mt-1 bg-[#68259A] text-white rounded-2xl px-4 py-3 text-[11px] font-black flex items-center justify-between shadow-[0_6px_20px_rgba(104,37,154,0.4)]"
                >
                  Iniciar Diagnóstico
                  <ArrowRight size={12} />
                </motion.button>
              </div>

              {/* Home bar */}
              <div className="flex justify-center pb-4">
                <div className="w-24 h-1 bg-white/20 rounded-full" />
              </div>
            </div>

            {/* Glow */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-20 bg-[#68259A]/30 blur-[40px] rounded-full pointer-events-none" />

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -right-8 top-20 glass px-3 py-2 rounded-xl border-white/10 text-xs font-bold text-white shadow-xl"
            >
              <span className="text-green-400">●</span> Online
            </motion.div>
          </motion.div>
        </div>
      </div>
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
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-6"
          >
            Clientes não aparecem por acaso.
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-xl">
            Empresas que crescem constroem um sistema.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div whileHover={{ y: -10 }} className="glass p-8 rounded-[2rem] border-white/5 hover:border-[#68259A]/40 transition-all flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#68259A]/10 flex items-center justify-center mb-6 text-[#B988BF]">
              <Star size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Posicionamento forte</h3>
            <p className="text-sm text-gray-400">Ser lembrado antes de ser comparado.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="glass p-8 rounded-[2rem] border-white/5 hover:border-[#68259A]/40 transition-all flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#EEC6A2]/10 flex items-center justify-center mb-6 text-[#EEC6A2]">
              <Target size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Captação inteligente</h3>
            <p className="text-sm text-gray-400">Ser encontrado por quem já está procurando.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="glass p-8 rounded-[2rem] border-white/5 hover:border-[#68259A]/40 transition-all flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#68259A]/10 flex items-center justify-center mb-6 text-[#B988BF]">
              <BarChart3 size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Engajamento direcionado</h3>
            <p className="text-sm text-gray-400">Transformar interesse em clientes.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="glass p-8 rounded-[2rem] border-white/5 hover:border-[#68259A]/40 transition-all flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#EEC6A2]/10 flex items-center justify-center mb-6 text-[#EEC6A2]">
              <Cpu size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Automação</h3>
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
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#68259A]/20 to-transparent rounded-[2.5rem] blur-2xl -z-10" />
              <img
                src="/social-media-visual.webp"
                alt="Gestão de Marketing Estratégico no Instagram: Conteúdo de Alta Conversão e Branding"
                className="w-full h-auto rounded-[2.5rem] border border-white/10 shadow-2xl hover:scale-[1.02] transition-transform duration-700"
                width="600"
                height="400"
              />
            </motion.div>
          </div>

          {/* Traffic Feature */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-[#EEC6A2]/10 to-transparent rounded-[2.5rem] blur-2xl -z-10" />
              <img
                src="/traffic-growth-visual.webp"
                alt="Dashboard de Tráfego Pago e Performance para Negócios"
                className="w-full h-auto rounded-[2.5rem] border border-white/10 shadow-2xl hover:scale-[1.02] transition-transform duration-700"
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

  const rotate = useTransform(scrollYProgress, [0, 0.4], [10, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

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
        style={{ rotateX: rotate, scale }}
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
            src="/operational-flow-visual.webp"
            alt="Estrutura Operacional Automatizada: Fluxo de Atendimento e Triagem Inteligente"
            className="w-full h-full object-cover mt-10 p-2 rounded-[1.5rem] brightness-[0.8] hover:brightness-100 transition-all duration-700"
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

const PorQueEleveAI = () => {
  return (
    <section className="py-24 px-6 overflow-hidden bg-gradient-to-b from-transparent to-[#0A0A0B]/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-6">
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
            className="glass p-8 md:p-10 rounded-[2.5rem] border-white/5 hover:border-[#68259A]/30 transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#68259A]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Star className="text-[#B988BF]" size={28} />
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-white mb-4">Clareza de posicionamento</h4>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">Mostramos o valor único do seu negócio para que o preço deixe de ser a única variável na decisão do cliente.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-10 rounded-[2.5rem] border-white/5 hover:border-[#EEC6A2]/30 transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#EEC6A2]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Target className="text-[#EEC6A2]" size={28} />
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-white mb-4">Estratégia de atração de clientes</h4>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">Desenhamos campanhas que trazem não apenas cliques, mas oportunidades reais e qualificadas de venda todos os dias.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-10 rounded-[2.5rem] border-white/5 hover:border-[#68259A]/30 transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#68259A]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Cpu className="text-[#B988BF]" size={28} />
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-white mb-4">Processos automatizados de crescimento</h4>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">Implementamos sistemas que organizam seu relacionamento com o cliente, triplicando as chances de fechamento sem aumentar a carga da equipe.</p>
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
      question: "Quanto tempo leva para estruturar esse sistema?",
      answer: "A implantação do sistema primário costuma levar entre 15 e 30 dias, dependendo do estágio atual do seu negócio. Nesse período, já criamos as fundações para que sua empresa comece a ser encontrada."
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

const FinalCTA = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#68259A]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto glass rounded-[3rem] p-12 md:p-20 text-center relative z-10 border-white/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
            Seu negócio precisa de <span className="text-gradient">mais esforço</span> ou de <br className="hidden md:block" /> <span className="text-gradient">mais estrutura?</span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base md:text-xl max-w-2xl mx-auto mb-12">
            Empresas que crescem constroem sistemas de geração de clientes. Solicite seu diagnóstico e descubra como criar previsibilidade de vendas.
          </p>
          <motion.button
            onClick={onOpenModal}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(104,37,154,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 md:gap-4 bg-[#68259A] text-white px-8 py-4 md:px-12 md:py-5 rounded-full font-black text-base md:text-xl shadow-[0_10px_30px_rgba(104,37,154,0.3)] hover:shadow-[0_10px_40px_rgba(104,37,154,0.5)] transition-all"
          >
            Receber análise estratégica
            <ArrowRight size={22} className="text-white" />
          </motion.button>
          <p className="mt-8 text-sm text-gray-500 font-medium">Sem compromisso.</p>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = ({ onPrivacy, onTerms, onHome }: { onPrivacy: () => void, onTerms: () => void, onHome: () => void }) => {
  return (
    <footer className="relative bg-[#050506] pt-24 pb-12 overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#B988BF] to-transparent shadow-[0_0_30px_rgba(185,136,191,0.8)]" />
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
            <h4 className="text-white font-bold mb-6 text-lg tracking-tight text-left">Atendimento</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Segunda a Sexta</span> <span className="text-gray-300">09h - 17h</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
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
    <section id="diagnostico" className="py-24 relative px-6 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Raio-X Estratégico de <span className="text-gradient hover-glow">Mercado</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Seu desafio não é apenas atrair cliques. É construir uma base sólida de vendas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div whileHover={{ y: -10 }} className="glass p-8 rounded-[2rem] border-white/5 hover:border-[#68259A]/40 transition-all flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#68259A]/10 flex items-center justify-center mb-6">
              <Target className="text-[#B988BF]" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">1. Visibilidade</h3>
            <p className="text-sm text-gray-400 leading-relaxed">Negócios que até geram visitas, mas não atraem as oportunidades certas para vendas de alto ticket.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="glass p-8 rounded-[2rem] border-white/5 hover:border-[#68259A]/40 transition-all flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#EEC6A2]/10 flex items-center justify-center mb-6">
              <TrendingUp className="text-[#EEC6A2]" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">2. Fechamento</h3>
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

    // 20-second timer trigger
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 20000);

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

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    sessionStorage.setItem('eleveai-modal-closed', 'true');
  };

  return (
    <div className="min-h-screen">
      <DiagnosticModal isOpen={isModalOpen} onClose={handleCloseModal} />

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
              <EmpresasNotaveis />
              <GoogleSearchMockup onOpenModal={handleOpenModal} />
              <SistemaDeClientes />
              <RaioXSection onOpenModal={handleOpenModal} />
              <PorQueEleveAI />
              <FAQ />
              <FinalCTA onOpenModal={handleOpenModal} />
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
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
