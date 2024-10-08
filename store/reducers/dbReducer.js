
const initialStateDb = { 
    isConfigDb:false,
    isInitDb:false
};


export default  function dbReducer (state = initialStateDb, action){
    let nextState = null;

    switch (action.type) {
        case 'INIT_DB':{

            nextState = {
                ... state,
                isInitDb: action.value.isInitDb
            };
            
        } 
        break;

        case 'CONFIG_DB':{

            nextState = {
                ... state,
                isConfigDb: action.value.isConfigDb
            };
        
        }
        break;
    }

    return nextState || state
}