import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setdata] = useState("");
  useEffect(() => {
    axios.get("/hello").then((response) => {
      setdata(response.data);
    });
  });
  return (
    <div className="App">
      <header className="App-header">
        <h1>{data}</h1>
      </header>
    </div>
  );
}

export default App;
