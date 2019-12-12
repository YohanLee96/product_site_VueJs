
import axios from 'axios';


/**
 * 로컬 json 데이터를 배열형식으로  받아오는 메소드
 * @param jsonFile : json파일 경로
 */
export default {
    jsonSearchList : async function(jsonFile){
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
     * 로컬 json 데이터중 특정데이터만 json 형식으로 받아오는 메소드
     * @param jsonFile : json파일 경로.
     * @param index : 불러올데이터가 있는 Index값.
     */
    jsonSearchFineOne : async function(jsonFile,index){

        let jsonList= [];
        await axios.get(jsonFile)
        .then(function(response){
           jsonList = response.data[index];
        })
        .catch(function(error){
            console.log(error);              
        })
        

        return jsonList;
        
    },
    /**
     * 페이징 시, 리스트의 처음 인덱스와 마지막 인덱스 값을 계산해주는 메소드
     * @param nowPageIndex : 현재 페이지 숫자값
     * @param ItemCnt  : 한페이지당 표출할 데이터 개수
     * @return jsonArray = {
     * firstItemIndex : 처음 인덱스,
     * lastItemIndex : 마지막 인덱스
     * }
     */
     pageIndexCal : async function(nowPageIndex,ItemCnt){
         let lastIndex = nowPageIndex * ItemCnt;
         let firstIndex= lastIndex-ItemCnt;
         let pagingArr = {
             firstIndex : firstIndex,
             lastIndex : lastIndex
         };

         return pagingArr;
     }
}