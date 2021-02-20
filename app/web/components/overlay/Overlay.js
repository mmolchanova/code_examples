import PropTypes from 'prop-types';
import {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef
} from 'react';

import {useWindowSize} from '../hooks/use-window-size';
import {ScrollContext} from '../page-content/context';

import {
    MOUSE_LEAVE_OVERLAY_ELEMENT,
    MOUSE_LEAVE_OVERLAY_TRIGGER,
    REMOVE_OVERLAY_ELEMENT,
    SET_OVERLAY_ELEMENT_POSITION
} from './const';
import {OverlayContext} from './context';
import {initialState} from './initial-state';
import {OverlayElement} from './OverlayElement';
import {OverlayTrigger} from './OverlayTrigger';
import {reducer} from './reducer';


export function Overlay({children, position}) {
    const {isScrolling} = useContext(ScrollContext);
    const clientSize = useWindowSize();

    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        position
    });

    const callbackRef = useRef(null);
    callbackRef.current = (payload = {}) => {
        dispatch({
            type: REMOVE_OVERLAY_ELEMENT,
            payload
        });
    };

    useEffect(() => {
        if (isScrolling) {
            dispatch({
                type: MOUSE_LEAVE_OVERLAY_ELEMENT
            });
            dispatch({
                type: MOUSE_LEAVE_OVERLAY_TRIGGER
            });
        }
    }, [isScrolling, dispatch]);

    useEffect(() => {
        if (state.showOverlayElement) {
            const id = setTimeout(function() {
                if (typeof callbackRef.current === 'function') {
                    callbackRef.current();
                }
            }, 300);

            return () => clearTimeout(id);
        }
    });

    const setOverlayElementPosition = useCallback(function(triggerData) {
        dispatch({
            type: SET_OVERLAY_ELEMENT_POSITION,
            payload: {
                triggerData,
                clientSize: {
                    width: clientSize.width,
                    height: clientSize.height
                }
            }
        });
    }, [clientSize.width, clientSize.height]);

    const {
        showOverlayElement,
        triggerData,
        overlayElementPosition,
        overlayElementSize
    } = state;

    const contextValue = useMemo(function() {
        return {
            showOverlayElement,
            triggerData,
            overlayElementSize,
            overlayElementPosition,
            dispatch,
            setOverlayElementPosition
        };
    }, [
        showOverlayElement,
        triggerData,
        overlayElementPosition,
        setOverlayElementPosition,
        overlayElementSize
    ]);

    return (
        <OverlayContext.Provider value={contextValue}>
            {children}
        </OverlayContext.Provider>
    );
}

Overlay.displayName = 'Overlay';

Overlay.Trigger = OverlayTrigger;
Overlay.Element = OverlayElement;

Overlay.propTypes = {
    children: PropTypes.node.isRequired,
    position: PropTypes.oneOf([
        'up center',
        'down center'
    ])
};

Overlay.defaultProps = {
    position: 'up center'
};
