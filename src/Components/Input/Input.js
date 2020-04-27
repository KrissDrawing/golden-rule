import React from "react";
import styles from "./Input.module.scss";

const Input = ({ tag: Tag, name, label,type="text", ...props }) => (
  <>
    <div className={styles.formItem}>
      <input
        className={styles.input}
        type={type}
        name={name}
        id={name}
        placeholder=" "
        required
        {...props}
      />
      <label className={styles.label} htmlFor={name}>
        <span className={styles.contentName}>{label}</span>
      </label>
      {/* <div className={styles.formItemBar} /> */}
    </div>
  </>
);

export default Input;
