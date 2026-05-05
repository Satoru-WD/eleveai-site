const fs = require('fs');
const files = ['index.tsx', 'new_hero.tsx'];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf8');
  
  const replacements = {
    'Ã§': 'ç', 'Ã£': 'ã', 'Ã¡': 'á', 'Ã¢': 'â', 'Ã©': 'é', 'Ãª': 'ê', 
    'Ã­': 'í', 'Ã³': 'ó', 'Ã´': 'ô', 'Ãµ': 'õ', 'Ãº': 'ú', 'Ã‡': 'Ç', 'Ãƒ': 'Ã', 
    'Ã ': 'Á', 'Ã‚': 'Â', 'Ã‰': 'É', 'ÃŠ': 'Ê', 'Ã ': 'Í', 'Ã“': 'Ó', 'Ã”': 'Ô', 
    'Ã•': 'Õ', 'Ãš': 'Ú',
    'clnica': 'clínica',
    'Clnica': 'Clínica',
    'jǭ': 'já',
    'estǭ': 'está',
    'nǜo': 'não',
    'Nǜo': 'Não',
    'anǧncio': 'anúncio',
    'Anǧncio': 'Anúncio',
    'estratǸgica': 'estratégica',
    'EstratǸgica': 'Estratégica',
    'automǭticas': 'automáticas',
    'automaes': 'automações',
    'automaǜo': 'automação',
    'confirmaes': 'confirmações',
    'aes': 'ações',
    'experiǦncia': 'experiência',
    '%': 'É',
    'VocǦ': 'Você',
    'vocǦ': 'você',
    'atǸ': 'até',
    'previsvel': 'previsível',
    'construmos': 'construímos',
    'clA-nica': 'clínica',
    'soluAASes': 'soluções',
    'clÃ­nica': 'clínica',
    'Ã§Ã£o': 'ção',
    'nÃ£o': 'não',
    'Ã§Ãµes': 'ções',
    'Ã©': 'é',
    'Sua clnica': 'Sua clínica',
    'sua clnica': 'sua clínica'
  };

  for (let [bad, good] of Object.entries(replacements)) {
    content = content.split(bad).join(good);
  }

  // Missing replacements
  content = content.replace(/\?\"/g, '—');
  content = content.replace(//g, 'í');

  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed encoding in ' + file);
});
