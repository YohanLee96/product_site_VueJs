
import axios from 'axios';


/**
 * 로컬 json 데이터를 배열형식으로  받아오는 api
 * @param jsonFile : json파일 경로
 */
export default {
    jsonSearchList : async function(jsonFile){
        console.log('aa');
        let jsonList= [];
        await axios.get(jsonFile)
        .then(function(response){
           jsonList = response.data;
        })
        .catch(function(error){
            console.log(error);              
        })
        

        return jsonList;
        
    },
    /**
     * 로컬 json 데이터중 특정데이터만 json 형식으로 받아오는 api
     * @param jsonFile : json파일 경로.
     * @param index : 불러올데이터가 있는 Index값.
     */
    jsonSearchFineOne : async function(jsonFile,index){
        console.log('bb');
        let jsonList= [];
        await axios.get(jsonFile)
        .then(function(response){
           jsonList = response.data[index];
        })
        .catch(function(error){
            console.log(error);              
        })
        

        return jsonList;
        
    }
}