import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { formatBrazilDate } from '../utils/dateFormatter';
import { 
  Users, TrendingUp, Target, Search, Clock, 
  MessageCircle, FileText, CheckCircle, AlertCircle, 
  Loader2, Lock, LogOut, X, Archive, Edit2, 
  DollarSign, ChevronDown, ChevronUp, Activity, Filter, Phone, SlidersHorizontal
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// --- Helpers ---
const getLeadTypeTranslation = (type: string) => {
  switch (type) {
    case 'whatsapp_quick': return 'WhatsApp Rápido';
    case 'whatsapp_quick_form': return 'Formulário WhatsApp';
    case 'diagnostic_form': return 'Diagnóstico';
    case 'diagnostic_modal_completed': return 'Diagnóstico Concluído';
    case 'qualified_lead': return 'Lead Qualificado';
    case 'time_45_plus_whatsapp_click': return 'Interesse Identificado';
    default: return type || 'Não identificado';
  }
};

const getQualificationRuleLabel = (rule: string) => {
  switch (rule) {
    case 'whatsapp_quick': return 'Clique direto no WhatsApp';
    case 'time_45_plus_whatsapp_click': return '45s+ no site + clique WhatsApp';
    case 'diagnostic_form': return 'Formulário de diagnóstico';
    case 'diagnostic_modal_completed': return 'Diagnóstico modal concluído';
    default: return rule || '—';
  }
};

const getTemperature = (lead: any) => {
  if (lead.status === 'fechado') return 'Fechado';
  if (!lead.lead_phone) return 'Frio';
  if (lead.lead_type === 'whatsapp_quick' || lead.lead_type === 'diagnostic_form') return 'Quente';
  if (lead.lead_type === 'qualified_lead') return 'Morno';
  return 'Frio';
};

const getTempColor = (temp: string) => {
  switch (temp) {
    case 'Quente': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
    case 'Morno': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    case 'Frio': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    case 'Fechado': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    default: return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'novo': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'conversou': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    case 'proposta': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    case 'fechado': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'perdido': return 'bg-red-500/10 text-red-400 border-red-500/20';
    default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
  }
};

// --- Components ---
const MetricCard = ({ title, value, icon: Icon, colorClass, sub }: any) => (
  <div className="bg-[#17181F] border border-white/[0.08] rounded-2xl p-3.5 md:p-4 flex flex-col justify-between hover:border-white/[0.14] hover:bg-[#1B1D26] transition-all duration-200 group shadow-[0_14px_35px_rgba(0,0,0,0.18)]">
    <div className="flex items-center justify-between mb-2 md:mb-3">
      <p className="text-[10px] md:text-[11px] font-bold text-zinc-400 uppercase tracking-widest">{title}</p>
      <div className={`p-1.5 rounded-lg ${colorClass} opacity-85 group-hover:opacity-100 transition-opacity`}>
        <Icon className="w-3.5 h-3.5" />
      </div>
    </div>
    <div>
      <span className="text-xl md:text-2xl font-bold text-white tracking-tight">{value}</span>
      {sub && <p className="text-[10px] text-zinc-500 mt-1">{sub}</p>}
    </div>
  </div>
);

const AdvancedTracking = ({ lead }: { lead: any }) => {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-3 border-b border-white/5 hover:border-white/20 transition-colors group">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 group-hover:text-zinc-300 transition-colors">
          Rastreamento Google & Meta
        </h3>
        {open ? <ChevronUp size={14} className="text-zinc-500" /> : <ChevronDown size={14} className="text-zinc-500" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="bg-[#0A0A0A] rounded-xl p-4 border border-white/5 space-y-3 mt-4">
              {['gclid', 'gbraid', 'wbraid', 'fbclid', 'fbp', 'fbc'].map(key => (
                <div key={key} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-[10px] font-mono text-zinc-500">{key}</span>
                  <span className="text-[10px] text-zinc-300 truncate max-w-[200px]">{lead[key] || '-'}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-white/5">
                <span className="text-[10px] font-mono text-zinc-500 block mb-1">user_agent</span>
                <span className="text-[10px] text-zinc-400 break-all">{lead.user_agent || '-'}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
};

const LeadDrawer = ({ lead, isOpen, onClose, updateField }: any) => {
  if (!lead) return null;
  const temp = getTemperature(lead);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" 
            onClick={onClose} 
          />
          {/* Desktop: slide from right */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="hidden md:flex fixed top-0 right-0 h-full w-full max-w-[420px] bg-[#111113] border-l border-white/[0.06] shadow-2xl z-[110] flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-[#0D0D0F] shrink-0">
              <div>
                <h2 className="text-sm font-bold text-white">Oportunidade</h2>
                <p className="text-[10px] text-zinc-600 mt-0.5">#{lead.id} · {formatBrazilDate(lead.created_at || lead.click_time)}</p>
              </div>
              <button onClick={onClose} className="p-1.5 text-zinc-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"><X size={14} /></button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {/* Hero */}
              <div className="px-6 py-5 border-b border-white/[0.06] bg-[#0D0D0F]">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0 pr-3">
                    <p className="text-lg font-bold text-white truncate">{lead.lead_name || 'Sem nome'}</p>
                    <p className="text-sm text-zinc-500 font-mono mt-0.5">{lead.lead_phone || '—'}</p>
                    {lead.service_interest && <p className="text-xs text-zinc-600 mt-1.5">{lead.service_interest}</p>}
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] border font-bold uppercase tracking-widest ${getStatusColor(lead.status || 'novo')}`}>{lead.status || 'novo'}</span>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] border font-semibold ${getTempColor(temp)}`}>{temp}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {lead.lead_phone && (
                    <a href={`https://wa.me/55${lead.lead_phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 h-8 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] rounded-lg text-xs font-bold hover:bg-[#25D366]/15 transition-colors">
                      <MessageCircle size={13} /> WhatsApp
                    </a>
                  )}
                  {lead.valor && (
                    <div className="flex-1 bg-emerald-500/5 border border-emerald-500/15 rounded-lg px-3 h-8 flex items-center justify-center">
                      <span className="text-emerald-400 font-bold text-sm">R$ {Number(lead.valor).toLocaleString('pt-BR')}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 py-5 space-y-6">
                {/* Gestão Comercial */}
                <section>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-3">Gestão Comercial</p>
                  <div className="bg-[#0D0D0F] rounded-xl border border-white/[0.06] divide-y divide-white/[0.04]">
                    <div className="p-4">
                      <p className="text-[10px] text-zinc-600 mb-2">Status</p>
                      <div className="relative">
                        <select value={lead.status || 'novo'} onChange={(e) => updateField(lead.id, 'status', e.target.value)}
                          className={`w-full px-3 py-2.5 rounded-lg text-xs font-bold border uppercase tracking-wider outline-none cursor-pointer appearance-none transition-all ${getStatusColor(lead.status || 'novo')}`}>
                          <option value="novo" className="bg-[#1A1A1E]">NOVO</option>
                          <option value="conversou" className="bg-[#1A1A1E]">CONVERSOU</option>
                          <option value="proposta" className="bg-[#1A1A1E]">PROPOSTA</option>
                          <option value="fechado" className="bg-[#1A1A1E]">FECHADO</option>
                          <option value="perdido" className="bg-[#1A1A1E]">PERDIDO</option>
                        </select>
                        <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-40" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] text-zinc-600">Valor Potencial</p>
                        <button onClick={() => {
                          const v = window.prompt('Novo valor potencial (apenas números):', lead.valor || '');
                          if (v !== null) { const n = parseFloat(v.replace(/[^0-9,.-]/g, '').replace(',', '.')); if (!isNaN(n)) updateField(lead.id, 'valor', n); }
                        }} className="text-zinc-600 hover:text-white bg-white/5 p-1 rounded-md transition-colors"><Edit2 size={11} /></button>
                      </div>
                      <p className="text-xl font-bold text-emerald-400 mt-1">
                        {lead.valor ? `R$ ${Number(lead.valor).toLocaleString('pt-BR')}` : <span className="text-zinc-700 text-sm font-medium">Não definido</span>}
                      </p>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] text-zinc-600">Observação Comercial</p>
                        <button onClick={() => {
                          const o = window.prompt('Nova observação:', lead.observacao || '');
                          if (o !== null) updateField(lead.id, 'observacao', o);
                        }} className="text-zinc-600 hover:text-white bg-white/5 p-1 rounded-md transition-colors"><Edit2 size={11} /></button>
                      </div>
                      <p className="text-sm text-zinc-400 whitespace-pre-wrap min-h-[36px]">
                        {lead.observacao || <span className="text-zinc-700 text-xs">Nenhuma observação</span>}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Contato */}
                <section>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-3">Contato</p>
                  <div className="bg-[#0D0D0F] rounded-xl border border-white/[0.06] p-4 space-y-2.5">
                    <div className="flex justify-between items-center"><span className="text-[11px] text-zinc-600">Nome</span><span className="text-xs text-zinc-200 font-medium">{lead.lead_name || '—'}</span></div>
                    <div className="flex justify-between items-center"><span className="text-[11px] text-zinc-600">Telefone</span><span className="text-xs text-zinc-200 font-mono">{lead.lead_phone || '—'}</span></div>
                    {lead.lead_email && <div className="flex justify-between items-center"><span className="text-[11px] text-zinc-600">Email</span><span className="text-xs text-zinc-400 truncate max-w-[220px]">{lead.lead_email}</span></div>}
                  </div>
                </section>

                {/* Origem */}
                <section>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-3">Origem e Campanha</p>
                  <div className="bg-[#0D0D0F] rounded-xl border border-white/[0.06] p-4 space-y-2.5">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                      <div><p className="text-[10px] text-zinc-600 mb-0.5">Origem</p><p className="text-xs text-zinc-300 capitalize">{lead.utm_source || 'Direto'}</p></div>
                      <div><p className="text-[10px] text-zinc-600 mb-0.5">Tipo de Lead</p><p className="text-xs text-[#B988BF] font-medium">{getLeadTypeTranslation(lead.lead_type)}</p></div>
                      <div className="col-span-2"><p className="text-[10px] text-zinc-600 mb-0.5">Campanha</p><p className="text-xs text-zinc-300 truncate">{lead.utm_campaign || '—'}</p></div>
                      {lead.utm_content && <div className="col-span-2"><p className="text-[10px] text-zinc-600 mb-0.5">Criativo</p><p className="text-xs text-zinc-400 truncate">{lead.utm_content}</p></div>}
                      {lead.landing_page && <div className="col-span-2"><p className="text-[10px] text-zinc-600 mb-0.5">Página de Entrada</p><p className="text-[10px] text-zinc-500 truncate break-all">{lead.landing_page}</p></div>}
                      {lead.qualification_rule && <div className="col-span-2"><p className="text-[10px] text-zinc-600 mb-0.5">Regra de Qualificação</p><p className="text-xs text-zinc-400">{getQualificationRuleLabel(lead.qualification_rule)}</p></div>}
                    </div>
                  </div>
                </section>

                {/* Conversão — preparação Google/Meta */}
                {(lead.conversion_value != null || lead.closed_at || lead.conversion_sent_google != null || lead.conversion_sent_meta != null || lead.conversion_error) && (
                  <section>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-3">Conversão</p>
                    <div className="bg-[#0D0D0F] rounded-xl border border-white/[0.06] p-4 space-y-2.5">
                      {lead.conversion_value != null && <div className="flex justify-between items-center"><span className="text-[11px] text-zinc-600">Valor de Conversão</span><span className="text-xs text-emerald-400 font-bold">R$ {Number(lead.conversion_value).toLocaleString('pt-BR')}</span></div>}
                      {lead.closed_at && <div className="flex justify-between items-center"><span className="text-[11px] text-zinc-600">Fechado em</span><span className="text-xs text-zinc-300">{formatBrazilDate(lead.closed_at)}</span></div>}
                      {lead.conversion_sent_google != null && (
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] text-zinc-600">Google Ads</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${lead.conversion_sent_google ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' : 'text-zinc-600 border-zinc-700/30 bg-zinc-800/20'}`}>{lead.conversion_sent_google ? 'Enviado' : 'Pendente'}</span>
                        </div>
                      )}
                      {lead.conversion_sent_meta != null && (
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] text-zinc-600">Meta Ads</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${lead.conversion_sent_meta ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' : 'text-zinc-600 border-zinc-700/30 bg-zinc-800/20'}`}>{lead.conversion_sent_meta ? 'Enviado' : 'Pendente'}</span>
                        </div>
                      )}
                      {lead.conversion_error && <div><p className="text-[10px] text-red-500 mb-0.5">Erro de Conversão</p><p className="text-[10px] text-red-400/80 break-all">{lead.conversion_error}</p></div>}
                    </div>
                  </section>
                )}

                <AdvancedTracking lead={lead} />
              </div>
            </div>
          </motion.div>
          {/* Mobile: slide from bottom */}
          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden fixed bottom-0 left-0 right-0 h-[90vh] bg-[#121214] border-t border-white/10 rounded-t-3xl shadow-2xl z-[110] flex flex-col overflow-hidden"
          >
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 bg-white/20 rounded-full" />
            </div>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-[#0A0A0A] shrink-0">
              <div>
                <h2 className="text-base font-bold text-white">Detalhes da Oportunidade</h2>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">ID: {lead.id}</p>
              </div>
              <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white bg-white/5 rounded-full"><X size={16} /></button>
            </div>
            {/* Mobile Hero Summary */}
            <div className="px-5 py-4 border-b border-white/[0.06] bg-[#0D0D0F] shrink-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 pr-3">
                  <p className="text-lg font-bold text-white truncate leading-none">{lead.lead_name || 'Sem nome'}</p>
                  <p className="text-xs text-zinc-400 font-mono mt-1">{lead.lead_phone || '—'}</p>
                  {lead.service_interest && <p className="text-[11px] text-zinc-500 mt-1">{lead.service_interest}</p>}
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className={`px-2 py-1 rounded text-[10px] border font-bold uppercase tracking-widest ${getStatusColor(lead.status || 'novo')}`}>{statusLabels[lead.status || 'novo'] || lead.status || 'novo'}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] border font-semibold ${getTempColor(temp)}`}>{temp}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {lead.lead_phone && (
                  <a href={`https://wa.me/55${lead.lead_phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 h-9 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] rounded-lg text-xs font-bold transition-colors">
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                )}
                {lead.valor && (
                  <div className="flex-1 bg-emerald-500/5 border border-emerald-500/15 rounded-lg px-3 h-9 flex items-center justify-center">
                    <span className="text-emerald-400 font-bold text-sm">R$ {Number(lead.valor).toLocaleString('pt-BR')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 scrollbar-hide">
              {lead.lead_email && (
                <section>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Email</h3>
                  <div className="bg-[#0A0A0A] rounded-xl p-3 border border-white/[0.06]">
                    <p className="text-sm text-white break-all">{lead.lead_email}</p>
                  </div>
                </section>
              )}
              
              <section>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Gestão</h3>
                <div className="bg-[#0A0A0A] rounded-xl p-4 border border-white/[0.06] space-y-4">
                  <div>
                    <p className="text-[10px] text-zinc-500 mb-1.5">Status</p>
                    <div className="relative">
                      <select value={lead.status || 'novo'} onChange={(e) => updateField(lead.id, 'status', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl text-xs font-bold border uppercase tracking-wider outline-none cursor-pointer appearance-none transition-all ${getStatusColor(lead.status || 'novo')}`}>
                        <option value="novo" className="bg-[#1A1A1E]">NOVO</option>
                        <option value="conversou" className="bg-[#1A1A1E]">CONVERSOU</option>
                        <option value="proposta" className="bg-[#1A1A1E]">PROPOSTA</option>
                        <option value="fechado" className="bg-[#1A1A1E]">FECHADO</option>
                        <option value="perdido" className="bg-[#1A1A1E]">PERDIDO</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] text-zinc-500">Valor Potencial</p>
                      <button onClick={() => { const v = window.prompt('Novo valor:', lead.valor || ''); if(v !== null){ const n = parseFloat(v.replace(/[^0-9,.-]/g,'').replace(',','.')); if(!isNaN(n)) updateField(lead.id,'valor',n); }}} className="p-1.5 bg-white/5 text-zinc-400 rounded-lg"><Edit2 size={11} /></button>
                    </div>
                    <p className="text-xl font-bold text-emerald-400">{lead.valor ? `R$ ${Number(lead.valor).toLocaleString('pt-BR')}` : '—'}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] text-zinc-500">Observação</p>
                      <button onClick={() => { const o = window.prompt('Observação:', lead.observacao||''); if(o!==null) updateField(lead.id,'observacao',o); }} className="p-1.5 bg-white/5 text-zinc-400 rounded-lg"><Edit2 size={11} /></button>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5 min-h-[60px]"><p className="text-sm text-zinc-300 whitespace-pre-wrap">{lead.observacao || '—'}</p></div>
                  </div>
                </div>
              </section>
              <section>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Origem</h3>
                <div className="bg-[#0A0A0A] rounded-xl p-4 border border-white/5">
                  <div className="grid grid-cols-2 gap-3">
                    <div><p className="text-[10px] text-zinc-500 mb-0.5">Fonte</p><p className="text-sm text-white capitalize">{lead.utm_source || 'Direto'}</p></div>
                    <div><p className="text-[10px] text-zinc-500 mb-0.5">Tipo</p><p className="text-xs text-[#B988BF] font-medium">{getLeadTypeTranslation(lead.lead_type)}</p></div>
                    <div className="col-span-2"><p className="text-[10px] text-zinc-500 mb-0.5">Campanha</p><p className="text-xs text-zinc-300 truncate">{lead.utm_campaign || '—'}</p></div>
                  </div>
                </div>
              </section>
              <AdvancedTracking lead={lead} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const statusLabels: Record<string, string> = {
  novo: 'Novo', conversou: 'Conversou', proposta: 'Proposta',
  fechado: 'Fechado', perdido: 'Perdido',
};

const getIntentLabel = (temp: string) => {
  switch (temp) {
    case 'Quente': return 'Intenção alta';
    case 'Morno': return 'Intenção média';
    case 'Frio': return 'Intenção baixa';
    case 'Fechado': return 'Venda registrada';
    default: return 'Intenção indefinida';
  }
};

const getNextStepLabel = (status: string) => {
  switch (status || 'novo') {
    case 'novo': return 'Responder / qualificar';
    case 'conversou': return 'Gerar proposta';
    case 'proposta': return 'Acompanhar proposta';
    case 'fechado': return 'Registrado como venda';
    case 'perdido': return 'Revisar perda';
    default: return 'Definir próximo passo';
  }
};

const MobileLeadCard = ({ lead, onOpen, onQuickAction }: any) => {
  const temp = getTemperature(lead);
  const nextStep = getNextStepLabel(lead.status || 'novo');
  return (
    <div className="bg-[#17181F] border border-white/[0.08] rounded-2xl p-3.5 space-y-3 shadow-[0_14px_35px_rgba(0,0,0,0.18)]">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-white truncate leading-none">{lead.lead_name || 'Sem nome'}</p>
          <p className="text-[11px] text-zinc-400 font-mono mt-1">{lead.lead_phone || '—'}</p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(lead.status || 'novo')}`}>
            {statusLabels[lead.status || 'novo'] || 'Novo'}
          </span>
          <span className={`px-2 py-0.5 rounded-md text-[9px] font-semibold border opacity-75 ${getTempColor(temp)}`}>{temp}</span>
        </div>
      </div>

      {/* Info row */}
      <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#1E2028] rounded-xl p-2.5 border border-white/[0.07]">
        <div>
          <p className="text-zinc-500 font-bold uppercase tracking-widest mb-0.5" style={{ fontSize: '9px' }}>Interesse declarado</p>
          <p className="text-zinc-300 truncate">{lead.service_interest || '—'}</p>
        </div>
        <div>
          <p className="text-zinc-500 font-bold uppercase tracking-widest mb-0.5" style={{ fontSize: '9px' }}>Origem do contato</p>
          <p className="text-zinc-300 truncate capitalize">{lead.utm_source || 'Direto'} <span className="text-zinc-500">• {lead.utm_campaign || '—'}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="bg-[#1E2028] rounded-xl p-2.5 border border-white/[0.07]">
          <p className="text-zinc-500 font-bold uppercase tracking-widest mb-1" style={{ fontSize: '9px' }}>Intenção</p>
          <span className={`inline-flex px-2 py-1 rounded-lg text-[10px] font-semibold border ${getTempColor(temp)}`}>{getIntentLabel(temp)}</span>
        </div>
        <div className="bg-[#1E2028] rounded-xl p-2.5 border border-white/[0.07]">
          <p className="text-zinc-500 font-bold uppercase tracking-widest mb-1" style={{ fontSize: '9px' }}>Próximo passo</p>
          <p className="text-zinc-200 font-semibold truncate">{nextStep}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {lead.valor ? (
          <p className="text-[11px] font-bold text-emerald-400">R$ {Number(lead.valor).toLocaleString('pt-BR')}</p>
        ) : (
          <p className="text-[10px] text-zinc-600 italic">Sem valor</p>
        )}
        <p className="text-[9px] text-zinc-500">{formatBrazilDate(lead.created_at || lead.click_time)}</p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-white/[0.04]">
        <button
          onClick={(e) => onQuickAction(e, lead.id, 'whatsapp', lead)}
          className="flex-1 flex items-center justify-center gap-1.5 h-10 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 text-[#25D366] rounded-lg text-[11px] font-bold transition-colors"
        >
          <MessageCircle size={14} /> WhatsApp
        </button>
        <button onClick={(e) => onQuickAction(e, lead.id, 'obs', lead)} className="flex items-center justify-center h-10 w-10 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-zinc-400 rounded-lg transition-colors" title="Observação"><Edit2 size={13} /></button>
        <button onClick={(e) => onQuickAction(e, lead.id, 'valor', lead)} className="flex items-center justify-center h-10 w-10 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-zinc-400 rounded-lg transition-colors" title="Valor"><DollarSign size={13} /></button>
        <button onClick={() => onOpen(lead)} className="flex items-center justify-center h-10 w-10 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white rounded-lg transition-colors" title="Detalhes"><Search size={13} /></button>
      </div>
    </div>
  );
};

const MobileFilterSheet = ({ open, onClose, statusFilter, setStatusFilter, typeFilter, setTypeFilter, originFilter, setOriginFilter, uniqueOrigins, onReset }: any) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90]"
          onClick={onClose}
        />
        <motion.div
          initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          className="fixed bottom-0 left-0 right-0 bg-[#121214] border-t border-white/10 rounded-t-3xl z-[100] pb-safe"
        >
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-white/20 rounded-full" />
          </div>
          <div className="px-5 py-4 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Filtros</h3>
              <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white bg-white/5 rounded-full"><X size={14} /></button>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Status</p>
              <div className="flex flex-wrap gap-2">
                {['todos', 'novo', 'conversou', 'proposta', 'fechado', 'perdido'].map(s => (
                  <button key={s} onClick={() => setStatusFilter(s)}
                    className={`px-3 h-9 rounded-lg text-xs font-bold border capitalize transition-all ${statusFilter === s ? 'bg-white/15 border-white/20 text-white' : 'bg-white/5 border-white/5 text-zinc-400'}`}>
                    {s === 'todos' ? 'Todos' : statusLabels[s] || s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Tipo</p>
              <div className="flex flex-wrap gap-2">
                {[['todos', 'Todos'], ['whatsapp_quick', 'WhatsApp'], ['diagnostic_form', 'Diagnóstico'], ['qualified_lead', 'Qualificado']].map(([v, l]) => (
                  <button key={v} onClick={() => setTypeFilter(v)}
                    className={`px-3 h-9 rounded-lg text-xs font-bold border transition-all ${typeFilter === v ? 'bg-white/15 border-white/20 text-white' : 'bg-white/5 border-white/5 text-zinc-400'}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Origem</p>
              <div className="flex flex-wrap gap-2">
                {(['todos', ...uniqueOrigins] as string[]).map(org => (
                  <button key={org} onClick={() => setOriginFilter(org)}
                    className={`px-3 h-9 rounded-lg text-xs font-bold border capitalize transition-all ${originFilter === org ? 'bg-white/15 border-white/20 text-white' : 'bg-white/5 border-white/5 text-zinc-400'}`}>
                    {org === 'todos' ? 'Todas' : org}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-1 pb-4">
              <button onClick={onReset} className="flex-1 h-12 border border-white/10 rounded-xl text-sm text-zinc-400 font-bold">Limpar</button>
              <button onClick={onClose} className="flex-1 h-12 bg-white rounded-xl text-sm text-black font-bold">Aplicar</button>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// --- Main Page Component ---

export const AcquisitionDashboard = () => {
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filters
  const [dateFilter, setDateFilter] = useState('30d');
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [typeFilter, setTypeFilter] = useState('todos');
  const [originFilter, setOriginFilter] = useState('todos');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setLoginError('Credenciais inválidas.');
    setLoginLoading(false);
  };

  const handleLogout = async () => await supabase.auth.signOut();

  const showFeedback = (message: string, type: 'success' | 'error') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3000);
  };

  useEffect(() => {
    if (!session) return;
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setLeads(data || []);
      } catch (err: any) {
        console.error('Erro ao buscar leads:', err);
        setError('Não foi possível carregar as oportunidades.');
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, [session]);

  const updateLeadField = async (id: number, field: string, value: any) => {
    try {
      const { error } = await supabase.from('leads').update({ [field]: value }).eq('id', id);
      if (error) throw error;
      setLeads(prev => prev.map(l => l.id === id ? { ...l, [field]: value } : l));
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead({ ...selectedLead, [field]: value });
      }
      showFeedback('Atualizado com sucesso', 'success');
    } catch (err) {
      console.error(err);
      showFeedback('Erro ao atualizar', 'error');
    }
  };

  const handleQuickAction = (e: React.MouseEvent, leadId: number, action: 'obs' | 'valor' | 'archive' | 'whatsapp', lead: any) => {
    e.stopPropagation();
    if (action === 'obs') {
      const newObs = window.prompt('Nova observação comercial:', lead.observacao || '');
      if (newObs !== null) updateLeadField(leadId, 'observacao', newObs);
    } else if (action === 'valor') {
      const newValStr = window.prompt('Novo valor potencial (apenas números, ex: 1500):', lead.valor || '');
      if (newValStr !== null) {
        const newVal = parseFloat(newValStr.replace(/[^0-9,.-]/g, '').replace(',', '.'));
        if (!isNaN(newVal)) updateLeadField(leadId, 'valor', newVal);
      }
    } else if (action === 'archive') {
      showFeedback('Arquivamento disponível em breve.', 'error');
    } else if (action === 'whatsapp') {
      if (lead.lead_phone) {
        const phone = lead.lead_phone.replace(/\D/g, '');
        window.open(`https://wa.me/55${phone}`, '_blank');
      } else {
        showFeedback('Contato sem telefone cadastrado.', 'error');
      }
    }
  };

  const filteredLeads = useMemo(() => {
    let filtered = [...leads];
    const now = new Date();

    filtered = filtered.filter(l => {
      if (dateFilter === 'todos') return true;
      const d = new Date(l.created_at || l.click_time);
      if (isNaN(d.getTime())) return true;
      const diffDays = (now.getTime() - d.getTime()) / (1000 * 3600 * 24);
      if (dateFilter === 'hoje') return d.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }) === now.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
      if (dateFilter === '7d') return diffDays <= 7;
      if (dateFilter === '30d') return diffDays <= 30;
      return true;
    });

    if (searchFilter) {
      const s = searchFilter.toLowerCase();
      filtered = filtered.filter(l => 
        (l.lead_name || '').toLowerCase().includes(s) ||
        (l.lead_phone || '').toLowerCase().includes(s) ||
        (l.service_interest || '').toLowerCase().includes(s) ||
        (l.utm_campaign || '').toLowerCase().includes(s) ||
        (l.utm_source || '').toLowerCase().includes(s)
      );
    }

    if (statusFilter !== 'todos') {
      filtered = filtered.filter(l => (l.status || 'novo') === statusFilter);
    }

    if (typeFilter !== 'todos') {
      filtered = filtered.filter(l => l.lead_type === typeFilter);
    }

    if (originFilter !== 'todos') {
      filtered = filtered.filter(l => (l.utm_source || 'Desconhecida').toLowerCase() === originFilter.toLowerCase());
    }

    return filtered;
  }, [leads, dateFilter, searchFilter, statusFilter, typeFilter, originFilter]);

  const uniqueOrigins = useMemo(() => {
    const origins = new Set(leads.map(l => l.utm_source || 'Desconhecida'));
    return Array.from(origins);
  }, [leads]);

  const metrics = useMemo(() => {
    const total = filteredLeads.filter(l => l.status !== 'arquivado').length;
    const novos = filteredLeads.filter(l => l.status === 'novo' || !l.status).length;
    const conversou = filteredLeads.filter(l => l.status === 'conversou').length;
    const propostas = filteredLeads.filter(l => l.status === 'proposta').length;
    const fechados = filteredLeads.filter(l => l.status === 'fechado').length;
    const valorPotencial = filteredLeads
      .filter(l => l.status === 'proposta')
      .reduce((sum, l) => sum + (Number(l.valor) || 0), 0);
    const valorFechado = filteredLeads
      .filter(l => l.status === 'fechado')
      .reduce((sum, l) => {
        const val = l.conversion_value != null && l.conversion_value !== '' ? Number(l.conversion_value) : Number(l.valor);
        return sum + (val || 0);
      }, 0);

    return { total, novos, conversou, propostas, fechados, valorPotencial, valorFechado };
  }, [filteredLeads]);

  const quickRead = useMemo(() => {
    const strongOrigins = filteredLeads
      .filter(l => l.status === 'proposta' || l.status === 'fechado')
      .reduce((acc: Record<string, number>, lead) => {
        const origin = lead.utm_source || 'Direto';
        acc[origin] = (acc[origin] || 0) + 1;
        return acc;
      }, {});

    const topOrigin = Object.entries(strongOrigins).sort((a, b) => b[1] - a[1])[0];
    const hotPending = filteredLeads.filter(lead => {
      const temp = getTemperature(lead);
      return temp === 'Quente' && !['proposta', 'fechado'].includes(lead.status || 'novo');
    }).length;

    let nextFocus = 'Manter acompanhamento';
    if (metrics.novos >= Math.max(metrics.conversou, metrics.propostas) && metrics.novos > 0) {
      nextFocus = 'Avançar novos contatos';
    } else if (metrics.conversou >= metrics.propostas && metrics.conversou > 0) {
      nextFocus = 'Gerar próximas propostas';
    } else if (metrics.propostas > 0) {
      nextFocus = 'Acompanhar propostas abertas';
    }

    return {
      topOrigin: topOrigin ? `${topOrigin[0]} (${topOrigin[1]})` : 'Dados em formação',
      hotPending: hotPending > 0 ? `${hotPending} contato${hotPending !== 1 ? 's' : ''}` : 'Nenhuma urgência crítica',
      nextFocus
    };
  }, [filteredLeads, metrics]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-zinc-500 animate-spin mb-4" />
        <p className="text-zinc-500 font-medium text-sm tracking-wide uppercase">Carregando</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0F1014] flex flex-col items-center justify-center text-white p-6 relative">
        <div className="bg-[#17181F] border border-white/[0.08] rounded-2xl p-8 md:p-10 max-w-sm w-full shadow-2xl relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-[#A855F7]/10 border border-[#A855F7]/20 text-[#C084FC] rounded-xl flex items-center justify-center">
              <Lock size={20} />
            </div>
          </div>
          <h2 className="text-xl font-bold text-center mb-2">Painel de Rastreamento</h2>
          <p className="text-zinc-500 text-center mb-8 text-xs">Contato → proposta → venda</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs text-center mb-4">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5 ml-1">Work Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#1E2028] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C084FC] transition-all"
                placeholder="admin@empresa.com"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5 ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#1E2028] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C084FC] transition-all"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit" 
              disabled={loginLoading}
              className="w-full mt-6 h-12 bg-white hover:bg-zinc-200 text-black rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loginLoading ? <Loader2 size={16} className="animate-spin" /> : 'Acessar Workspace'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-8 h-8 text-zinc-500 animate-spin mb-4" />
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Sincronizando Inbox</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white p-6 text-center">
        <AlertCircle className="w-10 h-10 text-red-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">Acesso Restrito</h2>
        <p className="text-zinc-400 text-sm max-w-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1014] text-zinc-300 font-sans">
      {/* Toast Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-6 left-1/2 z-[200] px-6 py-2.5 rounded-full border shadow-xl ${
              feedback.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-wider">{feedback.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#111217]/88 backdrop-blur-xl border-b border-white/[0.08]">
        {/* Desktop header row */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-[#A855F7]/10 border border-[#A855F7]/20 flex items-center justify-center shrink-0">
              <Activity size={12} className="text-[#C084FC] md:hidden" />
              <Activity size={14} className="text-[#C084FC] hidden md:block" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm md:text-[15px] font-bold text-white leading-tight truncate">
                <span>Painel de Rastreamento</span>
              </h1>
              <p className="text-[9px] text-zinc-500 hidden md:block uppercase tracking-wider font-bold mt-0.5">Contato → proposta → venda</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex bg-[#17181F] border border-white/[0.08] rounded-lg p-1">
              {['hoje', '7d', '30d', 'todos'].map(period => (
                <button key={period} onClick={() => setDateFilter(period)}
                  className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-md transition-all ${dateFilter === period ? 'bg-white/12 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}>
                  {period === 'hoje' ? 'Hoje' : period === '7d' ? '7 dias' : period === '30d' ? '30 dias' : 'Todos'}
                </button>
              ))}
            </div>
            <div className="w-px h-6 bg-white/[0.06] mx-1 hidden md:block" />
            <button onClick={handleLogout} className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-white transition-colors flex items-center gap-1.5 bg-white/[0.05] md:bg-white/[0.035] px-3 py-1.5 rounded-lg border border-white/[0.06]">
              <LogOut size={12} className="md:w-3.5 md:h-3.5" /> <span className="hidden md:inline">Sair</span>
            </button>
          </div>
        </div>
        {/* Mobile period pills */}
        <div className="md:hidden px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
          {[['hoje', 'Hoje'], ['7d', '7 dias'], ['30d', '30 dias'], ['todos', 'Todos']].map(([v, l]) => (
            <button key={v} onClick={() => setDateFilter(v)}
              className={`shrink-0 px-3 h-7 rounded-md text-[10px] font-bold uppercase tracking-wider border transition-all ${
                dateFilter === v ? 'bg-white text-black border-white' : 'bg-[#17181F] text-zinc-400 border-white/[0.08]'
              }`}>{l}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 md:px-6 py-3 md:py-8">
         <div className="mb-4 md:mb-8 hidden md:block">
           <h2 className="text-lg md:text-2xl font-bold text-white mb-1">Leitura Comercial</h2>
           <p className="text-xs md:text-sm text-zinc-400">Origem, intenção, propostas e vendas em uma única visão.</p>
         </div>

         {/* Cards Superiores */}
         <div className="flex flex-col gap-2.5 md:gap-4 mb-3 md:mb-8">
           {/* Linha 1 - Funil Operacional */}
           <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
             <MetricCard title="Total" value={metrics.total} icon={Activity} colorClass="bg-white/10 text-white" />
             <MetricCard title="Novos" value={metrics.novos} icon={Users} colorClass="bg-[#3B82F6]/10 text-[#3B82F6]" />
             <MetricCard title="Conversou" value={metrics.conversou} icon={MessageCircle} colorClass="bg-[#F59E0B]/10 text-[#F59E0B]" />
             <MetricCard title="Propostas" value={metrics.propostas} icon={FileText} colorClass="bg-[#A855F7]/10 text-[#C084FC]" />
             <MetricCard title="Fechados" value={metrics.fechados} icon={CheckCircle} colorClass="bg-[#10B981]/10 text-[#10B981]" />
           </div>
           
           {/* Linha 2 - Financeiro */}
           <div className="pt-0.5 md:pt-0">
             <div className="md:hidden mb-1 px-1"><p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Resumo Financeiro</p></div>
             <div className="grid grid-cols-2 md:grid-cols-2 gap-1.5 md:gap-3">
               <MetricCard title="Em proposta" value={`R$ ${metrics.valorPotencial.toLocaleString('pt-BR')}`} icon={DollarSign} colorClass="bg-[#A855F7]/10 text-[#C084FC]" />
               <MetricCard title="Valor fechado" value={`R$ ${metrics.valorFechado.toLocaleString('pt-BR')}`} icon={DollarSign} colorClass="bg-[#10B981]/10 text-[#10B981]" />
             </div>
           </div>
         </div>

         {/* Leitura rápida */}
         <section className="mb-4 md:mb-6 space-y-3">
           <div className="flex items-center justify-between px-1">
             <div>
               <h3 className="text-sm md:text-base font-bold text-white">Leitura rápida</h3>
               <p className="text-[11px] md:text-xs text-zinc-500">Sinais derivados do rastreamento atual.</p>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-3">
             <div className="rounded-2xl border border-white/[0.08] bg-[#17181F] p-4 shadow-[0_14px_35px_rgba(0,0,0,0.16)]">
               <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Canal em destaque</p>
               <p className="text-base font-bold text-white">{quickRead.topOrigin}</p>
               <p className="mt-1 text-[11px] text-zinc-500">Origem com mais propostas ou vendas.</p>
             </div>
             <div className="rounded-2xl border border-white/[0.08] bg-[#17181F] p-4 shadow-[0_14px_35px_rgba(0,0,0,0.16)]">
               <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Atenção agora</p>
               <p className="text-base font-bold text-white">{quickRead.hotPending}</p>
               <p className="mt-1 text-[11px] text-zinc-500">Intenção alta ainda fora de proposta.</p>
             </div>
             <div className="rounded-2xl border border-white/[0.08] bg-[#17181F] p-4 shadow-[0_14px_35px_rgba(0,0,0,0.16)]">
               <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Próximo foco</p>
               <p className="text-base font-bold text-white">{quickRead.nextFocus}</p>
               <p className="mt-1 text-[11px] text-zinc-500">Sugestão baseada no avanço comercial.</p>
             </div>
           </div>

           <div className="rounded-2xl border border-white/[0.08] bg-[#17181F] p-4 md:p-5 shadow-[0_14px_35px_rgba(0,0,0,0.16)]">
             <div className="flex items-center justify-between gap-4 mb-4">
               <div>
                 <h3 className="text-sm md:text-base font-bold text-white">Caminho rastreado</h3>
                 <p className="text-[11px] md:text-xs text-zinc-500">Novo → Conversou → Proposta → Fechado</p>
               </div>
             </div>
             <div className="grid grid-cols-4 gap-2 md:gap-3">
               {[
                 { label: 'Novo', value: metrics.novos, dot: 'bg-[#3B82F6]' },
                 { label: 'Conversou', value: metrics.conversou, dot: 'bg-[#F59E0B]' },
                 { label: 'Proposta', value: metrics.propostas, dot: 'bg-[#A855F7]' },
                 { label: 'Fechado', value: metrics.fechados, dot: 'bg-[#10B981]' }
               ].map(step => (
                 <div key={step.label} className="relative rounded-xl border border-white/[0.07] bg-[#1E2028] p-3">
                   <div className="flex items-center gap-2 mb-2">
                     <span className={`h-2 w-2 rounded-full ${step.dot}`} />
                     <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-400 truncate">{step.label}</span>
                   </div>
                   <p className="text-lg md:text-xl font-extrabold text-white">{step.value}</p>
                 </div>
               ))}
             </div>
           </div>
         </section>

         {/* Filtros Rápidos */}
         {/* Desktop filter bar */}
         <div className="hidden md:flex flex-row items-center gap-3 mb-5 bg-[#17181F] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
           <div className="relative flex-1">
             <Search size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
             <input type="text" placeholder="Buscar por nome, telefone, serviço, campanha, observação..."
               value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)}
               className="w-full bg-transparent border-none pl-10 pr-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none" />
           </div>
           <div className="w-px h-6 bg-white/[0.06] shrink-0" />
           <div className="flex items-center gap-2 pr-3">
             <div className="relative">
               <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                 className={`h-9 bg-[#1E2028] hover:bg-white/[0.07] border border-white/[0.08] rounded-lg pl-3 pr-7 text-xs font-medium outline-none appearance-none cursor-pointer transition-colors ${
                   statusFilter !== 'todos' ? 'text-white border-white/20' : 'text-zinc-500'
                 }`}>
                 <option value="todos" className="bg-[#111113]">Status</option>
                 <option value="novo" className="bg-[#111113]">Novo</option>
                 <option value="conversou" className="bg-[#111113]">Conversou</option>
                 <option value="proposta" className="bg-[#111113]">Proposta</option>
                 <option value="fechado" className="bg-[#111113]">Fechado</option>
                 <option value="perdido" className="bg-[#111113]">Perdido</option>
               </select>
               <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600" />
             </div>
             <div className="relative">
               <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                 className={`h-9 bg-[#1E2028] hover:bg-white/[0.07] border border-white/[0.08] rounded-lg pl-3 pr-7 text-xs font-medium outline-none appearance-none cursor-pointer transition-colors ${
                   typeFilter !== 'todos' ? 'text-white border-white/20' : 'text-zinc-500'
                 }`}>
                 <option value="todos" className="bg-[#111113]">Tipo</option>
                 <option value="whatsapp_quick" className="bg-[#111113]">WhatsApp Rápido</option>
                 <option value="whatsapp_quick_form" className="bg-[#111113]">Formulário WhatsApp</option>
                 <option value="diagnostic_form" className="bg-[#111113]">Diagnóstico</option>
                 <option value="qualified_lead" className="bg-[#111113]">Qualificado</option>
               </select>
               <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600" />
             </div>
             <div className="relative">
               <select value={originFilter} onChange={e => setOriginFilter(e.target.value)}
                 className={`h-9 bg-[#1E2028] hover:bg-white/[0.07] border border-white/[0.08] rounded-lg pl-3 pr-7 text-xs font-medium outline-none appearance-none cursor-pointer transition-colors ${
                   originFilter !== 'todos' ? 'text-white border-white/20' : 'text-zinc-500'
                 }`}>
                 <option value="todos" className="bg-[#111113]">Origem</option>
                 {uniqueOrigins.map(org => (<option key={org} value={org} className="bg-[#111113] capitalize">{org}</option>))}
               </select>
               <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600" />
             </div>
             {(statusFilter !== 'todos' || typeFilter !== 'todos' || originFilter !== 'todos') && (
               <button onClick={() => { setStatusFilter('todos'); setTypeFilter('todos'); setOriginFilter('todos'); }}
                 className="h-8 px-3 text-[10px] font-bold text-zinc-500 hover:text-red-400 border border-white/[0.06] rounded-lg transition-colors">
                 Limpar
               </button>
             )}
           </div>
         </div>
         {/* Mobile search + filter trigger */}
         <div className="md:hidden flex gap-2 mb-2">
           <div className="relative flex-1">
             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
             <input type="text" placeholder="Buscar oportunidade..."
               value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)}
               className="w-full h-10 bg-[#111113] border border-white/[0.06] rounded-xl pl-9 pr-4 text-xs text-white focus:outline-none focus:border-white/20" />
           </div>
           <button onClick={() => setMobileFiltersOpen(true)}
             className="relative w-10 h-10 shrink-0 bg-[#111113] border border-white/[0.06] rounded-xl flex items-center justify-center text-zinc-400 transition-colors active:bg-white/[0.04]">
             <SlidersHorizontal size={14} />
             {(statusFilter !== 'todos' || typeFilter !== 'todos' || originFilter !== 'todos') && (
               <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white text-black text-[9px] font-black rounded-full flex items-center justify-center">
                 {[statusFilter, typeFilter, originFilter].filter(f => f !== 'todos').length}
               </span>
             )}
           </button>
         </div>

         {/* Desktop Inbox Lista */}
         <div className="hidden md:block bg-[#17181F] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
           {/* Inbox header */}
           <div className="grid grid-cols-[1fr_1fr_1fr_130px_140px_160px_100px] gap-4 px-6 py-3.5 border-b border-white/[0.07] bg-[#1E2028]">
             <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Contato</p>
             <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Interesse declarado</p>
             <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Origem do contato</p>
             <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Intenção</p>
             <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 w-[140px]">Avanço</p>
             <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Próximo passo</p>
             <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 text-right w-[110px]">Entrada</p>
           </div>
           <div className="divide-y divide-white/[0.04] max-h-[680px] overflow-y-auto scrollbar-hide">
             {filteredLeads.length === 0 ? (
               <div className="py-20 text-center flex flex-col items-center justify-center">
                 <div className="w-10 h-10 bg-white/[0.03] border border-white/[0.06] rounded-xl flex items-center justify-center text-zinc-600 mb-4"><Search size={16} /></div>
                 <p className="text-zinc-600 text-sm">Nenhuma oportunidade encontrada.</p>
                 <p className="text-zinc-700 text-xs mt-1">Ajuste os filtros ou busca.</p>
               </div>
             ) : filteredLeads.map(lead => {
               const temp = getTemperature(lead);
               return (
                 <div key={lead.id} onClick={() => { setSelectedLead(lead); setIsDrawerOpen(true); }}
                   className="group grid grid-cols-[1fr_1fr_1fr_130px_140px_160px_100px] gap-4 items-center px-6 py-5 hover:bg-white/[0.035] cursor-pointer transition-colors border-l-2 border-transparent hover:border-l-[#A855F7]/50">
                   {/* Contato */}
                   <div className="min-w-0">
                     <p className="text-sm font-semibold text-white truncate">{lead.lead_name || 'Sem nome'}</p>
                     <p className="text-xs text-zinc-600 font-mono mt-0.5 truncate">{lead.lead_phone || '—'}</p>
                   </div>
                   {/* Serviço */}
                   <div className="min-w-0">
                     <p className="text-sm text-zinc-300 truncate">{lead.service_interest || '—'}</p>
                     <p className="text-[10px] text-zinc-500 mt-0.5">{getLeadTypeTranslation(lead.lead_type)}</p>
                   </div>
                   {/* Origem */}
                   <div className="min-w-0">
                     <p className="text-sm text-zinc-300 capitalize truncate">{lead.utm_source || 'Direto'}</p>
                     <p className="text-[10px] text-zinc-600 truncate mt-0.5">{lead.utm_campaign || '—'}</p>
                   </div>
                   {/* Intenção */}
                   <div className="w-[130px]">
                     <span className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${getTempColor(temp)}`}>
                       {getIntentLabel(temp)}
                     </span>
                   </div>
                   {/* Status */}
                   <div className="flex flex-col gap-1.5 w-[140px]">
                     <select onClick={(e) => e.stopPropagation()} value={lead.status || 'novo'}
                       onChange={(e) => updateLeadField(lead.id, 'status', e.target.value)}
                       className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border outline-none cursor-pointer appearance-none transition-all ${getStatusColor(lead.status || 'novo')}`}>
                       <option value="novo" className="bg-[#1A1A1E]">NOVO</option>
                       <option value="conversou" className="bg-[#1A1A1E]">CONVERSOU</option>
                       <option value="proposta" className="bg-[#1A1A1E]">PROPOSTA</option>
                       <option value="fechado" className="bg-[#1A1A1E]">FECHADO</option>
                       <option value="perdido" className="bg-[#1A1A1E]">PERDIDO</option>
                     </select>
                     <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border opacity-70 ${getTempColor(temp)}`}>{temp}</span>
                   </div>
                   {/* Próximo passo */}
                   <div className="w-[160px]">
                     <p className="text-xs font-semibold text-zinc-200 leading-snug">{getNextStepLabel(lead.status || 'novo')}</p>
                   </div>
                   {/* Entrada + Ações */}
                   <div className="flex flex-col items-end gap-1.5 w-[100px]">
                     <span className="text-xs text-zinc-500">{formatBrazilDate(lead.created_at || lead.click_time)}</span>
                     <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all duration-150">
                       <button onClick={(e) => handleQuickAction(e, lead.id, 'whatsapp', lead)}
                         title="Abrir WhatsApp"
                         className="p-1.5 text-zinc-600 hover:text-[#25D366] hover:bg-[#25D366]/10 rounded-md transition-colors">
                         <MessageCircle size={12} />
                       </button>
                       <button onClick={(e) => handleQuickAction(e, lead.id, 'obs', lead)}
                         title="Editar observação"
                         className="p-1.5 text-zinc-600 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                         <Edit2 size={12} />
                       </button>
                       <button onClick={(e) => handleQuickAction(e, lead.id, 'valor', lead)}
                         title="Editar valor"
                         className="p-1.5 text-zinc-600 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-md transition-colors">
                         <DollarSign size={12} />
                       </button>
                     </div>
                   </div>
                 </div>
               );
             })}
           </div>
           {/* Footer count */}
           {filteredLeads.length > 0 && (
             <div className="px-6 py-3 border-t border-white/[0.06] bg-[#1E2028]">
               <p className="text-[10px] text-zinc-500">{filteredLeads.length} oportunidade{filteredLeads.length !== 1 ? 's' : ''}</p>
             </div>
           )}
         </div>

         {/* Mobile Lead Cards */}
         <div className="md:hidden space-y-3">
           {filteredLeads.length === 0 ? (
             <div className="py-16 text-center flex flex-col items-center justify-center">
               <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-zinc-600 mb-4"><Search size={20} /></div>
               <p className="text-zinc-400 text-sm">Nenhuma oportunidade encontrada.</p>
             </div>
           ) : filteredLeads.map(lead => (
             <MobileLeadCard
               key={lead.id}
               lead={lead}
               onOpen={(l: any) => { setSelectedLead(l); setIsDrawerOpen(true); }}
               onQuickAction={handleQuickAction}
             />
           ))}
         </div>
      </main>

      <MobileFilterSheet
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        typeFilter={typeFilter} setTypeFilter={setTypeFilter}
        originFilter={originFilter} setOriginFilter={setOriginFilter}
        uniqueOrigins={uniqueOrigins}
        onReset={() => { setStatusFilter('todos'); setTypeFilter('todos'); setOriginFilter('todos'); }}
      />

      <LeadDrawer lead={selectedLead} isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} updateField={updateLeadField} />
    </div>
  );
};
