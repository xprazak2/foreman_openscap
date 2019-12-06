import componentRegistry from 'foremanReact/components/componentRegistry';
import injectReducer from 'foremanReact/redux/reducers/registerReducer';

import ScapContentProfiles from './routes/ScapContentProfiles';

componentRegistry.register({
  name: 'ScapContentProfiles',
  type: ScapContentProfiles,
});

