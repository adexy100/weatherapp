import React, { useState } from "react";
import "./Location.css";
import SmoothCollapse from "react-smooth-collapse";
import Geocode from "../../components/Geocode/Geocode";
import Coords from "../../components/Coords/Coords";

const Location = ({
  latitude,
  longitude,
  handleLatitudeChange,
  handleLongitudeChange,
  newLocationForecast,
  getLocalForecast,
  handleNorthSouthChange,
  handleEastWestChange,
  northSouth,
  eastWest,
  handleUnitChange,
  units,
  apiKey,
  getForecast,
  lightMode,
}) => {
  const [geocodeExpanded, setGeocodeExpanded] = useState(true);
  const [coordsExpanded, setCoordsExpanded] = useState(false);
  const [localExpanded, setLocalExpanded] = useState(true);

  //return the confidence level of the geocoding in km distance
  const getConfidenceLevel = confidence => {
    // 10	< 0.25 km distance
    // 9	< 0.5 km
    // 8	< 1 km
    // 7	< 5 km
    // 6	< 7.5 km
    // 5	< 10 km
    // 4	< 15 km
    // 3	< 20 km
    // 2	< 25 km
    // 1	25 km or greater distance
    // 0	unable to determine a bounding box; thus unable to determine a confidence
    switch (confidence) {
      case 10:
        return <p>{"< 0.25 km"}</p>;
      case 9:
        return <p>{"< 0.5 km"}</p>;
      case 8:
        return <p>{"< 1 km"}</p>;
      case 7:
        return <p>{"< 5 km"}</p>;
      case 6:
        return <p>{"< 7.5 km"}</p>;
      case 5:
        return <p>{"< 10 km"}</p>;
      case 4:
        return <p>{"< 15 km"}</p>;
      case 3:
        return <p>{"< 20 km"}</p>;
      case 2:
        return <p>{"< 25 km"}</p>;
      case 1:
        return <p>{"> 25 km"}</p>;
      default:
        return <p>{"unknown distance"}</p>;
    }
  };

  return (
    <div className="location-section">
      <div
        className={` ${lightMode ? "light-mode" : ""} location-container`}
        id="coords-container"
      >
        <h6
          className="location-section-title"
          onClick={() => setCoordsExpanded(!coordsExpanded)}
        >
          {coordsExpanded ? "-" : "+"}Get Forecast by Coordinates
        </h6>
        <SmoothCollapse className="smooth-collapse" expanded={coordsExpanded}>
          <Coords
            latitude={latitude}
            longitude={longitude}
            northSouth={northSouth}
            eastWest={eastWest}
            units={units}
            handleLatitudeChange={handleLatitudeChange}
            handleNorthSouthChange={handleNorthSouthChange}
            handleLongitudeChange={handleLongitudeChange}
            handleEastWestChange={handleEastWestChange}
            handleUnitChange={handleUnitChange}
            newLocationForecast={newLocationForecast}
            apiKey={apiKey}
            getConfidenceLevel={getConfidenceLevel}
            lightMode={lightMode}
          />
        </SmoothCollapse>
      </div>
      <div
        className={` ${lightMode ? "light-mode" : ""} location-container`}
        id="geocode-container"
      >
        <h6
          className="location-section-title"
          onClick={() => setGeocodeExpanded(!geocodeExpanded)}
        >
          {geocodeExpanded ? "-" : "+"}Get Forecast by Name
        </h6>
        <SmoothCollapse className="smooth-collapse" expanded={geocodeExpanded}>
          <Geocode
            apiKey={apiKey}
            getForecast={getForecast}
            units={units}
            handleUnitChange={handleUnitChange}
            getConfidenceLevel={getConfidenceLevel}
            lightMode={lightMode}
          />
        </SmoothCollapse>
      </div>
      <div
        className={` ${lightMode ? "light-mode" : ""} location-container`}
        id="local-container"
      >
        <h6
          className="location-section-title"
          onClick={() => setLocalExpanded(!localExpanded)}
        >
          {localExpanded ? "-" : "+"}Get Your Local Forecast
        </h6>
        <SmoothCollapse className="smooth-collapse" expanded={localExpanded}>
          <form className="input-form">
            <div className="location-input-container">
              <div className="input-fields-container">
                <label
                  className="location-label"
                  htmlFor="local-selecton-units"
                >
                  units:{" "}
                </label>

                <select
                  className="select-units"
                  id="local-selecton-units"
                  value={units}
                  onChange={e => handleUnitChange(e.target.value)}
                >
                  <option value="us">US</option>
                  <option value="si">Metric</option>
                </select>
              </div>
            </div>
            <div
              className={
                lightMode ? "location-buttons-light" : "location-buttons-dark"
              }
              onClick={e => getLocalForecast(e)}
            >
              Use My Location
            </div>
          </form>
        </SmoothCollapse>
      </div>
    </div>
  );
};

export default Location;
