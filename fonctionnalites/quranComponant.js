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
      play: false
    }
  }


  async componentDidMount() {
    await this.showConfigLoad()

    await this.setupDB()
    await this.setupLecteur();

    if(!this.props.isErrConfig){
      await this.hideConfigLoad()
    }

  }


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

      try{
        let isInitDb  = await sqliteService.isInitDb();

        await this.props.dispatch({ type: "UPDATE_MSG_CONFIG_LOAD", value: {message:'Initialisation de la base de données ...'}})

        if(!this.props.isInitDb || !isInitDb){
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
    await this.props.dispatch({ type: "UPDATE_MSG_CONFIG_LOAD", value: {message:'Configuration du lécteur ...'}})

    let isSetup = await setupPlayer();
    if(isSetup){
      await removeTracksList();
      await addTrack();
      this.setState({
        ...this.state,
        play:isSetup
      })
    } else {
      console.log("Le lecteur n'est pas bien congigurer")
    }
  }

  render (){
    return (
      <View style={styles.container}>
        {

          this.props.isOkConfig ? 
            (
              <View style={styles.container}>
                <Header/>
                <TrackProgress/>
                <Playlist/>
              </View>
            ) :
            (
              <ConfigLoaderComponent />
            )
        }   
      </View>   
    );
  }

}

const mapStateToProps = (state) => {
  return {
    isConfigDb: state.db.isConfigDb,
    isInitDb: state.db.isInitDb,
    isOkConfig:state.config.isOkConfig,
    isErrConfig:state.config.isErrConfig,
    messageConfig: state.config.message,
    textConfig: state.config.text
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(QuranComponant);
