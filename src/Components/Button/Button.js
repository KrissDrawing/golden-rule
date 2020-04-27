import React from "react";
import styles from "./Button.module.scss";

const Button = ({ children, openModalFn, secondary, ...props }) => {
  const buttonClass = secondary ? styles.secondary : styles.button;

  return (
    <>
      <button className={buttonClass} {...props}>
        {children}
      </button>
    </>
  );
};
export default Button;
