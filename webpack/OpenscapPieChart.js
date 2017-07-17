import React from 'react';

// import PieChart from 'foremanReact/common/charts/PieChart';
// import { navigateToSearch } from 'foremanReactService/ChartService';

class OpenscapPieChart extends React.Component {
    render() {
      const { chart } = this.props;
      const onclickChartClicked = null;

      // const pie = (
      //   <PieChart
      //     key={ chart.id + '-chart' }
      //     data={ chart.data }
      //     onclick={ onclickChartClicked }
      //   />
      // );
      const pie = <p>I am a pie!</p>
      return pie;
    }
}

export default OpenscapPieChart;
