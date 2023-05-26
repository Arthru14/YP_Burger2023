export interface ITabsProps {
  active: "one" | "two" | "three";
}

export type TTabsProps = "one" | "two" | "three";

export interface IPriceOutProps {
  price: number;
}

export interface IItemOfBurgerProps {
  isBun?: boolean;
  id: string;
  price: number;
  img: string;
  name: string;
  onClick: () => void;
}
