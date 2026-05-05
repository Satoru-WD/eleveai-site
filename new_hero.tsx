import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, Users, BarChart3, CheckCircle2, ChevronRight, ChevronLeft, Quote } from 'lucide-react';

const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  return (
    <>
      <div className="gradient-blur" style={{ height: '120px' }}>
        <div></div><div></div><div></div><div></div><div></div><div></div>
      </div>

      <section id="hero" className="relative overflow-hidden bg-[#0A0A0B] pt-[6.5rem] md:pt-[8.5rem] lg:pt-28 pb-10 lg:pb-16">
        
        {/* Background glows */}
        <div className="absolute top-[10%] right-[25%] w-[600px] h-[700px] bg-[#6B2FA0]/20 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] bg-[#3D1A6E]/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Main container */}
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center text-center lg:text-left gap-8 lg:gap-12">

            {/* ========== LEFT COLUMN (text) ========== */}
            <div className="w-full lg:w-[48%] flex flex-col items-center lg:items-start pt-4 lg:pt-0 relative z-20">

              {/* Tag - hidden on mobile */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="hidden lg:inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-[#160d24] border border-[#2d1a47] mb-8"
              >
                <Lock size={13} className="text-[#9b6bbd]" />
                <span className="text-[10px] font-bold tracking-[0.15em] text-[#9b6bbd] uppercase">Marketing Estratégico para Clínicas</span>
              </motion.div>

              {/* 1. Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[2.2rem] sm:text-[2.5rem] md:text-[3.3rem] lg:text-[3.6rem] font-extrabold leading-[1.1] tracking-tight text-white font-manrope mb-4 lg:mb-6"
              >
                Sua clínica atrai interessados.<br/>
                <span className="text-[#B988BF]">Mas perde pacientes no caminho.</span>
              </motion.h1>

              {/* 2. Subheadline */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-[15px] sm:text-base md:text-[17px] text-zinc-400 max-w-[420px] lg:max-w-md mb-4 leading-relaxed font-light"
              >
                Sem um processo claro, sua clínica gera interesse — mas não transforma isso em agendamentos.
              </motion.p>

              {/* 3. Authority line */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[13px] sm:text-sm text-zinc-500 max-w-[400px] lg:max-w-md mb-8 lg:mb-10"
              >
                Mais de uma década otimizando processos de conversão e vendas.
              </motion.p>

              {/* Desktop Proof blocks - hidden on mobile */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="hidden lg:flex flex-wrap gap-8 mb-8"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#1a1028] flex items-center justify-center">
                    <Users size={18} className="text-[#9b6bbd]" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg leading-none font-manrope">+10</p>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mt-0.5">clínicas atendidas</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#1a1028] flex items-center justify-center">
                    <BarChart3 size={18} className="text-[#9b6bbd]" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg leading-none font-manrope">+R$ 500 mil</p>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mt-0.5">gerados para clientes<br/>nos últimos meses</p>
                  </div>
                </div>
              </motion.div>

              {/* 4. CTA Button */}
              <motion.button 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={onOpenModal}
                className="group w-full sm:w-auto bg-gradient-to-r from-[#5B2E8A] to-[#3A1660] hover:from-[#6B3FA0] hover:to-[#4A2070] text-white rounded-xl px-6 lg:px-8 py-4 lg:py-5 flex items-center justify-center gap-3 font-bold text-[12px] md:text-[13px] tracking-[0.1em] uppercase transition-all shadow-[0_4px_30px_rgba(91,46,138,0.35)] mb-5 font-manrope"
              >
                Quero entender onde estou perdendo pacientes
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.button>

              {/* Desktop Trust line - hidden on mobile */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="hidden lg:flex flex-wrap gap-5 text-zinc-500 text-[11px]"
              >
                <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-zinc-600" /> Sem compromisso</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-zinc-600" /> Análise personalizada</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-zinc-600" /> Resposta em até 24h</span>
              </motion.div>

              {/* 5. Differentiation Card (glass) */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-[#140c24]/50 border border-[#2a1b42] rounded-xl p-4 flex flex-col lg:flex-row items-center lg:items-start gap-3 w-full max-w-md lg:mt-6"
              >
                <p className="text-[13px] text-zinc-300">
                  <strong className="text-white">Não fazemos só marketing.</strong> Aplicamos lógica real de vendas para transformar leads em pacientes.
                </p>
              </motion.div>

            </div>

            {/* ========== RIGHT COLUMN ========== */}
            <div className="w-full lg:w-[52%] relative mt-8 lg:mt-0 flex flex-col items-center lg:items-end">

              {/* 6. Imagem fornecida (Mobile + Desktop) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                <div className="relative">
                  {/* Left-side fade integration */}
                  <div className="absolute inset-y-0 left-0 w-[120px] bg-gradient-to-r from-[#0A0A0B] to-transparent z-20 pointer-events-none" />
                  
                  {/* Purple overlay (Right to Left) */}
                  <div className="absolute inset-0 bg-gradient-to-l from-[#68259A]/15 via-transparent to-transparent z-20 pointer-events-none mix-blend-soft-light" />
                  
                  <img 
                    src="/hero.img.mobile.png" 
                    alt="Marketing Estratégico" 
                    className="relative z-10 w-full h-auto object-contain brightness-[0.85] contrast-[1.15]"
                    style={{
                      maskImage: 'linear-gradient(to right, transparent, black 15%)',
                      WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%)'
                    }}
                  />
                  
                  {/* Bottom fade to integrate with section transition */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0A0A0B] to-transparent z-20 pointer-events-none" />
                </div>
              </motion.div>

              {/* Depoimentos Mobile (Carrossel) */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="w-full lg:hidden flex flex-col items-center mb-8 overflow-hidden"
              >
                <p className="text-[11px] text-[#A678CB] font-bold uppercase tracking-wider mb-4 px-5 text-center">
                  O que clínicas percebem após estruturar o marketing
                </p>
                
                {/* Horizontal Swipe Carousel */}
                <div 
                  ref={scrollRef}
                  className="w-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 px-5 gap-4"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {/* Depoimento 1 */}
                  <div className="min-w-[85%] sm:min-w-[280px] snap-center bg-[#121215]/80 backdrop-blur-md border border-[#2a2433] rounded-2xl p-5 flex flex-col">
                    <Quote size={16} className="text-[#6B3FA0] mb-3" />
                    <p className="text-[13px] text-zinc-300 mb-4 leading-relaxed flex-grow">
                      "A gente investia em anúncios, mas não sabia o que estava funcionando. Depois da estrutura, ficou claro de onde vinham os pacientes."
                    </p>
                    <p className="text-[11px] text-[#A678CB] font-bold">
                      — Dra. Mariana
                      <span className="block text-[9px] text-zinc-500 font-normal mt-0.5">clínica estética – SP</span>
                    </p>
                  </div>

                  {/* Depoimento 2 */}
                  <div className="min-w-[85%] sm:min-w-[280px] snap-center bg-[#121215]/80 backdrop-blur-md border border-[#2a2433] rounded-2xl p-5 flex flex-col">
                    <Quote size={16} className="text-[#6B3FA0] mb-3" />
                    <p className="text-[13px] text-zinc-300 mb-4 leading-relaxed flex-grow">
                      "Percebemos que o problema não era só tráfego, e sim o atendimento. Ajustando isso, começamos a converter muito mais."
                    </p>
                    <p className="text-[11px] text-[#A678CB] font-bold">
                      — Dr. Rafael
                      <span className="block text-[9px] text-zinc-500 font-normal mt-0.5">odontologia – interior de SP</span>
                    </p>
                  </div>

                  {/* Depoimento 3 */}
                  <div className="min-w-[85%] sm:min-w-[280px] snap-center bg-[#121215]/80 backdrop-blur-md border border-[#2a2433] rounded-2xl p-5 flex flex-col">
                    <Quote size={16} className="text-[#6B3FA0] mb-3" />
                    <p className="text-[13px] text-zinc-300 mb-4 leading-relaxed flex-grow">
                      "Começamos a ter mais consistência nos agendamentos, não só picos. Hoje entendemos melhor o processo todo."
                    </p>
                    <p className="text-[11px] text-[#A678CB] font-bold">
                      — Dr. Felipe
                      <span className="block text-[9px] text-zinc-500 font-normal mt-0.5">clínica médica – capital</span>
                    </p>
                  </div>
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
      </section>
      
      {/* Scroll fix CSS specifically for this component if needed */}
      <style dangerouslySetInnerHTML={{__html: `
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
