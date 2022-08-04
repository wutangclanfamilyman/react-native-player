// play audio
export const play = async (_playbackObj, uri) => {
  try {
    return await _playbackObj.loadAsync({ uri: uri }, { shouldPlay: true });
  } catch (err) {
    console.log("Error inside play helper method", err.message);
  }
};

// pause audio

export const pause = async (_playbackObj) => {
  try {
    return await _playbackObj.setStatusAsync({ shouldPlay: false });
  } catch (err) {
    console.log("Error inside pause helper method", err.message);
  }
};

// resume audio

export const resume = async (_playbackObj) => {
  try {
    return await _playbackObj.playAsync();
  } catch (err) {
    console.log("Error inside pause helper method", err.message);
  }
};

// select another audio

export const playNext = async (playbackObj, uri) => {
  try {
    await playbackObj.stopAsync();

    await playbackObj.unloadAsync();

    return await play(playbackObj, uri);
  } catch (err) {
    console.log("Error inside playNext helper method", err.message);
  }
};
