// Type definitions for react-native-sound
// Project: https://github.com/zmxv/react-native-sound
// Definitions by: Kyle Roach <https://github.com/iRoachie>
// TypeScript Version: 2.3.2

type PlaySoundType = "overlay" | "center" | "override"

type IParams = {
  url: String,
  loop: Boolean,
  type: PlaySoundType,
  cache: Boolean,
};

type FileParams =  {
  background: Boolean,
  url: String,
  onError: void,
  onMessage: void,
  onPercentChange: void,
  onDone: void
}

type CallbackType = (value: any) => void

declare class SoundManager {

    static downloadMediaFile(params: FileParams, callback: CallbackType): void

    static play(params: IParams, callback:CallbackType): void

    static pause(): void

    static resume(): void

    static stop(): void

    static disable(): void
    
    static enable(): void

}

export = SoundManager;
