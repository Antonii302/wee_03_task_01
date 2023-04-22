FROM node
COPY . /app
WORKDIR /app
RUN npm install
ENV PORT 3001
EXPOSE 3001
ENTRYPOINT ["npm", "start"]