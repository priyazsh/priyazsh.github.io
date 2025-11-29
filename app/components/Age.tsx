"use client"

import { useEffect, useState } from "react"

export default function Age() {

    const [age, setAge] = useState<string>("21");

    useEffect(() => {
        const dob = new Date("2004-05-28")
        const updateAge = () => {
            const rn = new Date()
            const msperDay = 1000*60*60*24
            const gap = (rn.getTime() - dob.getTime())/msperDay
            const years = gap/365.2425
            setAge(years.toFixed(9))
        }
        const interval = setInterval(updateAge, 1)
        return () => clearInterval(interval)
    },[])

    return (
        <span className="font-mono">{age}</span>
    )
}