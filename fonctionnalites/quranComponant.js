import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { setupPlayer, addTrack ,removeTracksList} from '../configs/track.player.config';
import Playlist from './playlist';
import TrackProgress from './header.trackplay';
import Header from './trackProgress';
import { connect } from 'react-redux'
import SqliteService from '../services/sqlite.service'
import NetworkingRequestsService from '../services/networking.requests.service'
import ConfigLoaderComponent from './configLoaderComponent'
import TrackSettingComponent from './trackSettingComponent'
import TrackPlayer, {usePlaybackState, State} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFEE'
  }
});

class QuranComponant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      play: false,
      modalVisible:false
    }

  }


  async handlePlayPress() {
    if(await TrackPlayer.getState() == State.Playing) {
      TrackPlayer.pause();
    }
    else {
      TrackPlayer.play();
    }
  }

  

  async componentDidMount() {
    await this.showConfigLoad()

    await this.setupDB()

    // this.props {"dispatch": [Function dispatch], 
    //               "isConfigDb": false, "isErrConfig": true, "isInitDb": true, "isOkConfig": false, "messageConfig": "Impossible de congigurer la base de données", "textConfig": ""}
    // let audiosUrs = [
    //   {
    //     url:'https://everyayah.com/data/AbdulSamad_64kbps_QuranExplorer.Com/001001.mp3',
    //     name:"001001.mp3"
    //   },
    //   {
    //     url:'https://everyayah.com/data/AbdulSamad_64kbps_QuranExplorer.Com/001002.mp3',
    //     name:"001002.mp3"
    //   },
    //   {
    //     url:'https://everyayah.com/data/AbdulSamad_64kbps_QuranExplorer.Com/001003.mp3',
    //     name:"001003.mp3"
    //   },
    //   {
    //     url:'https://everyayah.com/data/AbdulSamad_64kbps_QuranExplorer.Com/001004.mp3',
    //     name:"001004.mp3"
    //   },
    //   {
    //     url:'https://everyayah.com/data/AbdulSamad_64kbps_QuranExplorer.Com/001005.mp3',
    //     name:"001005.mp3"
    //   },
    //   {
    //     url:'https://everyayah.com/data/AbdulSamad_64kbps_QuranExplorer.Com/001006.mp3',
    //     name:"001006.mp3"
    //   },
    //   {
    //     url:'https://everyayah.com/data/AbdulSamad_64kbps_QuranExplorer.Com/001007.mp3',
    //     name:"001007.mp3"
    //   }

    // ];

    // console.log("audiosUrs",audiosUrs)
    // let nrs = new NetworkingRequestsService();
    // console.log(nrs)
    // let audios  = await nrs.getAyatsAudio(audiosUrs);
    // console.log("audios", audios);

    // audios  = [ 
    //   "/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001001.mp3", 
    //   "/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001002.mp3", 
    //   "/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001003.mp3", 
    //   "/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001004.mp3", 
    //   "/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001005.mp3", 
    //   "/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001006.mp3", 
    //   "/storage/emulated/0/Android/data/com.unjardindevertueux2/files/001007.mp3"
    // ]

    let isConfigDB =  this.getValueOnObjet(this.props,'isConfigDB');
    
    await this.setupLecteur();
    
  
    if(!this.props.isErrConfig){
      await this.hideConfigLoad()
    }

  }

  getValueOnObjet(object,cle){
    let val = undefined;
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        if(key.trim().toLowerCase() === cle.trim().toLowerCase()){
          val = object[key]
          console.log("val",val)
          return val;
        }
      }
    }
    console.log("val",val)
    return val;
  }

  isConfigDb


 isConfigDB

  async showConfigLoad(){
    await this.props.dispatch({ type: "UPDATE_STATUS_CONFIG_LOADER", value: {isOkConfig:false,isErrConfig:false}})
    await this.props.dispatch({ type: "UPDATE_MSG_CONFIG_LOAD", value: {message:'1- Configuration en cours ...',text:''}})
  }

  async hideConfigLoad(){
    await this.props.dispatch({ type: "UPDATE_STATUS_CONFIG_LOADER", value: {isOkConfig:true,isErrConfig:false}})
    await this.props.dispatch({ type: "UPDATE_MSG_CONFIG_LOAD", value: {message:'Configuration en cours ...',text:''}})
  }

  async setupDB(){
      console.log(this.props.message)
      let sqliteService = new SqliteService();
      sqliteService.setEmptyDB();
      try{
        let isInitDb  = await sqliteService.isInitDb();

        if(!this.props.isInitDb || !isInitDb){
          await this.props.dispatch({ type: "UPDATE_MSG_CONFIG_LOAD", value: {message:'Initialisation de la base de données ...'}})
          await sqliteService.initializePlugin();  
          isInitDb =  await sqliteService.isInitDb();
          if(isInitDb){
            await this.props.dispatch({ type: "INIT_DB", value: {isInitDb:true}})
            console.log("La base de données est initialisée ")
          } else {
            await this.props.dispatch({ type: "INIT_DB", value: {isInitDb:false}})
            await this.props.dispatch({ type: "UPDATE_MSG_CONFIG_LOAD", value: {message:"Impossible d'initialisé la base de données"}})
            await this.props.dispatch({ type: "UPDATE_STATUS_CONFIG_LOADER", value: {isErrConfig:true}})

            console.log("Impossible d'initialisé la base de données ")
            return;
          }
      
          if(isInitDb){
            await this.props.dispatch({ type: "UPDATE_MSG_CONFIG_LOAD", value: {message:'Configuration de la base de données ...'}})
            
            let isConfigDB = await sqliteService.isConfigDB();
            

            if(!this.props.isConfigDb || !isConfigDB){

              sqliteService.setEmptyDB();

              let nrs = new NetworkingRequestsService();
              let rst = await nrs.getQuranMetaData(this.props.dispatch);

              await  sqliteService.setMetaDataQuran(rst.data,this.props.dispatch);
              // await sqliteService.setData();
              let isConfigDB = await sqliteService.isConfigDB();
              if(isConfigDB){
                await this.props.dispatch({ type: "CONFIG_DB", value: {isConfigDb:true}})
                console.log("La base de données est congiguré")
              } else {

                await this.props.dispatch({ type: "CONFIG_DB", value: {isConfigDb:false}})
                await this.props.dispatch({ type: "UPDATE_MSG_CONFIG_LOAD", value: {message:'Impossible de congigurer la base de données'}})
                await this.props.dispatch({ type: "UPDATE_STATUS_CONFIG_LOADER", value: {isErrConfig:true}})

                console.log("Impossible de congigurer la base de données")
              }

            } else {
              console.log("Yes La base de données est congiguré")
            }
          }
        } else {
          console.log("Yes La base de données est initialisée ")
        }
      }catch(err){
          console.error(err)            
      }
  }
  

  componentDidUpdate() {
    // console.log("componentDidUpdate : ")
    // console.log(this.props.favoritesFilm)
    // this.setup();
    // this.initializePluginDb();
  }


  async  setupLecteur() {
    await this.props.dispatch({ type: "UPDATE_MSG_CONFIG_LOAD", value: {message:'0/1 Configuration du lécteur ...'}})
    let isSetup = await setupPlayer();
    if(isSetup){
      try {
        await removeTracksList();
        await addTrack();
        this.setState({
          ...this.state,
          play:isSetup
        })
      } catch(err){
        console.log(err)
      }

      await this.props.dispatch({ type: "UPDATE_STATUS_CONFIG_LOADER", value: {isErrConfig:false}})
      await this.props.dispatch({ type: "UPDATE_MSG_CONFIG_LOAD", value: {message:"1/1 Configuration du lécteur ..."}})
    } else {
      await this.props.dispatch({ type: "UPDATE_STATUS_CONFIG_LOADER", value: {isErrConfig:true}})
      await this.props.dispatch({ type: "UPDATE_MSG_CONFIG_LOAD", value: {message:"Le lécteur n'a pas pu etre configurer ..."}})      
    }
  }

  render (){
    return (
          this.props.isOkConfig ? 
            (
              <View style={styles.container}>
                  <View style={{ flex: 12}}>
                    <TrackProgress/>
                    <Playlist/>
                  </View>
                  <View style={{ 
                        flex: 1 ,
                        flexDirection: 'row',
                         alignItems: 'center',
                         justifyContent:'space-evenly'
                        }}
                    >
                        <Icon.Button
                            name="stop"
                            size={20}
                            onPress={() => TrackPlayer.stop()}/>
                          <Icon.Button
                            name="arrow-left"
                            size={20}
                            onPress={() => TrackPlayer.skipToPrevious()}/>
  
                          <Icon.Button
                            size={20}
                             name = 'play'
                            onPress={this.handlePlayPress}/>
                          <Icon.Button
                            name="arrow-right"
                            size={20}
                            onPress={() => TrackPlayer.skipToNext()}/>
                          <Icon.Button
                            name="setting"
                            size={20}
                            onPress={async () => {
                              await this.props.dispatch({ type: "UPDATE_CONFIG_STATE", value: {visibleConfigTrack:!this.props.visibleConfigTrack}})
                            }
                          }/>
                  </View>
                  <TrackSettingComponent />
              </View>
            ) :
            (
              <View style={styles.container}>
                <ConfigLoaderComponent />
              </View>
            )
                    
    );
  }

}

const mapStateToProps = (state) => {
  return {
    ...state.db,
    ...state.config,
    ...state.player
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(QuranComponant);


// {
//     "_persist": {
//         "rehydrated": true, 
//         "version": -1
//     }, 
//     "config": {
//       "isErrConfig": false, 
//       "isOkConfig": false, 
//       "message": "Configuration en cours ...", 
//       "text": ""
//     },
//     "db": {
//       "isConfigDb": false, 
//       "isInitDb": false
//     }
// }

// state {"_persist": {"rehydrated": true, "version": -1}, "config": {"isErrConfig": false, "isOkConfig": true, "message": "Configuration en cours ...", "text": ""}, "db": {"isConfigDb": true, "isInitDb": true}}

