import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';

import {Typography} from '../typography/Typography';

import {ScrollProvider} from './ScrollProvider';


export function PageContent({
    children
}) {
    const [el, setEl] = useState();

    useEffect(() => {
        setEl(document.querySelector('.page__content'));
    }, []);

    return (
        <Typography variant={'base'}>
            <ScrollProvider el={el}>
                {children}
            </ScrollProvider>
        </Typography>
    );
}

PageContent.propTypes = {
    children: PropTypes.node.isRequired
};
