FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

#porta padrão que o vite usa
EXPOSE 5173

#essa adição de comandos representa que o servidor pode ficar acessível a partir de outros endereços
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]