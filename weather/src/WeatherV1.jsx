import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Form, Row, Container } from "react-bootstrap";
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
					if (response?.data) {
						setWeatherData(response.data);
					}
					// console.log(response);
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
	const handleCityChange = (e) => {
		setCityId(e.target.value);
		cities.forEach((c) => {
			if (c.key === e.target.value) setCity(c.value);
		});
	};
	return (
		<>
			<Row className="mb-4">
				<Col>
					<Card className="p-3 shadow-lg">
						<Form>
							<Form.Group controlId="citySelect">
								<Form.Label>Select a City</Form.Label>
								<Form.Control as="select" onChange={handleCityChange}>
									<option value="">Choose...</option>
									{cities.map((c) => {
										return (
											<option key={c.key} value={c.key}>
												{c.value}
											</option>
										);
									})}
								</Form.Control>
							</Form.Group>
						</Form>
					</Card>
				</Col>
			</Row>
			{weatherData && (
				<Row>
					<Col>
						<Card className="p-3 shadow-lg text-center">
							<h2>{city}</h2>
							<p>Temperature: {weatherData.main.temp}°C</p>
							<p>Weather:{weatherData.weather[0].description}</p>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
}

export default WeatherV1;
