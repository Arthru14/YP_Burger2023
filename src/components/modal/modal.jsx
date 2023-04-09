import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css"

export default function Modal(props) {
  React.useEffect(() => {
    const escFunc = (e) => e.key === "Escape" && props.setModalVisible(false);
    document.addEventListener("keydown", escFunc);

    return () => {
      document.removeEventListener("keydown", escFunc);
    };
  }, [props]);

  const content = (
    <div
      onClick={() => {
        props.setModalVisible(false);
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div>
          <span onClick={() => props.setModalVisible(false)}>
            <CloseIcon type="secondary" />
          </span>
        </div>
        {props.children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={props.setModalVisible} />
      <div
        onClick={() => {
          props.setModalVisible(false);
        }}
      >
        <div className={styles.modal_window} onClick={(e) => e.stopPropagation()}>
          <div>
            <span onClick={() => props.setModalVisible(false)}>
              <CloseIcon type="secondary" />
            </span>
          </div>
          {props.children}
        </div>
      </div>
    </>,
    document.getElementById("react-modals")
  );
}
