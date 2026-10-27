import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

/**
 * Gráfico de barras verticais para água e energia mês a mês.
 */
export function MonthlyBarChart({
  data = [],
  color = '#005885',
  unit = 'L',
  height = 240,
}) {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6DFD3" />
          <XAxis dataKey="month" stroke="#7A7067" fontSize={12} tickLine={false} />
          <YAxis stroke="#7A7067" fontSize={12} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E6DFD3',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#3D2E28',
            }}
            formatter={(val) => [
              `${typeof val === 'number' ? val.toLocaleString('pt-BR') : val} ${unit}`,
              'Total',
            ]}
          />
          <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} maxBarSize={36} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
