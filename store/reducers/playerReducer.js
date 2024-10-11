
const initialStateDb = { 
    isConfigPlayer:false,
    track:[],
    trackDefault: []
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
        
            nextState = {
                ... state,
                isConfigPlayer: action.value.isConfigPlayer
            };
        } 
        
        break;
    }

    return  nextState || state 
}