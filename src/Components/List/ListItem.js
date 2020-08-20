import React, { useContext } from "react";
import PropTypes from "prop-types";
import styles from "./ListItem.module.scss";
import Button from "../Button/Button";
import { AuthContext } from "../../Auth";
import { db } from "../../base";

const ListItem = ({ title, id, deleteItems, plan, activeItem }) => {
  const active = activeItem ? styles.wrapperActive : styles.wrapper;
  const { currentUser } = useContext(AuthContext);

  const deletefb = (id) => {
    console.log(id);
    if (currentUser) {
      if (window.confirm(`Do you want to delete?`)) {
        db.collection("users")
          .doc(currentUser.uid)
          .collection("task")
          .where("id", "==", id)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              doc.ref.delete();
            });
          })
          .then(function () {
            console.log("Document successfully deleted!");
          })
          .catch(function (error) {
            console.error("Error removing document: ", error);
          });
      }
    }
  };

  return (
    <li className={plan ? styles.wrapperPlan : active}>
      <h1>{title}</h1>
      {plan && (
        <Button
          onClick={() => {
            deleteItems(id);
            deletefb(id);
          }}
        >
          X
        </Button>
      )}
    </li>
  );
};

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ListItem;
