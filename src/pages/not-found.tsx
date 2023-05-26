import styles from "./not-found.module.css";
import blackhole from "../images/404bh.png";

export function NotFound404() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <p className="text text_type_digits-large">404</p>
        <img alt="Not found" src={blackhole} />
      </div>
    </main>
  );
}
