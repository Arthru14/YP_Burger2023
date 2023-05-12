import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

export default function Modal(props) {
  React.useEffect(() => {
    const escFunc = (e) => e.key === "Escape" && props.onClose();
    document.addEventListener("keydown", escFunc);

    return () => {
      document.removeEventListener("keydown", escFunc);
    };
  }, [props]);

  return (
    props.visible &&
    ReactDOM.createPortal(
      <>
        <ModalOverlay onClick={props.onClose} />
        <div
          className={`${styles.modal_window} p-10`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.title}>
            <span className="text text_type_main-medium">{props.title}</span>
            <span onClick={props.onClose}>
              <CloseIcon type="secondary" />
            </span>
          </div>
          {props.children}
        </div>
      </>,
      document.getElementById("react-modals")
    )
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};
