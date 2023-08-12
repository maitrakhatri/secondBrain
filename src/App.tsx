import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Input } from "./Input";
import { HomePage } from "./HomePage";
// import { useEffect, useState } from "react";

function App() {
  /* const data = localStorage.getItem("secondBrain");
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    if (!data) setIsEmpty(true);
  }, [data]); */

  return (
    <div className="App">
      <Routes>
        <Route path="/input" element={<Input />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      {/* {isEmpty ? <Input /> : <HomePage />} */}
    </div>
  );
}

export default App;
