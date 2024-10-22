// import dynamic from 'next/dynamic';

// const ClerkLoaded = dynamic(() => import('@clerk/clerk-react').then(mod => mod.ClerkLoaded), { ssr: false });

import {Tooltip, XAxis,LineChart, ResponsiveContainer, CartesianGrid, Line} from "recharts"
import {format} from "date-fns"
import { CustomToolTip } from "./custom-tooltip"

type Props = {
    data : {
        date : string
        income : number
        expenses : number
    }[]
}

export const LineVariant = ({data} : Props) => {
    return (
        <ResponsiveContainer>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => {
                        const date = new Date(value)
                        return format(date, "dd MMM")}}
                    style={{fontSize : "12px"}}
                    tickMargin={16}
                />
                <Tooltip content={<CustomToolTip/>}/>
                <Line
                    dot={false}
                    dataKey="income"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
                <Line
                    dot={false}
                    dataKey="expenses"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
            </LineChart>
        </ResponsiveContainer>
    )
}