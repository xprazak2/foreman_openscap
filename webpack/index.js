import componentRegistry from 'foremanReact/components/componentRegistry';
import OpenscapPieChart from './OpenscapPieChart';
import rootReducer from './reducers';

componentRegistry.register({ name: 'OpenscapPieChart', type: OpenscapPieChart });
