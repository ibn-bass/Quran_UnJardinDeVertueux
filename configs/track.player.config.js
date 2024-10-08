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
    await TrackPlayer.remove([trackIndex1, trackIndex2]);
  }
}

export async function addTrack() {
  await TrackPlayer.add([
    {
      id: '1',
      url: 'https://everyayah.com/data/AbdulSamad_64kbps_QuranExplorer.Com/001001.mp3',
      artwork: require('../assets/images/image.jpg'),
      title: 'Al-Faatiha 1',
      artist: 'Abdul Basit Abdul Samad',
      duration: 6,
    },
    {
        id: '2',
        url: 'https://everyayah.com/data/AbdulSamad_64kbps_QuranExplorer.Com/001002.mp3',
        artwork: require('../assets/images/image.jpg'),
        title: 'Al-Faatiha 2',
        artist: 'Abdul Basit Abdul Samad',
        duration: 7,
    },
    {
        id: '3',
        url: 'https://everyayah.com/data/AbdulSamad_64kbps_QuranExplorer.Com/001003.mp3',
        artwork: require('../assets/images/image.jpg'),
        title: 'Al-Faatiha 3',
        artist: 'Abdul Basit Abdul Samad',
        duration: 6,
    }
  ]);
}