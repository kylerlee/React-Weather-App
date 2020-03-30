# my-weather-app

A small client-side application (ReactJS) that displays weather data for several cities.

## Setup process

1. Clone the project source code from [gitlab repo](https://gitlab.com/KylerLee/my-weather-app.git).
2. Open command prompt and cd to the project directory [my-weather-app].
3. Run `npm install` to install project dependencies.
4. Open the file src\App.js, insert the token and save.
    - Token to be given separately.
5. Run `npm start` to start the app in the development mode, please refer the details as followed.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## App user guide

1. Input the city name.
2. Select the refresh interval in minutes.
    - The refresh interval indicates the interval of fetching the latest weather data and update the city weather item.
    - Each city has its refresh interval, so feel free to select a different interval for each city.
3. To remove a city weather item from the weather dashboard, move the mouse onto the city weather item and click the trash button.