import componentRegistry from 'foremanPlugins/componentRegistry';
import OpenscapPieChart from './OpenscapPieChart';
import reducerRegistry from 'foremanPlugins/reducerRegistry';
import openscapReducer from './reducers';
import Policies from './components/policies';
import { addReducer, registeredReducers } from 'foremanReact/redux/reducers';

// componentRegistry.register('OpenscapPieChart', { type: OpenscapPieChart, store: true, data: true });
// reducerRegistry.register('openscap', openscapReducer);
// reducerRegistry.register('foo', 'bar');

componentRegistry.registerMultiple([{ name: 'OpenscapPieChart', type: OpenscapPieChart },
                                    { name: 'Policies', type: Policies },
                                   ]);

addReducer(openscapReducer, 'openscap');
console.log('registering reducers');
console.log(registeredReducers().keys);
