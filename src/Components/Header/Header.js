import React, { useContext } from "react";
import HeaderNavigation from "./HeaderNavigation";
import logo from "../../assets/Images/logo.png";
import styles from "./Header.module.scss";
import Button from "../Button/Button";
import app from "../../base";
import { AuthContext } from "../../Auth";
import { Link } from "react-router-dom";

const Header = ({ openModalFn, clearTaskList }) => {
  const { currentUser } = useContext(AuthContext);

  const signOut = () => {
    app.auth().signOut().then(console.log("successfully logged out"));
    clearTaskList();
  };

  return (
    <header className={styles.wrapper}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="logo" />
      </Link>
      <HeaderNavigation />
      <Button onClick={currentUser == null ? openModalFn : signOut} secondary>
        {currentUser == null ? "Log-in" : "Log-out"}
      </Button>
    </header>
  );
};
export default Header;
