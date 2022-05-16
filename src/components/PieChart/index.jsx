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
              range: ['#5a71c1', '#9eca7e', '#f3ca6b', '#df6e6b', '#84bedb', '#589f74', '#ed8a5c', '#1e80ff', '#fc5531', '#67c23a'],
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
