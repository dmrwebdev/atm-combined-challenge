import { useState } from "react";
import styles from "./IPInfos.module.scss";

export default function IPInfo() {
  const [ipAddressInput, setIpAddressInput] = useState("");
  const [serverResponse, setServerResponse] = useState(null);

  async function handleSubmit() {
    try {
      const response = await fetch(
        `http://localhost:3000/ipinfo/${ipAddressInput}`
      );

      const jsonRes = await response.json();
      setServerResponse(jsonRes);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
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
      {serverResponse && (
        <div className={styles.ip_info_results_container}>
          <div>
            <p>City:</p>
            <p>{serverResponse && serverResponse.city}</p>
          </div>
          <div>
            <p>Country:</p>
            <p>{serverResponse && serverResponse.country}</p>
          </div>
        </div>
      )}
    </div>
  );
}
