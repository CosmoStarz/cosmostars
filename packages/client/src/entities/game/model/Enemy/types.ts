import { GameObjectColor } from "../../controller/types";
import { baseObjectProps } from "../BaseObject/types";

export type enemyProps = {
  color: GameObjectColor;
} & baseObjectProps;
