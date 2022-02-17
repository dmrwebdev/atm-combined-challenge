import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import NodeCache from "node-cache";

const app = express();
const port = 8015;

const corsOptions = {
  cors: { origin: "*" },
};

// Unsure of a suitable TTL, set to unlimited for now
const cache = new NodeCache({ stdTTL: 0 });

// Setup cache checking middleware
const checkCache = (req, res, next) => {
  try {
    const { ip } = req.params;

    if (cache.has(ip)) {
      return res.status(200).json(cache.get(ip));
    }

    return next();
  } catch (err) {
    console.error(err);
  }
};

app.use(express.static("public"));

// Main page routing
app.get("/", (req, res) => {
  res.send("IP Geolocation Lookup!");
});

// Fetch incoming IPs geo data from GeoJS
app.get("/ipinfo/:ip", cors(corsOptions), checkCache, async (req, res) => {
  try {
    const { ip } = req.params;

    const response = await fetch(`https://get.geojs.io/v1/ip/geo/${ip}.json`);

    // If 404 is returned from fetch request IP is most likely invalid (GeoJS appears to return 404 instead of error on invalid IP), return not found page
    if (response.status === 404) {
      return res
        .status(404)
        .send(
          "404 returned from get request- IP most likely invalid or GeoJS is down"
        );
    }

    const { city, country } = await response.json();

    const filteredResponse = {
      city,
      country,
    };

    cache.set(ip, filteredResponse);

    res.status(200).json(filteredResponse);
  } catch (err) {
    console.error(err);
    res.status(500).send("An internal error has happened");
  }
});

// Get all previously queried IPs cached on the server
app.get("/cachedips", cors(corsOptions), async (req, res) => {
  try {
    const { city, country } = req.query;

    let cachedIPs = cache.keys().map((key) => ({ ip: key, ...cache.get(key) }));

    // If a city was specified filter the returned cached
    if (city) {
      cachedIPs = cachedIPs.filter((ip) => ip.city === city);
    }

    // If a country was specified filter the returned cached
    if (country) {
      cachedIPs = cachedIPs.filter((ip) => ip.country === country);
    }

    // And finally return the filtered results if there are any
    if (cachedIPs.length) {
      return res.json(cachedIPs);
    } else {
      // Otherwise return a page telling you whats happening
      if (!city && !country) {
        res.send(`No IPs are currently cached, try looking up an IP`);
      } else {
        res.send(
          `No IPs found with ${city ? `city name of ${city}` : ""} ${
            city && country ? "and" : ""
          } ${country ? `country name of ${country}` : ""}`
        );
      }
    }
  } catch (err) {
    res.status(500).send("An internal error has happened");
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`App is now listening on port ${port}`);
});
