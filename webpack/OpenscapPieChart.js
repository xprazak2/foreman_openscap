import React from 'react';
import PieChart from 'foremanReact/components/common/charts/PieChart';
import { navigateToSerach } from 'foremanServices/ChartService';
import _ from 'lodash';
import Immutable from 'seamless-immutable';


class OpenscapPieChart extends React.Component {
    transformData(data) {
      return _.map(data, Immutable);
    }

    render() {
      const { data } = this.props;

      console.log(this.props)
      // console.log(this.transformData(data))
      // const onclickChartClicked = chart.search && chart.search.match(/=$/) ?
      //   null :
      //   navigateToSerach.bind(null, chart.search);

      const pie = (
        <PieChart
          // key={ chart.id + '-chart' }
          // key={ 'some-chart' }
          data={ this.transformData(data) }
          // onclick={ onclickChartClicked }
        />
      );
      // const pie = <p>I am a pie!</p>
      return pie;
    }
}

export default OpenscapPieChart;
