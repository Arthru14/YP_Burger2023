export interface IItemDrop {
  id: string;
  price: number;
  isBunAdded: boolean;
  isBun: boolean;
}

export interface IIngridItem {
  uniqueId: Key;
  ingridId: Key;
}

export const BUN_TOP = "top";
export const BUN_BOTTOM = "bottom";

export interface IBurgerComponentItems {
  name: string;
  type?: "top" | "bottom" | undefined;
  id?: string | number;
  price: number;
  dragIcon?: boolean;
  isLocked?: boolean;
  thumbnail: string;
}

export interface IPlaceOrder {
  price: number;
}
