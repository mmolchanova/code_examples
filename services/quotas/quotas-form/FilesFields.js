import PropTypes from 'prop-types';
import {useContext} from 'react';

import {Form} from '../../../app/web/components/form/form/Form';
import {getContextError} from '../../../app/web/components/form/form/form-context-utils';
import {FormContext} from '../../../app/web/components/form/form/FormContext';
import {FormError} from '../../../app/web/components/form/form/FormError';
import {Group} from '../../../app/web/components/form/group/Group';
import {HelpBlock} from '../../../app/web/components/form/HelpBlock';
import {getFieldId} from '../fields';

import styles from './FilesFields.module.scss';


const margin = {
    top: true
};

export function FilesFields({
    data,
    defaultData,
    checkboxProps,
    inputProps,
    children
}) {
    const {name: checkboxName, label: checkboxLabel, field} = checkboxProps;
    const {name: inputName} = inputProps;

    const context = useContext(FormContext);
    const {message: errorMessage = []} = getContextError(
        context,
        inputProps
    ) || {};

    return (
        <Group margin={margin}>
            <Form.CheckedRow
                id={getFieldId(checkboxName)}
                name={checkboxName}
                type={'checkbox'}
                defaultChecked={!data[field]}
            >
                {checkboxLabel}
            </Form.CheckedRow>
            <Group row>
                <div className={styles.inputWrap}>
                    <Form.InputGroup
                        id={getFieldId(inputName)}
                        name={inputName}
                        addon={'МБ'}
                        size={140}
                    >
                        <Form.Input
                            id={getFieldId(inputName)}
                            name={inputName}
                            defaultValue={data[inputName]}
                            inputMode={'numeric'}
                            placeholder={defaultData[inputName]}
                        />
                    </Form.InputGroup>
                </div>
                {errorMessage[0] ?
                    <FormError
                        id={getFieldId(inputName)}
                        name={inputName}
                    /> :
                    <HelpBlock className={styles.helpBlock}>
                        {children}
                    </HelpBlock>
                }
            </Group>
        </Group>
    );
}

FilesFields.propTypes = {
    data: PropTypes.object,
    defaultData: PropTypes.object,
    checkboxProps: PropTypes.shape({
        field: PropTypes.string,
        name: PropTypes.string,
        label: PropTypes.string
    }),
    inputProps: PropTypes.shape({
        name: PropTypes.string
    }),
    children: PropTypes.node
};
