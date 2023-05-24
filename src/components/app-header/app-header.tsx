import { Link, useLocation } from "react-router-dom";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAuth } from "../../services/auth";
import { FC } from "react";

interface INavLinkProps {
  title: string,
  icon: any,
  link: string,
  currentPage: boolean,
}

interface IIcon {
  type: string,
  className: string, 
}

const NavLink: FC<INavLinkProps> = ({ title, icon, link, currentPage }) => {
  const Icon:FC<IIcon> = icon;
  return (
    <Link to={link}>
      <Button
        htmlType="button"
        type="secondary"
        size="medium"
        className={styles.NavButton}
      >
        <Icon type={currentPage ? "primary" : "secondary"} className="pr-2" />
        <div
          className={`pl-2 text text_type_main-default ${
            !currentPage ? "text_color_inactive" : null
          }`}
        >
          {title}
        </div>
      </Button>
    </Link>
  );
};

function AppHeader() {
  const location = useLocation();
  const isConstructorPage = location.pathname === "/";
  const isOrderListPage = location.pathname === "/orderList";
  const isProfilePage =
    location.pathname === "/profile" ||
    location.pathname === "/profile/orderhistory" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password";

  // const userName = useSelector((store) => store.userReducer.currentUser.name);
  const userAuth = useAuth();
  const userName = userAuth.user?.name;

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <div className={styles.navMenuLeft}>
            <NavLink
              title="Конструктор"
              icon={BurgerIcon}
              link="/"
              currentPage={isConstructorPage}
            />
            <NavLink
              title="Лента заказов"
              icon={ListIcon}
              link="/orderList"
              currentPage={isOrderListPage}
            />
          </div>
          <div className={styles.navLogo}>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className={styles.navMenuRight}>
            <NavLink
              title={userName ? userName : "Личный кабинет"}
              icon={ProfileIcon}
              link="/profile"
              currentPage={isProfilePage}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
