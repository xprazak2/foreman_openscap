import componentRegistry from 'foremanReact/components/componentRegistry';
import injectReducer from 'foremanReact/redux/reducers/registerReducer';

import ScapContentProfiles from './routes/ScapContentProfiles';
import reducer from './reducer';

componentRegistry.register({
  name: 'ScapContentProfiles',
  type: ScapContentProfiles,
});

injectReducer('foremanOpenscap', reducer);
