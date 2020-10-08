import { BASE_URL, GUARDIAN_API_KEY } from '../constants';
import { warning } from './toast';

let requestCounter = 0;

export const api_fetch = (params, pagination, options) => {
    requestCounter++;
    updateLoader();
    const { currentPage } = pagination;
    const formattedParams = getFormattedParams(params, currentPage);

    return fetch(BASE_URL + '?' + formattedParams, options)
        .then((response) => response.json())
        .then((response) => response.response)
        .catch((error) => warning(error))
        .finally(() => {
            requestCounter--;
            updateLoader();
        });
};

const getFormattedParams = (paramsObj, currentPage) => {
    const esc = encodeURIComponent;
    const queryParams = {
        'api-key': GUARDIAN_API_KEY,
        page: currentPage,
        ...paramsObj,
    };
    return Object.keys(queryParams)
        .filter((k) => !!queryParams[k])
        .map((k) => `${esc(k)}=${esc(queryParams[k])}`)
        .join('&');
};

const updateLoader = () => {
    const spinnerContainer = document.getElementById('spinner');
    if (requestCounter <= 0) {
        spinnerContainer.style.display = 'none';
    } else {
        spinnerContainer.style.display = 'initial';
    }
};
