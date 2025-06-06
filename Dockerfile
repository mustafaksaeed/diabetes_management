FROM node:23-alpine

RUN mkdir /app

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# expose the app on port 5173
# EXPOSE 5173

# Start your frontend application
# CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0"]

RUN npm run build

CMD ["npm", "run", "preview", "--", "--host", "--no-open"]



