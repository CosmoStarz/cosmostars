import { FC } from "react";

export type GenericListType<T> = {
  items: T[];
  renderItem: FC<any>;
  width?: number;
};
