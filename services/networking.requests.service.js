import {
    API_QURAN_BASE_URL, 
    API_RECITATORS_QURAN_BASE_URL, 
    NB_SURAHS
} from '../CONSTANTES';

import RNFetchBlobService from './nr_fetch_blob.service'

export default class NetworkingRequestsService {

    constructor (){}

    async getAyatsAudio(audiosUrs){

        if(audiosUrs.length == 0){
            return [];
        }

        let data = [];
        let rNFetchBlobService = new RNFetchBlobService ();
        console.log("Téléchargement des audios mp3 des ayats choisi ... ");
        for (let index = 0; index < audiosUrs.length; index++) {
            const item = audiosUrs[index];
            console.log(item);
            let filePath = await rNFetchBlobService.startDownload(item.url,item.name);
            data.push(filePath);
        }

        console.log("Fin téléchargement des audios mp3 des ayats choisi ");

        return data;
    }

    async getQuranMetaData(dispatch){
        dispatch({ type: "UPDATE_MSG_CONFIG_LOAD", value: {message:'Téléchargement des données ...',text:'0/1 métadonnées sur le Coran '}})
        let data = []

        // Recuperation des métadonnées du coran
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

        // Recuperation  des métadonnée  des ayats du coran
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


        // Recuperation  des métadonnée des Récitateurs du coran
        dispatch({ type: "UPDATE_MSG_CONFIG_LOAD", value: {text:'0/1 métadonnées sur les récitateurs du coran '}})

        await fetch(API_RECITATORS_QURAN_BASE_URL+"/recitations.js")
        .then(response => response.json())
        .then(json => {
            let recitateursReferences = [];

            for (const key in json) {
                if(key != "ayahCount"){
                    let item = {... json[key]}
                    item['id'] = parseInt(key);
                    recitateursReferences.push(item);
                }
            }


            (data.data)['recitators'] = {
                count: recitateursReferences.length,
                references : recitateursReferences
            };
        })
        
        .catch(error => {
            console.error(error);
            data = []
        });

        dispatch({ type: "UPDATE_MSG_CONFIG_LOAD", value: {text:'1/1 métadonnées sur les récitateurs du coran '}})

        return data;
    }


  
}
  
