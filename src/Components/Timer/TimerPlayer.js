import React from "react";
import Button from "../Button/Button";
import AppContext from "../../context";
import styles from "./TimerPlayer.module.scss";

const TimerPlayer = () => {
  return (
    <AppContext.Consumer>
      {(context) => (
        <div className={styles.wrapper}>
          <Button onClick={context.startTimerFn}>Start</Button>

          <Button onClick={context.pauseTimer}>Pause</Button>
          <Button onClick={context.stopTimer}>Stop</Button>
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default TimerPlayer;
