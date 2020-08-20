import React from "react";
import ListItem from "./ListItem";
import styles from "./List.module.scss";
const List = ({ items, deleteItems, activeItem, ...props }) => {
  return (
    <>
      {items.length ? (
        <ul className={styles.wrapper}>
          {items.map((item, index) => (
            <ListItem
              key={item.id}
              deleteItems={deleteItems}
              id={item.id}
              activeItem={index === activeItem ? true : false}
              {...props}
              {...item}
            />
          ))}
        </ul>
      ) : (
        <h1 className={styles.noItems}>Add first task! ❤️</h1>
      )}
    </>
  );
};

export default List;
