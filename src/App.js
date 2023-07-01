import './App.css';
import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header">
                    <Typography variant="h5">Aplikacja pogodowa</Typography>
                </header>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:day" element={<DetailedForecast />} />
                </Routes>
                <footer className="App-footer">
                    <Typography variant="body2">
                        Created by <b>Patryk Pańczuk</b>
                    </Typography>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function Home() {
    const [pogodaKrakow, setPogodaKrakow] = useState(null);

    useEffect(() => {
        fetchWeatherData('Krakow', setPogodaKrakow);
    }, []);

    const fetchWeatherData = async (location, setData) => {
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=50.0614&longitude=19.9366&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&timezone=Europe%2FBerlin`
            );
            if (!response.ok) {
                throw new Error('Nie udało się pobrać danych pogodowych');
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="content">
            <Typography variant="h4">Pogoda w Krakowie</Typography>
            {pogodaKrakow && (
                <div>
                    <Typography id="dzis" variant="h6" component="h2">
                        Pogoda na dziś
                    </Typography>
                    <Typography>
                        Wschód słońca: <b>{pogodaKrakow.daily.sunrise[0].split('T')[1]}</b>
                    </Typography>
                    <Typography>
                        Zachód słońca: <b>{pogodaKrakow.daily.sunset[0].split('T')[1]}</b>
                    </Typography>
                    <Typography>
                        Temperatura maksymalna: <b>{pogodaKrakow.daily.temperature_2m_max[0]}°C</b>
                    </Typography>
                    <Typography>
                        Temperatura minimalna: <b>{pogodaKrakow.daily.temperature_2m_min[0]}°C</b>
                    </Typography>
                    <Typography>
                        Szansa opadów: <b>{pogodaKrakow.daily.precipitation_probability_max[0]}%</b>
                    </Typography>
                    <Button variant="contained" component={Link} to="/dzis">
                        Szczegółowa prognoza
                    </Button>
                </div>
            )}
            {pogodaKrakow && (
                <div>
                    <Typography id="jutro" variant="h6" component="h2">
                        Pogoda na jutro
                    </Typography>
                    <Typography>
                        Wschód słońca: <b>{pogodaKrakow.daily.sunrise[1].split('T')[1]}</b>
                    </Typography>
                    <Typography>
                        Zachód słońca: <b>{pogodaKrakow.daily.sunset[1].split('T')[1]}</b>
                    </Typography>
                    <Typography>
                        Temperatura maksymalna: <b>{pogodaKrakow.daily.temperature_2m_max[1]}°C</b>
                    </Typography>
                    <Typography>
                        Temperatura minimalna: <b>{pogodaKrakow.daily.temperature_2m_min[1]}°C</b>
                    </Typography>
                    <Typography>
                        Szansa opadów: <b>{pogodaKrakow.daily.precipitation_probability_max[1]}%</b>
                    </Typography>
                    <Button variant="contained" component={Link} to="/jutro">
                        Szczegółowa prognoza
                    </Button>
                </div>
            )}
            {pogodaKrakow && (
                <div>
                    <Typography  id="pojutrze" variant="h6" component="h2">
                        Pogoda na pojutrze
                    </Typography>
                    <Typography>
                        Wschód słońca: <b>{pogodaKrakow.daily.sunrise[2].split('T')[1]}</b>
                    </Typography>
                    <Typography>
                        Zachód słońca: <b>{pogodaKrakow.daily.sunset[2].split('T')[1]}</b>
                    </Typography>
                    <Typography>
                        Temperatura maksymalna: <b>{pogodaKrakow.daily.temperature_2m_max[2]}°C</b>
                    </Typography>
                    <Typography>
                        Temperatura minimalna: <b>{pogodaKrakow.daily.temperature_2m_min[2]}°C</b>
                    </Typography>
                    <Typography>
                        Szansa opadów: <b>{pogodaKrakow.daily.precipitation_probability_max[2]}%</b>
                    </Typography>
                    <Button variant="contained" component={Link} to="/pojutrze">
                        Szczegółowa prognoza
                    </Button>
                </div>
            )}
        </div>
    );
}

function DetailedForecast() {
    const { day } = useParams();
    const [pogodaKrakow, setPogodaKrakow] = useState(null);

    useEffect(() => {
        fetchWeatherData('Krakow', setPogodaKrakow);
    }, []);

    const fetchWeatherData = async (location, setData) => {
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=50.0614&longitude=19.9366&hourly=temperature_2m,precipitation_probability,precipitation,surface_pressure,cloudcover`
            );
            if (!response.ok) {
                throw new Error('Nie udało się pobrać danych pogodowych');
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="content">
            <Typography variant="h4">Szczegółowa prognoza na {day}</Typography>
            {pogodaKrakow && day === 'dzis' && (
                <table>
                    <thead>
                    <tr>
                        <th>Godzina</th>
                        <th>Temperatura</th>
                        <th>Opady</th>
                        <th>Szansa opadów</th>
                        <th>Zachmurzenie</th>
                        <th>Ciśnienie</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...Array(24)].map((_, index) => (
                        <tr key={index}>
                            <td>{pogodaKrakow.hourly.time[index].split('T')[1]}</td>
                            <td>
                                <b>{pogodaKrakow.hourly.temperature_2m[index]}</b> °C
                            </td>
                            <td>
                                <b>{pogodaKrakow.hourly.precipitation[index]} </b> mm
                            </td>
                            <td>
                                <b>{pogodaKrakow.hourly.precipitation_probability[index]}</b> %
                            </td>
                            <td>
                                <b>{pogodaKrakow.hourly.cloudcover[index]}</b> %
                            </td>
                            <td>
                                <b>{pogodaKrakow.hourly.surface_pressure[index]}</b> hPa
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {pogodaKrakow && day === 'jutro' && (
                <table>
                    <thead>
                    <tr>
                        <th>Godzina</th>
                        <th>Temperatura</th>
                        <th>Opady</th>
                        <th>Szansa opadów</th>
                        <th>Zachmurzenie</th>
                        <th>Ciśnienie</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...Array(24)].map((_, index) => (
                        <tr key={index}>
                            <td>{pogodaKrakow.hourly.time[index + 24].split('T')[1]}</td>
                            <td>
                                <b>{pogodaKrakow.hourly.temperature_2m[index + 24]}</b> °C
                            </td>
                            <td>
                                <b>{pogodaKrakow.hourly.precipitation[index + 24]} </b> mm
                            </td>
                            <td>
                                <b>{pogodaKrakow.hourly.precipitation_probability[index + 24]}</b> %
                            </td>
                            <td>
                                <b>{pogodaKrakow.hourly.cloudcover[index + 24]}</b> %
                            </td>
                            <td>
                                <b>{pogodaKrakow.hourly.surface_pressure[index + 24]}</b> hPa
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {pogodaKrakow && day === 'pojutrze' && (
                <table>
                    <thead>
                    <tr>
                        <th>Godzina</th>
                        <th>Temperatura</th>
                        <th>Opady</th>
                        <th>Szansa opadów</th>
                        <th>Zachmurzenie</th>
                        <th>Ciśnienie</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...Array(24)].map((_, index) => (
                        <tr key={index}>
                            <td>{pogodaKrakow.hourly.time[index + 48].split('T')[1]}</td>
                            <td>
                                <b>{pogodaKrakow.hourly.temperature_2m[index + 48]}</b> °C
                            </td>
                            <td>
                                <b>{pogodaKrakow.hourly.precipitation[index + 48]} </b> mm
                            </td>
                            <td>
                                <b>{pogodaKrakow.hourly.precipitation_probability[index + 48]}</b> %
                            </td>
                            <td>
                                <b>{pogodaKrakow.hourly.cloudcover[index + 48]}</b> %
                            </td>
                            <td>
                                <b>{pogodaKrakow.hourly.surface_pressure[index + 48]}</b> hPa
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <Button variant="contained" component={Link} to="/">
                Powrót
            </Button>
        </div>
    );
}

export default App;
