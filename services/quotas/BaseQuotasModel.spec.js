import {BaseQuotasModel} from './BaseQuotasModel';
import {
    ATTACHMENT_FORBIDDEN,
    ATTACHMENT_MAX_SIZE,
    LINK_FORBIDDEN,
    LINK_MAX_SIZE,
    MAILBOX_SIZE,
    MAILBOX_WARNING_SIZE
} from './fields';



describe('BaseQuotasModel', function() {
    describe('validate', function() {
        beforeEach(function() {
            this.model = new BaseQuotasModel(null, {
                domainId: 123
            });
        });

        it('should validate mailbox size more than 100', function() {
            expect(this.model.validate({
                [MAILBOX_SIZE]: 101
            })).toContain({
                field: MAILBOX_SIZE,
                message: ['Размер ящика не может превышать 100 МБ']
            });
        });

        it('should validate mailbox warning size more than 100', function() {
            expect(this.model.validate({
                [MAILBOX_WARNING_SIZE]: 101
            })).toContain({
                field: MAILBOX_WARNING_SIZE,
                message: ['Введите значение от 0 до 100']
            });
        });

        it('should validate mailbox warning size less than 0', function() {
            expect(this.model.validate({
                [MAILBOX_WARNING_SIZE]: -1
            })).toContain({
                field: MAILBOX_WARNING_SIZE,
                message: ['Введите значение от 0 до 100']
            });
        });

        it('should validate attachment max size less than 0, if attachments are allowed', function() {
            expect(this.model.validate({
                [ATTACHMENT_FORBIDDEN]: false,
                [ATTACHMENT_MAX_SIZE]: -1
            })).toContain({
                field: ATTACHMENT_MAX_SIZE,
                message: ['Значение не может быть отрицательным']
            });
        });

        it('should validate attachment max size more than 2000, if attachments are allowed', function() {
            expect(this.model.validate({
                [LINK_FORBIDDEN]: false,
                [LINK_MAX_SIZE]: 2001
            })).toContain({
                field: LINK_MAX_SIZE,
                message: ['Размер отправляемых ссылками файлов не может быть больше 2000 МБ']
            });
        });

        it('should validate link max size less than 0, if links are allowed and attachments are forbidden', function() {
            expect(this.model.validate({
                [ATTACHMENT_FORBIDDEN]: true,
                [LINK_FORBIDDEN]: false,
                [LINK_MAX_SIZE]: -1
            })).toContain({
                field: LINK_MAX_SIZE,
                message: ['Значение не может быть отрицательным']
            });
        });

        it('should validate link max size less than attachment max size, if links and attachments are allowed', function() {
            expect(this.model.validate({
                [ATTACHMENT_FORBIDDEN]: false,
                [LINK_FORBIDDEN]: false,
                [ATTACHMENT_MAX_SIZE]: 20,
                [LINK_MAX_SIZE]: 10
            })).toContain({
                field: LINK_MAX_SIZE,
                message: ['Размер отправляемых ссылками файлов не может быть меньше вложениий']
            });
        });
    });
});
