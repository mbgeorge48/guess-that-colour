import React, { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const gameType: "hex" | "rgb" = "hex";
  const [colour, setColour] = useState("");
  const [gameStage, setGameStage] = useState<"ready" | "inprogress">("ready");

  const generateColour = useCallback(() => {
    if (gameType === "hex") {
      const hexOptions = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
      ];

      return (
        "#" +
        new Array(6)
          .fill("")
          .map(() => hexOptions[Math.floor(Math.random() * hexOptions.length)])
          .join("")
      );
    }
    return (
      "rgb(" +
      Math.floor(Math.random() * 255) +
      Math.floor(Math.random() * 255) +
      Math.floor(Math.random() * 255) +
      ")"
    );
  }, [gameType]);

  useEffect(() => {
    setColour(generateColour());
    setGameStage("inprogress");
  }, [generateColour, gameStage]);

  const handleWin = useCallback(() => {
    alert("Win");
    setGameStage("ready");
  }, []);
  const handleLose = useCallback(() => {
    alert("Lose");
  }, []);

  const renderButtonContainer = useCallback(() => {
    const buttons = [
      <button className="Button" onClick={handleWin}>
        {colour}
      </button>,
      <button className="Button" onClick={handleLose}>
        {generateColour()}
      </button>,
      <button className="Button" onClick={handleLose}>
        {generateColour()}
      </button>,
    ];

    return buttons.sort((a, b) => 0.5 - Math.random());
  }, [colour, generateColour, handleLose, handleWin]);

  return (
    <div className="App">
      <p>Guess that colour!</p>
      <div className="Box" style={{ background: colour }} />
      <div className="ButtonGroup">{renderButtonContainer()}</div>
    </div>
  );
}

export default App;
