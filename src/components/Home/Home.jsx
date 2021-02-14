import React, { useEffect, useState } from "react"
import styles from "./styles.module.css"

import Select from "react-select"

import { MapContainer, TileLayer, Marker } from "react-leaflet"

import Weather from "../Weather/Weather"

import { getStations } from "../../services/bikes"

const Home = () => {
    const [stations, setStations] = useState(null)
    const [station, setStation] = useState(null)

    useEffect(() => {
        ;(async () => {
            const data = await getStations()
            setStations(data)
        })()
    }, [])

    return (
        <div className={styles.text_center}>
            <Weather />
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
