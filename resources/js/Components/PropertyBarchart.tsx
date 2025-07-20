"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A stacked bar chart with a legend";

const chartData = [
    { month: "January", rentals: 186, sale: 80 },
    { month: "February", rentals: 305, sale: 200 },
    { month: "March", rentals: 237, sale: 120 },
    { month: "April", rentals: 73, sale: 190 },
    { month: "May", rentals: 209, sale: 130 },
    { month: "June", rentals: 214, sale: 140 },
    {month: "July", rentals: 190, sale: 150},
    {month: "August", rentals: 250, sale: 170},
    {month: "September", rentals: 300, sale: 180},
    {month: "October", rentals: 270, sale: 160},
    {month: "November", rentals: 220, sale: 140},
    {month: "December", rentals: 240, sale: 155},
];

const chartConfig = {
    rentals: {
        label: "rentals",
        color: "var(--chart-1)",
    },
    sale: {
        label: "sale",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

export function PropertyBarchart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Yearly - Sales & Rentals</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="rentals"
                            stackId="a"
                            fill="var(--color-rentals)"
                            radius={[0, 0, 4, 4]}
                        />
                        <Bar
                            dataKey="sale"
                            stackId="a"
                            fill="var(--color-sale)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Trending up by 5.2% this month{" "}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    );
}
