
const initialStateDb = { 
    isConfigPlayer:false,
    track:[],
    trackDefault: [],
    visibleConfigTrack:true
};

export default  function playerReducer (state = initialStateDb, action){
    let nextState = null;

    switch (action.type) {

        case 'UPDATE_TRACK': {

            nextState = {
                ... state,
                track: [...action.value.track]
            };

        }

        break;

        case 'INIT_TRACK':{
        
            nextState = {
                ... state,
                track: [...state.trackDefault]
            };
        } 
        
        break;

        case 'UPDATE_CONFIG_STATE':{

            console.log("UPDATE_CONFIG_STATE action",action)

            nextState = {
                ... state,
                isConfigPlayer: action.value.isConfigPlayer ?? state.isConfigPlayer,
                visibleConfigTrack: action.value.visibleConfigTrack ?? state.visibleConfigTrack
            };

            console.log("nextState",nextState)
        } 
        
        break;
    }

    return  nextState || state 
}