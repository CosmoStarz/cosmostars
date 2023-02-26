import Background from "@/assets/sounds/background.ogg";
import Explosion from "@/assets/sounds/explosion.wav";
import Gameover from "@/assets/sounds/gameover.wav";
import Shot from "@/assets/sounds/shot.wav";
import Win from "@/assets/sounds/win.wav";

import BufferLoader from "./BufferLoader";

export type GameSounds = {
  background: string;
  explosion: string;
  gameover: string;
  win: string;
  shot: string;
};
export class Sound {
  public game?: AudioBufferSourceNode;
  public source?: AudioBufferSourceNode;
  public gainNodeGame?: GainNode;
  public gainNodeSource?: GainNode;
  public context: AudioContext;
  public bufferLoader: BufferLoader;
  public bufferList: Record<keyof GameSounds, AudioBuffer | null> = {
    background: null,
    gameover: null,
    shot: null,
    explosion: null,
    win: null,
  };
  public sounds: string[] = [];
  public isSound = true;
  private static defaultVolume = 0.3;
  private static gameSounds: GameSounds = {
    background: Background,
    explosion: Explosion,
    gameover: Gameover,
    win: Win,
    shot: Shot,
  };

  constructor() {
    const musicNames = Object.values(Sound.gameSounds);
    this.sounds = [...musicNames];
    window.AudioContext;
    this.context = new AudioContext();
    this.bufferLoader = new BufferLoader(
      this.context,
      Sound.gameSounds,
      this.finishedLoading.bind(this)
    );
  }

  updateVolumeValue(value: number) {
    this.gainNodeSource!.gain.setValueAtTime(value, this.context.currentTime);
    this.gainNodeGame!.gain.setValueAtTime(value, this.context.currentTime);
  }

  playShot() {
    this.playSound("shot");
  }

  playExplosion() {
    this.playSound("explosion");
  }

  playGameover() {
    this.playSound("gameover");
  }

  playWin() {
    this.playSound("win");
  }

  playSound(sound: keyof GameSounds) {
    this.source = this.context.createBufferSource();
    this.gainNodeSource = this.context.createGain();
    this.source.buffer = this.bufferList[sound];
    this.source.connect(this.gainNodeSource);
    this.gainNodeSource.connect(this.context.destination);
    if (!this.isSound) {
      this.gainNodeSource.gain.setValueAtTime(0, this.context.currentTime);
    } else {
      this.gainNodeSource.gain.setValueAtTime(
        Sound.defaultVolume,
        this.context.currentTime
      );
    }
    this.source.start();
  }

  createAudio() {
    const backgroundBuffer = this.bufferList.background;
    this.game = this.context.createBufferSource();
    this.gainNodeGame = this.context.createGain();
    this.game.buffer = backgroundBuffer;
    this.game.loop = true;
    this.game.connect(this.gainNodeGame);
    this.gainNodeGame.connect(this.context.destination);
    if (!this.isSound) {
      this.gainNodeGame.gain.setValueAtTime(0, this.context.currentTime + 3.0);
    } else {
      this.gainNodeGame.gain.exponentialRampToValueAtTime(
        Sound.defaultVolume,
        this.context.currentTime + 3.0
      );
    }
  }

  finishedLoading = (bufferedList: Record<keyof GameSounds, AudioBuffer>) => {
    this.bufferList = { ...this.bufferList, ...bufferedList };
    this.createAudio();
  };

  startGameSound() {
    // this.playSound("background");
    this.game?.start();
  }
  stopGameSound() {
    this.game?.stop();
  }

  init() {
    console.log("init sound");
    this.bufferLoader.load();
  }
}

const sound = new Sound();

export default sound;
