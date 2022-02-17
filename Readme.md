# ATM Combined Challenge

This is a combination of the backend and frontend challenge from Ant Money, where you may lookup an IP against GeoJS and retrieve it later from the cache.
The backend has not changed much from the original backend challenege, however I added support for a static front end served by express along with CORS to allow access of resources.

1. Clone the repo into the folder of your choice
2. Run either `yarn install` or `npm install` in both the frontend and backend folder
3. In the frontend folder, run `yarn build` or `npm build`
4. Move the contents from the new `build` folder in the frontend to the public folder in the backend.
5. Start the server from the backend folder with either `yarn start` or `npm start`

\* This app uses port 8015 by default, feel free to modify by editing the port variable in server.js

## Server Endpoints

| Choice             | Endpoint                                                      |
| ------------------ | ------------------------------------------------------------- |
| IP City and State: | http://localhost:8015/ipinfo/{ipAddress}                      |
| Cached IP's        | http://localhost:8015/cachedips?city={city}&country={country} |

- If the port variable has been modified, swap out the localhost port for the port you have chosen

## How to use

#### Checking an IP address:

To find the city and location of an IP, start the application and simply enter the IP addres you wish to search for into the input field and submit. The city and country will be queried and returned to you.

If you would like to view all the previously searched and cached IP address, simply click the 'View Cached IPs' button in the bottom of the form.

## Technologies Used:

### [Node.js](https://github.com/nodejs/node)

### [Express](https://github.com/expressjs/express)

### [Node-Fetch](https://github.com/node-fetch/node-fetch)

### [Node-Cache](https://github.com/node-cache/node-cache)

### [React](https://github.com/facebook/react)

## Misc Notes

Simple but it works. If I had more time I would have liked to write a script that would assist in the install process and style the app further, however I needed to wrap things up and move on to other projects. In this challenege the biggest issue I faced was CORS, which really didn't take long just needed to remember how to setup the options to allow cross origin sharing between the client and the server.
