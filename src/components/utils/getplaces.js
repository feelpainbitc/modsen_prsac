import axios from "axios";
const URL='https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng';


  


export const getPlacesData=async(center,radius)=>{
      
    try {
    const {data:{data}}=await axios.get(URL,{
        params: {
            longitude: center.lng,
            latitude: center.lat,
            lunit: 'km',
            currency: 'USD',
            distance: radius, 
            lang: 'en_US'
          },
          headers: {
            'X-RapidAPI-Key': '1427968cf0mshbb5aa1b4ee5ff69p1ca7d5jsn8cb99d22465e',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          }
    });
        return data;
    } catch (error) {
        console.log(error)
    }
}