import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./reset-password-page.module.css";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { saveNewPassword } from "../services/actions/auth-creator";
import { useAppDispatch } from "..";

export function ResetPasswordPage() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const resetSuccess = useSelector(
    (store: any) => store.userReducer.resetSuccess
  );
  const [valuePassword, setValuePassword] = useState("bob@example.com");
  const [valueCodeEmail, setValueCodeEmail] = useState("");
  const savePasswordSuccess = useSelector(
    (store: any) => store.userReducer.savePasswordSuccess
  );

  useEffect(() => {
    if (!resetSuccess) {
      navigate("/forgot-password", { state: { forgotPassed: false } });
    }
  }, [resetSuccess, navigate]);

  useEffect(() => {
    if (!location.state || !location.state.forgotPassed) {
      navigate(-1);
    } else {
      if (savePasswordSuccess) {
        navigate("/login", { state: { resetPassed: true } });
      }
    }
  }, [location.state, savePasswordSuccess, navigate]);

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValuePassword(e.target.value);
  };

  const onSavePwd = (e: FormEvent) => {
    e.preventDefault();
    dispatch(saveNewPassword(valuePassword, valueCodeEmail));
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <span className="pb-3 text text_type_main-medium">
          Восстановление пароля
        </span>
        <form onSubmit={onSavePwd}>
          <PasswordInput
            placeholder={"Введите новый пароль"}
            onChange={onChangePassword}
            value={valuePassword}
            name={"password"}
            extraClass="pt-3 pb-3"
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => setValueCodeEmail(e.target.value)}
            value={valueCodeEmail}
            name={"codeEmail"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-2 pt-3 pb-3"
          />
          <Button htmlType="submit">Сохранить</Button>
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
