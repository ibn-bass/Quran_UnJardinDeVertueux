import {API_QURAN_BASE_URL, NB_AYAHS, NB_SURAHS,} from '../CONSTANTES';

export default class NetworkingRequestsService {

    constructor (){}

    async getQuranMetaData(dispatch){
        dispatch({ type: "UPDATE_MSG_CONFIG_LOAD", value: {message:'Téléchargement des données ...',text:'0/1 métadonnées sur le Coran '}})
        let data = []
        await fetch(API_QURAN_BASE_URL+"/meta")
        .then(response => response.json())
        .then(json => {
            dispatch({ type: "UPDATE_MSG_CONFIG_LOAD", value: {text:'1/1 métadonnées sur le Coran '}})
            data =  json;
        })
        .catch(error => {
            console.error(error);
            data = []
        });

        let ayahs = { count : 0 , references:[]};
        dispatch({ type: "UPDATE_MSG_CONFIG_LOAD", value: {text:'0/'+NB_SURAHS+' métadonnées sur les soutes du coran '}})

        ayahs.count =   (data.data).ayahs.count
        let surahs = (data.data).surahs;
        if(surahs && surahs.count == 114){
            for (let index = 0; index < surahs.count; index++) {
                const surah = surahs.references[index];
                dispatch({ type: "UPDATE_MSG_CONFIG_LOAD", value: {text:(index+1)+'/'+NB_SURAHS+' métadonnées sur les soutes du coran '}})

                await fetch(API_QURAN_BASE_URL+"/surah/"+surah.number+"/fr.asad")
                .then(response => response.json())
                .then(json => {
                    ayahs.references = (ayahs.references).concat((json.data).ayahs) 
                })
            }
        }

        (data.data).ayahs = ayahs;
        // console.log(data)

        return data;
    }


  
}
  
