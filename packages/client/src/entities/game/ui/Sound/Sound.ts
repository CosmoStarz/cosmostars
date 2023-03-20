import Background from "@/assets/sounds/background.ogg";
import Explosion from "@/assets/sounds/explosion.wav";
import Gameover from "@/assets/sounds/gameover.wav";
import Shot from "@/assets/sounds/shot.wav";
import Win from "@/assets/sounds/win.wav";
import {
  BufferListType,
  GameSounds,
  Sounds,
} from "@/entities/game/ui/Sound/types";

import BufferLoader from "./BufferLoader";

export class Sound {
  private isMuted = false;
  private background: MediaElementAudioSourceNode | undefined;
  private source?: AudioBufferSourceNode;
  private readonly gainNode: GainNode | undefined;
  private readonly context: AudioContext | undefined;
  private bufferLoader: BufferLoader | undefined;
  private bufferList: BufferListType = {
    background: null,
    gameover: null,
    shot: null,
    explosion: null,
    win: null,
  };
  private static defaultVolume = 0.1;
  private static gameSounds: GameSounds = {
    background: Background,
    explosion: Explosion,
    gameover: Gameover,
    win: Win,
    shot: Shot,
  };

  constructor() {
    this.context = typeof window !== "undefined" ? new AudioContext() : undefined;
    this.bufferLoader = this.context ? new BufferLoader(
      this.context,
      Sound.gameSounds,
      this.finishedLoading.bind(this)
    ) : undefined;
    this.gainNode = this.context ? this.context.createGain() : undefined;
    if (this.gainNode && this.context) {
      this.gainNode.connect(this.context.destination);
    }
    this.background = this.context ? this.context.createMediaElementSource(
      new Audio(Sound.gameSounds.background)
    ) : undefined;
    if (this.background && this.gainNode) {
      this.background.connect(this.gainNode);
    }
  }

  mute() {
    this.isMuted = true;
    this.context?.suspend();
  }

  unmute() {
    this.isMuted = false;
    this.context?.resume();
  }

  playShot() {
    this.playSound(Sounds.SHOT);
  }

  playExplosion() {
    this.playSound(Sounds.EXPLOSION);
  }

  playGameover() {
    this.playSound(Sounds.GAMEOVER);
  }

  playWin() {
    this.playSound(Sounds.WIN);
  }

  startSound() {
    if (this.background) {
      this.background.mediaElement.play();
    }
  }

  stopSound() {
    if (this.background) {
      this.background.mediaElement.pause();
    }
  }

  init() {
    if (this.bufferLoader) {
      this.bufferLoader.load();
      this.setVolume(Sound.defaultVolume);
    }
  }

  private setVolume(value: number) {
    if (this.context && this.gainNode) {
      this.gainNode.gain.setValueAtTime(value, this.context.currentTime);
    }
  }

  private playSound(sound: keyof GameSounds) {
    if (this.isMuted) {
      return;
    }
    this.source = this.context?.createBufferSource();
    if (this.source && this.gainNode) {
      this.source.buffer = this.bufferList[sound];
      this.source.connect(this.gainNode);
      this.source.start();
    }
  }

  finishedLoading = (bufferedList: BufferListType) => {
    this.bufferList = { ...this.bufferList, ...bufferedList };
  };
}

const sound = new Sound();

export default sound;
