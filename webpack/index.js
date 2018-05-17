import componentRegistry from 'foremanReact/components/componentRegistry';
import OpenscapPieChart from './OpenscapPieChart';
import openscapReducer from './reducers';
import Policies from './components/policies';
import XccdfRules from './components/XccdfRules';
import ScapContentProfiles from './components/ScapContentProfiles';
import injectReducer from 'foremanReact/redux/reducers/registerReducer';


console.log('hola')

componentRegistry.registerMultiple([{ name: 'OpenscapPieChart', type: OpenscapPieChart },
                                    { name: 'Policies', type: Policies },
                                    { name: 'XccdfRules', type: XccdfRules },
                                    { name: 'ScapContentProfiles', type: ScapContentProfiles }
                                   ]);

injectReducer('foreman_openscap', openscapReducer);
