"use client";

import GaugeChart from "@/components/ui/gauge-chart";
import Ticker from "@/components/ui/ticker";
import { useEffect, useState } from "react";
import { Tooltip, PieChart, Pie, Cell } from "recharts";

const HomePage = () => {
  const data = [
    { name: "Expenses", value: 400 },
    { name: "Income", value: 300 },
  ];

  const COLORS = ["#4A90E2", "#A9C4EB"];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="">
      {mounted ? (
        <div className="flex gap-4 ">
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div className="flex flex-col gap-2">
            <span className="text-sm">Saldo en cuenta:</span>
            <Ticker value="4,567,890 MXN" className="text-4xl font-bold" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm">Score Financiero:</span>
            <GaugeChart size={150} progress={20} gap={4} showValue />
          </div>
        </div>
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default HomePage;
