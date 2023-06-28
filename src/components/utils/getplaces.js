import axios from 'axios'
const URL_ATTRACTIONS =
    'https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng'
const URL_RESTAURANTS =
    'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng'
const URL_HOTELS = 'https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng'

export const getPlacesData = async (center, radius) => {
    try {
        const {
            data: { data },
        } = await axios.get(URL_ATTRACTIONS, {
            params: {
                longitude: center.lng,
                latitude: center.lat,
                lunit: 'km',
                currency: 'USD',
                distance: radius,
                lang: 'en_US',
            },
            headers: {
                'X-RapidAPI-Key':
                    '1427968cf0mshbb5aa1b4ee5ff69p1ca7d5jsn8cb99d22465e',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
            },
        })
        return data
    } catch (error) {
        console.log(error)
    }
}
