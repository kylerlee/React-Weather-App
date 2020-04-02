# react-weather-app

A small client-side application (ReactJS) that provides dashboard for monitoring weather of several cities.

## Setup process

1. Clone the project source code from [GitHub](https://github.com/kylerlee/react-weather-app.git).
2. Open command prompt and cd to the project directory _/react-weather-app_.
3. Run `npm install` to install the project dependencies.
4. Open the file _src\App.js_, insert the token and save.
    - Api token to be obtained from [OpenWeather](https://openweathermap.org/api).
5. Run `npm start` to start the app in the development mode, please refer the details as followed.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## App user guide

1. Enter the city name.
2. Select the refresh interval in minutes.
    - The refresh interval indicates the interval of fetching the latest weather data and update the city weather item.
    - Each city has its refresh interval, so feel free to select a different interval for each city.
3. To remove a city weather item from the weather dashboard, move the mouse onto the city weather item and click the trash button.
