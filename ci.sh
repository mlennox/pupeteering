# setup sandbox
chromium_dir=$(ls ls node_modules/puppeteer/.local-chromium/ | grep linux)
cd ./node_modules/puppeteer/.local-chromium/$chromium_dir/chrome-linux/
sudo chown root:staff chrome_sandbox
sudo chmod 4755 chrome_sandbox
# copy sandbox executable to a shared location
sudo cp chrome_sandbox /usr/local/sbin/chrome-devel-sandbox
# CHROME_DEVEL_SANDBOX env variable part of circleci config

yarn start &

# https://discuss.circleci.com/t/memory-problems-with-jest-and-workers/10297
yarn test --maxWorkers 2
