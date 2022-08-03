import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { Audio } from 'expo-av';
import {AudioContext} from '../context/AudioProvider'
// import {RecyclerListView, LayoutProvider} from 'recyclerlistview'
import AudioListItem from '../components/AudioListItem'
import Screen from '../components/Screen'
import OptionModal from '../components/OptionModal'
import {pause, play, playNext, resume} from '../misc/audioController';

const AudioList = () => {

  const {audioFiles, dataProvider, soundObj, playbackObj, currentAudio, setCurrentAudio, setIsPlaying, setPlaybackObj, setSoundObj, isPlaying, currentAudioIndex, setCurrentAudioIndex} = React.useContext(AudioContext);

  const [optionModalVisible, setOptionModalVisible] = React.useState(false);
  const [currentSong, setCurrentSong] = React.useState({});

  const onAddToPlaylist = () => {
    console.log('Add to playlist');
  }

  const onPlay = () => {
    console.log('Play');
  }

  const onOptionPress = (item) => {
    setCurrentSong(item)
    setOptionModalVisible(true)
  }

  const handleAudioPress = async (audio) => {

    // playing audio for the first time
    if(soundObj === null) {
      setIsPlaying(true);
      const index = audioFiles.indexOf(audio);
      setCurrentAudioIndex(index)
      setCurrentAudio(audio);
      const _playbackObj = new Audio.Sound()
      const status = await play(_playbackObj, audio.uri);
      
      setPlaybackObj(_playbackObj);
      setSoundObj(status)
      
      return;
    }

    // pause audio
    if(soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === audio.id) {
      setIsPlaying(false);
      const status = await pause(playbackObj);
      return setSoundObj(status);
    }

    // resume audio
    if(soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id === audio.id) {
      setIsPlaying(true);
      const status = await resume(playbackObj);
      return setSoundObj(status);
    }

    // select another audio
    if(soundObj.isLoaded && currentAudio.id !== audio.id) {
      const index = audioFiles.indexOf(audio);
      setCurrentAudioIndex(index)
      setIsPlaying(true);
      setCurrentAudio(audio)
      const status = await playNext(playbackObj, audio.uri)
      return setSoundObj(status);
    }
   }

  const rowRenderer = (type, item, index, _isPlaying) => {
    return <AudioListItem isPlaying={_isPlaying} activeListItem={currentAudioIndex === index} key={item.id + item.title} title={item.filename} duration={item.duration} onAudioPress={() => handleAudioPress(item)} onOptionPress={() => onOptionPress(item)} />
  }

  if(dataProvider && !audioFiles.length) {
    return <View><Text>Loading</Text></View>
  }

  return (
    <Screen>
      <ScrollView>
        {
          audioFiles.length && audioFiles.map((item, index) => rowRenderer(null, item, index, isPlaying))
        }
        <OptionModal onPlayPress={() => onPlay()} onAddPlaylistPress={() => onAddToPlaylist()} currentSong={currentSong} visible={optionModalVisible} onClose={() => setOptionModalVisible(false)} />
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }   
})

export default AudioList;