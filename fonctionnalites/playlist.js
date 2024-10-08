import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event, 
  State} from 'react-native-track-player';




import Controls from './controls.playlist';
import PlaylistItem from './playlistItem';




function Playlist() {
    const [queue, setQueue] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(0);
  
    async function loadPlaylist() {
      const queue = await TrackPlayer.getQueue();
      setQueue(queue);
    }
  
    useEffect(() => {
      loadPlaylist();
    }, []);
  
    useTrackPlayerEvents([Event.PlaybackTrackChanged], (event) => {
      if(event.state == State.nextTrack) {
        TrackPlayer.getCurrentTrack().then((index) => setCurrentTrack(index));
      }
    });
  
    async function handleShuffle() {
      let queue = await TrackPlayer.getQueue();
      await TrackPlayer.reset();
      queue.sort(() => Math.random() - 0.5);
      await TrackPlayer.add(queue);
    
      loadPlaylist()
    }
  
    return(
      <View>
        <View style={styles.playlist}>
          <FlatList
            data={queue}
            renderItem={({item, index}) => 
            <PlaylistItem
              index={index}
              title={item.title}
              isCurrent={currentTrack == index }/>
            }
          />
        </View>
        <Controls onShuffle={handleShuffle}/>
      </View>
    );
}




const styles = StyleSheet.create({
    playlist: {
        marginTop: 40,
        marginBottom: 40
      }
});

export default Playlist;