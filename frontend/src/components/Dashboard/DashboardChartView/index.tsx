import React from 'react';
import './Chart.css';
import { ChartProps } from '../DashboardController/dbcTypes';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';


const Chart: React.FC<ChartProps> = props => {

  return (
    <div className='chart'>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart
          data={props.chartData}
          margin={{
            top: 10,
            // right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor="#2F455C" stopOpacity={0.7}/>
              <stop offset='95%' stopColor="#2F455C" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <Area dataKey="close" stroke='#19c6dd' fill='url(#color)' />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickCount={8}
            tickLine={false}
          />
          <YAxis
            dataKey="close"
            axisLine={false}
            tickCount={8}
            tickLine={false}
            tickFormatter={number => `$${number}`}
          />
          <Tooltip content={<CustomTooltip/>} />

          <CartesianGrid opacity={0.35} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomTooltip({active, payload, label}: any){
  if (active){
    return (
      <div className="customTooltip">
        <h4>{label}</h4>
        <p>${payload[0].value.toFixed(2)}</p>
      </div>
    )
  }
  return <span></span>;
}

export default Chart;
