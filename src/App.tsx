import { JSX } from "react";
import { useState } from "react";
import { nanoid } from "nanoid";

import TopBar from "./components/TopBar";

export default function App(): JSX.Element {
  const [dice, setDice] = useState(generateAllNewDice());

  function generateAllNewDice() {
    return Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      }));
  }

  function rollButton() {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      )
    );
  }

  function holdButton(id: string) {
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  const diceElements = dice.map((obj) => (
    <button
      key={obj.id}
      onClick={() => holdButton(obj.id)}
      className={`dice ${obj.isHeld ? "isHeld" : "notHeld"}`}
    >
      {obj.value}
    </button>
  ));

  return (
    <main>
      <div className="app-container">
        <TopBar />
        <div className="dices-container">{diceElements}</div>
        <button onClick={rollButton} className="roll-again-button">
          Roll
        </button>
      </div>
    </main>
  );
}
