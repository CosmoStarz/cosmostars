import { GameObjectColor } from "../../controller/types";
import { baseObjectProps } from "../BaseObject/types";

export type playerProps = {
  color: GameObjectColor;
} & baseObjectProps;
