FROM node:12
RUN echo 'Welcome to Ginger App!'

# Exposing port to be used from outside
EXPOSE 3000

# Preparing for building
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

# Starting
CMD ["npm", "run", "start"]