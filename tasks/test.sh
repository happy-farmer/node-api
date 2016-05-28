#!/usr/bin/env bash

APP_ENV_VARS=$(cat .env_test)
env $APP_ENV_VARS tape ./tests/**/*Spec.js
