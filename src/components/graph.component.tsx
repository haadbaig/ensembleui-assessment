import React from 'react';
import Plot from 'react-plotly.js';
import { PlotlyProps } from '../interfaces/IGlobal';

const GraphPlotly: React.FC<PlotlyProps> = ({xAxisData, yAxisData, graphType, color, title}) => {
  return (
    <Plot
      data={[
        {
          x: xAxisData,
          y: yAxisData,
          type: graphType ? graphType : "bar",
          mode: 'lines+markers',
          marker: {color: color},
        },
      ]}
      layout={{width: 1000, height: 700, title: title}}
    />
  );
}

export default GraphPlotly;