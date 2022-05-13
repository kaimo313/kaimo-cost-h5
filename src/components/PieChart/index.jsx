import Canvas from "@antv/f2-react";
import { Chart, Interval, Legend, PieLabel } from "@antv/f2";
import PropTypes from 'prop-types';

import s from './style.module.less';

const PieChart = ({ chartData = [] }) => {
  console.log('进入 PieChart', chartData)
  return (
    <div className={s.pieChart}>
      { chartData.length > 0 ? <Canvas pixelRatio={window.devicePixelRatio}>
        <Chart
          data={chartData}
          coord={{
            type: "polar",
            transposed: true,
            radius: 1,
          }}
          scale={{}}
        >
          <Interval
            x="payType"
            y="percent"
            adjust="stack"
            color={{
              field: "type_name",
              range: ['#873bf4', '#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#ffc0cb', '#ff7875', '#F04864', '#e91e63', '#0d1a26'],
            }}
            selection={{
              selectedStyle: (record) => {
                const { yMax, yMin } = record;
                return {
                  // 半径放大 1.1 倍
                  r: (yMax - yMin) * 1.1,
                };
              },
            }}
          />
          <Legend position="top" marker="square" nameStyle={{
            fontSize: '14',
            fill: '#000',
          }} style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}/>
          <PieLabel
            sidePadding={0}
            label1={(data) => {
              return {
                text: `${data.type_name}:${data.percent}%`,
                fill: "#0d1a26",
                fontSize: 12,
              };
            }}
          />
        </Chart>
      </Canvas> : null }
    </div>
  );
};

PieChart.propTypes = {
  chartData: PropTypes.array,
}

export default PieChart;
