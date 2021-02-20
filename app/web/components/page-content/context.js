import {getContext} from '../state-manange/get-context';

export const ScrollContext = getContext('ScrollContext', {
    isScrolling: false
});
