/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer, useState } from "react";
import { CategorySelect } from "./CategorySelect";
import { TwitterPicker } from "react-color";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export interface Database {
  category: string;
  color: string;
  data: string[];
}

const QuoteCard = ({ text }: { text: string }) => {
  return <div className="quote-card">{text}</div>;
};

export const Input = () => {
  const [input, setInput] = useState<string>("");
  const [quotes, setQuotes] = useState<string[]>([]);

  const initialState = {
    category: "",
    color: "",
    data: [],
  };

  const currentDataReducer = (
    state: any,
    action: { type: string; payload: unknown }
  ) => {
    switch (action.type) {
      case "UPDATE_CATEGORY":
        return { ...state, category: action.payload };
      case "UPDATE_COLOR":
        return { ...state, color: action.payload };
      case "UPDATE_DATA":
        return { ...state, data: action.payload };
      default:
        return state;
    }
  };

  const [currentData, dispatch] = useReducer(currentDataReducer, initialState);

  const updateCategory = (newCategory: string) => {
    dispatch({ type: "UPDATE_CATEGORY", payload: newCategory });
  };

  const updateColor = (newColor: string) => {
    dispatch({ type: "UPDATE_COLOR", payload: newColor });
  };

  const updateData = (newData: string[]) => {
    dispatch({ type: "UPDATE_DATA", payload: newData });
  };

  const database = JSON.parse(localStorage.getItem("secondBrain")!) || [];

  const categories = database.map((item: Database) => ({
    title: item.category,
  }));

  const splitTextIntoSentences = (text: string) => {
    const sentences: string[] = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");
    setQuotes(sentences);
    updateData(sentences);
  };

  const confirmData = () => {
    localStorage.setItem(
      "secondBrain",
      JSON.stringify(updateOrCreateCategory(database, currentData))
    );
  };

  const updateOrCreateCategory = (
    dataset: Database[],
    input: Database
  ): Database[] => {
    const existingCategory = dataset.find(
      (item) => item.category === input.category
    );

    if (existingCategory) {
      existingCategory.data = existingCategory.data.concat(
        input.data.filter((item) => item !== "")
      );
      if (input.color !== "" && existingCategory.color !== input.color) {
        existingCategory.color = input.color;
      }
    } else {
      const newCategory: Database = {
        category: input.category,
        color: input.color,
        data: input.data.filter((item) => item !== ""),
      };
      dataset.push(newCategory);
    }
    return dataset;
  };

  return (
    <div className="flex flex-col p-8 justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-2 mb-6">
        <h1 className="bold text-4xl">Copy and Paste your data </h1>
        <small>(each quote/paragraph will be seperated by new line)</small>
      </div>
      <div className="w-[100%] flex justify-center items-center mb-4">
        <div className="w-[80%]">
          <TextField
            id="outlined-multiline-static"
            label="Paste your data"
            fullWidth
            multiline
            rows={10}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>
      <div className="w-[80%] flex justify-end">
        <Button
          onClick={() => splitTextIntoSentences(input)}
          variant="contained"
        >
          Generate
        </Button>
      </div>
      <div className="w-[80%] flex flex-col justify-center items-center gap-2 mb-6">
        <h2 className="text-3xl">Your quotes/paragraph will appear here</h2>
        <div className="flex flex-col gap-4">
          {quotes && quotes.map((item) => <QuoteCard text={item} />)}
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-3xl mb-4">Select category color</h2>
        <TwitterPicker
          onChange={(selectedColor) => updateColor(selectedColor.hex)}
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-3xl mb-4">Select category</h2>
        <div className="mb-6">
          <CategorySelect
            categories={categories}
            updateCategory={updateCategory}
          />
        </div>
        <Button onClick={() => confirmData()} variant="contained">
          Confirm
        </Button>
      </div>
    </div>
  );
};
