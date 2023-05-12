import { useEffect, useRef, useState } from "react";
import styles from "./register-page.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerNewUser } from "../services/actions/auth-creator";

export function RegisterPage() {
  const dispatch = useDispatch();
  const userName = useSelector((store) => store.userReducer.currentUser.name);
  const navigate = useNavigate();

  const [valueEmail, setValueEmail] = useState("shmakov.arthur@yandex.ru7");
  const [valuePassword, setValuePassword] = useState("111111");
  const [valueUserName, setValueUserName] = useState("Arthur1408");

  const inputRef = useRef(null);

  useEffect(() => {
    if (userName) {
      navigate("/");
    }
  }, [userName, navigate]);

  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setValuePassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerNewUser(valueUserName, valuePassword, valueEmail));
    navigate("/login");
  };

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <span className="pb-3 text text_type_main-medium">Регистрация</span>
        <form onSubmit={onSubmit}>
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
