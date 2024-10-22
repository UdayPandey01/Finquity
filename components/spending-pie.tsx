import { FileSearch, PieChart, Radar, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "./ui/select"
import { useState } from "react"
import { PieVariant } from "./pie-variant"
import { RadarVariant } from "./radar-variant"

type Props = {
    data ?: {
        name : string
        value : number
    }[]
}

export const SpendingPie = ({data = []} : Props) => {
    const [chartType, setChartType] = useState("pie")

    const onTypeChange = (type : string) => {
        setChartType(type)
    }

    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex space-y-2 lg:space-y-0 lg:fkex-row lg:items-center justify-between">
                <CardTitle className="text-xl line-clamp-1">
                    Categories
                </CardTitle>
                <Select
                    defaultValue={chartType}
                    onValueChange={onTypeChange}
                >
                    <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
                        <SelectValue placeholder="Chart Type"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pie">
                            <div className="flex items-center">
                                <PieChart className="size-4 mr-2 shrink-0"/>
                                <p className="line-clamp-1">
                                    Pie chart
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="radar">
                            <div className="flex items-center">
                                <Radar className="size-4 mr-2 shrink-0"/>
                                <p className="line-clamp-1">
                                    Radar chart
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="radial">
                            <div className="flex items-center">
                                <Target className="size-4 mr-2 shrink-0"/>
                                <p className="line-clamp-1">
                                    Radial chart
                                </p>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
                        <FileSearch className="size-6 text-muted-foreground"/>
                        <p className="text-muted-foreground text-sm">
                            No data for this period
                        </p>
                    </div>
                ) : (
                    <>
                        {chartType === "pie" && <PieVariant data={data}/>}
                        {chartType === "radar" && <RadarVariant data={data}/>}
                    </>
                    
                )}
            </CardContent>
        </Card>
    )
}