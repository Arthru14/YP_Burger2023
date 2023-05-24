import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./login-page.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth";

export const LoginPage = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [valueEmail, setValueEmail] = useState("shmakov.arthur@yandex.ru");
  const [valuePassword, setValuePassword] = useState("222222");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setValueEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValuePassword(e.target.value);
  };

  const onEnter = (e: FormEvent) => {
    e.preventDefault();
    signIn(valueEmail, valuePassword).then(function () {
      navigate(from, { replace: true });
    });
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <span className="pb-3 text text_type_main-medium">Вход</span>
        <form onSubmit={onEnter}>
          <EmailInput
            onChange={onChangeEmail}
            value={valueEmail}
            name={"email"}
            isIcon={false}
            extraClass="pt-3 pb-3"
          />
          <PasswordInput
            onChange={onChangePassword}
            value={valuePassword}
            name={"password"}
            extraClass="mb-2 pt-3 pb-3"
          />
          <Button htmlType="submit">Войти</Button>
        </form>
        <span className="pt-20 text text_type_main-small text_color_inactive">
          Вы новый пользователь?{" "}
          <Link to="/register" className={styles.links}>
            Зарегистрироваться
          </Link>
        </span>
        <span className="pt-4 text text_type_main-small text_color_inactive">
          Забыли пароль?{" "}
          <Link to="/forgot-password" className={styles.links}>
            Восстановить пароль
          </Link>
        </span>
      </div>
    </main>
  );
}
