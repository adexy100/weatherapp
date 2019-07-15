import React, { useState } from "react";
import "./Currently.css";
import SmoothCollapse from "react-smooth-collapse";

const Currently = ({ forecast, getIcon }) => {
	const [currentlyExpanded, setCurrentlyExpanded] = useState(false);

	if (forecast) {
		return (
			<div className="currently">
				<div
					className="currently-section-title"
					onClick={() => setCurrentlyExpanded(!currentlyExpanded)}
				>
					<h3>{currentlyExpanded ? "-" : "+"}Currently</h3>
					{<div>{getIcon(forecast.icon)}</div>}
					<h6 className="summary">{forecast.summary}</h6>
				</div>

				{/* {console.log("currently", forecast)} */}

				<SmoothCollapse
					expanded={currentlyExpanded}
					style={{ overflow: "visible" }}
				>
					<div className="currently-description">
						<div className="descriptor">
							Temperature: {Math.floor(forecast.temperature)}°F
						</div>
						<div className="descriptor">
							Humidity: {Math.floor(forecast.humidity * 100)}%
						</div>
						<div className="descriptor">
							Chance of Precipitation:{" "}
							{Math.floor(forecast.precipProbability * 100)}%
						</div>

						{forecast.precipType ? (
							<div className="descriptor">
								Precipitation Type: {forecast.precipType}
							</div>
						) : null}

						<div className="descriptor">
							Wind Direction: {forecast.windDirection}
						</div>
						<div className="descriptor">Wind Gust: {forecast.windGust}mph</div>
						<div className="descriptor">
							Wind Speed: {forecast.windSpeed}mph
						</div>
					</div>
				</SmoothCollapse>
			</div>
		);
	} else {
		return (
			<p>
				There was an error getting your forecast. Try entering new
				latitude/longitude numbers and then clicking 'Forecast' or refreshing
				the page.
			</p>
		);
	}
};

export default Currently;
