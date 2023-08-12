/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Database } from "./Input";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const data = localStorage.getItem("secondBrain");

  const [quote, setQuote] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const navigate = useNavigate();

  function getRandomElementFromArray<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  function getRandomStringFromData(input: Database[]) {
    if (input.length === 0) {
      return null;
    }

    const selectedObject = getRandomElementFromArray(input);
    setColor(selectedObject.color);
    setCategory(selectedObject.category);
    const randomData = selectedObject.data.filter((item) => item !== "");

    if (randomData.length === 0) {
      return null;
    }

    const selectedQuote = getRandomElementFromArray(randomData);
    setQuote(selectedQuote);
  }

  useEffect(() => {
    if (data) getRandomStringFromData(JSON.parse(data));
  }, [data]);

  useEffect(() => {
    if (!data) navigate("/input");
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="absolute top-10 right-10">
        <Button variant="outlined" onClick={() => navigate("/input")}>
          Input new data
        </Button>
      </div>
      {quote && color && category && (
        <div
          className={`w-[70%] text-justify px-8 py-4 rounded-lg !shadow-[${color}] shadow-2xl`}
        >
          <div className={`text-[${color}] font-bold mb-2`}>{category}</div>
          <div>{quote}</div>
        </div>
      )}
      <div className="absolute bottom-10">
        Crafted with ❤️ by{" "}
        <a
          href="http://www.twitter.com/maitrakhatri"
          target="_blank"
          className="font-bold text-red-600"
        >
          Maitra Khatri
        </a>
      </div>
    </div>
  );
};
