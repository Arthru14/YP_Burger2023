import { FC } from "react";
import styles from "./modal-overlay.module.css";

interface IModalOverlayProps {
  onClick: (value: boolean) => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onClick }) => {
  return (
    <div
      className={styles.back_modal}
      onClick={() => {
        onClick(false);
      }}
    ></div>
  );
};

export default ModalOverlay;
