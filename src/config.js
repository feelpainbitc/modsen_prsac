import { defaultTheme } from './components/Map/Theme'

export const defaultValueCenter = {
    lat: 53.669353,
    lng: 23.813131,
}
export const libraries = ['places']

export const circleOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clicable: false,
    draggable: false,
    visible: true,
    zIndex: 10,
    fillOpacity: 0.08,
    strokeColor: 'rgb(119, 118, 10)',
    fillColor: 'rgb(119, 118, 10)',
}

export const defaultOptions = {
    panControl: true,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    clickableIcons: true,
    keyboardShortcuts: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    fullscreenControl: false,
    styles: defaultTheme,
}

export const containerStyle = {
    width: '100%',
    height: '100%',
}
