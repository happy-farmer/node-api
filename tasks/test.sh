#!/usr/bin/env bash

APP_ENV_VARS="PORT=6789 DBURL=mongodb://localhost:27017/test_api_test"
env $APP_ENV_VARS tape ./tests/**/*Spec.js
