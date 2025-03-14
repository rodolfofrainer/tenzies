import { JSX } from "react";

import TopBar from "./components/TopBar";

export default function App(): JSX.Element {
  // Dices Logic
  const NUMBER_OF_DICES: number = 10;
  let diceList: number[] = [];
  for (let i = 0; i < NUMBER_OF_DICES; i++) {
    diceList.push(Math.floor(Math.random() * 6));
  }
  const dices: JSX.Element[] = diceList.map((item, index) => (
    <button className="dice" key={index}>
      {item}
    </button>
  ));

  return (
    <main>
      <div className="app-container">
        <TopBar />
        <div className="dices-container">{dices}</div>
        <button className="roll-again-button">Roll Again</button>
      </div>
    </main>
  );
}
