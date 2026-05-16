export const formatBrazilDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return formatter.format(date).replace(',', ' às');
};
