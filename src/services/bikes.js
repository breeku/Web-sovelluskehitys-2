import axios from "axios"

export const getStations = async () => {
    try {
        const { data } = await axios.get(
            "https://services1.arcgis.com/sswNXkUiRoWtrx0t/arcgis/rest/services/Helsingin_ja_Espoon_kaupunkipy%C3%B6r%C3%A4asemat/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"
        )
        return data.features
    } catch (e) {
        console.error(e)
        return null
    }
}
