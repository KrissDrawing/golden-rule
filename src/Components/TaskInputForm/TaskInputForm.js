import React from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import AppContext from "../../context";
import styles from "./TaskInputForm.module.scss";
import { db } from "../../base";
import { AuthContext } from "../../Auth";
import uniqid from "uniqid";

class TaskInputForm extends React.Component {
  state = {
    title: "",
    id: "",
    active: false,
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  resetForm = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  submitFirebase = (e) => {
    let { currentUser } = this.context;
    if (currentUser !== null) {
      e.preventDefault();
      db.collection("users")
        .doc(currentUser.uid)
        .collection("task")
        .add({ ...this.state, date: Date.now(), id: uniqid() })
        .then(
          this.setState({
            title: "",
            id: "",
            active: false,
          })
        );
    }
  };

  render() {
    return (
      <AppContext.Consumer>
        {(context) => (
          <form
            id="myForm"
            className={styles.wrapper}
            autoComplete="off"
            onSubmit={(e) => {
              this.setState({
                title: "",
                active: false,
              });
              this.submitFirebase(e);
              context.addItem(e, this.state);
            }}
          >
            <Input
              className={styles.inputField}
              onChange={this.handleInputChange}
              value={this.state.title}
              name="title"
              label="task"
            ></Input>
            <Button>Add Task</Button>
          </form>
        )}
      </AppContext.Consumer>
    );
  }
}

TaskInputForm.contextType = AuthContext;

export default TaskInputForm;
