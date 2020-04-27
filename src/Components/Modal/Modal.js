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

  render() {
    const { closeModalFn } = this.props;
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.temp}>Under development</h1>
        <button className={styles.closeButton} onClick={closeModalFn} />
        {this.state.register ? (
          <SignForm register closeModalFn />
        ) : (
          <SignForm closeModalFn />
        )}

        <button className onClick={this.changeForm}>
          Register
        </button>
      </div>
    );
  }
}

// const Modal = ({ closeModalFn }) => (
//   <div className={styles.wrapper}>
//     <button className={styles.closeButton} onClick={closeModalFn} />
//     <SignForm register closeModalFn/>
//     <button>Register</button>
//   </div>
// );

export default Modal;
