import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
    const [pogodaKrakow, setPogodaKrakow] = useState(null);
    const [pogodaJutro, setPogodaJutro] = useState(null);
    const [pogodaPoJutrze, setPogodaPoJutrze] = useState(null);

    useEffect(() => {
        fetchWeatherData('Krakow', setPogodaKrakow);
        fetchWeatherData('Krakow', setPogodaJutro, 1);
        fetchWeatherData('Krakow', setPogodaPoJutrze, 2);
    }, []);

    const fetchWeatherData = async (location, setData, daysOffset = 0) => {
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
    <div className="App">
      <header className="App-header">
        <p>Aplikacja pogodowa</p>
      </header>
      <body>
      <div>
          <h1>Pogoda w Krakowie</h1>
          {/* Wyświetl informacje o pogodzie dla Krakowa, jutra i pojutrze */}
          {pogodaKrakow && (
              <div>
                  <h2>Pogoda na dziś</h2>
                  <p>Temperatura maksymalna: {pogodaKrakow.daily.temperature_2m_max[0]}°C</p>
                  <p>Temperatura minimalna: {pogodaKrakow.daily.temperature_2m_min[0]}°C</p>
                  {/* Wyświetl inne informacje pogodowe */}
              </div>
          )}
          {pogodaJutro && (
              <div>
                  <h2>Pogoda na jutro</h2>
                  <p>Temperatura maksymalna: {pogodaJutro.daily.temperature_2m_max[1]}°C</p>
                  <p>Temperatura minimalna: {pogodaJutro.daily.temperature_2m_min[1]}°C</p>
                  {/* Wyświetl inne informacje pogodowe */}
              </div>
          )}
          {pogodaPoJutrze && (
              <div>
                  <h2>Pogoda na pojutrze</h2>
                  <p>Temperatura maksymalna: {pogodaPoJutrze.daily.temperature_2m_max[2]}°C</p>
                  <p>Temperatura minimalna: {pogodaPoJutrze.daily.temperature_2m_min[2]}°C</p>
                  {/* Wyświetl inne informacje pogodowe */}
              </div>
          )}
      </div>
      </body>
      <footer className="App-footer"><p>Created by<b> Patryk Pańczuk</b></p></footer>
    </div>
  );
}

export default App;
