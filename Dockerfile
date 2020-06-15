FROM node:10 as builder
WORKDIR /usr/src/app
COPY . .
ARG REACT_APP_MAPBOXAPIACCESSTOKEN
ENV REACT_APP_MAPBOXAPIACCESSTOKEN=$REACT_APP_MAPBOXAPIACCESSTOKEN
ARG REACT_APP_GRAPHQL_ENDPOINT
ENV REACT_APP_GRAPHQL_ENDPOINT=$REACT_APP_GRAPHQL_ENDPOINT
RUN yarn
RUN yarn run build

FROM node:10-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/build build
COPY --from=builder /usr/src/app/server.js .
RUN yarn
RUN yarn add express fs http path express-favicon
EXPOSE 3000
CMD [ "node", "server.js" ]