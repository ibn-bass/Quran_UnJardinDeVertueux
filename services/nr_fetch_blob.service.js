import { PermissionsAndroid } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import * as RNFS from '@dr.pogodin/react-native-fs';



export default class RNFetchBlobService {

    constructor (){}

    async requestToPermissions ()  {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: '',
              message:
                'App needs access to your Files... ',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('PermissionsAndroid granted');
            return true
            
          } else {
            return false;
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      };
    
    
    async startDownload (url,name) {
        let path ='';

        let permissions = await this.requestToPermissions ()
        if(permissions){

          console.log('startDownload')
          try {
            await RNFetchBlob.config({
              fileCache: true,
              appendExt: 'mp3',
              addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                title: name,
                path: RNFS.ExternalDirectoryPath+ `/${name}`, // Android platform
                description: 'Downloading the file',
              },
            }).fetch('GET', url)
              .then(res => {
                console.log('res', res);
                console.log('The file is save to ', res.path());
                path = res.path();
            });
          } catch (err){
            console.log(err)
          }
        } else {
          console.log("Permission non accordées !")
        }
        

        return path;
      };

}
  
