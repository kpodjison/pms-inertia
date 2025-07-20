"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A pie chart with a label list"

const chartData = [
    { months: "january", revenue: 275, fill: "var(--color-january)" },
    { months: "february", revenue: 200, fill: "var(--color-february)" },
    { months: "march", revenue: 187, fill: "var(--color-march)" },
    { months: "april", revenue: 173, fill: "var(--color-april)" },
    { months: "may", revenue: 173, fill: "var(--color-may)" },
    { months: "june", revenue: 90, fill: "var(--color-june)" },
]

const chartConfig = {
    revenue: {
        label: "revenue",
    },
    january: {
        label: "January",
        color: "var(--chart-1)",
    },
    february: {
        label: "February",
        color: "var(--chart-2)",
    },
    march: {
        label: "March",
        color: "var(--chart-3)",
    },
    april: {
        label: "April",
        color: "var(--chart-4)",
    },
    may: {
        label: "May",
        color: "var(--chart-6)",
    },
    june: {
        label: "June",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig

export function RevenuePieChart() {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Quarterly Revenue Chart</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent nameKey="revenue" hideLabel />}
                        />
                        <Pie data={chartData} dataKey="revenue">
                            <LabelList
                                dataKey="months"
                                className="fill-background"
                                stroke="none"
                                fontSize={12}
                                formatter={(value: keyof typeof chartConfig) =>
                                    chartConfig[value]?.label
                                }
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing total revenue for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
