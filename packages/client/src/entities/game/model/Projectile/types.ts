import { GameObjectColor } from "../../controller/types";
import { baseObjectProps } from "../BaseObject/types";

export type projectileProps = {
  color: GameObjectColor;
} & baseObjectProps;
