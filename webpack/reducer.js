import { combineReducers } from 'redux';

import { reducers as scapContentProfiles } from './routes/ScapContentProfiles';

export default combineReducers({ ...scapContentProfiles });
