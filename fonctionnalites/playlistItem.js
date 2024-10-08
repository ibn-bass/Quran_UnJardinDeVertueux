import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';



function PlaylistItem({index, title, isCurrent}) {

    function handleItemPress() {
      TrackPlayer.skip(index);
    }

    return (
      <TouchableOpacity onPress={handleItemPress}>
        <Text
          style={{...styles.playlistItem,
            ...{backgroundColor: isCurrent ? '#666' : '#fff'}}}>
        {title}
        </Text>
      </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    
    playlistItem: {
      fontSize: 16,
      paddingTop: 4,
      paddingBottom: 4,
      paddingLeft: 8,
      paddingRight: 8,
      borderRadius: 4
    }
});

export default PlaylistItem;