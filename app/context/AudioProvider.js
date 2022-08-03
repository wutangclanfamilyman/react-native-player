import { Alert, Text, View } from 'react-native'
import React, { Component, createContext } from 'react'
import * as MediaLibrary from 'expo-media-library';
import {DataProvider} from 'recyclerlistview'

export const AudioContext = createContext();

const AudioProvider = ({children}) => {

    const [audioFiles, setAudioFiles] = React.useState([]);
    const [permissionError, setPermissionError] = React.useState(false);
    const [dataProvider, setDataProvider] = React.useState(new DataProvider((r1,r2) => r1 !== r2));

    const [playbackObj, setPlaybackObj] = React.useState(null)
    const [soundObj, setSoundObj] = React.useState(null)
    const [currentAudio, setCurrentAudio] = React.useState({})

    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentAudioIndex, setCurrentAudioIndex] = React.useState(null) 
    const [totalCount, setTotalCount] = React.useState(0);

    const [playbackPosition, setPlaybackPosition] = React.useState(null);
    const [playbackDuration, setPlaybackDuration] = React.useState(null);

    const getAudioFiles = async () => {

        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio'
        })

        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media.totalCount
        })

        setAudioFiles(media.assets);
        setTotalCount(media.totalCount);
        setDataProvider(dataProvider.cloneWithRows([...audioFiles, ...media.assets]))

    }
    
    const getPermission = async () => {
        const permission = await MediaLibrary.getPermissionsAsync() // get permission
        
        if(permission.granted) { // if permission true
            getAudioFiles()
        }

        if(!permission.canAskAgain && !permission.granted) {
            setPermissionError(true)
        }

        if(!permission.granted && permission.canAskAgain) { // repeat get permisioon
            const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();
            if(status === 'denied' && canAskAgain) {
                // we are going to display alert that user must allow this permission to work this app
                permissionAlert();
            }

            if(status === 'granted') {
                getAudioFiles();
            }

            if(status === 'denied' && !canAskAgain) {
                // we want to display some error to the user
                setPermissionError(true);
            }
        }
    }

    React.useEffect(() => {

        getPermission();
        
    }, []);

    const permissionAlert = () => {
        Alert.alert("Permissoin Requeired", "This app needs to read audio files from your device", [{
            text: 'I am ready',
            onPress: () => getPermission()
        }, {
            text: 'cancel',
            onPress: () => permissionAlert()
        }])
    }

    if(permissionError) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{fontSize: 20, textAlign: 'center', color: 'red'}}>It looks like you haven't accept the permission</Text>
        </View>
    }

    return (
      <AudioContext.Provider value={{audioFiles: audioFiles, dataProvider: dataProvider, totalCount, isPlaying, playbackObj, currentAudio, soundObj, currentAudioIndex, playbackPosition, playbackDuration, setPlaybackDuration, setPlaybackPosition, setCurrentAudioIndex, setIsPlaying, setPlaybackObj, setSoundObj, setCurrentAudio}}>
        {children}
      </AudioContext.Provider>
    )
}

export default AudioProvider;