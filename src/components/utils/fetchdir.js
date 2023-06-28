/*global google*/
export const fetchDirection = (place, center, setDirections) => {
    if (!place) return

    const service = new google.maps.DirectionsService()
    service.route(
        {
            origin: center,
            destination: {
                lat: Number(place.latitude),
                lng: Number(place.longitude),
            },
            travelMode: google.maps.TravelMode.WALKING,
        },
        (result, status) => {
            if (status === 'OK' && result) {
                setDirections(result)
            }
        }
    )
}
