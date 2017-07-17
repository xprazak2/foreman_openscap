import componentRegistry from 'foremanReactCommon/componentRegistry';
import OpenscapPieChart from './OpenscapPieChart';
let Blueberry = "Blueberry"

// componentRegistry.register('OpenscapPieChart', { type: OpenscapPieChart, store: true, data: true });
componentRegistry.registerMultiple({'OpenscapPieChart': { type: OpenscapPieChart, store: true, data: true },
                                     'Blueberry': { type: Blueberry, store: false, data: false }
                                   });
