# [App] Tindev

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/DiegoVictor/tindev-app/config.yml?logo=github&style=flat-square)](https://github.com/DiegoVictor/tindev-app/actions)
[![react-native](https://img.shields.io/badge/react--native-0.81.5-61dafb?style=flat-square&logo=react)](https://reactnative.dev/)
[![styled-components](https://img.shields.io/badge/styled_components-6.1.19-db7b86?style=flat-square&logo=styled-components)](https://styled-components.com/)
[![eslint](https://img.shields.io/badge/eslint-6.8.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![jest](https://img.shields.io/badge/jest-30.2.0-brightgreen?style=flat-square&logo=jest)](https://jestjs.io/)
[![expo](https://img.shields.io/badge/expo-54.0.29-000000?style=flat-square&logo=expo)](https://expo.io/)
[![coverage](https://img.shields.io/codecov/c/gh/DiegoVictor/tindev-app?logo=codecov&style=flat-square)](https://codecov.io/gh/DiegoVictor/tindev-app)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://raw.githubusercontent.com/DiegoVictor/tindev-app/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

This app version allows users to like or dislike another users and see previous matches. All the resources used by this application comes from its [`API`](https://github.com/DiegoVictor/tindev-api).

## Table of Contents

- [Screenshots](#screenshots)
- [Installing](#installing)
  - [Configuring](#configuring)
    - [.env](#env)
    - [API](#api)
- [Usage](#usage)
  - [OS](#os)
- [Running the tests](#running-the-tests)
  - [Coverage report](#coverage-report)

# Screenshots

Click to expand.<br>
<img src="https://raw.githubusercontent.com/DiegoVictor/tindev-app/main/screenshots/login.png" width="32%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/tindev-app/main/screenshots/dashboard.png" width="32%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/tindev-app/main/screenshots/match.png" width="32%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/tindev-app/main/screenshots/menu.png" width="32%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/tindev-app/main/screenshots/matches.png" width="32%" />

# Installing

Easy peasy lemon squeezy:

```
$ yarn
```

Or:

```
$ npm install
```

> Was installed and configured the [`eslint`](https://eslint.org/) and [`prettier`](https://prettier.io/) to keep the code clean and patterned.

## Configuring

Configure your environment variables and remember to start the [API](https://github.com/DiegoVictor/tindev-api) before to start this app.

### .env

In this file you may configure the API's url. Rename the `.env.example` in the root directory to `.env` then just update with your settings.

| key        | description                 | default                    |
| ---------- | --------------------------- | -------------------------- |
| API_URL    | API's url with version (v1) | `http://localhost:3333/v1` |
| SOCKET_URL | Webscoket url               | `http://localhost:3333`    |

### API

Start the [`API`](https://github.com/DiegoVictor/tindev-api) (see its README for more information). In case of any change in the API's port or host remember to update the `.env`'s `API_URL` and `SOCKET_URL` property too.

> Also, maybe you need run reverse command to the API's port: `adb reverse tcp:3333 tcp:3333`

# Usage

The first build must be through USB connection, so connect your device (or just open your emulator) and run:

```
$ yarn android
```

Or:

```
$ npm run android
```

In the next times you can just run the Metro Bundler server:

```
$ yarn start
```

Or:

```
$ npm run start
```

## OS

This app was tested only with Android through USB connection and [Genymotion](https://www.genymotion.com/) (Emulator), is strongly recommended to use the same operational system, but of course you can use an emulator or a real device connected through wifi or USB.

# Running the tests

[Jest](https://jestjs.io/) was the choice to test the app, to run:

```
$ yarn test
```

Or:

```
$ npm run test
```

## Coverage report

You can see the coverage report inside `tests/coverage`. They are automatically created after the tests run.
