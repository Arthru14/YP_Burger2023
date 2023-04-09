import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

export default function Modal(props) {
  React.useEffect(() => {
    const escFunc = (e) => e.key === "Escape" && props.setModalVisible(false);
    document.addEventListener("keydown", escFunc);

    return () => {
      document.removeEventListener("keydown", escFunc);
    };
  }, [props]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={props.setModalVisible} />
      <div
        className="m-10"
        onClick={() => {
          props.setModalVisible(false);
        }}
      >
        <div
          className={styles.modal_window}
          onClick={(e) => e.stopPropagation()}
        >
          <span onClick={() => props.setModalVisible(false)}>
            <CloseIcon type="secondary" />
          </span>
          {props.children}
        </div>
      </div>
    </>,
    document.getElementById("react-modals")
  );
}
