import { JSX, useEffect } from "react";
import { useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

import TopBar from "./components/TopBar";

type Dice = {
  value: number;
  isHeld: boolean;
  id: string;
};

export default function App(): JSX.Element {
  const [dice, setDice] = useState(generateAllNewDice());
  const [gameWon, setGameWon] = useState<boolean>(false);

  useEffect(() => {
    setGameWon(dice.every((die) => die.value === dice[0].value && die.isHeld));
  }, [dice]);

  function generateAllNewDice(): Dice[] {
    return Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      }));
  }

  function rollButton(): void {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      )
    );
  }

  function newGame(): void {
    setDice(generateAllNewDice);
    setGameWon(false);
  }

  function holdButton(id: string): void {
    if (!gameWon) {
      setDice((oldDice) => {
        return oldDice.map((die) => {
          return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
        });
      });
    }
  }

  const diceElements: JSX.Element[] = dice.map((obj) => (
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
      {gameWon ? <Confetti className="confetti" /> : undefined}
      <div className="app-container">
        <TopBar />
        <div className="dices-container">{diceElements}</div>
        {gameWon ? (
          <button onClick={newGame} className="bottom-button">
            New Game
          </button>
        ) : (
          <button onClick={rollButton} className="bottom-button">
            Roll
          </button>
        )}
      </div>
    </main>
  );
}
