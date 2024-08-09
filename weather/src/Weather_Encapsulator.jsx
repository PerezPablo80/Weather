import { Card, Col, Form, Row, Container } from "react-bootstrap";
import WeatherV1 from "./WeatherV1";
function Weather_Encapsulator() {
	return (
		<Container
			fluid
			className="d-flex flex-column align-items-center justify-content-center"
			style={{ minHeight: "100vh", background: "linear-gradient(to right, #74ebd5, #ACB6E5)" }}
		>
			<WeatherV1 />
		</Container>
	);
}

export default Weather_Encapsulator;
