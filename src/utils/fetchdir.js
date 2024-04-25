/*global google*/
export const fetchDirection = (place, center, setDirections,directionsRendererRef) => {
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
                console.log(result)
                setDirections(result)

                if (!directionsRendererRef.current) {
                    directionsRendererRef.current = new google.maps.DirectionsRenderer();
                }

                // Установка маршрута на карту
                directionsRendererRef.current.setDirections(result);
            }
        }
    )
};
export const clearDirection = (setDirections,directionsRendererRef) => {
    if (directionsRendererRef.current) {
        // Очистка маршрута с карты
        directionsRendererRef.current.setDirections(null);
    }
};
