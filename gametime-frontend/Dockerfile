# 1. Imagem base do Node.js
FROM node:20

# 2. Diretório de trabalho dentro do contêiner
WORKDIR /app

# 3. Copia os arquivos de dependência e instala
# Isso otimiza o cache do Docker. O npm install só roda se houver mudanças.
COPY package*.json ./
RUN npm install

# 4. Copia o restante do código do frontend para o contêiner
COPY . .

# 5. Expõe a porta que o Angular vai usar
EXPOSE 4200

# 6. Comando para iniciar a aplicação
# --- A CORREÇÃO ESTÁ AQUI ---
# Adicionamos '--host 0.0.0.0' para que o servidor seja acessível
# de fora do contêiner.
CMD ["./node_modules/.bin/ng", "serve", "--host", "0.0.0.0", "--poll", "1000"]