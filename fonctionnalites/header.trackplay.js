import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event, 
  State} from 'react-native-track-player';



function Header() {
  const [info, setInfo] = useState({});
  useEffect(() => {
    setTrackInfo();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], (event) => {
    if(event.state == State.nextTrack) {
      setTrackInfo();
    }
  });

  async function setTrackInfo() {
    const track = await TrackPlayer.getCurrentTrack();
    const info = await TrackPlayer.getTrack(track);
    setInfo(info);
  }

  return(
    <View>
        <Text style={styles.songTitle}>{info.title}</Text>
        <Text style={styles.artistName}>{info.artist}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
    songTitle: {
    fontSize: 32,
    marginTop: 50,
    color: '#CA92EE'
    },
    artistName: {
    fontSize: 24,
    color: '#000'
    }
});

export default Header;
