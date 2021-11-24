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

type CallbackType = (error: any) => void

declare class SoundManager {
    static play(params: IParams, callback:CallbackType): void

    static pause(): void

    static resume(): void

    static stop(): void

}

export = SoundManager;
