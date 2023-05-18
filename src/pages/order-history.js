import { useState } from "react";
import styles from "./order-history.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useAuth } from "../services/auth";
import { useDispatch } from "react-redux";

export function OrderHistoryPage() {
  const userAuth = useAuth();
  const savedName = userAuth.user.name;
  const savedEmail = userAuth.user.email;
  const dispatch = useDispatch();

  const [valueEmail, setValueEmail] = useState(savedEmail);
  const [valuePassword, setValuePassword] = useState("");
  const [valueUserName, setValueUserName] = useState(savedName);
  const [isEditName, setIsEditName] = useState(false);

  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setValuePassword(e.target.value);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <aside>
            <Link to="/profile">
              <span className="text text_type_main-medium text_color_inactive">
                Профиль
              </span>
            </Link>
            <Link to="/profile/orderhistory">
              <span className="text text_type_main-medium">
                История заказов
              </span>
            </Link>
            <Link to="/logout">
              <span className="text text_type_main-medium text_color_inactive">
                Выход
              </span>
            </Link>
            <span className="mt-20 text text_type_main-default text_color_inactive">
              В этом разделе Вы можете посмотреть историю заказов
            </span>
          </aside>
          <main className="ml-15">Тут будет история заказов пользователя</main>
        </div>
      </div>
    </>
  );
}
