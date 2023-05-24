import styles from "./order-history.module.css";
import { Link } from "react-router-dom";

export function OrderHistoryPage() {
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
