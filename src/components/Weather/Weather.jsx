import React, { useEffect, useState } from "react"

import { getWeather } from "../../services/openweathermap"

const Weather = () => {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        ;(async () => {
            const data = await getWeather()
            setWeather(data)
        })()
    }, [])

    return (
        <>
            {weather && (
                <>
                    <h1>Helsinki</h1>
                    <h2>{weather.main.temp} C</h2>
                    <h2>{weather.weather[0].description}</h2>
                </>
            )}
        </>
    )
}

export default Weather
