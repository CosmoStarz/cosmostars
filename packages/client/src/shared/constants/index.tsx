import SettingsIcon from "@mui/icons-material/Settings";
import EmailIcon from "@mui/icons-material/Email";
import StarIcon from "@mui/icons-material/Star";
import {
  basicSize,
  basicVelocity,
} from "@/entities/game/model/BaseObject/types";
import { elementCoords } from "@/entities/game/ui/Canvas/types";
import { GameModalProps, GameModalTypes } from "@/widgets/GameModal/types";
import { MenuLinkType } from "@/features/MenuLink/types";
import WinRight from "@/assets/images/win-modal-top-right.png";
import WinLeft from "@/assets/images/win-modal-bottom-left.png";
import LooseRight from "@/assets/images/loose-modal-top-right.png";
import LooseLeft from "@/assets/images/loose-modal-bottom-left.png";

export const baseUrl = `http://localhost:${__SERVER_PORT__}`; // TODO: заменить на нужный для апи нынешнего спринта, а далее - получать с бэка

export const baseSpeed = 10;

export const projectileRadius = 3;

export enum BaseGameColors {
  RED = "#ff0000",
  YELLOW = "#ffff00",
  BLACK = "#000000",
  BLUE = "#23A9F2",
  GREEN = "#3AD900",
  PURPLE = "#ba68c8",
}

export enum GameStatuses {
  NOT_ACTIVE = 0,
  ACTIVE = 1,
  START = 2,
  LOOSE = 3,
  WIN = 4,
  PAUSED = 5,
}

export const GameModalConfig: Record<GameModalTypes, GameModalProps> = {
  [GameStatuses.START]: {
    title: "Start",
    startButton: "Start",
    rulesVisibility: true,
  },
  [GameStatuses.LOOSE]: {
    title: "Looser!",
    startButton: "Try again",
    scoreVisibility: true,
    rightImg: LooseRight,
    leftImg: LooseLeft,
  },
  [GameStatuses.WIN]: {
    title: "Winner!",
    startButton: "Try again",
    scoreVisibility: true,
    rightImg: WinRight,
    leftImg: WinLeft,
  },
  [GameStatuses.PAUSED]: {
    title: "Pause",
    startButton: "Resume",
    scoreVisibility: true,
    canBeResumed: true,
    rulesVisibility: true,
  },
};

export enum GameModalImageAlign {
  RIGHT = 0,
  LEFT = 1,
}

export const GameModalImageProps = {
  [GameModalImageAlign.RIGHT]: {
    top: "-30%",
    right: "-15%",
  },
  [GameModalImageAlign.LEFT]: {
    bottom: "-30%",
    left: "-15%",
  },
};

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
  REGISTRATION = "/registration",
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

export const basicGridSpeed = 3;

export const randomInterval = 500;

export const framesPerShoot = 100;
export const maxColumns = 10;
export const minColumns = 5;
export const maxRows = 5;
export const minRows = 2;

export enum GameKeyboard {
  LEFT = 37,
  RIGHT = 39,
  SHOOT = 32,
  PAUSE = 27,
}
