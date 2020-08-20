import React from "react";
import styles from "./Modal.module.scss";
import SignForm from "../SignForm/SignForm";

class Modal extends React.Component {
  state = {
    register: false,
  };

  changeForm = () => {
    this.setState((prevState) => ({
      register: !prevState.register,
    }));
  };
  z;

  render() {
    const { closeModalFn } = this.props;
    return (
      <div className={styles.wrapper}>
        <button className={styles.closeButton} onClick={closeModalFn} />
        {this.state.register ? <SignForm register closeModalFn /> : <SignForm closeModalFn />}
        <button className={styles.registerButton} onClick={this.changeForm}>
          {this.state.register ? "Login?" : "Register?"}
        </button>
      </div>
    );
  }
}

export default Modal;
