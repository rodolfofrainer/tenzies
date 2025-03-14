import { JSX } from "react";

export default function TopBar(): JSX.Element {
  return (
    <div className="top-bar">
      <h1>Get all dices with same value to win the game!</h1>
      <p>
        In order to win all dices must have the same value, click on them to
        lock the value in place!
      </p>
    </div>
  );
}
