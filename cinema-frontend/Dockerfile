# Usa uma versão leve do Node.js
FROM node:20-alpine

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia os ficheiros de dependências
COPY package*.json ./

# Instala as dependências do React/Vite
RUN npm install

# Copia o resto do código do frontend
COPY . .

# Expõe a porta padrão do Vite
EXPOSE 5173

# O Vite precisa da flag --host 0.0.0.0 para aceitar conexões de fora do container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]