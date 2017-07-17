import React from 'react';
import PieChart from 'foremanReact/components/common/charts/PieChart';
import { navigateToSerach } from 'foremanServices/ChartService';
import _map from 'lodash/map';
import Immutable from 'seamless-immutable';

class LastArfPieChart extends React.Component {
    transformData(data) {
      return _map(data, Immutable);
    }

    render() {
      const { data } = this.props;

      return (
        <PieChart
          data={ this.transformData(data) }
        />
      );
    }
}

export default LastArfPieChart;
