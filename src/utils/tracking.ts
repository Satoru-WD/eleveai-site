import { supabase } from '../lib/supabase';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const getCookie = (name: string) => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

export const persistTrackingData = () => {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);

  const keys = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'gclid',
    'fbclid',
    'gbraid',
    'wbraid'
  ];

  keys.forEach((key) => {
    const value = params.get(key);
    if (value && !localStorage.getItem(key)) {
      localStorage.setItem(key, value);
    }
  });

  if (!localStorage.getItem('landing_page')) {
    localStorage.setItem('landing_page', window.location.pathname);
  }

  if (!localStorage.getItem('first_visit')) {
    localStorage.setItem('first_visit', new Date().toISOString());
  }

  const fbp = getCookie('_fbp') || localStorage.getItem('fbp');
  if (fbp && !localStorage.getItem('fbp')) {
    localStorage.setItem('fbp', fbp);
  }

  let fbc = getCookie('_fbc') || localStorage.getItem('fbc');
  if (!fbc && localStorage.getItem('fbclid')) {
    fbc = `fb.1.${Date.now()}.${localStorage.getItem('fbclid')}`;
  }
  if (fbc && !localStorage.getItem('fbc')) {
    localStorage.setItem('fbc', fbc);
  }

  console.log('Tracking persistence executed', {
    search: window.location.search,
    utm_source: localStorage.getItem('utm_source'),
    utm_campaign: localStorage.getItem('utm_campaign'),
    utm_content: localStorage.getItem('utm_content')
  });
};

const saveQualifiedLeadToSupabase = async () => {
  const alreadySaved = sessionStorage.getItem('eleveai_qualified_lead_saved') === 'true';

  if (alreadySaved) {
    console.log('Qualified lead already saved in this session');
    return;
  }

  const payload = {
    utm_source: localStorage.getItem('utm_source') || null,
    utm_campaign: localStorage.getItem('utm_campaign') || null,
    utm_content: localStorage.getItem('utm_content') || null,
    landing_page: localStorage.getItem('landing_page') || window.location.pathname,
    current_page: window.location.pathname,
    click_time: new Date().toISOString(),
    qualification_rule: 'time_45_plus_whatsapp_click',
    status: 'novo',
    observacao: null,
    valor: null,
    gclid: localStorage.getItem('gclid') || null,
    gbraid: localStorage.getItem('gbraid') || null,
    wbraid: localStorage.getItem('wbraid') || null,
    fbclid: localStorage.getItem('fbclid') || null,
    fbp: getCookie('_fbp') || localStorage.getItem('fbp') || null,
    fbc: getCookie('_fbc') || localStorage.getItem('fbc') || null,
    user_agent: navigator.userAgent || null
  };

  const { error } = await supabase
    .from('leads')
    .insert([payload]);

  if (error) {
    console.error('Failed to save qualified lead to Supabase:', error);
    return;
  }

  sessionStorage.setItem('eleveai_qualified_lead_saved', 'true');
  console.log('Qualified lead saved to Supabase:', payload);
};

export const startIntentTracking = () => {
  if (typeof window === 'undefined') return;

  if (sessionStorage.getItem('eleveai_time_45') === 'true') return;

  window.setTimeout(() => {
    sessionStorage.setItem('eleveai_time_45', 'true');

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'time_45_intent',
      current_page: window.location.pathname,
      event_time: new Date().toISOString()
    });

    console.log('Intent signal: time_45_intent');
  }, 45000);
};

export const trackWhatsAppClick = () => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event: 'whatsapp_click',
    utm_source: localStorage.getItem('utm_source') || null,
    utm_medium: localStorage.getItem('utm_medium') || null,
    utm_campaign: localStorage.getItem('utm_campaign') || null,
    utm_content: localStorage.getItem('utm_content') || null,
    utm_term: localStorage.getItem('utm_term') || null,
    gclid: localStorage.getItem('gclid') || null,
    fbclid: localStorage.getItem('fbclid') || null,
    landing_page: localStorage.getItem('landing_page') || window.location.pathname,
    first_visit: localStorage.getItem('first_visit') || null,
    current_page: window.location.pathname,
    click_time: new Date().toISOString()
  });

  console.log('WhatsApp click tracked with context', {
    utm_source: localStorage.getItem('utm_source'),
    utm_campaign: localStorage.getItem('utm_campaign'),
    utm_content: localStorage.getItem('utm_content'),
    landing_page: localStorage.getItem('landing_page')
  });

  const hasTimeIntent = sessionStorage.getItem('eleveai_time_45') === 'true';

  if (hasTimeIntent) {
    window.dataLayer.push({
      event: 'qualified_lead',
      qualification_rule: 'time_45_plus_whatsapp_click',
      utm_source: localStorage.getItem('utm_source') || null,
      utm_medium: localStorage.getItem('utm_medium') || null,
      utm_campaign: localStorage.getItem('utm_campaign') || null,
      utm_content: localStorage.getItem('utm_content') || null,
      utm_term: localStorage.getItem('utm_term') || null,
      gclid: localStorage.getItem('gclid') || null,
      fbclid: localStorage.getItem('fbclid') || null,
      landing_page: localStorage.getItem('landing_page') || window.location.pathname,
      first_visit: localStorage.getItem('first_visit') || null,
      current_page: window.location.pathname,
      click_time: new Date().toISOString()
    });

    saveQualifiedLeadToSupabase();

    console.log('Qualified lead tracked', {
      qualification_rule: 'time_45_plus_whatsapp_click',
      utm_source: localStorage.getItem('utm_source'),
      utm_campaign: localStorage.getItem('utm_campaign'),
      utm_content: localStorage.getItem('utm_content')
    });
  }
};
