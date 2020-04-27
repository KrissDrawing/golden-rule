import React from "react";

const TimerMovement = () => {
  const mouseMovement = () => {
    window.addEventListener("mousemove", e => {
      console.log(e);
      return e;
    });
  };
  return <p>{mouseMovement()}</p>;
};
export default TimerMovement;
