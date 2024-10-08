import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFEE'
  }
});

class ConfigLoaderComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
     
    }
  }


  async componentDidMount() {
 
  }

  componentDidUpdate() {
  }


  render (){
    return (
        !this.props.isErrConfig 
        ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#00ff00" />
                <Text style={{ marginTop: 10}}>{this.props.message}</Text>
                <Text style={{ marginTop: 10}}>{this.props.text}</Text> 
            </View>  
       :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'red'}}>
                <Text style={{ marginTop: 10,color:'white'}}>{this.props.message}</Text>
            </View> 
    );
  }

}

const mapStateToProps = (state) => {
  return {
    isOkConfig:state.config.isOkConfig,
    isErrConfig:state.config.isErrConfig,
    message: state.config.message,
    text: state.config.text
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ConfigLoaderComponent);
