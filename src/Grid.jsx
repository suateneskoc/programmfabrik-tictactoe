import { useState } from "react";

const GridButton = () => {
  const [disabled, setDisabled] = useState(false);
  return (
    <button
      className="aspect-square bg-gray-100 dark:bg-gray-900 rounded-md"
      disabled={disabled}
    ></button>
  );
};

const Grid = () => {
  return (
    <div className="grid gap-2 grid-cols-3 grid-rows-3">
      {[...Array(9).keys()].map((index) => {
        return <GridButton key={index} />;
      })}
    </div>
  );
};

export default Grid;
