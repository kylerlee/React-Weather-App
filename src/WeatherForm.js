import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DispatchContext, API } from './App';
import axios from 'axios';
import { Form, Message, Segment, Dimmer, Loader } from 'semantic-ui-react';

export const WeatherForm = () => {
    const [city, setCity] = useState('');
    const [interval, setRefreshInterval] = useState(10);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useContext(DispatchContext);

    const isEmptyOrSpaces = (str) => {
        return str === null || str.match(/^ *$/) !== null;
    }

    const handleSubmit = event => {
        if (!isEmptyOrSpaces(city)) {
            setIsLoading(true);
            let payloadObj = {};
            axios.get(API("CURRENT", city))
                .then(response => {
                    payloadObj = { id: uuidv4(), city: city, interval: interval, currentData: response.data };
                    axios.get(API("FORECAST", city)).then(response => {
                        payloadObj.forecastData = response.data;
                        dispatch({ type: 'ADD', payload: payloadObj });
                        setCity('');
                        setRefreshInterval(10);
                        setError(null);
                    })
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        setError('City is not found. Please try again.');
                    }
                    else {
                        console.log('Weather request error:', error.message);
                        setError('Something went wrong. Please try again.');
                    }
                })
                .finally(() => setIsLoading(false));
        }
        else {
            setCity('');
            setError('Please enter a city name.');
        }
        event.preventDefault();
    }

    const createIntervalOptions = () => {
        const options = [];
        for (let i = 10; i <= 60; i += 10) {
            options.push(<option key={i} value={i}>{i}</option>);
        }
        return options;
    }

    const handleChangeInput = event => {
        const name = event.target.name;
        const value = event.target.value;
        switch (name) {
            case 'city':
                return setCity(value);
            case 'interval':
                return setRefreshInterval(value);
            default:
                throw new Error();
        }
    }

    return (
        <Segment>
            {isLoading && (
                <Dimmer active inverted>
                    <Loader inverted content='Loading' />
                </Dimmer>)}
            <Form onSubmit={handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Input name="city" label='City' value={city} onChange={handleChangeInput} placeholder='City' fluid />
                    <Form.Field name="interval" label='Refresh Interval (min)' control='select' value={interval} onChange={handleChangeInput} >
                        {createIntervalOptions()}
                    </Form.Field>
                </Form.Group>
                <Form.Button color='teal' content='Add City' icon='add' labelPosition='left' />
            </Form>
            {error && <Message error header='Error' content={error} />}
        </Segment>
    );
}