import {useCallback, useState} from 'react';

import {useElementListener} from './use-element-listener';


export function useWindowSize() {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const updateSize = useCallback(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }, []);

    useElementListener(window, 'resize', updateSize);

    return {
        width,
        height
    };
}
