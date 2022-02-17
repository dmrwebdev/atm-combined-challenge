import { useState, useEffect } from "react";
import styles from "./CachedIPs.module.scss";

export default function CachedIPs({ cachedView }) {
  const [ipAddressInput, setIpAddressInput] = useState("");
  const [serverResponse, setServerResponse] = useState(null);

  useEffect(() => {
    async function getCachedIPs() {
      const response = await fetch(`http://localhost:8015/cachedips`);
      setServerResponse(await response.json());
    }

    if (cachedView) {
      getCachedIPs();
    }
  }, [cachedView]);

  return (
    <div className={styles.container}>
      <h2>Previously Searched IP Addresses</h2>
      <ul className={styles.list_container}>
        {serverResponse &&
          serverResponse.map((ip) => (
            <li>
              <div className={styles.ipObj_container}>
                <div>
                  <span>IP:</span>
                  <span>City:</span>
                  <span>Country:</span>
                </div>
                <div>
                  <p>{ip.ip}</p>
                  <p>{ip.city}</p>
                  <p>{ip.country}</p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
