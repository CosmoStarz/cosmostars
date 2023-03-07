import { BufferListType, GameSounds } from "@/entities/game/ui/Sound/types";
import { HTTPMethods } from "@/shared/api/types";

class BufferLoader {
  private context: AudioContext;
  private readonly urlList: GameSounds;
  private bufferList: BufferListType = {
    background: null,
    gameover: null,
    shot: null,
    explosion: null,
    win: null,
  };
  private readonly onload: (buffer: BufferListType) => void;

  constructor(
    context: AudioContext,
    urlList: GameSounds,
    callback: (buffer: BufferListType) => void
  ) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
  }

  loadBuffer(url: string, index: keyof GameSounds) {
    const request = new XMLHttpRequest();
    request.open(HTTPMethods.GET, url, true);
    request.responseType = "arraybuffer";

    request.onload = () => {
      this.context.decodeAudioData(
        request.response,
        buffer => {
          if (!buffer) {
            console.error(`error decoding file ${url}`);
            return;
          }
          this.bufferList[index] = buffer;
          if (Object.values(this.bufferList).every(x => x !== null)) {
            this.onload(this.bufferList);
          }
        },
        error => {
          console.error(`decodeAudioData error, ${error}`);
        }
      );
    };
    request.onerror = () => {
      console.log(`BufferLoader: XHR error`);
    };

    request.send();
  }

  load() {
    let key: keyof GameSounds;
    for (key in this.urlList) {
      this.loadBuffer(this.urlList[key], key);
    }
  }
}

export default BufferLoader;
