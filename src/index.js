import SoundManager, { IParams, IType, downloadFile } from "./SoundManager";

export const PLAY_SOUND_TYPE = "overlay" | "center" | "override";

export default class SoundApi {
  /**
     * 
     * @param {*} params 
     * @param {*} callback 
     *params: {
            background,
            url,
            onError = () => {},
            onMessage = () => {},
            onPercentChange = () => {},
            onDone = () => {}
     },
    */
  static downloadMediaFile(params, callback) {
    downloadFile(params, callback);
  }

  /**
   *
   * @param {IParams} params
   * @param {*} callback
   * 
   * type IParams = {
        url: String,
        loop: Boolean,
        type: "overlay" | "center" | "override",
        cache: Boolean,
        };
   */
  static play(params, callback) {
    SoundManager.getInstance().playSound(params, callback);
  }

  static pause() {
    SoundManager.getInstance().pauseCurrentSound();
  }

  static resume() {
    SoundManager.getInstance().playCurrentSound();
  }

  static stop() {
    SoundManager.getInstance().stopSound();
  }
}
