import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";

const chartData = [
    { propertytype: "rent", customers: 275, fill: "var(--color-rent)" },
    { propertytype: "sale", customers: 287, fill: "var(--color-sale)" },
];
const chartConfig = {
    rent: {
        label: "Rent",
        color: "hsl(var(--chart-3))",
    },
    sale: {
        label: "Sale",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig;

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { InertiaProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { LineChartCard } from "@/Components/LineChartCard";

export default function Dashboard() {
    const [dashData, setDashData] = useState({});
    const { auth, flash } = usePage<InertiaProps>().props;
    useEffect(() => {
        axios
            .get("/dash/data")
            .then((res) => {
                setDashData(res.data.data);
            })
            .catch((error) => {
                //    console.log("Error", error);
            });
    }, []);
    const totalcustomers = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.customers, 0);
    }, []);
    return (
        <AuthenticatedLayout>
            <section className="p-6 h-screen overflow-y-scroll mainContent">
                <div className="text-lg sm:text-2xl font-semibold w-[95%] mx-auto bai-regular">
                    Welcome{" "}
                    <span className="text-blue-600 capitalize">
                        {(auth?.user?.name).split(" ")[0]}
                    </span>
                </div>
                <div className="dash-data">
                    <Card className="flex flex-col">
                        <CardHeader className="items-center pb-0">
                            <CardTitle>Property Chart</CardTitle>
                            {/* <CardDescription>January - June 2024</CardDescription> */}
                        </CardHeader>
                        <CardContent className="flex-1 pb-0">
                            <ChartContainer
                                config={chartConfig}
                                className="mx-auto aspect-square max-h-[250px]"
                            >
                                <PieChart>
                                    <ChartTooltip
                                        cursor={false}
                                        content={
                                            <ChartTooltipContent hideLabel />
                                        }
                                    />
                                    <Pie
                                        data={chartData}
                                        dataKey="customers"
                                        nameKey="propertytype"
                                        innerRadius={60}
                                        strokeWidth={5}
                                    >
                                        <Label
                                            content={({ viewBox }) => {
                                                if (
                                                    viewBox &&
                                                    "cx" in viewBox &&
                                                    "cy" in viewBox
                                                ) {
                                                    return (
                                                        <text
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                        >
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                className="fill-foreground text-3xl font-bold"
                                                            >
                                                                {totalcustomers.toLocaleString()}
                                                            </tspan>
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={
                                                                    (viewBox.cy ||
                                                                        0) + 24
                                                                }
                                                                className="fill-muted-foreground"
                                                            >
                                                                customers
                                                            </tspan>
                                                        </text>
                                                    );
                                                }
                                            }}
                                        />
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col gap-2 text-sm">
                            <div className="leading-none text-muted-foreground">
                                Showing total properties
                            </div>
                        </CardFooter>
                    </Card>
                    <LineChartCard />
                </div>

                <div className="my-10">
                    {/* <Transactions type="latest" /> */}
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
