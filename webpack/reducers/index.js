import { combineReducers } from 'redux';
import repos from './policies';
import scapContentProfiles from './scapContentProfiles';

export default combineReducers({
    repos,
    scapContentProfiles
});
