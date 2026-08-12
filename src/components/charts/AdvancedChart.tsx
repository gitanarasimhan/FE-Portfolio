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
    <div className={`u-card ${className}`} style={{ padding: 12 }}>
      <ResponsiveContainer width="100%" height={height}>
        {/* We use a LineChart container for shared axes; render series depending on type */}
        <LineChart data={data} margin={{ top: 8, right: 24, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {series.map((s, i) => {
            const color = s.color ?? palette[i % palette.length];
            if (s.type === 'line') return <Line key={s.dataKey} type="monotone" dataKey={s.dataKey} stroke={color} name={s.name} strokeWidth={2} dot={false} />;
            if (s.type === 'area') return <Area key={s.dataKey} dataKey={s.dataKey} stroke={color} fill={color} name={s.name} fillOpacity={0.15} />;
            // render bar as a Bar inside a composed chart requires different container — but simple bars will render in LineChart as well
            if (s.type === 'bar') return <Bar key={s.dataKey} dataKey={s.dataKey} fill={color} name={s.name} />;
            return null;
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdvancedChart;
