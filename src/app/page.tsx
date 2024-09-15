"use client";

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import Image from 'next/image';
import Snow from "@/assets/snow.png";

const Home = () => {
  const data = [
    { name: 'Expenses', value: 400 },
    { name: 'Income', value: 300 },
  ];
  const COLORS = ['#4A90E2', '#A9C4EB'];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section>
      <div className="flex flex-col mt-5 items-center justify-center p-3 text-center">
        <h1 className="text-6xl font-bold font-old">
          Get back the <span className="text-accent">control</span> in your finance
        </h1>
        <p className="text-2xl mt-2">
          With FinPet, you can get your finance back in order in a fun and easy way, by gamifying what normally would be <span className="font-bold">hard</span> and <span className="font-bold">shivering</span> numbers.
        </p>
        <div className="my-10 w-full flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 justify-center items-center">
          <button className="bg-primary text-white p-2 rounded w-full md:w-1/4">Get Started</button>
          <button className="border border-primary p-2 rounded w-full md:w-1/4">Learn More</button>
        </div>
        <div className="flex flex-col mt-10">
          <h2 className="text-4xl font-bold font-old">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-3">
            <div className="flex flex-col items-center p-5">
              <span className="w-1/2 font-bold text-accent">Scoring</span>
              <h3 className="text-2xl font-bold">Get a clear insight into your capital 📊</h3>
              <div className="w-full flex justify-center items-center mt-5">
                {mounted ? (
                  <PieChart width={200} height={200}>
                    <Pie
                      data={data}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                ) : (
                  <div>Loading chart...</div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center p-5">
              <span className="w-1/2 font-bold text-accent">Gameifying</span>
              <h3 className="text-2xl font-bold">
                Be motivated to have healthy finances 💸
              </h3>
              <Image src={Snow} alt="Snow" width={200} height={200} />
            </div>
            <div className="flex flex-col items-center p-5">
              <span className="w-1/2 font-bold text-accent">Benefits</span>
              <h3 className="text-2xl font-bold">
                Get rewards for saving money 🎉
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;