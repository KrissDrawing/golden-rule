import React from "react";
import HeaderNavigation from "./HeaderNavigation";
import logo from "../../assets/Images/logo.png";
import styles from "./Header.module.scss";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const Header = ({ openModalFn }) => (
  <header className={styles.wrapper}>
    <Link to="/">
      <img className={styles.logo} src={logo} alt="logo" />
    </Link>
    <HeaderNavigation />
    <Button onClick={openModalFn} secondary>
      Log-in
    </Button>
  </header>
);

export default Header;
