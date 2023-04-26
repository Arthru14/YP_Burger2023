import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

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

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
