import { BaseGameColors } from "@/shared/constants";

import { baseObjectProps } from "../BaseObject/types";

export type StarProps = {
  radius: number;
  color: BaseGameColors;
} & baseObjectProps;
