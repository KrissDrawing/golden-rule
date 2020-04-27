import React from "react";
import AppContext from "../../context";
import List from "../../Components/List/List";
import styles from "./TimerView.module.scss";
import Timer from "../../Components/Timer/Timer";

const TimerView = () => (
  <AppContext.Consumer>
    {(context) => (
      <>
        <div className={styles.wrapper}>
          <div className={styles.listContainer}>
            <List items={context.task} activeItem={context.activeItem}></List>
          </div>
          <div>
            <Timer
              className={styles.timer}
              time={context.count}
              resetTimer={context.resetTimer}
              addMinute={context.addMinute}
            />
          </div>
        </div>
      </>
    )}
  </AppContext.Consumer>
);
export default TimerView;
