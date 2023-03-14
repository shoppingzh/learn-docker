mkdir magic
cd magic
git clone https://github.com/shoppingzh/learn-docker.git
cd learn-docker

docker compose up -d

@REM npm i -g open-cli

open-cli http://localhost

