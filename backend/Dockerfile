# Use a imagem oficial do Node.js
FROM node:latest

# Cria o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Expõe a porta em que o servidor Express está rodando
EXPOSE 3030

# Comando para iniciar o servidor
CMD ["npm", "start"]
