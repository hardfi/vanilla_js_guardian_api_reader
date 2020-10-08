import { TOAST_SHOW_TIME } from '../constants';

export const warning = (text) => {
    const toast = document.getElementById('toast');
    toast.innerText = text;
    toast.style.top = '2rem';
    setTimeout(() => {
        toast.style.top = '-300px';
    }, TOAST_SHOW_TIME);
};
