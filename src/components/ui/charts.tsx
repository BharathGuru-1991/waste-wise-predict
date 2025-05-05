
import * as React from "react";
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart as RechartsAreaChart,
  Area,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "./chart";

interface ChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showAnimation?: boolean;
  className?: string;
  height?: number;
  customTooltip?: React.FC<any>;
}

export function BarChart({
  data,
  index,
  categories,
  colors = ["#10b981", "#3b82f6", "#ef4444", "#f97316"],
  valueFormatter = (value: number) => `${value}`,
  showAnimation = true,
  className,
  height = 300,
  customTooltip,
}: ChartProps) {
  const config = categories.reduce((acc, category, i) => {
    acc[category] = {
      label: category,
      color: colors[i % colors.length],
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <ChartContainer className={className} config={config}>
      <RechartsBarChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        className={className}
        height={height}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={index}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tickFormatter={valueFormatter}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          content={
            customTooltip
              ? customTooltip
              : (props: any) => <ChartTooltipContent {...props} formatter={valueFormatter} />
          }
        />
        <Legend />
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
            isAnimationActive={showAnimation}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
}

export function PieChart({
  data,
  index,
  categories,
  colors = ["#10b981", "#3b82f6", "#ef4444", "#f97316"],
  valueFormatter = (value: number) => `${value}`,
  showAnimation = true,
  className,
}: ChartProps) {
  const config = data.reduce((acc, entry, i) => {
    acc[entry[index]] = {
      label: entry[index],
      color: entry.fill || colors[i % colors.length],
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <ChartContainer className={className} config={config}>
      <RechartsPieChart className={className}>
        <Tooltip
          content={(props: any) => <ChartTooltipContent {...props} formatter={valueFormatter} />}
        />
        <Pie
          data={data}
          nameKey={index}
          dataKey={categories[0]}
          cx="50%"
          cy="50%"
          outerRadius={80}
          isAnimationActive={showAnimation}
        >
          {data.map((entry, i) => (
            <Cell
              key={`cell-${i}`}
              fill={entry.fill || colors[i % colors.length]}
            />
          ))}
        </Pie>
        <Legend />
      </RechartsPieChart>
    </ChartContainer>
  );
}

export function AreaChart({
  data,
  index,
  categories,
  colors = ["#10b981", "#3b82f6", "#ef4444", "#f97316"],
  valueFormatter = (value: number) => `${value}`,
  showAnimation = true,
  className,
  customTooltip,
}: ChartProps) {
  const config = categories.reduce((acc, category, i) => {
    acc[category] = {
      label: category,
      color: colors[i % colors.length],
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <ChartContainer className={className} config={config}>
      <RechartsAreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={index}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tickFormatter={valueFormatter}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          content={
            customTooltip
              ? customTooltip
              : (props: any) => <ChartTooltipContent {...props} formatter={valueFormatter} />
          }
        />
        <Legend />
        {categories.map((category, i) => (
          <Area
            key={category}
            type="monotone"
            dataKey={category}
            stackId="1"
            stroke={colors[i % colors.length]}
            fill={colors[i % colors.length]}
            isAnimationActive={showAnimation}
          />
        ))}
      </RechartsAreaChart>
    </ChartContainer>
  );
}
