FROM node:14.4-alpine3.12

# ARG USER_UID=${UID:-1000}
ARG SETUP_MODE=normal
RUN apk update && apk add bash postgresql-client
RUN mkdir -p /app
# RUN addgroup -S app && adduser -S app -G app

ENV APP_HOME=/app
WORKDIR $APP_HOME
# RUN chown -R app:app $APP_HOME

COPY ./entrypoint.sh $APP_HOME

COPY . $APP_HOME
# chown all the files to the app user
# RUN chown -R app:app $APP_HOME

# USER app

# run entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]
