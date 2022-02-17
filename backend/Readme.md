# ATM Backend Challenge

This is a coding proficiency test from Ant Money where you may fetch the city and country of an IP, and retrieve the queried IPs later from the server memory cache.

## Installation

1. Clone the repo into the folder of your choice
2. Run either `yarn install` or `npm install`
3. Start the application with either `yarn start` or `npm start`

\* This app uses port 3000 by default, feel free to modify by editing the port variable in server.js

## Endpoints

| Choice             | Endpoint                                                      |
| ------------------ | ------------------------------------------------------------- |
| IP City and State: | http://localhost:3000/ipinfo/{ipAddress}                      |
| Cached IP's        | http://localhost:3000/cachedips?city={city}&country={country} |

- If the port variable has been modified, swap out the localhost port for the port you have chosen

## How to use

#### Checking an IP address:

To find the city and location of an IP, please append the IP address you wish to look up at the end of the IP City and State enpoint.

For example, to retrieve the city and state of IP address 99.999.99.999, please visit:

http://localhost:3000/ipinfo/99.999.99.999.

To view the cached results of previous queries, visit http://localhost:3000/cachedips. If you'd like to further filter those past queries by city and/or country, please follow the example, ommiting country or city as neccessary:

http://localhost:3000/cachedips?city=Detroit&country=United%20States.

## Technologies Used:

### [Node.js](https://github.com/nodejs/node)

### [Express](https://github.com/expressjs/express)

### [Node-Fetch](https://github.com/node-fetch/node-fetch)

### [Node-Cache](https://github.com/node-cache/node-cache)

## Misc Notes

This was a fun exercise, definitely a nice break from the preconfigured frameworks such as NextJs. The most difficult part of this challenge was remembering how to setup a node server from scratch as it had been awhile since doing so. Luckily the simplicity of Express allows for a quick deployment of a web server, and once I overcame the memory hurdle everything else went smoothly.

The only uncertainty I had during this exercise was which value to set the server cache's time to live as, since I've never actually made an application utilizing it. I would assume that this cache would need to be flushed periodically as it would only grow but for the purpose of this exercise and to prevent no returns on behalf of the app I've left the time at unlimited.

Enjoying this challenge, I will soon build a frontend to interact with this application more easily. Stay tuned!