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
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryName = event.target.value;
    const country = countries.find((c) => c.name === countryName);
    if (country) {
      setSelectedCountry(countryName);
      setSelectedVersion("");
      setSelectedFilters((prevFilters) => [...prevFilters, countryName]);
    } else {
      setSelectedCountry("");
      setSelectedVersion("");
    }
  };

  const handleVersionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const versionTitle = event.target.value;
    setSelectedVersion(versionTitle);
    setSelectedFilters((prevFilters) => [...prevFilters, versionTitle]);
  };

  const handleRemoveFilter = (filter: string) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.filter((f) => f !== filter)
    );
  };

  const countryOptions = countries.map((country) => (
    <option key={country.name} value={country.name}>
      {country.name}
    </option>
  ));

  const handleClearFilters = () => {
    setSelectedFilters([]); // Clear all filters
  };

  let versionOptions = null;
  let selectedCountryVersions: Version[] = [];
  if (selectedCountry) {
    const country = countries.find((c) => c.name === selectedCountry);
    if (country) {
      selectedCountryVersions = country.versions;
      versionOptions = selectedCountryVersions.map((version) => (
        <option key={version.title} value={version.title}>
          {version.title}
        </option>
      ));
    }
  }

  let selectedVersionText = null;
  if (selectedVersion) {
    const selectedVersionObj = selectedCountryVersions.find(
      (v) => v.title === selectedVersion
    );
    if (selectedVersionObj) {
      selectedVersionText = selectedVersionObj.text;
    }
  } else {
    selectedVersionText = selectedCountryVersions.map((version) => (
      <div key={version.title}>
        <h3>{version.title}</h3>
        <p>{version.text}</p>
      </div>
    ));
  }
  return (
    <div className="app-container flex items-center justify-center h-screen">
      <div className="box-container w-1/2 h-2/3 rounded-lg">
        <div className="innerbox-container m-5 p-5 rounded-lg">
          <h1>Filter</h1>
          <div className="filter-container flex flex-row">
            <select value={selectedCountry} onChange={handleCountryChange}>
              <option value="">Select a country</option>
              {countryOptions}
            </select>
            <select value={selectedVersion} onChange={handleVersionChange}>
              <option value="">Select a version</option>
              {versionOptions}
            </select>
            <div
              className="clear-filters text-xs p-1 ml-2"
              onClick={handleClearFilters}
            >
              <p>Clear all Filters</p>
            </div>
          </div>

          <div className="activefilters-container flex flex-row m-5 space-x-6">
            {selectedFilters.map((filter) => (
              <div className="tag" key={filter}>
                {filter}
                <svg
                  className="close-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={() => handleRemoveFilter(filter)}
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
            ))}
          </div>
         
          <div className="input-container m-2">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4" />
                  <circle cx="8" cy="8" r="7" />
                </svg>
              </span>
              
              <input
                className="w-full  pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
        <div className="output-container m-5">
          {selectedVersionText && (
            <div className="text-container mt-2">{selectedVersionText}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
