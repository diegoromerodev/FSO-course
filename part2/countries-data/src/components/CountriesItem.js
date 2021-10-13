import axios from "axios";
import React, { useState, useEffect } from "react";

export default (props) => {
  const { countryObj } = props;
  const [show, setShow] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    if (show) {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_SECRET_API}&query=${countryObj.name.common}`
        )
        .then((res) => setWeatherData(res.data.current));
    }
  }, [show]);

  return (
    <div
      style={{
        border: "4px outset",
        display: "inline-block",
        margin: "10px 0",
        marginRight: "80%",
        padding: "30px",
        minWidth: "400px",
      }}
    >
      <h2>{countryObj.name.common}</h2>
      {!show && (
        <button type="button" onClick={() => setShow(true)}>
          show
        </button>
      )}
      {show && (
        <button type="button" onClick={() => setShow(false)}>
          hide
        </button>
      )}
      {show && (
        <>
          <p>capital: {countryObj.capital}</p>
          <p>population: {countryObj.population}</p>
          <h4>languages</h4>
          <ul>
            {Object.keys(countryObj.languages).map((key) => (
              <li key={key}>{countryObj.languages[key]}</li>
            ))}
          </ul>
          <img
            src={countryObj.flags.svg}
            alt={`${countryObj.name.common} flag`}
            style={{ maxWidth: "100px", border: "4px outset" }}
          />
          <p>
            <strong>temperature: </strong> {weatherData.temperature} celsius
          </p>
          <img
            src={weatherData.weather_icons && weatherData.weather_icons[0]}
            alt={`${countryObj.name.common} temp icon`}
          />
          <p>
            <strong>wind: </strong> {weatherData.wind_speed} km/h
          </p>
        </>
      )}
    </div>
  );
};
