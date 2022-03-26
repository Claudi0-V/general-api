const fetch = require("node-fetch");
const apiKey = process.env.WEATHER_KEY;

const weatherAPICaller = async (search) => {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apiKey}`,
			{ mode: "cors" }
		);
		if (response.status === 404) {
			throw new Error();
		} else {
			const finalData = await response.json();
			return finalData;
		}
	} catch (e) {
		console.log(e);
		return false;
	}
};

const processData = async (data) => {
	const { name, weather, main } = data;
	const { icon, description } = weather[0];
	const { humidity, temp, temp_max, temp_min } = main;
	const mainWeather = weather[0].main;

	return {
		name,
		icon,
		description,
		humidity,
		temp,
		temp_max,
		temp_min,
		mainWeather,
	};
};

module.exports = async (req, res) => {
	const { search } = req.query;
	const queryResult = await weatherAPICaller(search);
	if (queryResult) {
		const data = await processData(queryResult);
		res.status(200).json({ data });
	} else {
		res.status(400).send({ data: false });
	}
};
