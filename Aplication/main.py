import os
from time import sleep

os.system('cls')
res = input('Deseja instalar dependencias ? [S/N]: ')[0].upper()
if res == 'S':
    os.system('npm install')
print('Iniciando aplicação...')
sleep(1)

os.system('cls')
try:
    os.system('npm run dev')
except:
    print('Impossivel rodar servidor!')
else:
    print('Ate mais!')