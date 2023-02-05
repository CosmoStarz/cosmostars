import SettingsIcon from "@mui/icons-material/Settings";
import EmailIcon from "@mui/icons-material/Email";
import StarIcon from "@mui/icons-material/Star";
import {
  basicSize,
  basicVelocity,
} from "../../entities/game/model/BaseObject/types";
import { elementCoords } from "../../entities/game/ui/Canvas/types";
import { MenuLinkType } from "../../features/MenuLink/types";

export const baseUrl = `http://localhost:${__SERVER_PORT__}`; // TODO: заменить на нужный для апи нынешнего спринта, а далее - получать с бэка

export const baseSpeed = 10;

export const projectileRadius = 3;

export enum ThemeNames {
  LIGHT = "light",
  DARK = "dark",
}

export enum RoutesName {
  MAIN = "/",
  PROFILE = "/profile",
  LEADERBOARD = "/leaderboard",
  FORUM = "/forum",
  GAME = "/game",
  LOGIN = "/login",
  REGISRTATION = "/registration",
  FORUM_DETAIL = "/forum/:id",
}

export const MenuItems: MenuLinkType[] = [
  {
    title: "Main", // TODO: придумать логотип и вставить сюда как иконку
    path: RoutesName.MAIN,
  },
  {
    title: "Profile",
    icon: <SettingsIcon fontSize="small" />,
    path: RoutesName.PROFILE,
  },
  {
    title: "Leaderboard",
    icon: <StarIcon fontSize="small" />,
    path: RoutesName.LEADERBOARD,
  },
  {
    title: "Forum",
    icon: <EmailIcon fontSize="small" />,
    path: RoutesName.FORUM,
  },
];

export const initialVelocity: basicVelocity = {
  dx: 0,
  dy: 0,
};

export const initialCoords: elementCoords = {
  x: 0,
  y: 0,
};

export const initialObjectSize: basicSize = {
  width: 45,
  height: 45,
};

export enum GameKeyboard {
  LEFT = 37,
  RIGHT = 39,
  SHOOT = 32,
  PAUSE = 27,
}
