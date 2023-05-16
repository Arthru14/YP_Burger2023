import { useEffect, useState } from "react";
import styles from "./forgot-password-page.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendEmailCode } from "../services/actions/auth-creator";

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const resetSuccess = useSelector((store) => store.userReducer.resetSuccess);
  const navigate = useNavigate();

  const [valueEmail, setValueEmail] = useState("bob@example.com");

  useEffect(() => {
    if (resetSuccess) {
      navigate("/reset-password", { state: { forgotPassed: true } });
    }
  }, [resetSuccess, navigate]);

  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };

  const onSendCode = (e) => {
    e.preventDefault();
    dispatch(sendEmailCode(valueEmail));
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <span className="pb-3 text text_type_main-medium">
          Восстановление пароля
        </span>
        <form onSubmit={onSendCode}>
          <EmailInput
            onChange={onChangeEmail}
            value={valueEmail}
            name={"email"}
            isIcon={false}
            extraClass="pt-3 pb-3"
          />
          <Button htmlType="submit">Восстановить</Button>
        </form>
        <span className="pt-20 text text_type_main-small text_color_inactive">
          Вспомнили пароль?{" "}
          <Link to="/login" className={styles.links}>
            Войти
          </Link>
        </span>
      </div>
    </main>
  );
}
