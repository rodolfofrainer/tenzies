import { JSX, useEffect } from "react";
import { useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useTimer } from "react-timer-hook";

import TopBar from "./components/TopBar";

type MyTimerProps = {
  expiryTimestamp: Date;
};

type Dice = {
  value: number;
  isHeld: boolean;
  id: string;
};

export default function App(): JSX.Element {
  const GAME_TIME = 60;

  const [dice, setDice] = useState(generateAllNewDice());
  const [gameFinished, setGameFinished] = useState(false);

  // timer logic
  const [time, setTime] = useState(() => {
    const futureTime = new Date();
    futureTime.setSeconds(futureTime.getSeconds() + GAME_TIME);
    return futureTime;
  });
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

  //Reset timer
  function resetTimer(): void {
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + GAME_TIME);
    setTime(newTime);
  }

  // NEW GAME
  function newGame(): void {
    setDice(generateAllNewDice);
    resetTimer();
    gameWon = false;
    setGameFinished(false);
  }

  //GAME OVER
  function gameOver(): void {
    const currentTime = new Date();
    if (time.getSeconds() - currentTime.getSeconds() <= 0) {
      gameWon = false;
      setGameFinished(true);
      console.log("lost");
    }
  }

  function MyTimer({ expiryTimestamp }: MyTimerProps): JSX.Element {
    const { totalSeconds } = useTimer({
      expiryTimestamp,
      onExpire: () => gameOver(),
      interval: 100,
    });

    return (
      <div className="timer-container">
        <span>{totalSeconds}</span>
        <p>Seconds Left</p>
      </div>
    );
  }

  // Win logic
  if (dice.every((die) => die.value === dice[0].value && die.isHeld)) {
    setGameFinished(true);
    gameWon = true;
  }

  // APP FUNCTION
  return (
    <main>
      {gameWon ? <Confetti className="confetti" /> : undefined}
      <div className="app-container">
        <TopBar />
        <div className="dices-container">{diceElements}</div>
        {gameFinished ? (
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
