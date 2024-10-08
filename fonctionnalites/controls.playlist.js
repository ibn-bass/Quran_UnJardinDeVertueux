import React from 'react';
import {View} from 'react-native';
import TrackPlayer, {usePlaybackState, State} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';



function Controls({ onShuffle }) {
  const playerState = usePlaybackState();

  async function handlePlayPress() {
    if(await TrackPlayer.getState() == State.Playing) {
      TrackPlayer.pause();
    }
    else {
      TrackPlayer.play();
    }
  }

  return(
    <View style={{flexDirection: 'row',
      flexWrap: 'wrap', alignItems: 'center'}}>
        <Icon.Button
          name="arrow-left"
          size={20}
          style={{margin:5,padding:0}}
          onPress={() => TrackPlayer.skipToPrevious()}/>
        <Icon.Button
          name={playerState == State.Playing ? 'pause' : 'play'}
          size={20}
          style={{margin:5,padding:0}}
          onPress={handlePlayPress}/>
        <Icon.Button
          name="arrow-right"
          size={20}
          style={{margin:5,padding:0}}
          onPress={() => TrackPlayer.skipToNext()}/>
    </View>
  );
}


export default Controls;
