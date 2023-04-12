import React from "react";
import styles from "./modal-overlay.module.css";

export default function ModalOverlay(props) {
  return (
    <div
      className={styles.back_modal}
      onClick={() => {
        props.onClick(false);
      }}
    ></div>
  );
}
