FROM node:12
WORKDIR /app
COPY package*.json /app/
RUN cd /app && npm install yarn && ./node_modules/yarn/bin/yarn install
COPY backend /app/backend/
COPY public /app/public/
COPY src /app/src/
COPY README.md /app/
COPY .env /app/
EXPOSE 4000
CMD ["npm", "run", "start"]