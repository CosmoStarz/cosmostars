import { ThemeNames } from "@/shared/constants";

export type ThemeData = {
  id: number;
  user_id: number;
  theme: ThemeNames;
};

export type ThemeCreationData = {
  id: number;
  theme: ThemeNames;
};
