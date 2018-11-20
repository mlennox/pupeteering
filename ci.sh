yarn start &
# sleep 10
# curl http://localhost:3000
# https://discuss.circleci.com/t/memory-problems-with-jest-and-workers/10297
yarn test --maxWorkers 2