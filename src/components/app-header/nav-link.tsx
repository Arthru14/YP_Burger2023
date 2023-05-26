import { FC } from "react";
import styles from "./app-header.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

interface INavLinkProps {
  title: string;
  icon: FC<IIcon>;
  link: string;
  currentPage: TIconTypes;
}
type TIconTypes = 'secondary' | 'primary' | 'error' | 'success';

interface IIcon {
  type: TIconTypes;
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
        <Icon type={currentPage === 'primary' ? 'primary' : 'secondary'} />
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

export default NavLink;
