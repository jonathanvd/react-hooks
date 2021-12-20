import React from 'react';
import './App.css';
import { Card, Container } from "@mui/material";
import ClassComponent from "./components/ClassComponent";
import FunctionComponent from "./components/FunctionComponent";

const App = () => {
	return (
		<div className="app">
			<Container className="container">
				<Card className="card">
					<ClassComponent />
				</Card>
				<Card className="card">
					<FunctionComponent />
				</Card>
			</Container>
		</div>
	);
}

export default App;
