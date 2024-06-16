import styles from "./styleUI.module.css";
import { useEffect, useState } from "react";

export default function TextFieldLink({
  data,
  setData,
  order,
  // initialData,
  // setIsChanged
}) {
  // useEffect(() => {
  //   setIsChanged((prev => {
  //     initialData === prev ? false : true
  //   }))
  // }, [data]);

  const changeTitle = (e) => {
    if (e.target.value === "") {
      const newData = data.map((elem, i) => {
        if (i === order) return { ...elem, name: null };
        return elem;
      });
      setData(newData);
    } else {
      const newData = data.map((elem, i) => {
        if (i === order) return { ...elem, name: e.target.value };
        return elem;
      });
      setData(newData);
    }
  };
  const changeURL = (e) => {
    if (e.target.value === "") {
      const newData = data.map((elem, i) => {
        if (i === order) return { ...elem, url: null };
        return elem;
      });
      setData(newData);
    } else {
      const newData = data.map((elem, i) => {
        if (i === order) return { ...elem, url: e.target.value };
        return elem;
      });
      setData(newData);
    }
  };
  return (
    <div className={styles.textFieldLink}>
      <div className={styles.textFieldLinkTitleForm}>
        <input
          className={styles.inputLinkTitle}
          placeholder="Название"
          onChange={changeTitle}
          value={data?.[order]?.name}
        />
      </div>
      <div className={styles.textFieldLinkForm}>
        <input
          className={styles.inputLink}
          placeholder="https://"
          onChange={changeURL}
          value={data?.[order]?.url}
        />
      </div>
    </div>
  );
}
