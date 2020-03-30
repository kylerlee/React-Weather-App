import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { DispatchContext, API } from './App';
import { Grid, Segment, Image, Button, Divider, Header } from 'semantic-ui-react';

export const WeatherList = ({ weathers }) => (
    <Grid columns='equal' stackable padded>
        {weathers.map(weather => (
            <Grid.Column style={{ minWidth: 350 }} key={weather.id} >
                <WeatherItem weather={weather} />
            </Grid.Column>
        ))}
    </Grid>
);

export const WeatherItem = ({ weather }) => {
    let isMount = true;
    const id = weather.id;
    const city = weather.city;
    const interval = weather.interval;
    const [timerId, setTimerId] = useState(0);
    const [currentData, setCurrentData] = useState(weather.currentData);
    const [forecastData, setForecastData] = useState(weather.forecastData);
    const [isButtonShown, setIsButtonShown] = useState(false);
    const dispatch = useContext(DispatchContext);

    const handleClick = () => {
        dispatch({ type: 'REMOVE', payload: { id: id } });
        clearInterval(timerId);
    }

    // This hook will be triggered during component rendering to enable interval refreshing, hence the dependency array is empty.
    useEffect(() => {
        setTimerId(setInterval(() => {
            callWeatherAPI(true);
            callWeatherAPI(false);
        }, interval * 60000));

        return () => {
            // eslint-disable-next-line
            isMount = false;
            clearInterval(timerId);
        };
    }, []);

    const callWeatherAPI = isCurrent => {
        axios.get(API(isCurrent ? "CURRENT" : "FORECAST", city))
            .then(response => {
                isMount && (isCurrent ? setCurrentData(response.data) : setForecastData(response.data));
            })
            .catch(error => {
                console.log('Weather request error:', error.message);
            });
    }

    const getForecastGrid = () => {
        const list = forecastData.list;
        const columns = [];
        for (let i = 1; i <= 5; i++) {
            columns.push((
                <Grid.Column key={i}>
                    <p>{list[i].dt_txt.substring(10, 16)}</p>
                    <Image src={API("ICON", list[i].weather[0].icon)} size='tiny' rounded />
                </Grid.Column>));
        }
        return (
            <Grid columns='equal' divided>
                <Grid.Row>{columns}</Grid.Row>
            </Grid>
        );
    }

    return (
        <Segment onMouseEnter={() => setIsButtonShown(true)} onMouseLeave={() => setIsButtonShown(false)}>
            <Grid divided='vertically' columns='equal'>
                <Grid.Row>
                    <Grid.Column>
                        <Header size='huge'>{currentData.name}</Header>
                        <Header size='large'>{currentData.weather[0].main}</Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Image src={API("ICON", currentData.weather[0].icon)} size='tiny' rounded style={{ position: "absolute", right: "5px", top: "5px" }} />
                    </Grid.Column>
                    <Grid.Column>
                        {isButtonShown && <Button onClick={() => handleClick()} style={{ position: "absolute", right: "5px", top: "5px" }} icon='trash alternate outline' />}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <p>{Math.round((currentData.main.temp - 273.15) * 100) / 100} °c</p>
                    </Grid.Column>
                    <Grid.Column>
                        <p>{currentData.weather[0].description}</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Divider />
            <Header size='tiny'>12 Hours Weather Forecast</Header>
            {getForecastGrid()}
        </Segment>
    )
}
