const openscapState = state => state.foremanOpenscap;

const profilesState = state => openscapState(state).scapContentProfiles || {};

export const selectScapContentProfiles = state => profilesState(state).results;
