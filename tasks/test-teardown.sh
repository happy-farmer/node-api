#!/usr/bin/env bash
echo 'Droping testing database...'
mongo 'api_run_test' --eval "db.dropDatabase()"
echo 'see ya'
