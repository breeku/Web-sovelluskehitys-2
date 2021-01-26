import React, { useEffect, useState } from "react"
import styles from "./styles.module.css"

const Home = () => {
    const [stations, setStations] = useState(null)

    useEffect(() => {
        ;(async () => {
            const data = await fetch(
                "https://services1.arcgis.com/sswNXkUiRoWtrx0t/arcgis/rest/services/Helsingin_ja_Espoon_kaupunkipy%C3%B6r%C3%A4asemat/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"
            )
            const json = await data.json()
            setStations(json.features)
        })()
    }, [])
    return (
        <div className={styles.text_center}>
            <h1>Kaupunkipyörät</h1>
            {stations ? (
                <>
                    {stations.map((station) => (
                        <>
                            {station.attributes.Adress}, kapasiteetti:{" "}
                            {station.attributes.Kapasiteet}. Operaattori:{" "}
                            {station.attributes.Operaattor}
                            <br />
                        </>
                    ))}
                </>
            ) : (
                <>Loading..</>
            )}
        </div>
    )
}

export default Home
