import {UserQuotasModel} from './UserQuotasModel';


describe('UserQuotasModel', function() {
    describe('constructor ', function() {
        it('throws domain id required', function() {
            expect(() => new UserQuotasModel())
                .toThrowError(TypeError, 'BaseQuotasModel: domain id required');
        });

        it('throws user id required', function() {
            expect(() => new UserQuotasModel(null, {
                domainId: 234
            }))
                .toThrowError(TypeError, 'UserQuotasModel: user id required');
        });
    });

    describe('url ', function() {
        const userId = 124;
        const domainId = 123;

        beforeEach(function() {
            this.model = new UserQuotasModel(null, {
                domainId,
                userId
            });
        });

        it('should return correct string', function() {
            expect(this.model.url()).toEqual(`/api/domains/${domainId}/users/${userId}/settings/mail-quotas/`);
        });
    });
});
