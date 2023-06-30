import './App.css';
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header">
                    <p>Aplikacja pogodowa</p>
                </header>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:day" element={<DetailedForecast />} />
                </Routes>
                <footer className="App-footer">
                    <p>Created by <b>Patryk Pańczuk</b></p>
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
                `https://api.open-meteo.com/v1/forecast?latitude=50.06&longitude=19.94&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe%2FBerlin`
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
        <div className={"content"}>
                <h1>Pogoda w Krakowie</h1>
                {pogodaKrakow && (
                    <div>
                        <h2 ><p id={"dzis"}>Pogoda na dziś </p> </h2>
                        <p>Temperatura maksymalna: <b>{pogodaKrakow.daily.temperature_2m_max[0]}°C</b> </p>
                        <p>Temperatura minimalna: <b>{pogodaKrakow.daily.temperature_2m_min[0]}°C</b> </p>
                        <Button variant="contained" component={Link} to="/dzis">
                            Szczegółowa prognoza
                        </Button>
                    </div>
                )}
                {pogodaKrakow && (
                    <div>
                        <h2 ><p id={"jutro"}>Pogoda na jutro </p> </h2>
                        <p>Temperatura maksymalna: <b>{pogodaKrakow.daily.temperature_2m_max[1]}°C</b> </p>
                        <p>Temperatura minimalna:<b> {pogodaKrakow.daily.temperature_2m_min[1]}°C</b></p>
                        <Button variant="contained" component={Link} to="/jutro">
                            Szczegółowa prognoza
                        </Button>
                    </div>
                )}
                {pogodaKrakow && (
                    <div >
                        <h2><p id={"pojutrze"}>Pogoda na pojutrze</p> </h2>
                        <p>Temperatura maksymalna: <b>{pogodaKrakow.daily.temperature_2m_max[2]}°C</b> </p>
                        <p>Temperatura minimalna: <b>{pogodaKrakow.daily.temperature_2m_min[2]}°C</b></p>
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

    // Tutaj uzupelnic

    return (
        <div className={"content"}>
            <h1>Szczegółowa prognoza na {day}</h1>
            <Button variant="contained" component={Link} to="/">
                Powrót
            </Button>
        </div>
    );
}

export default App;
