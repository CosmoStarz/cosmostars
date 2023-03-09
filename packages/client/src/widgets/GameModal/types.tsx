export type GameModalType = {
  onStart: () => void;
  onResume: () => void;
};

export type GameModalProps = {
  title: string;
  startButton: string;
  canBeResumed?: boolean;
  rulesVisibility?: boolean;
  scoreVisibility?: boolean;
  clearScoreOnStart?: boolean;
  rightImg?: string;
  leftImg?: string;
};
