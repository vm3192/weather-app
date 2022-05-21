import {useState} from "react";
import "./App.css";

function App() {
	const axios = require("axios").default;

	const [data, setData] = useState("");
	const [input, setInput] = useState("");

	function searchCity(e) {
		if (e.key === "Enter" && input) {
			axios
				.get(
					`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=82196fe97cda1363e0d790a307665071`,
				)
				.then(function ({data}) {
					// handle success
					setData(data);
				})
				.catch(function (error) {
					// handle error
					console.log(error);
					setData({name: "invalid input"});
				});
		}
	}

	const clickHandler = () => {
		if (input) {
			axios
				.get(
					`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=82196fe97cda1363e0d790a307665071`,
				)
				.then(function ({data}) {
					// handle success
					setData(data);
				})
				.catch(function (error) {
					// handle error
					console.log(error);
					setData({name: "invalid input"});
				});
		}
	};

	return (
		<div className="wrapper">
			<div className="container">
				<input
					className="input"
					type="text"
					value={input}
					onChange={(e) => {
						setInput(e.target.value);
						if (data.name === "invalid input") {
							setData("");
						}
					}}
					onKeyDown={(e) => searchCity(e)}
					placeholder="Enter city"
				/>
				<button className="btn" onClick={clickHandler}>
					Search
				</button>
				<p className="city_name">{data.name ? data.name : "City name"} </p>
				<p className="temperature">
					{data.main
						? String(Math.round(data.main.temp_min - 273.15)) + "°C min"
						: null}
					{data.main
						? " - " + String(Math.round(data.main.temp_max - 273.15)) + "°C max"
						: null}
				</p>
				<p className="weather">
					{data.weather ? data.weather[0].main : null}{" "}
					{data.weather ? " (" + data.weather[0].description + ")" : null}
				</p>
			</div>
		</div>
	);
}

export default App;
