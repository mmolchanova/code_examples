import {useLayoutEffect, useRef} from 'react';
import requestFrame from 'request-frame';


const cancelAnimationFrame = requestFrame('cancel');
const requestAnimationFrame = requestFrame('request');

export function useElementListener(el, eventType, callback) {
    const idRef = useRef(null);

    useLayoutEffect(() => {
        const handle = () => {
            if (idRef.current !== null) {
                cancelAnimationFrame(idRef.current);
                idRef.current = null;
            }

            idRef.current = requestAnimationFrame(callback);
        };

        if (el) {
            el.addEventListener(eventType, handle);

            return () => el.removeEventListener(eventType, handle);
        }
    }, [el, eventType, callback]);
}
