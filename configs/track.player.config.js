import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    RepeatMode,
} from 'react-native-track-player';
  
export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  }
  catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  }
  finally {
    return isSetup;
  }
}

export async function removeTracksList() {
  const tracks = await TrackPlayer.getQueue();
  if(tracks && tracks.length  > 0) {
    await TrackPlayer.remove([tracks]);
  }
}

export async function addTrack() {

      // audios  = [ 
    //   "/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001001.mp3", 
    //   "/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001002.mp3", 
    //   "/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001003.mp3", 
    //   "/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001004.mp3", 
    //   "/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001005.mp3", 
    //   "/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001006.mp3", 
    //   "/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001007.mp3"
    // ]

  await TrackPlayer.add([
    {
      id: '1',
      url: '/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001001.mp3',
      artwork: require('../assets/images/image.jpg'),
      title: 'Al-Faatiha 1',
      artist: 'Abdul Basit Abdul Samad',
      duration: 6,
    },
    {
        id: '2',
        url: '/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001002.mp3',
        artwork: require('../assets/images/image.jpg'),
        title: 'Al-Faatiha 2',
        artist: 'Abdul Basit Abdul Samad',
        duration: 7,
    },
    {
        id: '3',
        url: '/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001003.mp3',
        artwork: require('../assets/images/image.jpg'),
        title: 'Al-Faatiha 3',
        artist: 'Abdul Basit Abdul Samad',
        duration: 6,
    }
    ,
    {
        id: '3',
        url: '/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001004.mp3',
        artwork: require('../assets/images/image.jpg'),
        title: 'Al-Faatiha 4',
        artist: 'Abdul Basit Abdul Samad',
        duration: 6,
    }
    ,
    {
        id: '3',
        url: '/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001005.mp3',
        artwork: require('../assets/images/image.jpg'),
        title: 'Al-Faatiha 5',
        artist: 'Abdul Basit Abdul Samad',
        duration: 6,
    }
    ,
    {
        id: '3',
        url: '/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001006.mp3',
        artwork: require('../assets/images/image.jpg'),
        title: 'Al-Faatiha 6',
        artist: 'Abdul Basit Abdul Samad',
        duration: 6,
    }
    ,
    {
        id: '3',
        url: '/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001007.mp3',
        artwork: require('../assets/images/image.jpg'),
        title: 'Al-Faatiha 7',
        artist: 'Abdul Basit Abdul Samad',
        duration: 6,
    }
  ]);
}