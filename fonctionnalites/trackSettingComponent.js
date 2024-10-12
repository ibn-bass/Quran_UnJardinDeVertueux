import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import SelectComposent from './selectComposent'

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flex:1,
    maxHeight:Dimensions.get('screen').height / 2,
    minWidth: Dimensions.get('screen').width,
    backgroundColor: '#000',
    padding: 35,
    alignItems: 'center',
    opacity:0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 30

  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

class TrackSettingComponent extends React.Component {
  // const [modalVisible, setModalVisible] = useState(true);

  constructor(props) {
    super(props)
    this.state = {
      sourahs : [
        {title: 'happy'},
        {title: 'cool'},
        {title: 'lol'},
        {title: 'sad'},
        {title: 'cry'},
        {title: 'angry'},
        {title: 'confused'},
        {title: 'excited'},
        {title: 'kiss'},
        {title: 'devil'},
        {title: 'dead'},
        {title: 'wink'},
        {title: 'sick'},
        {title: 'frown'},
      ],
      ayahs: [
        {title: '1'},
        {title: '2'},
        {title: '3'},
        {title: '4'},
        {title: '5'},
        {title: '6'}
      ],
      recitateurs:[
        {title: 'Adama Goudiaby'},
        {title: 'Abdoulaye Fall'},
      ],

      fields:{
        recitateur:{},
        souratDebut:{

        },
        souratFin:{

        },
        ayatDebut:{

        },
        ayatFin:{

        },
        nbRepertitionsGroupeAyats:1,
        nbRepertitionsAyat:1
      }
    }
  }


  onChangeSelect(value){
    console.log("value",value)
  }


  async componentDidMount() {
  }

