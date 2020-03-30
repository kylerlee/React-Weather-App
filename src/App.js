import React, { useReducer, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WeatherList } from './WeatherItem';
import { WeatherForm } from './WeatherForm';
import { Header, Icon } from 'semantic-ui-react';

// Please insert the token here
const token = '';

export const DispatchContext = createContext(null);

export const API = (type, input) => {
  switch (type) {
    case "CURRENT":
      return `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${token}`;
    case "FORECAST":
      return `https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${token}`;
    case "ICON":
      return `http://openweathermap.org/img/w/${input}.png`;
    default:
      throw new Error();
  }
}

const weatherReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const payload = action.payload;
      return state.concat({ id: uuidv4(), city: payload.city, interval: payload.interval, currentData: payload.currentData, forecastData: payload.forecastData });
    case 'REMOVE':
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
};

export const App = () => {
  const [weathers, dispatchWeathers] = useReducer(weatherReducer, []);

  return (
    <DispatchContext.Provider value={dispatchWeathers}>
      <Header as='h2' attached='top'>
        <Icon name='globe' />
        <Header.Content>
          Weather Dashboard
      <Header.Subheader>Monitor your dashboard</Header.Subheader>
        </Header.Content>
      </Header>
      <WeatherForm />
      <WeatherList weathers={weathers} />
    </DispatchContext.Provider>
  )
}