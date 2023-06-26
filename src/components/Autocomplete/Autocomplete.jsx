import React from 'react'

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'

import s from './Autocomplete.module.css'

export const Autocomplete = ({ isLoaded, onSelect }) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        init,
        clearSuggestions,
    } = usePlacesAutocomplete({
        initOnMount: false,
        debounce: 300,
    })

    const ref = useOnclickOutside(() => {
        clearSuggestions()
    })
    const handleInputFirst = (e) => {
        setValue(e.target.value)
    }

    const handleSelect =
        ({ description }) =>
        () => {
            setValue(description, false)
            clearSuggestions()
            getGeocode({ address: description }).then((results) => {
                const { lat, lng } = getLatLng(results[0])
                onSelect({ lat, lng })
            })
        }

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion
            return (
                <li
                    className={s.listItem}
                    key={place_id}
                    onClick={handleSelect(suggestion)}
                >
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            )
        })

    React.useEffect(() => {
        if (isLoaded) {
            init()
        }
    }, [isLoaded, init])

    return (
        <div className={s.root} ref={ref}>
            <input
                type="text"
                className={s.findbar}
                value={value}
                onChange={handleInputFirst}
                disabled={!ready}
                placeholder="Что вы хотите найти?"
            />
            {status === 'OK' && (
                <ul className={s.suggestions}>{renderSuggestions()}</ul>
            )}
        </div>
    )
}
