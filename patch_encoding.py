
import os

# Padrões de corrupção comuns quando bytes UTF-8 são lidos como Latin1/ANSI
replacements = {
    'clÃ\xadnica': 'clínica',
    'clÃ\xadnicas': 'clínicas',
    'mÃ©dica': 'médica',
    'estÃ©tica': 'estética',
    'AvaliaÃ§Ã£o': 'Avaliação',
    'AvaliaÃ§Ãµes': 'Avaliações',
    'harmonizaÃ§Ã£o': 'harmonização',
    'avanÃ§ada': 'avançada',
    'nÃ£o': 'não',
    'estratÃ©gico': 'estratégico',
    'estratÃ©gica': 'estratégica',
    'â€”': '—',
    'Ã\xad': 'í',
    'Ã©': 'é',
    'Ã¡': 'á',
    'Ã£': 'ã',
    'Ã§': 'ç',
    'Ãµ': 'õ',
    'Ãª': 'ê',
    'Ã³': 'ó',
    'Ã´': 'ô',
    'Ãº': 'ú',
    'Ã\x93': 'Ó',
    'Ã\x8a': 'Ê',
}

target_file = 'index.tsx'

try:
    with open(target_file, 'r', encoding='latin1') as f:
        content = f.read()

    for old, new in replacements.items():
        content = content.replace(old, new)

    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Sucesso ao limpar index.tsx")
except Exception as e:
    print(f"Erro: {e}")
