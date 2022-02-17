import CachedIPs from "./components/CachedIPs/CachedIPs";
import IPInfo from "./components/IPInfo/IPInfo";
import SelectionView from "./components/SelectionView/SelectionView";
import { useState } from "react";

function App() {
  const [cachedView, setCachedView] = useState(false);

  return (
    <div className="App">
      <div className="main_container">
        {!cachedView && <h1>IP Geolocation Lookup!</h1>}
        {!cachedView && <IPInfo />}
        {cachedView && <CachedIPs cachedView={cachedView} />}
        <button className='view_switch' onClick={() => setCachedView((prev) => !prev)}>
          {cachedView ? "IP Lookup" : "View Cached IPs"}
        </button>
      </div>
    </div>
  );
}

export default App;
