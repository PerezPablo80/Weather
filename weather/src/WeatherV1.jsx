import { useEffect, useState } from "react";
import axios from "axios";
function WeatherV1() {
	const [city, setCity] = useState(null);
	const [cityId, setCityId] = useState(null);
	const [weatherData, setWeatherData] = useState(false);

	const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
	// console.log("Api Key:", apiKey);
	useEffect(() => {
		const fetchWeather = async () => {
			try {
				if (city) {
					const response = await axios.get(
						`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=metric`
					);
					console.log("Pasa get");
					if (response?.data) {
						setWeatherData(response.data);
					}
					console.log(response);
				}
			} catch (e) {
				console.log("error fetching weather data\n", e);
			}
		};
		fetchWeather();
	}, [cityId]);
	const cities = [
		{ key: "3441665", value: "Minas" },
		{ key: "3441572", value: "Montevideo" },
		{ key: "3441894", value: "Maldonado" },
		{ key: "6359304", value: "Madrid" },
		{ key: "3451189", value: "Río de Janeiro" },
	];
	return (
		<div>
			<select
				onChange={(e) => {
					console.log("City selected:", e.target.value);
					setCityId(e.target.value);
					cities.forEach((c) => {
						if (c.key === e.target.value) setCity(c.value);
					});
				}}
			>
				{cities.map((c) => {
					return (
						<option key={c.key} value={c.key}>
							{c.value}
						</option>
					);
				})}
			</select>
			{weatherData ? (
				<div>
					<br />
					<h2>Weather in {city}</h2>
					<p>Temperature: {weatherData.main.temp}°C</p>
					<p>Weather: {weatherData.weather[0].description}</p>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default WeatherV1;
