
# React Native Sound Manager
[![npm version](https://badge.fury.io/js/react-native-sound-manager.svg)](https://badge.fury.io/js/react-native-sound-manager) ![](https://img.shields.io/github/issues/minhchienwikipedia/react-native-sound-manager.svg) ![](https://img.shields.io/github/forks/minhchienwikipedia/react-native-sound-manager.svg) ![](https://img.shields.io/github/stars/minhchienwikipedia/react-native-sound-manager.svg) ![](https://img.shields.io/github/license/minhchienwikipedia/react-native-sound-manager.svg)
#### This package help you easy to control audio with support cache url! 

---
This package requires these, please make sure you had installed them:
- [react-native-sound](https://github.com/zmxv/react-native-sound)
- [react-native-fs](https://github.com/itinance/react-native-fs)


## Getting started

`$ npm install react-native-sound-manager --save`

- OR

`$ yarn add react-native-sound-manager`

- All in one

`$ npm install react-native-sound-manager react-native-sound react-native-fs --save`

## Usage
```javascript
import SoundManager from 'react-native-sound-manager';

// Pre-download url - should call download before you want to play
/*
params: {
	background, // Boolean - Download in background || Default is `true`
	url,
	onError = () => {},
	onMessage = () => {},
	onPercentChange = () => {},
	onDone = () => {}
}
*/
SoundManager.downloadMediaFile(params)

/*
type IParams = {
	url: String,
	loop: Boolean,
	type: "overlay" | "center" | "override",
	cache: Boolean, // enable this will be download and re-use that file || Default is true
};
*/
/*
 When you want to play another audio, just call `play` function again and pass `type` : "overlay" | "center" | "override"
 Example we have a audio A playing, you want to play audio B
overlay: A and B playing together
center: It will be pause A -> play B until B done -> continue A
override: Stop A -> play B
*/
SoundManager.play({
	url: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
	loop: false,
	type: PLAY_SOUND_TYPE.OVERLAY,
	cache: true,
})



SoundManager.pause()

SoundManager.resume()

SoundManager.stop()

SoundManager.disable()

SoundManager.enable()

```




## License

This module is [MIT licensed](./LICENSE)

---
  
