import { Link, useLocation } from "react-router-dom";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAuth } from "../../services/auth";
import NavLink from "./nav-link";

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
              currentPage={isConstructorPage ? 'primary' : 'secondary'}
            />
            <NavLink
              title="Лента заказов"
              icon={ListIcon}
              link="/orderList"
              currentPage={isOrderListPage ? 'primary' : 'secondary'}
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
              currentPage={isProfilePage ? 'primary' : 'secondary'}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
