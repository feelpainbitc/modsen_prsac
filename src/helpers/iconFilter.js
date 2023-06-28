import architecture from '../assets/architecture.png'
import attraction from '../assets/attraction.png'
import bank from '../assets/bank.png'
import bicycle from '../assets/bicycle.png'
import car from '../assets/car.png'
import church from '../assets/church.png'
import coffee from '../assets/coffee.png'
import culture from '../assets/culture.png'
import food from '../assets/food.png'
import gasstation from '../assets/gasstation.png'
import history from '../assets/history.png'
import hotels from '../assets/hotels.png'
import nature from '../assets/nature.png'
import other from '../assets/other.png'
import shop from '../assets/shop.png'
import sport from '../assets/sport.png'
import zavod from '../assets/zavod.png'
import defaulticon from '../assets/defaulticon.png'
import bars from '../assets/18+.png'

const typeToIcon = {
    'Sacred & Religious Sites': church,
    'Game & Entertainment Centers': attraction,
    'Monuments & Statues': architecture,
    'Architectural Buildings': architecture,
    Castles: history,
    'Ancient Ruins': history,
    'Specialty Museums': history,
    'Gift & Specialty Shops': shop,
    'Points of Interest & Landmarks': other,
    'Historic Walking Areas': history,
    'Scenic Walking Areas': history,
    'Hammams & Turkish Baths': attraction,
    Spas: attraction,
    'Bars & Clubs': bars,
    'History Museums': culture,
    'Art Museums': culture,
    Concerts: bars,
    'Karaoke Bars': bars,
    'Bowling Alleys': attraction,
}

export const getMarkerIcon = (place) => {
    if (place.subtype) {
        return typeToIcon[place.subtype[0].name] ?? defaulticon
    } else {
        return defaulticon
    }
}
