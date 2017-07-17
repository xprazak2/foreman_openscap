import componentRegistry from 'foremanReact/components/componentRegistry';
import OpenscapPieChart from './OpenscapPieChart';
import openscapReducer from './reducers';
import Policies from './components/policies';
import { injectReducer } from 'redux-injector';
// import { registerReducer } from 'foremanReact/common/MountingService';

componentRegistry.registerMultiple([{ name: 'OpenscapPieChart', type: OpenscapPieChart },
                                    { name: 'Policies', type: Policies },
                                   ]);

// injectReducer('hosts.content', openscapReducer);

injectReducer('hosts.content', openscapReducer);
