import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

/**
 * Gráfico de área/linha para evolução de coleta em peso por mês.
 * @see docs/04-REFORMULACAO-NOVO-DESIGN.md
 */
export function AreaMetricChart({ data = [], height = 280 }) {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#267332" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#267332" stopOpacity={0.0} />
            </linearGradient>
          </defs>
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
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
            formatter={(value) => [
              `${typeof value === 'number' ? value.toLocaleString('pt-BR') : value} kg`,
              'Peso',
            ]}
          />
          <Area
            type="monotone"
            dataKey="weight"
            stroke="#267332"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorWeight)"
            dot={{ r: 4, fill: '#FFFFFF', stroke: '#267332', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#267332' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
