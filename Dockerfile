# version of node to use
FROM node:21

# Directory to save image
WORKDIR /app

#Install app dependencies
COPY package*.json ./
RUN npm install

#Copy all files to app
COPY . .
EXPOSE 3000
CMD ["npm", "run" , "start"]