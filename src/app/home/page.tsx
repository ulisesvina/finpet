"use client";
import React from "react";
import { checkMissingUserFields } from "@/actions/auth-actions";
import GaugeChart from "@/components/ui/gauge-chart";
import Ticker from "@/components/ui/ticker";
import { useEffect, useState } from "react";
import { Tooltip, PieChart, Pie, Cell } from "recharts";
import Spinner from "@/components/ui/Spinner";

const HomePage = () => {
  const data = [
    { name: "Expenses", value: 400 },
    { name: "Income", value: 300 },
  ];

  const COLORS = ["#4A90E2", "#A9C4EB"];

  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [missingFields, setMissingFields] = useState<{
    missing: boolean;
    fields?: {
      bankId: boolean;
      occupation: boolean;
      salary: boolean;
    };
    occupation: boolean;
    salary: boolean;
  } | null>(null);

  useEffect(() => {
    checkMissingUserFields().then((data: any) => {
      setMissingFields(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {mounted ? (
            <>
              {missingFields?.missing && (
                <div>
                  <h2 className="text-4xl">Missing Fields</h2>
                  <ul>
                    {missingFields.fields?.bankId && <li>Bank ID</li>}
                    {missingFields.fields?.occupation && <li>Occupation</li>}
                    {missingFields.fields?.salary && <li>Salary</li>}
                  </ul>
                </div>
              )}
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
            </>
          ) : (
            <p>Loading chart...</p>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
