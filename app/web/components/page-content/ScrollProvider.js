import PropTypes from 'prop-types';
import {useCallback, useMemo, useState} from 'react';

import {useDebounce} from '../hooks/use-debounce';
import {useElementListener} from '../hooks/use-element-listener';

import {ScrollContext} from './context';


export function ScrollProvider({el, children}) {
    const [isScrolling, setScrolling] = useState(false);

    const setScrollingFalse = useCallback(() => {
        setScrolling(false);
    }, []);

    const debounced = useDebounce(setScrollingFalse, 150);
    const callback = useCallback(() => {
        setScrolling(true);
        debounced();
    }, [debounced]);

    useElementListener(el, 'scroll', callback);

    const contextValue = useMemo(() => {
        return {
            isScrolling
        };
    }, [isScrolling]);

    return (
        <ScrollContext.Provider value={contextValue}>
            {children}
        </ScrollContext.Provider>
    );
}

ScrollProvider.displayName = 'ScrollProvider';

ScrollProvider.propTypes = {
    children: PropTypes.node,
    el: PropTypes.object
};
