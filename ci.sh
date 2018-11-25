yarn start &
sleep 10
# curl http://localhost:3000
# curl -X GET http://localhost:3000 -w %{time_connect}:%{time_starttransfer}:%{time_total}

# https://discuss.circleci.com/t/memory-problems-with-jest-and-workers/10297
yarn test --maxWorkers 2
# sleep 10
# curl -X GET http://localhost:3000 -w %{time_connect}:%{time_starttransfer}:%{time_total}
# sleep 10
# curl http://localhost:3000
# sleep 10
# curl http://localhost:3000
