import React from "react";
import styles from "./Timer.module.scss";

class Timer extends React.Component {
  state = {
    count: 0,
  };

  secondsConverter = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;

    return `${minutes}:${
      seconds < 10 ? String(seconds).padStart(2, "0") : seconds
    }`;
  };

  render() {
    const { time, addMinute, resetTimer, secondary } = this.props;
    return (
      <>
        <div className={styles.wrapper}>
          <h1>{this.secondsConverter(time)}</h1>
          {!secondary && (
            <>
              <button className={styles.firstButton} onClick={addMinute}>
                Add minute
              </button>
              <button className={styles.secondButton} onClick={resetTimer}>
                Reset
              </button>
            </>
          )}
        </div>
      </>
    );
  }
}
export default Timer;
