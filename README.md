# Weather
You must have nodejs and npm installed on your machine

First build the project with "npm install" to get the dependencies

The application is starting with "node index.js"

After this you have to run localhost:3000/forecast for HTTP or https://localhost:4000/forecast for HTTPS (I have used openssl for HTTPS in order to not buy SSL certificates so you will see an warning first time) with lat, lon and API KEY as query parameters,
For example you can access in browser: http://localhost:3000/forecast?lat=81&lon=20.99

The API KEY provided in the project description is not working so I created one

The output is the averages for 5 days in Celsius and an aray of 5 days data

In case of wrong data the application will show the error thrown by the API
