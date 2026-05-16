import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { formatBrazilDate } from '../utils/dateFormatter';
import { 
  Users, TrendingUp, Target, Search, Clock, 
  MessageCircle, FileText, CheckCircle, AlertCircle, 
  Loader2, Lock, LogOut, X, Archive, Edit2, 
  DollarSign, ChevronDown, ChevronUp, Activity
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// --- Helpers ---
const getLeadTypeTranslation = (type: string) => {
  switch (type) {
    case 'whatsapp_quick': return 'WhatsApp Rápido';
    case 'diagnostic_form': return 'Diagnóstico';
    case 'qualified_lead': return 'Lead Qualificado';
    default: return type || 'Não identificado';
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
const MetricCard = ({ title, value, icon: Icon, colorClass, highlight }: any) => (
  <div className="bg-[#121214] border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:border-white/10 transition-colors">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-medium text-zinc-400">{title}</h3>
      <div className={`p-2 rounded-lg ${colorClass}`}>
        <Icon size={16} />
      </div>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-white">{value}</span>
      {highlight && <span className="text-xs font-medium text-emerald-400">{highlight}</span>}
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
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#121214] border-l border-white/5 shadow-2xl z-[110] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0A0A0A]">
              <div>
                <h2 className="text-lg font-bold text-white">Detalhes da Oportunidade</h2>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">
                  ID: {lead.id} • {formatBrazilDate(lead.created_at || lead.click_time)}
                </p>
              </div>
              <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"><X size={16} /></button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
               {/* Contato Info */}
               <section>
                 <div className="flex items-center justify-between mb-4">
                   <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Contato</h3>
                   <span className={`px-2 py-0.5 rounded text-[10px] border font-bold ${getTempColor(temp)}`}>{temp}</span>
                 </div>
                 <div className="bg-[#0A0A0A] rounded-xl p-4 border border-white/5 space-y-4">
                   <div>
                     <p className="text-xs text-zinc-500 mb-1">Nome</p>
                     <p className="text-sm text-white font-medium">{lead.lead_name || 'Sem nome'}</p>
                   </div>
                   <div>
                     <p className="text-xs text-zinc-500 mb-1">Telefone</p>
                     <div className="flex items-center justify-between">
                       <p className="text-sm text-white">{lead.lead_phone || 'Sem telefone'}</p>
                       {lead.lead_phone && (
                         <a href={`https://wa.me/55${lead.lead_phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-[#25D366] text-xs font-bold hover:underline flex items-center gap-1">
                           <MessageCircle size={12} /> Abrir WA
                         </a>
                       )}
                     </div>
                   </div>
                   <div>
                     <p className="text-xs text-zinc-500 mb-1">Email</p>
                     <p className="text-sm text-white">{lead.lead_email || '-'}</p>
                   </div>
                 </div>
               </section>

               {/* Oportunidade */}
               <section>
                 <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">Gestão da Oportunidade</h3>
                 <div className="bg-[#0A0A0A] rounded-xl p-4 border border-white/5 space-y-5">
                   <div>
                     <p className="text-xs text-zinc-500 mb-1">Serviço de interesse</p>
                     <p className="text-sm text-white">{lead.service_interest || '-'}</p>
                   </div>
                   <div>
                     <p className="text-xs text-zinc-500 mb-2">Status do Lead</p>
                     <div className="relative">
                       <select 
                         value={lead.status || 'novo'}
                         onChange={(e) => updateField(lead.id, 'status', e.target.value)}
                         className={`w-full px-4 py-2.5 rounded-lg text-xs font-bold border uppercase tracking-wider outline-none cursor-pointer appearance-none transition-all ${getStatusColor(lead.status || 'novo')}`}
                       >
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
                     <p className="text-xs text-zinc-500 mb-1 flex items-center justify-between">
                       Valor Potencial
                       <button onClick={() => {
                         const newValStr = window.prompt('Novo valor potencial (apenas números):', lead.valor || '');
                         if (newValStr !== null) {
                           const newVal = parseFloat(newValStr.replace(/[^0-9,.-]/g, '').replace(',', '.'));
                           if (!isNaN(newVal)) updateField(lead.id, 'valor', newVal);
                         }
                       }} className="text-zinc-400 hover:text-white transition-colors bg-white/5 p-1.5 rounded"><Edit2 size={12} /></button>
                     </p>
                     <p className="text-xl font-bold text-emerald-400">{lead.valor ? `R$ ${lead.valor.toLocaleString('pt-BR')}` : '-'}</p>
                   </div>
                   <div>
                     <p className="text-xs text-zinc-500 mb-1 flex items-center justify-between">
                       Observação Comercial
                       <button onClick={() => {
                         const newObs = window.prompt('Nova observação:', lead.observacao || '');
                         if (newObs !== null) updateField(lead.id, 'observacao', newObs);
                       }} className="text-zinc-400 hover:text-white transition-colors bg-white/5 p-1.5 rounded"><Edit2 size={12} /></button>
                     </p>
                     <div className="bg-white/5 p-3 rounded-lg border border-white/5 min-h-[80px]">
                       <p className="text-sm text-zinc-300 whitespace-pre-wrap">{lead.observacao || '-'}</p>
                     </div>
                   </div>
                 </div>
               </section>

               {/* Aquisição */}
               <section>
                 <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">Origem e Performance</h3>
                 <div className="bg-[#0A0A0A] rounded-xl p-4 border border-white/5 space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <p className="text-xs text-zinc-500 mb-1">Origem</p>
                       <p className="text-sm text-white capitalize">{lead.utm_source || 'Direto'}</p>
                     </div>
                     <div>
                       <p className="text-xs text-zinc-500 mb-1">Campanha</p>
                       <p className="text-sm text-white">{lead.utm_campaign || '-'}</p>
                     </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <p className="text-xs text-zinc-500 mb-1">Criativo</p>
                       <p className="text-sm text-zinc-300 truncate" title={lead.utm_content}>{lead.utm_content || '-'}</p>
                     </div>
                     <div>
                       <p className="text-xs text-zinc-500 mb-1">Tipo de Lead</p>
                       <p className="text-xs font-medium text-[#B988BF]">{getLeadTypeTranslation(lead.lead_type)}</p>
                     </div>
                   </div>
                   <div>
                     <p className="text-xs text-zinc-500 mb-1">Página de Entrada</p>
                     <p className="text-xs text-zinc-400 truncate break-all">{lead.landing_page || '-'}</p>
                   </div>
                   <div>
                     <p className="text-xs text-zinc-500 mb-1">Regra de Qualificação</p>
                     <p className="text-xs text-zinc-400">{lead.qualification_rule || '-'}</p>
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
      .filter(l => l.status !== 'perdido' && l.status !== 'arquivado')
      .reduce((sum, l) => sum + (Number(l.valor) || 0), 0);

    return { total, novos, conversou, propostas, fechados, valorPotencial };
  }, [filteredLeads]);

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
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white p-6 relative">
        <div className="bg-[#121214] border border-white/5 rounded-2xl p-8 md:p-10 max-w-sm w-full shadow-2xl relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-white/5 border border-white/10 text-zinc-400 rounded-xl flex items-center justify-center">
              <Lock size={20} />
            </div>
          </div>
          <h2 className="text-xl font-bold text-center mb-2">Central de Aquisição</h2>
          <p className="text-zinc-500 text-center mb-8 text-xs">Acesso interno seguro</p>
          
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
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-400 transition-all"
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
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-400 transition-all"
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
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-300 font-sans">
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
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
               <Activity size={14} className="text-zinc-400" />
             </div>
             <div>
               <h1 className="text-sm font-bold text-white leading-tight">Central de Inteligência de Aquisição</h1>
             </div>
           </div>
           
           <div className="flex items-center gap-4">
             <div className="hidden md:flex bg-[#121214] border border-white/5 rounded-lg p-1">
               {['hoje', '7d', '30d', 'todos'].map(period => (
                 <button
                   key={period}
                   onClick={() => setDateFilter(period)}
                   className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-md transition-all ${dateFilter === period ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                 >
                   {period === 'hoje' ? 'Hoje' : period === '7d' ? '7 dias' : period === '30d' ? '30 dias' : 'Todos'}
                 </button>
               ))}
             </div>
             
             <div className="w-px h-6 bg-white/5 mx-2 hidden md:block" />
             
             <button onClick={handleLogout} className="text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
               <LogOut size={14} /> Sair
             </button>
           </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-8">
         <div className="mb-8">
           <h2 className="text-xl font-bold text-white mb-2">Visão Geral</h2>
           <p className="text-sm text-zinc-500">Leads, origem das campanhas e oportunidades comerciais em uma única visão.</p>
         </div>

         {/* Cards Superiores */}
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
           <MetricCard title="Total de leads" value={metrics.total} icon={Activity} colorClass="bg-white/10 text-white" />
           <MetricCard title="Novos" value={metrics.novos} icon={Users} colorClass="bg-blue-500/10 text-blue-400" />
           <MetricCard title="Conversou" value={metrics.conversou} icon={MessageCircle} colorClass="bg-yellow-500/10 text-yellow-400" />
           <MetricCard title="Propostas" value={metrics.propostas} icon={FileText} colorClass="bg-purple-500/10 text-purple-400" />
           <MetricCard title="Fechados" value={metrics.fechados} icon={CheckCircle} colorClass="bg-emerald-500/10 text-emerald-400" />
           <MetricCard title="Valor potencial" value={`R$ ${metrics.valorPotencial.toLocaleString('pt-BR')}`} icon={DollarSign} colorClass="bg-zinc-800 text-white" />
         </div>

         {/* Filtros Rápidos */}
         <div className="flex flex-col md:flex-row items-center gap-3 mb-6 bg-[#121214] p-2 rounded-xl border border-white/5">
           <div className="relative flex-1 w-full">
             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
             <input 
               type="text" 
               placeholder="Buscar por nome, telefone, serviço, campanha..." 
               value={searchFilter}
               onChange={(e) => setSearchFilter(e.target.value)}
               className="w-full bg-transparent border-none pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none rounded-lg transition-all"
             />
           </div>
           
           <div className="w-full md:w-px h-px md:h-6 bg-white/5 mx-2" />
           
           <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
             <div className="relative">
               <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg pl-3 pr-8 py-1.5 text-xs font-medium text-zinc-300 outline-none appearance-none min-w-[130px] transition-colors cursor-pointer">
                 <option value="todos" className="bg-[#121214]">Todos os Status</option>
                 <option value="novo" className="bg-[#121214]">Novo</option>
                 <option value="conversou" className="bg-[#121214]">Conversou</option>
                 <option value="proposta" className="bg-[#121214]">Proposta</option>
                 <option value="fechado" className="bg-[#121214]">Fechado</option>
                 <option value="perdido" className="bg-[#121214]">Perdido</option>
               </select>
               <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" />
             </div>

             <div className="relative">
               <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg pl-3 pr-8 py-1.5 text-xs font-medium text-zinc-300 outline-none appearance-none min-w-[140px] transition-colors cursor-pointer">
                 <option value="todos" className="bg-[#121214]">Todos os Tipos</option>
                 <option value="whatsapp_quick" className="bg-[#121214]">WhatsApp Rápido</option>
                 <option value="diagnostic_form" className="bg-[#121214]">Diagnóstico</option>
                 <option value="qualified_lead" className="bg-[#121214]">Qualificado</option>
               </select>
               <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" />
             </div>

             <div className="relative">
               <select value={originFilter} onChange={e => setOriginFilter(e.target.value)} className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg pl-3 pr-8 py-1.5 text-xs font-medium text-zinc-300 outline-none appearance-none min-w-[130px] transition-colors cursor-pointer">
                 <option value="todos" className="bg-[#121214]">Todas as Origens</option>
                 {uniqueOrigins.map(org => (
                   <option key={org} value={org} className="bg-[#121214] capitalize">{org}</option>
                 ))}
               </select>
               <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" />
             </div>
           </div>
         </div>

         {/* Inbox Lista */}
         <div className="bg-[#121214] border border-white/5 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
           <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-4 border-b border-white/5 bg-[#17171A] text-[10px] font-bold uppercase tracking-widest text-zinc-500">
             <div>Oportunidade / Contato</div>
             <div>Serviço / Tipo</div>
             <div>Origem / Campanha</div>
             <div>Status / Temp</div>
             <div className="text-right">Entrada</div>
           </div>
           
           <div className="divide-y divide-white/5 max-h-[700px] overflow-y-auto scrollbar-hide">
             {filteredLeads.length === 0 ? (
               <div className="p-16 text-center flex flex-col items-center justify-center">
                 <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-zinc-600 mb-4"><Search size={20} /></div>
                 <p className="text-zinc-400 text-sm">Nenhuma oportunidade encontrada.</p>
               </div>
             ) : (
               filteredLeads.map(lead => {
                 const temp = getTemperature(lead);
                 return (
                   <div 
                     key={lead.id} 
                     onClick={() => { setSelectedLead(lead); setIsDrawerOpen(true); }}
                     className="group flex flex-col md:flex-row items-start md:items-center justify-between p-4 px-6 hover:bg-white/[0.03] cursor-pointer transition-colors"
                   >
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 w-full items-center">
                         <div className="flex flex-col">
                           <span className="text-sm font-medium text-white truncate pr-4">{lead.lead_name || 'Sem nome'}</span>
                           <span className="text-xs text-zinc-500 font-mono mt-0.5">{lead.lead_phone || 'Sem telefone'}</span>
                         </div>
                         
                         <div className="flex flex-col">
                           <span className="text-sm text-zinc-300 truncate max-w-[200px]">{lead.service_interest || '-'}</span>
                           <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">{getLeadTypeTranslation(lead.lead_type)}</span>
                         </div>

                         <div className="flex flex-col">
                           <span className="text-sm text-zinc-300 capitalize truncate">{lead.utm_source || 'Direto'}</span>
                           <span className="text-[10px] text-zinc-500 truncate max-w-[180px] mt-0.5" title={lead.utm_campaign}>{lead.utm_campaign || '-'}</span>
                         </div>

                         <div className="flex flex-row md:flex-col items-center md:items-start gap-2 md:gap-1.5 mt-3 md:mt-0">
                            <select 
                              onClick={(e) => e.stopPropagation()}
                              value={lead.status || 'novo'}
                              onChange={(e) => updateLeadField(lead.id, 'status', e.target.value)}
                              className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-widest border outline-none cursor-pointer appearance-none transition-all ${getStatusColor(lead.status || 'novo')}`}
                            >
                               <option value="novo" className="bg-[#1A1A1E]">NOVO</option>
                               <option value="conversou" className="bg-[#1A1A1E]">CONVERSOU</option>
                               <option value="proposta" className="bg-[#1A1A1E]">PROPOSTA</option>
                               <option value="fechado" className="bg-[#1A1A1E]">FECHADO</option>
                               <option value="perdido" className="bg-[#1A1A1E]">PERDIDO</option>
                            </select>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border border-transparent ${getTempColor(temp)}`}>
                              {temp}
                           </span>
                         </div>

                         <div className="hidden md:flex flex-col items-end justify-center text-right">
                            <span className="text-xs text-zinc-400">{formatBrazilDate(lead.created_at || lead.click_time)}</span>
                         </div>
                      </div>

                      <div className="hidden md:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-4 pl-4 border-l border-white/5">
                        <button onClick={(e) => handleQuickAction(e, lead.id, 'whatsapp', lead)} className="p-2 text-zinc-500 hover:text-[#25D366] hover:bg-[#25D366]/10 rounded-lg transition-colors" title="Abrir WhatsApp"><MessageCircle size={14} /></button>
                        <button onClick={(e) => handleQuickAction(e, lead.id, 'obs', lead)} className="p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Editar Observação Comercial"><Edit2 size={14} /></button>
                        <button onClick={(e) => handleQuickAction(e, lead.id, 'valor', lead)} className="p-2 text-zinc-500 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors" title="Editar Valor Potencial"><DollarSign size={14} /></button>
                        <button onClick={(e) => handleQuickAction(e, lead.id, 'archive', lead)} className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Arquivar Lead"><Archive size={14} /></button>
                      </div>
                   </div>
                 )
               })
             )}
           </div>
         </div>
      </main>

      <LeadDrawer lead={selectedLead} isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} updateField={updateLeadField} />
    </div>
  );
};

