import componentRegistry from 'foremanReact/components/componentRegistry';
import OpenscapPieChart from './OpenscapPieChart';
import openscapReducer from './reducers';
import Policies from './components/policies';
// import { injectReducer } from 'foremanReact/redux';

componentRegistry.registerMultiple([{ name: 'OpenscapPieChart', type: OpenscapPieChart },
                                    { name: 'Policies', type: Policies },
                                   ]);

// injectReducer('oscap', openscapReducer);
