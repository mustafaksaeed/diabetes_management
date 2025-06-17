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

## Folder Structure

```
/root/
    /src/
        /Assets/ -> images, logos, animations, etc. of app
            /Logos/
            /Images/
            /Animations/
        /Components/ -> reuseable blocks of code for UI
            /Global
                /SearchButton.jsx
                /FoodSearchResultCard.jsx
                ...
            /Forms
                /BorderedInput.jsx
                ...
            /Modals
                /Error-Alert.jsx
                ....
        /Config -> configurations of app like language, appmode ( dark, light), serverurl, serverMode -> PROD, STAGING, DEV
            /AppConfig.json -> holds configs of app
            /Config.js -> class to control config settings
        /Contexts -> contexts to hold app. shared data that won't change much
            ...
        /Constants -> variables used within app that won't change at all
            /Collections.js

        /Hooks/
            (custom hooks)
        /Routes
            /Routes.jsx
        /Stores/
            /Profile
            /FoodSearch
            ...
        /Styles
            /Styles.js
            /Colors.js
            /FontSizes.js
            /BorderRadiuses.js
            ....
        /Themes -> for color settings of app
            /Light.js
            /Dark.js
            /Theme.jsx
        /i18n -> localization ( languages)
            /locales -> language files
                /en.json
                /es.json
            /i18n.js
        /Services
            ( api calls ( react query settings ))
        /Utils
            /GetReadableTimeFormat.js
            /HandleLongString.js
            ...
        /Firebase
            /Init.js







```
