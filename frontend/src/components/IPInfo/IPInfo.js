import { useState } from "react";
import styles from "./IPInfos.module.scss";

export default function IPInfo() {
  const [ipAddressInput, setIpAddressInput] = useState("");
  const [serverResponse, setServerResponse] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit() {
    try {
      const response = await fetch(
        `http://localhost:8015/ipinfo/${ipAddressInput}`
      );

      const jsonRes = await response.json();
      setServerResponse(jsonRes);
    } catch (err) {
      console.log(err);
      setError("Unknown IP address");
    }
  }
  return (
    <div className={styles.container}>
      <h2>
        Enter an IP address below to find the city and country it belongs too.
      </h2>
      <form
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
      {error && <p>Unknown IP Address</p>}
      {serverResponse && (
        <div className={styles.ip_info_results_container}>
          <div>
            <p>City:</p>
            <p>Country:</p>
          </div>
          <div>
            <p>{serverResponse && serverResponse.city}</p>
            <p>{serverResponse && serverResponse.country}</p>
          </div>
        </div>
      )}
    </div>
  );
}
