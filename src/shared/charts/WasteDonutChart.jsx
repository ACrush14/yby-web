import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

/**
 * Gráfico de rosca (Donut Chart) com o peso total acumulado centralizado no anel.
 * @see docs/04-REFORMULACAO-NOVO-DESIGN.md
 */
export function WasteDonutChart({ data = [], centerText = '68,3 mil kg', height = 280 }) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full" style={{ height: height - 80 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E6DFD3',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#3D2E28',
              }}
              formatter={(value, name) => [`${value}%`, name]}
            />
            <Pie
              data={data}
              innerRadius="65%"
              outerRadius="90%"
              paddingAngle={2}
              dataKey="percent"
              stroke="#FFFFFF"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Texto centralizado no anel da rosca */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-extrabold text-yby-heading tracking-tight">
            {centerText}
          </span>
        </div>
      </div>

      {/* Legenda com percentuais */}
      <div className="w-full space-y-1.5 mt-2 px-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-yby-heading font-medium">{item.name}</span>
            </div>
            <span className="font-bold text-yby-muted">{item.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
