import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import styles from "./register-page.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { registerNewUser } from "../services/actions/auth-creator";
import { useAuth } from "../services/auth";
import { useAppDispatch } from "..";

export function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userAuth = useAuth();
  const userName = userAuth.user?.name;

  const [valueEmail, setValueEmail] = useState("shmakov.arthur@yandex.ru7");
  const [valuePassword, setValuePassword] = useState("111111");
  const [valueUserName, setValueUserName] = useState("Arthur1408");

  const inputRef = useRef(null);

  useEffect(() => {
    if (userName) {
      navigate("/");
    }
  }, [userName, navigate]);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setValueEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValuePassword(e.target.value);
  };

  const onSubmitFun = (e: FormEvent) => {
    e.preventDefault();
    dispatch(registerNewUser(valueUserName, valuePassword, valueEmail));
    navigate("/login");
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <span className="pb-3 text text_type_main-medium">Регистрация</span>
        <form onSubmit={onSubmitFun}>
          <Input
            type={"text"}
            placeholder={"имя"}
            onChange={(e) => setValueUserName(e.target.value)}
            value={valueUserName}
            name={"name"}
            error={false}
            ref={inputRef}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
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
          <Button htmlType="submit" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>
        <span className="pt-20 text text_type_main-small text_color_inactive">
          Уже зарегистрированы?{" "}
          <Link to="/login" className={styles.links}>
            Войти
          </Link>
        </span>
      </div>
    </main>
  );
}
