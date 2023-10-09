import React, { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const gameType: "hex" | "rgb" = "hex";
  const [colour, setColour] = useState("");
  const [gameStage, setGameStage] = useState<"ready" | "inprogress">("ready");
  const [showHelperText, setShowHelperText] = useState(false);

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

  const toggleHelp = useCallback(() => {
    setShowHelperText(!showHelperText);
  }, [showHelperText]);

  return (
    <div className="App">
      <p>Guess that colour!</p>
      <div className="Box" style={{ background: colour }} />
      <div className="ButtonGroup">{renderButtonContainer()}</div>
      <button
        className="Button"
        onClick={toggleHelp}
        style={{ marginTop: "12px" }}
      >
        Help?
      </button>
      {showHelperText ? (
        <>
          <p>
            The hex colour format follows a pattern, the first 2 digits are red,
            second 2 are green and last 2 are blue.
          </p>
          <p>#000000 is black and #FFFFFF is white</p>
        </>
      ) : undefined}
    </div>
  );
}

export default App;
