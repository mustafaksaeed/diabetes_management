## Diabetes management app

project to search for foods and keep track of macros ( carbs, proteins, fats, sugars, fibers )

## tech stack

    vite/react

    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/icons-material": "^7.1.0",
    "@mui/material": "^7.1.0",
    "@mui/styled-engine-sc": "^7.1.0",
    "bootstrap": "^5.3.6",
    "react": "^19.1.0",
    "react-bootstrap": "^2.10.10",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.6.2",
    "styled-components": "^6.1.18"

## apis

    https://api.nal.usda.gov/fdc/v1/foods/search

## install dependencies

    npm install

## run project

    npm run dev

## up project

    docker compose up -d

TRY:

- aws folder has instructions to connect to ubuntu server ( security 4173 )
- install docker on to ec2 instance
- clone github repo into instance
- run docker compose up -d ( -d flag is to run in detached mode )
- docker ps -> will show running processes
- if wanting to see logs run docker logs <container_id> ( optional can run --follow )

ps: will probably need to run all docker commands with sudo ( super user do )

if everything good - should be able to see code at
ec2-3-35-233-122.ap-northeast-2.compute.amazonaws.com:4173
