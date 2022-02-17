import { useState, useEffect } from "react";
import styles from "./CachedIPs.module.scss";

export default function CachedIPs({ cachedView }) {
  const [ipAddressInput, setIpAddressInput] = useState("");
  const [serverResponse, setServerResponse] = useState(null);

  useEffect(() => {
    async function getCachedIPs() {
      const response = await fetch(`http://localhost:3000/cachedips`);
      setServerResponse(await response.json());
    }

    if (cachedView) {
      getCachedIPs();
    }
  }, [cachedView]);

  async function handleSubmit() {
    const response = await fetch(`http://localhost:3000/cachedips`);

    const jsonRes = await response.json();
    setServerResponse(jsonRes);
  }
  return (
    <div>
      <h2>Previously Searched IP Addresses</h2>
      <ul className={styles.list_container}>
        {serverResponse &&
          serverResponse.map((ip) => (
            <li>
              <div className={styles.ipObj_container}>
                <div>
                  <span>IP:</span>
                  <p>{ip.ip}</p>
                </div>
                <div>
                  <span>City:</span>
                  <p>{ip.city}</p>
                </div>
                <div>
                  <span>Country:</span>
                  <p>{ip.country}</p>
                </div>
              </div>
            </li>
          ))}
      </ul>
      {/*       <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label for="ipaddress">IP Address:</label>
        <input
          id="ipaddress"
          type="text"
          onChange={(e) => setIpAddressInput(e.target.value)}
        />
        <button>Submit</button>
      </form>
      <div>
        <div className="">
          <p>City:</p>
          <p>{serverResponse && serverResponse.city}</p>
        </div>
        <p>Country:</p>
        <p>{serverResponse && serverResponse.country}</p>
      </div> */}
    </div>
  );
}
