// index.js 
const express = require('express');
const dotenv = require('dotenv').config({ path: `./.env.production` });
const https = require('https');
const fs = require("fs");

const app = express();

app.get('/', (req, res) => {
    const apiKey = process.env.API_KEY;
    res.send(`API Key: ${apiKey}`);
});

app.get('/forecast', (request, response) => {

https.get('https://api.openweathermap.org/data/2.5/forecast?lat='+request.query.lat+'&lon='+request.query.lon+'&appid=a33f680b48f33b4bfe49d51b4fa67f77&units=metric', res => {
  let data = [];
  const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  console.log('Status Code:', res.statusCode);
  console.log('Date in Response header:', headerDate);

  res.on('data', chunk => {
    data.push(chunk);
  });

  res.on('end', () => {
    console.log('Response ended: ');
    let weatherdata = Buffer.concat(data).toString();

	const weatherJSON = JSON.parse(weatherdata);
	const cod = weatherJSON.cod;
    
	if(cod == 200){
		resp = "Averages: ";
		let average = [];
		let data = [];
		for(let i = 0; i < weatherJSON.list.length; i = i + 8){
			data.push({day:Math.round(i / 8) + 1, averrage: (weatherJSON.list[i].main.temp + weatherJSON.list[i+1].main.temp + weatherJSON.list[i+2].main.temp + weatherJSON.list[i+3].main.temp
			+weatherJSON.list[i+4].main.temp + weatherJSON.list[i+5].main.temp + weatherJSON.list[i+6].main.temp + weatherJSON.list[i+7].main.temp / 8).toFixed(2)}); 
		
		}
		resp += JSON.stringify(data); 
		
		data = [];
		let daysWeather = [];
		for(let i = 1; i <= weatherJSON.list.length; i++){

			data.push(weatherJSON.list[i]);

			if(i % 8 == 0){
				const dayWeather = {
					day: Math.round(i / 8),
					data: data
					};

			data = [];
			daysWeather.push(dayWeather);
			}
		}
		resp += "\n\n        Days list of array:   " + JSON.stringify(daysWeather);
		
	}else{
	//error	
		resp = weatherJSON.message;
	}
	
	response.send(resp);
	
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});	
    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT}`);
});

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(4000, () => {
    console.log("HTTPS server runing at port 4000");
  });

