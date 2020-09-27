import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { API_URN } from './strings';

function App() {
	const [text, setText] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (text) return;

		axios.get(`http://${API_URN}/api`)
			.then(({ data }) => setText(data))
			.catch(() => setText("Error..."))
	});

	return (
		<div>
			<h1>{text}</h1>
		</div>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
