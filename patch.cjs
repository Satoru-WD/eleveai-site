const fs = require('fs');

const indexContent = fs.readFileSync('index.tsx', 'utf8');
const newHeroContent = fs.readFileSync('new_hero.tsx', 'utf8');

const lines = indexContent.split('\n');

// Find start and end of Hero component
let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const Hero = ({ onOpenModal }')) {
    startIndex = i;
  }
  // The Hero component ends just before InvestirNoEscuro
  if (lines[i].includes('const InvestirNoEscuro = () => {')) {
    // We want the end index to be where Hero ended, which is 3 blank lines before InvestirNoEscuro.
    // Let's just find the closing }; of Hero.
    for (let j = i - 1; j > startIndex; j--) {
      if (lines[j].trim() === '};') {
        endIndex = j;
        break;
      }
    }
    break;
  }
}

if (startIndex !== -1 && endIndex !== -1) {
  lines.splice(startIndex, endIndex - startIndex + 1, newHeroContent);
  fs.writeFileSync('index.tsx', lines.join('\n'));
  console.log('Successfully replaced Hero component.');
} else {
  console.log('Could not find Hero component bounds:', startIndex, endIndex);
}
