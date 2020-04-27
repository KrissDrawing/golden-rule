import React from "react";
import AppContext from "../../context";
import TaskInputForm from "../../Components/TaskInputForm/TaskInputForm";
import List from "../../Components/List/List";
import Timer from "../../Components/Timer/Timer";
import styles from "./PlanView.module.scss";

const PlanView = () => (
  <div className={styles.wrapper}>
    <div>
      <AppContext.Consumer>
        {(context) => (
          <>
            <div className={styles.listContainer}>
              <List
                items={context.task}
                deleteItems={context.deleteItems}
                plan
              ></List>
            </div>
            <div className={styles.timer}>
              {context.startTimer && <Timer time={context.count} secondary />}
            </div>
          </>
        )}
      </AppContext.Consumer>
    </div>
    <div>
      <TaskInputForm></TaskInputForm>
    </div>
  </div>
);
export default PlanView;
