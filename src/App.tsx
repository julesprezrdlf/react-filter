import React, { useState } from "react";
import data from "./data.json";

import "./App.css";

interface Version {
  title: string;
  text: string;
}

interface Country {
  name: string;
  versions: Version[];
}

interface Data {
  countries: Country[];
}

function App() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("");
  const [countries, setCountries] = useState<Country[]>(data[0].countries);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryName = event.target.value;
    const country = countries.find((c) => c.name === countryName);
    if (country) {
      setSelectedCountry(countryName);
      setSelectedVersion("");
    }
  };

  const handleVersionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVersion(event.target.value);
  };

  const countryOptions = countries.map((country) => (
    <option key={country.name} value={country.name}>
      {country.name}
    </option>
  ));

  let versionOptions = null;
  let textContent = null;

  if (selectedCountry) {
    const country = countries.find((c) => c.name === selectedCountry);
    if (country) {
      versionOptions = country.versions.map((version) => (
        <option key={version.title} value={version.title}>
          {version.title}
        </option>
      ));
      const selectedVersionObject = country.versions.find(
        (v) => v.title === selectedVersion
      );
      if (selectedVersionObject) {
        textContent = <p>{selectedVersionObject.text}</p>;
      } else {
        textContent = (
          <>
            {country.versions.map((v) => (
              <div key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </>
        );
      }
    }
  }

  return (
    <>
      <div className="app-container">
        <div className="box-container">
          <select value={selectedCountry} onChange={handleCountryChange}>
            <option value="">Select a country</option>
            {countryOptions}
          </select>
          <select value={selectedVersion} onChange={handleVersionChange}>
            <option value="">Select a version</option>
            {versionOptions}
          </select>
        </div>
        <div className="text-container my-3">{textContent}</div>
      </div>
    </>
  );
}

export default App;
