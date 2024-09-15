"use client";
import { checkMissingUserFields } from "@/actions/auth-actions";
import GaugeChart from "@/components/ui/gauge-chart";
import Ticker from "@/components/ui/ticker";
import { useEffect, useState, useRef } from "react";
import { Tooltip, PieChart, Pie, Cell } from "recharts";
import Spinner from "@/components/ui/Spinner";

import bg from "@/assets/bg.png";
import pets from "@/data/pets.json";

const HomePage = () => {
  const data = [
    { name: "Expenses", value: 400 },
    { name: "Income", value: 300 },
  ];

  const COLORS = ["#4A90E2", "#A9C4EB"];

  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const img = new Image();
        img.src = bg.src as string;

        img.onload = () => {
          ctx.drawImage(img, 0, 0, 200, 200);
        };

        img.onerror = () => {
          console.error("Failed to load the image");
        };
      }
    }
  }, [canvasRef, mounted, isLoading]);

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
              {false /* missingFields?.missing */ ? (
                <div>
                  <h2 className="text-4xl">Missing Fields</h2>
                  <ul>
                    {missingFields?.fields?.bankId && <li>Bank ID</li>}
                    {missingFields?.fields?.occupation && <li>Occupation</li>}
                    {missingFields?.fields?.salary && <li>Salary</li>}
                  </ul>
                </div>
              ) : (
                <div className="flex gap-4 ">
                  <>
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
                  </>
                  <div className="flex items-center justify-center border">
                    <canvas
                      ref={canvasRef}
                      width={200}
                      height={200}
                      style={{ width: 200, height: 200 }}
                    >
                    </canvas>
                  </div>
                </div>
              )}
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
