// @flow
export const FLY_FROM_CHANGE = 'search-form/FLY_FROM_CHANGE';
export const FLY_TO_CHANGE = 'search-form/FLY_TO_CHANGE';
export const DATE_FROM_CHANGE = 'search-form/DATE_FROM_CHANGE';
export const DATE_TO_CHANGE = 'search-form/DATE_TO_CHANGE';

export const changeFlyFrom = (locationId: string) => ({ type: FLY_FROM_CHANGE, locationId });
export const changeFlyTo = (locationId: string) => ({ type: FLY_TO_CHANGE, locationId });
export const changeDateFrom = (date: string) => ({ type: DATE_FROM_CHANGE, date });
export const changeDateTo = (date: string) => ({ type: DATE_TO_CHANGE, date });

