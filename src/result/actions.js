export const GET_RESULTS = 'result/GET_RESULTS';
export const GET_RESULTS_SUCCESS = 'result/GET_RESULTS_SUCCESS';
export const GET_RESULTS_FAILURE = 'result/GET_RESULTS_FAILURE';
export const INVALID_INPUT = 'result/INVALID_INPUT';

export const getResults = (options) => ({ type: GET_RESULTS, ...options });
export const invalidInput = () => ({ type: INVALID_INPUT });
