import PropTypes from 'prop-types';
import {useCallback, useState} from 'react';

import {useRoute} from '../../../app/web/router/react/use-route';
import {ControlsItem} from '../../../app/web/components/controls-group/ControlsItem';
import {withControlsGroup} from '../../../app/web/components/controls-group/with-controls-group';
import {Form} from '../../../app/web/components/form/form/Form';
import {Group} from '../../../app/web/components/form/group/Group';
import {
    ATTACHMENT_FORBIDDEN,
    ATTACHMENT_MAX_SIZE,
    DEFAULT_VALUES,
    LINK_FORBIDDEN,
    LINK_MAX_SIZE,
    MAILBOX_SIZE,
    MAILBOX_WARNING_SIZE,
    SUBMIT,
    _ATTACHMENT_ALLOWED,
    _LINK_ALLOWED,
    getFieldId
} from '../fields';

import {AttachmentHelp} from './AttachmentHelp';
import {FilesFields} from './FilesFields';
import {LinkHelp} from './LinkHelp';
import {mapDataValue} from './map-data-value';
import styles from './PureQuotasForm.module.scss';
import {QuotaInput} from './QuotaInput';


const ControlsGroup = withControlsGroup({
    classNameProp: 'classNameContent'
})(Group);

const topBorder = {
    top: true
};
const margin = {
    top: true,
    bottom: 'divide'
};
const attachmentCheckboxProps = {
    field: ATTACHMENT_FORBIDDEN,
    name: _ATTACHMENT_ALLOWED,
    label: 'Отправлять вложениями до'
};
const attachmentInputProps = {
    name: ATTACHMENT_MAX_SIZE
};
const linkCheckboxProps = {
    field: LINK_FORBIDDEN,
    name: _LINK_ALLOWED,
    label: 'Отправлять ссылками до'
};
const linkInputProps = {
    name: LINK_MAX_SIZE
};


export function PureQuotasForm({
    username,
    isLoading,
    data,
    defaultData,
    errors,
    onSubmit,
    onChange,
    onReturnDefaults
}) {
    const [formKey, setFormKey] = useState(null);
    const onReset = useCallback(function() {
        onReturnDefaults();
        setFormKey(Date.now());
    }, [onReturnDefaults]);

    const profileUrl = useRoute('users:profile', {
        userName: username
    });

    const filesLabel = (
        <Form.Label>
            Файлы в письмах
        </Form.Label>
    );

    return (
        <Form
            key={formKey}
            className={styles.root}
            disabled={isLoading}
            mapDataValue={mapDataValue}
            errors={errors}
            onChange={onChange}
            onSubmit={onSubmit}
        >
            <QuotaInput
                name={MAILBOX_SIZE}
                addon={'МБ'}
                data={data}
                defaultData={defaultData}
            >
                Размер ящика
            </QuotaInput>
            <QuotaInput
                name={MAILBOX_WARNING_SIZE}
                addon={'%'}
                data={data}
                defaultData={defaultData}
            >
                Объем ящика, при котором запрещено отправлять письма
            </QuotaInput>
            <Group
                margin={margin}
                label={filesLabel}
            >
                <FilesFields
                    checkboxProps={attachmentCheckboxProps}
                    inputProps={attachmentInputProps}
                    data={data}
                    defaultData={defaultData}
                >
                    <AttachmentHelp
                        defaultData={defaultData}
                    />
                </FilesFields>
                <FilesFields
                    checkboxProps={linkCheckboxProps}
                    inputProps={linkInputProps}
                    data={data}
                    defaultData={defaultData}
                >
                    <LinkHelp
                        defaultData={defaultData}
                    />
                </FilesFields>
            </Group>

            <ControlsGroup
                border={topBorder}
                className={styles.formControls}
            >
                <ControlsItem>
                    <Form.Button
                        id={getFieldId(SUBMIT)}
                        style={'primary'}
                        type={'submit'}
                    >
                        Сохранить
                    </Form.Button>
                </ControlsItem>

                {profileUrl && <ControlsItem>
                    <Form.Button
                        as={'a'}
                        href={profileUrl}
                    >
                        Отменить
                    </Form.Button>
                </ControlsItem>}

                <ControlsItem>
                    <Form.Button
                        id={getFieldId(DEFAULT_VALUES)}
                        style={'ghost'}
                        className={styles.buttonReturn}
                        onClick={onReset}
                    >
                        Вернуть рекомендуемые значения
                    </Form.Button>
                </ControlsItem>
            </ControlsGroup>
        </Form>
    );
}

PureQuotasForm.propTypes = {
    username: PropTypes.string,
    isLoading: PropTypes.bool,
    data: PropTypes.object,
    defaultData: PropTypes.object,
    errors: PropTypes.array,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    onReturnDefaults: PropTypes.func
};
