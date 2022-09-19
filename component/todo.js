import { useMemo } from "react";

import { useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const Todos = ({ todos, addTodo }) => {
  const todo = [
    {
      key: "1",
      item: "Watch movie",
    },
    {
      id: "2",
      item: "Reading book",
    },
    {
      id: "3",
      item: "Coding",
    },
  ];
  console.log("child render", todos);
  return (
    <>
      <div className="">
        {todos.map((todo, index) => (
          <div key={index} className={styles.listCard}>
            <input type="checkbox" className={styles.checkBox} />
            <li className={styles.lisItem}>{todo}</li>
            <div className={styles.iconCard}>
              <FontAwesomeIcon
                className={styles.icon}
                color="#0070f3"
                icon={faEdit}
              />
              <FontAwesomeIcon
                icon={faTrash}
                className={styles.icon}
                color="#0070f3"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todos;
