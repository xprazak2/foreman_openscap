import componentRegistry from 'foremanPlugins/componentRegistry';
import OpenscapPieChart from './OpenscapPieChart';
import reducerRegistry from 'foremanPlugins/reducerRegistry';
import rootReducer from './reducers';

// componentRegistry.register('OpenscapPieChart', { type: OpenscapPieChart, store: true, data: true });
componentRegistry.registerMultiple({'OpenscapPieChart': { type: OpenscapPieChart, store: true, data: true },
                                     'Blueberry': { type: Blueberry, store: false, data: false }
                                   });




