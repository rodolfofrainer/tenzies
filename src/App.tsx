import { JSX } from "react";
import { useState } from "react";

import TopBar from "./components/TopBar";

export default function App(): JSX.Element {
  const [dice, setDice] = useState(generateAllNewDice());

  function generateAllNewDice() {
    return Array(10)
      .fill(0)
      .map(() => Math.ceil(Math.random() * 6));
  }

  const diceElement = dice.map((num) => (
    <button className="dice">{num}</button>
  ));

  return (
    <main>
      <div className="app-container">
        <TopBar />
        <div className="dices-container">{diceElement}</div>
        <button className="roll-again-button">Roll Again</button>
      </div>
    </main>
  );
}
