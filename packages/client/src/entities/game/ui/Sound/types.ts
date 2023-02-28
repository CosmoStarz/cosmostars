export type GameSounds = {
  background: string;
  explosion: string;
  gameover: string;
  win: string;
  shot: string;
};
export type BufferListType = Record<keyof GameSounds, AudioBuffer | null>;
