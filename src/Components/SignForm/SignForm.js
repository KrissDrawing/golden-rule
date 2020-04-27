import React, { useCallback, useContext, useEffect } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import app from "../../base";
import { withRouter, Redirect } from "react-router-dom";
import { AuthContext, AuthProvider } from "../../Auth";
import AppContext from "../../context";
import { db } from "../../base";
import context from "../../context";

const SignForm = ({ history, register, closeModalFn }) => {
  const handleSingUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then((cred) => {
            return db.collection("users").doc(cred.user.uid).set({
              task: [],
            });
          });
        history.push("/log");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  useEffect(() => {
    console.log(currentUser);
  }, []);

  const handleLogIn = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/log");
        await appCon.populateList(currentUser);
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const logIn = async (fn) => {
    await handleLogIn();
    fn();
  };

  const { currentUser } = useContext(AuthContext);
  const appCon = useContext(AppContext);

  return (
    <AppContext.Consumer>
      {(context) => (
        <form
          onSubmit={
            register ? handleSingUp : handleLogIn
            // async() => {
            //   await handleLogIn,
            //   ()=>context.populateList
            // }
          }
        >
          <Input label="e-mail" name="email" type="email" />
          <Input label="password" name="password" type="password" />
          <Button>{register ? "Register" : "Log-in"}</Button>
        </form>
      )}
    </AppContext.Consumer>
  );
};

export default withRouter(SignForm);
