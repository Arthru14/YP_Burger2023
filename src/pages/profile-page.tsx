import { ChangeEvent, useState } from "react";
import styles from "./profile-page.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../services/actions/auth-creator";
import { useAppDispatch } from "..";

export function ProfilePage() {
  const userAuth = useAuth();
  const savedName = userAuth.user?.name;
  const savedEmail = userAuth.user?.email;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [valueEmail, setValueEmail] = useState(savedEmail);
  const [valuePassword, setValuePassword] = useState("");
  const [valueUserName, setValueUserName] = useState(savedName);
  const [isEditUserInfo, setIsEditUserInfo] = useState(false);
  const [isEditInfo, setIsEditInfo] = useState({
    name: true,
    email: true,
    password: true,
  });

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setValueUserName(e.target.value);
    setIsEditUserInfo(true);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setValueEmail(e.target.value);
    setIsEditUserInfo(true);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValuePassword(e.target.value);
    setIsEditUserInfo(true);
  };

  const onSaveUserInfo = async () => {
    await dispatch(updateUserProfile(valueUserName, valuePassword, valueEmail));
    navigate("/profile");
  };

  const onCancelUserInfo = () => {
    setValueEmail(savedEmail);
    setValuePassword("");
    setValueUserName(savedName);
    setIsEditInfo({
      name: true,
      email: true,
      password: true,
    });
    setIsEditUserInfo(false);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <aside>
            <Link to="/profile">
              <span className="text text_type_main-medium">Профиль</span>
            </Link>
            <Link to="/profile/orderhistory">
              <span className="text text_type_main-medium text_color_inactive">
                История заказов
              </span>
            </Link>
            <Link to="/logout">
              <span className="text text_type_main-medium text_color_inactive">
                Выход
              </span>
            </Link>
            <span className="mt-20 text text_type_main-default text_color_inactive">
              В этом разделе Вы можете изменить свои персональные данные
            </span>
          </aside>
          <main className="ml-15">
            <Input
              type={"text"}
              placeholder={"имя"}
              onChange={onChangeUserName}
              value={valueUserName ? valueUserName : ""}
              name={"name"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="pb-3"
              icon={"EditIcon"}
              onIconClick={() =>
                setIsEditInfo({ ...isEditInfo, name: !isEditInfo.name })
              }
              disabled={isEditInfo.name}
            />
            <EmailInput
              onChange={onChangeEmail}
              value={valueEmail ? valueEmail : ""}
              name={"email"}
              isIcon={true}
              // onIconClick={() =>
              //   setIsEditInfo({ ...isEditInfo, email: !isEditInfo.email })
              // }
              extraClass="pt-3 pb-3"
              disabled={isEditInfo.email}
            />
            <PasswordInput
              onChange={onChangePassword}
              value={valuePassword}
              name={"password"}
              icon="EditIcon"
              extraClass="pt-3 pb-3"
              // onIconClick={() =>
              //   setIsEditInfo({ ...isEditInfo, password: !isEditInfo.password })
              // }
              disabled={isEditInfo.password}
            />
            {isEditUserInfo && (
              <div>
                <Button
                  htmlType="button"
                  type="primary"
                  size="medium"
                  onClick={onSaveUserInfo}
                >
                  Сохранить данные
                </Button>
                <Button
                  htmlType="button"
                  type="primary"
                  size="medium"
                  extraClass="ml-4"
                  onClick={onCancelUserInfo}
                >
                  Отмена
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
