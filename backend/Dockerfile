#escolhe a imagem referente a versão que estamos usando do node
FROM node:24-alpine

#define a pasta de trabalho dentro do container
WORKDIR /app

#copia os arquivos package para a pasta de trabalho
COPY package*.json ./
#instala as dependências registradas no lockfile
RUN npm ci

# copia o restando dos arquivos da pasta backend para a pasta de trabalho
COPY . .

#porta em que o servidor está rodando
EXPOSE 3000

#define o comando executado quando o container executar
CMD ["npm", "run", "dev"]