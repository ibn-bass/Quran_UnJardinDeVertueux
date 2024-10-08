
const initialStateConfig = { 
    isOkConfig:false,
    isErrConfig:false,
    message: 'Configuration en cours ...',
    text: ''
};


export default  function configReducer (state = initialStateConfig, action){
    let nextState = null;

    switch (action.type) {
        case 'UPDATE_MSG_CONFIG_LOAD': {
                       nextState = {
                ... state,
                message: action.value.message  ?? state.message,
                text:action.value.text ?? state.text
            };
        }
        break;

        case 'UPDATE_STATUS_CONFIG_LOADER':{
            
            nextState = {
                ... state,
                isOkConfig: action.value.isOkConfig ?? state.isOkConfig,
                isErrConfig:  action.value.isErrConfig ?? state.isErrConfig
            };
        }
        break;

    }

    return nextState || state
}