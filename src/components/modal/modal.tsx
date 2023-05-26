import {
  FC,
  PropsWithChildren,
  ReactNode,
  ReactPortal,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

interface IModal {
  onClose: () => void;
  visible: boolean;
  title?: string;
}

const Modal: FC<PropsWithChildren<IModal>> = ({
  visible,
  title,
  onClose,
  children,
}): ReactPortal | null => {
  useEffect(() => {
    const escFunc = (e: { key: string }) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", escFunc);

    return () => {
      document.removeEventListener("keydown", escFunc);
    };
  }, [onClose]);

  return visible
    ? createPortal(
        <>
          <ModalOverlay onClick={onClose} />
          <div
            className={`${styles.modal_window} p-10`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.title}>
              <span className="text text_type_main-medium">{title}</span>
              <span onClick={onClose}>
                <CloseIcon type="secondary" />
              </span>
            </div>
            {children}
          </div>
        </>,
        document.getElementById("react-modals") as HTMLElement
      )
    : null;
};

export default Modal;
