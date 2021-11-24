import SoundManager, { IParams, IType, downloadFile } from "./SoundManager";

export const PLAY_SOUND_TYPE = "overlay" | "center" | "override";

const SoundApi = {
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
  downloadMediaFile(params, callback) {
    downloadFile(params, callback);
  },

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
  play(params, callback) {
    SoundManager.getInstance().playSound(params, callback);
  },

  pause() {
    SoundManager.getInstance().pauseCurrentSound();
  },

  resume() {
    SoundManager.getInstance().playCurrentSound();
  },

  stop() {
    SoundManager.getInstance().stopSound();
  },
};

export default SoundApi;
