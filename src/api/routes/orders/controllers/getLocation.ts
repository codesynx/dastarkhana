import { Request, Response } from "express"

export async function getLocation(req: Request, res: Response) {
    try {
        const { long, lat } = req.params

        const latitude = Number(lat)
        const longitude = Number(long)

        if (isNaN(latitude) || isNaN(longitude)) {
            res.status(400).json({ error: "Ұзындық немесе ендік параметрі жоқ" })
        }

        const address = getAddressFromLatLng(latitude, longitude)

        res.json({ address })
    } catch (error) {
        res.status(500).json({ error: "Белгісіз қате орын алды" })
    }
}

async function getAddressFromLatLng(lat, lng) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`

    try {
        const response = await fetch(url)
        const data = await response.json()

        if (data && data.display_name) {
            const address = data.display_name
            return address
        } else {
            console.error("Геолокацияны анықтау қатесі: ", data)
        }
    } catch (error) {
        console.error("Геолокация сұрауында қате бар:", error)
    }
}
