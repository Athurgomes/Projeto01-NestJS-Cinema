# Usa uma versão leve do Node.js
FROM node:20-alpine

# O Prisma e o Healthcheck precisam destas ferramentas para rodar no Alpine
RUN apk add --no-cache openssl curl

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia os ficheiros de dependências primeiro (otimiza o cache do Docker)
COPY package*.json ./
COPY prisma ./prisma/

# Instala as dependências e gera o cliente Prisma
RUN npm install
RUN npx prisma generate

# Copia o resto do código da sua máquina para o container
COPY . .

# Expõe a porta que o NestJS vai usar
EXPOSE 3000

# Script de inicialização: Roda as migrations (cria o banco se não existir) e sobe a API
CMD npx prisma migrate deploy && npm run start:dev