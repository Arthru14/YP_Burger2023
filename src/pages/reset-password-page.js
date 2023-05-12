import { useEffect, useState } from "react";
import styles from "./reset-password-page.module.css";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveNewPassword } from "../services/actions/auth-creator";

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const resetSuccess = useSelector((store) => store.userReducer.resetSuccess);
  const [valuePassword, setValuePassword] = useState("bob@example.com");
  const [valueCodeEmail, setValueCodeEmail] = useState("");
  const savePasswordSuccess = useSelector(
    (store) => store.userReducer.savePasswordSuccess
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

  const onChangePassword = (e) => {
    setValuePassword(e.target.value);
  };

  const onSavePwd = (e) => {
    e.preventDefault();
    dispatch(saveNewPassword(valuePassword, valueCodeEmail));
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <span className="pb-3 text text_type_main-medium">
          Восстановление пароля
        </span>
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
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={onSavePwd}
        >
          Сохранить
        </Button>
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
