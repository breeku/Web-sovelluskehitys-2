import React, { useEffect, useState } from "react"
import styles from "./styles.module.css"

import Select from "react-select"

import { MapContainer, TileLayer, Marker } from "react-leaflet"

const Home = () => {
    const [stations, setStations] = useState(null)
    const [station, setStation] = useState(null)

    useEffect(() => {
        ;(async () => {
            const data = await fetch(
                "https://services1.arcgis.com/sswNXkUiRoWtrx0t/arcgis/rest/services/Helsingin_ja_Espoon_kaupunkipy%C3%B6r%C3%A4asemat/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"
            )
            const json = await data.json()
            setStations(json.features)
        })()
    }, [])

    console.log(station)
    return (
        <div className={styles.text_center}>
            <h1>Kaupunkipyörät</h1>
            {stations ? (
                <>
                    Valitse asema
                    <Select
                        options={stations}
                        getOptionLabel={(option) => option.attributes.Adress}
                        onChange={(option) => setStation(option)}
                    />
                    {station && (
                        <div
                            style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                                width: 300,
                                height: 300,
                            }}
                        >
                            <h2>
                                Kapasiteetti: {station.attributes.Kapasiteet}
                            </h2>
                            <MapContainer
                                center={[
                                    station.geometry.y,
                                    station.geometry.x,
                                ]}
                                zoom={13}
                                scrollWheelZoom={false}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                />
                                <Marker
                                    position={[
                                        station.geometry.y,
                                        station.geometry.x,
                                    ]}
                                ></Marker>
                            </MapContainer>
                        </div>
                    )}
                </>
            ) : (
                <>Loading..</>
            )}
        </div>
    )
}

export default Home
