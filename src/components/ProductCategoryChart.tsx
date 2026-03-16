"use client";

import * as React from "react";
import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a legend";

type ProductCategoryChartProps = {
  data: {
    category: string;
    count: number;
  }[];
};

export function ProductCategoryChart({ data }: ProductCategoryChartProps) {
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      count: {
        label: "Products",
      },
    };
    data.forEach((item, index) => {
      // Use chart-1 to chart-5 cyclically
      const colorVar = `var(--chart-${(index % 5) + 1})`;
      config[item.category] = {
        label: item.category,
        color: colorVar,
      };
    });
    return config;
  }, [data]);

  const processedData = React.useMemo(() => {
    return data.map((item) => ({
      ...item,
      fill: `var(--color-${item.category})`,
    }));
  }, [data]);

  return (
    <Card className="flex flex-col dark:border-[#F4B057]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Products per Category</CardTitle>
        <CardDescription>Distribution of products across categories</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={processedData} dataKey="count" nameKey="category" />
            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
