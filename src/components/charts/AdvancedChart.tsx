import React from 'react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { palette } from './chart-utils';

export type Series = { type: 'line'|'bar'|'area'; dataKey: string; name?: string; color?: string };

type Props = {
  data: any[];
  xKey: string;
  series: Series[];
  height?: number;
  className?: string;
};

export const AdvancedChart: React.FC<Props> = ({ data, xKey, series, height = 300, className = '' }) => {
  return (
    <div className={`u-card chart-card ${className}`.trim()}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 8, right: 24, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e7edf5" />
          <XAxis dataKey={xKey} stroke="#5d6b82" tickLine={false} axisLine={false} />
          <YAxis stroke="#5d6b82" tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #d6deeb',
              background: '#ffffff',
              boxShadow: '0 12px 22px rgba(15,23,42,0.08)',
            }}
          />
          <Legend />
          {series.map((s, i) => {
            const color = s.color ?? palette[i % palette.length];
            if (s.type === 'line') return <Line key={s.dataKey} type="monotone" dataKey={s.dataKey} stroke={color} name={s.name} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />;
            if (s.type === 'area') return <Area key={s.dataKey} dataKey={s.dataKey} stroke={color} fill={color} name={s.name} fillOpacity={0.12} strokeWidth={2.5} />;
            if (s.type === 'bar') return <Bar key={s.dataKey} dataKey={s.dataKey} fill={color} name={s.name} radius={[6, 6, 0, 0]} />;
            return null;
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdvancedChart;
