# MushAI
### Installation
Requirements:
> Python = 3.11.9,
> Node.js = 20.13.1

Dependencies:
```sh
npm i --prefix mushrooms-ui

python3 -m venv .venv
source .venv/bin/activate
pip3 install -r requirements.txt
```

Tensorflow models:
```sh
./scripts/uploading.sh
```

Environment:
```sh
cp dist.env .env
```

Test DB (docker must be installed):
```sh
./scripts/dbrun.sh
```

### Building
Server-side development:
```sh
./scripts/development.sh
```
Client-side development:
```sh
npm run --prefix mushrooms-ui dev
```