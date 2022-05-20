const fetch = require("node-fetch");
const apiKey = process.env.WEATHER_KEY;

const wallpaperAPICall = async (description) => {
	const weatherDescription = description.split(" ").join("+");
	try {
		const response = await fetch(
			`https://api.pexels.com/v1/search?query=${weatherDescription}&per_page=2`,
			{
				headers: {
					Authorization:
						process.env.WALLPAPER_KEY,
				},
			}
		);
		const images = await response.json();
		return images.photos[0].src.large;
	} catch (err) {
		return;
	}
};

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

const processData = (data, wallpaper) => {
	const { name, weather, main } = data;
	const { icon, description } = weather[0];
	const { humidity, temp, temp_max, temp_min } = main;
	const mainWeather = weather[0].main;
	const country = data.sys.country;
	console.log(country)

	return {
		wallpaper,
		name,
		icon,
		description,
		humidity,
		temp,
		temp_max,
		temp_min,
		mainWeather,
		country
	};
};

module.exports = async (req, res) => {
	const { search } = req.query;
	const queryResult = await weatherAPICaller(search);
	const wallpaper = await wallpaperAPICall(queryResult.weather[0].description);
	if (queryResult) {
		const data = processData(queryResult, wallpaper);
		res.status(200).json({ data });
	} else {
		res.status(400).send({ data: false });
	}
};
