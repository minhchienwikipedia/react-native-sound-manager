import RNFS from "react-native-fs";
import { Platform } from "react-native";
import Sound from "react-native-sound";

let jobId = -1;
const prefixPath = Platform.OS === "android" ? "" : "file://";
export const downloadFile = async (
  {
    background,
    url,
    onError = () => {},
    onMessage = () => {},
    onPercentChange = () => {},
    onDone = () => {},
  },
  callback
) => {
  const downloadDest = `${RNFS.TemporaryDirectoryPath}${url.slice(
    url.lastIndexOf("/")
  )}`;
  if (await RNFS.exists(downloadDest)) {
    const path = prefixPath + downloadDest;

    callback(path);
    return;
  } else {
    callback(url);
  }

  if (jobId !== -1) {
    onMessage("A download is already in progress");
  }

  const progress = (data) => {
    const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
    onPercentChange(percentage);
  };

  const begin = (res) => {
    onMessage("Download has begun");
  };

  const progressDivider = 1;

  const ret = RNFS.downloadFile({
    fromUrl: url,
    toFile: downloadDest,
    begin,
    progress,
    background,
    progressDivider,
  });

  jobId = ret.jobId;

  ret.promise
    .then((res) => {
      const path = prefixPath + downloadDest;
      onDone(path);
      jobId = -1;
    })
    .catch((err) => {
      onError(err);
      jobId = -1;
    });
};

export type IType = "overlay" | "center" | "override";

export type IParams = {
  url: String,
  loop: Boolean,
  type: IType,
  cache: Boolean,
};

export default class SoundManager {
  static INSTANCE = null;

  static getInstance() {
    if (!SoundManager.INSTANCE) {
      Sound.setCategory("Playback");
      SoundManager.INSTANCE = new SoundManager();
    }
    return SoundManager.INSTANCE;
  }

  static current = null;

  static getUrlFromCache(url, cache) {
    return new Promise((resolve, reject) => {
      if (!cache) {
        resolve(url);
        return;
      }
      downloadFile({ url, background: true }, (path) => {
        resolve(path);
      });
    });
  }

  async playSound(
    { url, loop = false, type = "", cache }: IParams,
    callback = () => {}
  ) {
    if (!url) {
      return;
    }

    if (
      parseInt(Platform.Version, 10) >=
      Platform.select({ ios: 10, android: 23 })
    ) {
      if (type === "overlay") {
        this.createNewSound({
          url,
          cache,
        });
        return;
      }
      if (type === "center") {
        SoundManager.current?.pause?.();
        this.createNewSound(
          {
            url,
            cache,
          },
          () => {
            SoundManager.current?.play?.();
          }
        );
        return;
      }
      // default type === 'override'
      if (SoundManager.current?.isPlaying?.()) {
        SoundManager.current.stop();
      }
      const path = await SoundManager.getUrlFromCache(url, cache);
      SoundManager.current = new Sound(path, "", (error) => {
        if (!error && SoundManager.current) {
          if (loop) {
            SoundManager.current.setNumberOfLoops(-1);
          }
          SoundManager.current.play(() => {
            SoundManager.current.release();
            callback();
          });
        }
      });
    }
  }

  async createNewSound({ url, cache }, callback) {
    const path = await SoundManager.getUrlFromCache(url, cache);

    const newSound = new Sound(path, "", (error) => {
      if (!error) {
        newSound.play(() => {
          newSound.release?.();
          callback?.();
        });
      }
    });
  }

  pauseCurrentSound() {
    SoundManager.current?.pause?.();
  }

  playCurrentSound() {
    SoundManager.current?.play?.();
  }

  stopSound() {
    if (SoundManager.current) {
      SoundManager.current.stop?.();
      SoundManager.current.release?.();
    }
  }
}
