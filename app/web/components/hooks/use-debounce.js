import {useEffect, useMemo} from 'react';

import {debounce} from '../../../../utilities';


export function useDebounce(callback, ms) {
    const debounced = useMemo(function() {
        return debounce(callback, ms);
    }, [callback, ms]);

    useEffect(function() {
        return () => debounced.cancel();
    }, [debounced]);

    return debounced;
}
