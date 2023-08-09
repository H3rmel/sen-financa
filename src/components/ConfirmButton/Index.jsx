//#region Imports

//* React
import { useState } from "react";

//#endregion

export const ConfirmButton = ({
  onFirstClick = null,
  onConfirm,
  times = 2,
  messages,
  dialog,
  className,
}) => {
  const [timesPressed, setTimesPressed] = useState(0);

  const onPress = () => {
    setTimesPressed(timesPressed + 1);
    if (onFirstClick) onFirstClick();

    if (timesPressed + 1 === times) {
      onConfirm();
      setTimesPressed(0);
    }
  };

  return (
    <div
      className="tooltip tooltip-info"
      data-tip={`${messages[timesPressed]}`}
    >
      <button className={`btn ${className}`} onClick={onPress}>
        {dialog[timesPressed]}
      </button>
    </div>
  );
};
