'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export default function StatsChart({
  pending,
  completed,
  cancelled,
}: {
  pending: number;
  completed: number;
  cancelled: number;
}) {
  const data = [
    {
      name: 'Pending',
      value: pending,
    },
    {
      name: 'Completed',
      value: completed,
    },
    {
      name: 'Cancelled',
      value: cancelled,
    },
  ];

  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
      <h2 className="mb-6 text-3xl font-black">
        Appointment Analytics
      </h2>

      <div className="h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="value"
              fill="#22d3ee"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}