import { JSX } from "react";

import TopBar from "./components/TopBar";
import DicesContainer from "./components/DicesContainer";

export default function App(): JSX.Element {
  const NUMBER_OF_DICES: number = 10;
  let diceList: number[] = [];
  for (let i = 0; i < NUMBER_OF_DICES; i++) {
    diceList.push(Math.floor(Math.random() * 6));
  }

  return (
    <main>
      <div className="app-container">
        <TopBar />
        <DicesContainer diceList={diceList} />
      </div>
    </main>
  );
}
