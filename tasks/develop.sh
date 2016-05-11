#!/usr/bin/env bash -x

APP_ENV_VARS=$(cat .env)
env $APP_ENV_VARS supervisor "$@" server.js
SERVER_PID=$!

trap "kill $SERVER_PID" SIGINT SIGTERM
