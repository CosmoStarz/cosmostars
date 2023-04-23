import EmailIcon from "@mui/icons-material/Email";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";
import { PaletteColorOptions } from "@mui/material";
import { purple } from "@mui/material/colors";

import LooseLeft from "@/assets/images/loose-modal-bottom-left.png";
import LooseRight from "@/assets/images/loose-modal-top-right.png";
import WinLeft from "@/assets/images/win-modal-bottom-left.png";
import WinRight from "@/assets/images/win-modal-top-right.png";
import {
  basicSize,
  basicVelocity,
} from "@/entities/game/model/BaseObject/types";
import { elementCoords } from "@/entities/game/ui/Canvas/types";
import { MenuLinkType } from "@/features/MenuLink/types";
import { GameModalProps } from "@/widgets/GameModal/types";

export const SERVER_URL = `http://${__SERVER_HOST__}:${__SERVER_PORT__}`;

export const NOT_FOUND_STATUS = 404;

export const BasePerPage = [3, 5, 10];

export const baseSpeed = 10;

export enum ProjectileSizes {
  WIDTH = 5,
  HEIGHT = 20,
}

export enum GameStatuses {
  NOT_ACTIVE = 0,
  ACTIVE = 1,
  START = 2,
  LOOSE = 3,
  WIN = 4,
  PAUSED = 5,
  UPDATING = 6,
}

export enum BaseGameColors {
  RED = "#ff0000",
  YELLOW = "#ffff00",
  BLACK = "#000000",
  BLUE = "#23A9F2",
  GREEN = "#3AD900",
  PURPLE = "#ba68c8",
  WHITE = "#ffffff",
}

export const maxStarsCount = 100;

export const StarVelocity: basicVelocity = {
  dx: 0,
  dy: 1,
};

export enum StarRadius {
  MIN = 1,
  MAX = 3,
}

export const canvasTextWidth = 50;
export const canvasTextFont = "bold 32px Arial";

export const EnemyPoints = {
  BASIC: 100,
} as const;

export const GameModalConfig: Record<GameStatuses, GameModalProps | null> = {
  [GameStatuses.NOT_ACTIVE]: null,
  [GameStatuses.ACTIVE]: null,
  [GameStatuses.START]: {
    title: "Start",
    startButton: "Start",
    rulesVisibility: true,
    clearScoreOnStart: true,
  },
  [GameStatuses.LOOSE]: {
    title: "Looser!",
    startButton: "Try again",
    scoreVisibility: true,
    rightImg: LooseRight,
    leftImg: LooseLeft,
    clearScoreOnStart: true,
  },
  [GameStatuses.WIN]: {
    title: "Winner!",
    startButton: "Try again",
    scoreVisibility: true,
    rightImg: WinRight,
    leftImg: WinLeft,
    clearScoreOnStart: true,
  },
  [GameStatuses.PAUSED]: {
    title: "Pause",
    startButton: "Resume",
    scoreVisibility: true,
    canBeResumed: true,
    rulesVisibility: true,
  },
  [GameStatuses.UPDATING]: {
    title: "Game was paused!",
    startButton: "Resume",
    scoreVisibility: true,
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

export enum ThemeColors {
  WHITE = "#ffffff",
  BLACK = "#000000",
  WHITE_GRADIENT = "linear-gradient(180deg, rgba(255, 255, 255, 0.6175) 0%, rgba(255, 255, 255, 0.6175) 100%)",
  BLACK_GRADIENT = "linear-gradient(152.97deg, rgba(0, 0, 0, 0.4655) 15.24%, rgba(0, 0, 0, 0.95) 115.24%)",
}

export const ThemeConfig = {
  [ThemeNames.LIGHT]: {
    background: ThemeColors.WHITE,
    text: ThemeColors.BLACK,
    paper: ThemeColors.WHITE_GRADIENT,
  },
  [ThemeNames.DARK]: {
    background: ThemeColors.BLACK,
    text: ThemeColors.WHITE,
    paper: ThemeColors.BLACK_GRADIENT,
  },
};

export const ThemePrimaryButton: PaletteColorOptions = {
  light: purple[300],
  main: purple[500],
  dark: purple[700],
  contrastText: ThemeColors.WHITE,
};

export enum ThemeBorderRadius {
  MIN = "4px",
  PAPER = "12px",
  BUTTON = "32px",
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
  NOT_FOUND = "/not-found",
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
  width: 50,
  height: 50,
};

export const basicGridSpeed = 3;

export const randomInterval = 500;

export const framesPerShoot = 100;

export enum EnemyGridSizes {
  MAX_COLUMNS = 10,
  MIN_COLUMNS = 5,
  MAX_ROWS = 5,
  MIN_ROWS = 2,
}

export enum GameKeyboard {
  LEFT = 37,
  RIGHT = 39,
  SHOOT = 32,
  PAUSE = 27,
  FULLSCREN = 70,
}
