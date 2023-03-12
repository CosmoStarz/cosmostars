import { baseObjectProps } from "../BaseObject/types";

export type shootingObjectProps = {
  projectileSpeed: number;
  projectileImage: string;
} & baseObjectProps;
