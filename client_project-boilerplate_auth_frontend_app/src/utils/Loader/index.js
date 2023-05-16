import React from "react";
import style from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={style.overlay}>
      <div className={style.spinnerSquare}>
        <div className={`${style.square1} ${style.square}`}></div>
        <div className={`${style.square2} ${style.square}`}></div>
        <div className={`${style.square3} ${style.square}`}></div>
      </div>
    </div>
  );
}
