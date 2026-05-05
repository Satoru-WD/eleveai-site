
import os
import re

target_file = 'index.tsx'

with open(target_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the specific corrupted strings directly
replacements = {
    'ClÃƒÂ­nica': 'Clínica',
    'clÃƒÂ­nica': 'clínica',
    'clÃƒÂ­nicas': 'clínicas',
    'ClÃƒÂ­nicas': 'Clínicas',
    'EstratÃƒÂ©gico': 'Estratégico',
    'estratÃƒÂ©gico': 'estratégico',
    'EstratÃƒÂ©gica': 'Estratégica',
    'estratÃƒÂ©gica': 'estratégica',
    'nÃƒÂ£o': 'não',
    'NÃƒÂ£o': 'Não',
    'ÃƒÂ‰': 'É',
    'ÃƒÂ©': 'é',
    'ÃƒÂ­': 'í',
    'ÃƒÂ¡': 'á',
    'ÃƒÂ£': 'ã',
    'ÃƒÂ§': 'ç',
    'ÃƒÂµ': 'õ',
    'ÃƒÂ³': 'ó',
    'ÃƒÂº': 'ú',
    'ÃƒÂª': 'ê',
    'ÃƒÂ´': 'ô',
    'ÃƒÂ\x89': 'É',
    'ÃƒÂ\x8d': 'Í',
    'ÃƒÂ\x8a': 'Ê',
    'ÃƒÂ\x93': 'Ó',
    'Ã¢Â€Â”': '—',
    'Ã¢Â€Â¢': '•',
    'Ã‚Â©': '©',
    'aÃƒÂ§ÃƒÂµes': 'ações',
    'AÃƒÂ§ÃƒÂµes': 'Ações',
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement complete.")