  render () {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visibleConfigTrack} 
        swipeDirection="down"
        style={{ 
          justifyContent: 'flex-end', 
          margin: 0
        }} 
        onRequestClose={async () => {
          Alert.alert('Modal has been closed.');
          await this.props.dispatch({type:'UPDATE_CONFIG_STATE',value:{visibleConfigTrack:!this.props.visibleConfigTrack}})
          
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{flex:2,width:Dimensions.get('screen').width,justifyContent: 'space-evenly',alignItems:'center'}}>
                {/* Récitateur */}
                <View style={{flex:1,maxHeight:30,marginTop:15,paddingLeft:20,width:Dimensions.get('screen').width,justifyContent: 'space-evenly',flexDirection: 'row'}}>
                  <View style={{ flex: 2}}>
                    <Text style={{color:'white',height:30,paddingTop:5}}>Récitateur </Text>
                  </View>
                  <View style={{ flex: 4}}>
                    <SelectComposent 
                        defaulValue={this.state.recitateurs[0]} 
                        styleSelect={{width:200,height:30}} 
                        data ={this.state.ayahs } 
                        updateValue = {(recitateur)=>{
                          this.setState({
                            ...this.state,
                            fields:{
                              ...this.state.fields,
                              recitateur:recitateur
                            }
                          })
                        }}  
                        />
                  </View>
                </View>
                {/* Depuis */}
                <View style={{flex:1,maxHeight:30,marginTop:15,paddingLeft:20,width:Dimensions.get('screen').width}}>
                  <Text style={{color:'white'}}>Depuis</Text>
                </View>
                <View style={{flex:1,maxHeight:30,paddingLeft:20,width:Dimensions.get('screen').width,justifyContent: 'space-evenly',flexDirection: 'row'}}>
                  <View style={{ flex: 3,}}>
                    <SelectComposent 
                      defaulValue={this.state.sourahs[0]} 
                      styleSelect={{width:200,height:30}} 
                      data ={this.state.sourahs } 
                      updateValue = {(souratDebut)=>{
                        this.setState({
                          ...this.state,
                          fields:{
                            ...this.state.fields,
                            souratDebut:souratDebut
                          }
                        })
                      }}  
                    />
                  </View>
                  <View style={{ flex: 1}}>
                    <SelectComposent 
                      defaulValue={this.state.ayahs[0]} 
                      styleSelect={{width:70,height:30}} 
                      data ={this.state.ayahs } 
                      updateValue = {(ayatDebut)=>{
                        this.setState({
                          ...this.state,
                          fields:{
                            ...this.state.fields,
                            ayatDebut:ayatDebut
                          }
                        })
                      }} 
                    />
                  </View>
                </View>
                  {/* Jusqu'à */}
                <View style={{flex:1,maxHeight:30,marginTop:15,paddingLeft:20,width:Dimensions.get('screen').width}}>
                  <Text style={{color:'white'}}>Jusqu'à</Text>
                </View>
                <View style={{flex:1,maxHeight:30,paddingLeft:20,width:Dimensions.get('screen').width,justifyContent: 'space-evenly',flexDirection: 'row'}}>
                  <View style={{ flex: 3,}}>
                    <SelectComposent 
                      defaulValue={this.state.sourahs[0]} 
                      styleSelect={{width:200,height:30}} 
                      data ={this.state.sourahs } 
                      updateValue = {(souratFin)=>{
                        this.setState({
                          ...this.state,
                          fields:{
                            ...this.state.fields,
                            souratFin:souratFin
                          }
                        })
                      }}
                    />
                  </View>
                  <View style={{ flex: 1}}>
                    <SelectComposent 
                      defaulValue={this.state.ayahs[0]} 
                      styleSelect={{width:70,height:30}} 
                      data ={this.state.ayahs } 
                      updateValue = {(ayatFin)=>{
                        this.setState({
                          ...this.state,
                          fields:{
                            ...this.state.fields,
                            ayatFin:ayatFin
                          }
                        })
                      }}
                    />
                  </View>
                </View>
                {/* Écouter la selection de Ayats */}
                <View style={{flex:1,maxHeight:30,marginTop:15,paddingLeft:20,width:Dimensions.get('screen').width,justifyContent: 'space-evenly',flexDirection: 'row'}}>
                  <View style={{ flex: 5,}}>
                    <Text style={{color:'white',height:30,paddingTop:5}}>Écouter la selection de Ayat</Text>
                  </View>
                  <View style={{ flex: 1}}>
                    <SelectComposent 
                      defaulValue={this.state.ayahs[0]} 
                      styleSelect={{width:70,height:30}} 
                      data ={this.state.ayahs }
                      updateValue = {(nbRepertitionsGroupeAyats)=>{
                        this.setState({
                          ...this.state,
                          fields:{
                            ...this.state.fields,
                            nbRepertitionsGroupeAyats:nbRepertitionsGroupeAyats
                          }
                        })
                      }} 
                    />
                  </View>
                  <View style={{ flex: 3,height:30,paddingTop:5,alignItems:'center'}}>
                    <Text style={{color:'white'}}>fois</Text>
                  </View>
                </View>
                {/* Écouter chaque Ayat */}
                <View style={{flex:1,maxHeight:30,marginTop:15,paddingLeft:20,width:Dimensions.get('screen').width,justifyContent: 'space-evenly',flexDirection: 'row'}}>
                  <View style={{ flex: 5,}}>
                    <Text style={{color:'white',height:30,paddingTop:5}}>Écouter chaque Ayat</Text>
                  </View>
                  <View style={{ flex: 1}}>
                    <SelectComposent 
                      defaulValue={this.state.ayahs[0]} 
                      styleSelect={{width:70,height:30}} 
                      data ={this.state.ayahs } 
                      updateValue = {(nbRepertitionsAyat)=>{
                        this.setState({
                          ...this.state,
                          fields:{
                            ...this.state.fields,
                            nbRepertitionsAyat:nbRepertitionsAyat
                          }
                        })
                      }}   
                    />
                  </View>
                  <View style={{ flex: 3,height:30,paddingTop:5,alignItems:'center'}}>
                    <Text style={{color:'white'}}>fois</Text>
                  </View>
                </View>
            
            </View>
            <View style={{Width:Dimensions.get('screen').width,justifyContent: 'space-evenly',alignItems:'flex-end'}}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={async () =>  {
                    console.log("fields",this.state.fields)
                    await this.props.dispatch({type:'UPDATE_CONFIG_STATE',value:{visibleConfigTrack:!this.props.visibleConfigTrack}})
                  }}
                >
                <Text style={{...styles.textStyle,paddingLeft:5,paddingRight:6}}>APPLIQUER</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    
        //   <Pressable
        //   style={[styles.button, styles.buttonOpen]}
        //   onPress={() => setModalVisible(true)}>
        //   <Text style={styles.textStyle}>Show Modal</Text>
        // </Pressable>
    );
  }
  
};



const mapStateToProps = (state) => {
    return {
      ...state.player
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => { dispatch(action) }
    }
  }
  
  
export default connect(mapStateToProps,mapDispatchToProps)(TrackSettingComponent);

