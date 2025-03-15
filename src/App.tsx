import { JSX, useEffect } from "react";
import { useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useTimer } from "react-timer-hook";

import TopBar from "./components/TopBar";

type Dice = {
  value: number;
  isHeld: boolean;
  id: string;
};

export default function App(): JSX.Element {
  const [dice, setDice] = useState(generateAllNewDice());

  let gameFinished = false;
  let gameWon = false;

  //GENERATE  DICE OBJ
  function generateAllNewDice(): Dice[] {
    return Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      }));
  }

  // Roll button
  function rollButton(): void {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      )
    );
  }

  // UPDATE isHeld value from Dice Obj
  function holdButton(id: string): void {
    if (!gameFinished) {
      setDice((oldDice) => {
        return oldDice.map((die) => {
          return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
        });
      });
    }
  }
  // Render Dice Obj into HTML
  const diceElements: JSX.Element[] = dice.map((obj) => (
    <button
      key={obj.id}
      onClick={() => holdButton(obj.id)}
      className={`dice ${obj.isHeld ? "isHeld" : "notHeld"}`}
    >
      {obj.value}
    </button>
  ));

  // NEW GAME
  function newGame(): void {
    setDice(generateAllNewDice);
    gameWon = false;
    gameFinished = false;
  }

  //GAME OVER
  function gameOver(): void {
    gameWon = false;
    gameFinished = true;
  }

  // timer logic
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60);

  function MyTimer({ expiryTimestamp }): JSX.Element {
    const { totalSeconds } = useTimer({
      expiryTimestamp,
      onExpire: () => gameOver,
      interval: 100,
    });

    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "100px" }}>
          <span>{totalSeconds}</span>
          <br />
          <span>seconds left</span>
        </div>
      </div>
    );
  }

  // Win logic
  if (dice.every((die) => die.value === dice[0].value && die.isHeld)) {
    gameFinished = true;
    gameWon = true;
  }

  // APP FUNCTION
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
      <MyTimer expiryTimestamp={time} />
    </main>
  );
}
