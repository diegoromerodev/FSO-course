import axios from "axios";
import React, { useEffect, useState } from "react";
import CountriesItem from "./CountriesItem";

export default (props) => {
  const { filter } = props;
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data));
  }, []);

  useEffect(() => {
    if (countries.length) {
      const filteringCountries = countries.reduce((filtered, ctr) => {
        if (ctr.name.common.toLowerCase().includes(filter.toLowerCase())) {
          const { name, flags, capital, population, languages } = ctr;
          return [...filtered, { name, flags, capital, population, languages }];
        }
        return filtered;
      }, []);
      setSelectedCountries(filteringCountries);
    }
  }, [filter]);

  return (
    <div>
      {selectedCountries.length <= 10 ? (
        selectedCountries.map((country) => (
          <CountriesItem key={country.flags.svg} countryObj={country} />
        ))
      ) : (
        <p>Too many matches, please use a more specific filter.</p>
      )}
    </div>
  );
};
