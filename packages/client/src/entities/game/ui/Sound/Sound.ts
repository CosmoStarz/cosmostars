import Background from "@/assets/sounds/background.ogg";
import Explosion from "@/assets/sounds/explosion.wav";
import Gameover from "@/assets/sounds/gameover.wav";
import Shot from "@/assets/sounds/shot.wav";
import Win from "@/assets/sounds/win.wav";
import { BufferListType, GameSounds, Sounds } from "@/entities/game/ui/Sound/types";

import BufferLoader from "./BufferLoader";

export class Sound {
  private isMuted = false;
  private background: MediaElementAudioSourceNode;
  private source?: AudioBufferSourceNode;
  private readonly gainNode: GainNode;
  private readonly context: AudioContext;
  private bufferLoader: BufferLoader;
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
    this.context = new AudioContext();
    this.bufferLoader = new BufferLoader(
      this.context,
      Sound.gameSounds,
      this.finishedLoading.bind(this)
    );
    this.gainNode = this.context.createGain();
    this.gainNode.connect(this.context.destination);
    this.background = this.context.createMediaElementSource(
      new Audio(Sound.gameSounds.background)
    );
    this.background.connect(this.gainNode);
  }

  mute() {
    this.isMuted = true;
    this.context.suspend();
  }

  unmute() {
    this.isMuted = false;
    this.context.resume();
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
    this.background.mediaElement.play();
  }

  stopSound() {
    this.background.mediaElement.pause();
  }

  init() {
    this.bufferLoader.load();
    this.setVolume(Sound.defaultVolume);
    // this.unmute();
  }

  private setVolume(value: number) {
    this.gainNode.gain.setValueAtTime(value, this.context.currentTime);
  }

  private playSound(sound: keyof GameSounds) {
    if (this.isMuted) {
      return;
    }
    this.source = this.context.createBufferSource();
    this.source.buffer = this.bufferList[sound];
    this.source.connect(this.gainNode);
    this.source.start();
  }

  finishedLoading = (bufferedList: BufferListType) => {
    this.bufferList = { ...this.bufferList, ...bufferedList };
  };
}

const sound = new Sound();

export default sound;
