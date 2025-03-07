

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


# Monitoring with Grafana, Loki and Prometheus

## Prerequisite
- Basic Knowlege of Node.js and NestJS
- Basic to Intermediate knowledge in Docker and Containerization 

## Installation and Setup
#### 1. Prometheus Server
- Create a `prometheus-config.yml` file and copy the following configration. Don't forget to replace `<NDOEJS_SERVER_ADDRESS>` with actual value and Port.
```yml
global:
  scrape_interval: 4s

scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets: ["<NDOEJS_SERVER_ADDRESS>"]
```
- create docker-compose.yml file
- Start the Prometheus Server using docker compose up command 
```
version: "3"

services:
  prom-server:
    image: prom/prometheus
    ports:
      - 9090:9090
    volumes:
      - ./prometheus-config.yml:/etc/prometheus/prometheus.yml
```
Great, The prometheus server is now up and running at PORT 9090

#### 2. Setup Grafana
```bash
docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss
```
![grafana](https://grafana.com/static/img/grafana/showcase_visualize.jpg)

### 3. Setup Loki Server
- npm i winston winston-loki
```bash
docker run -d --name=loki -p 3100:3100 grafana/loki
```

- in tsconfig file, add  "moduleResolution": "node", "esModuleInterop": true

