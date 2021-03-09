import React, { useEffect, useState } from "react"
import styles from "./styles.module.css"

import Select from "react-select"

import { MapContainer, TileLayer, Marker } from "react-leaflet"
import L from "leaflet"
import "leaflet-routing-machine"

import Weather from "../Weather/Weather"

import { getStations } from "../../services/bikes"

const Home = () => {
    const [stations, setStations] = useState(null)
    const [station, setStation] = useState(null)
    const [destination, setDestination] = useState(null)
    const [map, setMap] = useState(null)

    useEffect(() => {
        ;(async () => {
            const data = await getStations()
            setStations(data)
        })()
    }, [])

    useEffect(() => {
        if (station && destination) {
            const lat1 = station.geometry.y
            const long1 = station.geometry.x
            const lat2 = destination.geometry.y
            const long2 = destination.geometry.x
            L.Routing.control({
                waypoints: [L.latLng(lat1, long1), L.latLng(lat2, long2)],
            }).addTo(map)
        }
    }, [destination, map, station])

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
                    Valitse kohde
                    <Select
                        options={stations}
                        getOptionLabel={(option) => option.attributes.Adress}
                        onChange={(option) => setDestination(option)}
                    />
                    {station && (
                        <div
                            style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                                width: 500,
                                height: 500,
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
                                whenCreated={(m) => setMap(m)}
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
