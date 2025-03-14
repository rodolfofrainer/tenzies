import { JSX } from "react";

interface DicesContainerProps {
  diceList: number[];
}

export default function DicesContainer(
  props: DicesContainerProps
): JSX.Element {
  const { diceList } = props;

  const dices = diceList.map((item) => (
    <button className="dice">{item}</button>
  ));

  return <div className="dices-container">{dices}</div>;
}
