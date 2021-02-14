import axios from "axios"

export const getWeather = async () => {
    try {
        const { data } = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=Helsinki&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        )
        return data
    } catch (e) {
        console.error(e)
        return null
    }
}
