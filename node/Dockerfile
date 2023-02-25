FROM node:15

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN mkdir /var/www/html -p


RUN chown -R www-data:www-data /var/www
RUN chown -R www-data:www-data /usr/src

RUN ln -s /usr/src/app /var/www/html

EXPOSE 8080

RUN npm install

CMD ["node", "index.js"]