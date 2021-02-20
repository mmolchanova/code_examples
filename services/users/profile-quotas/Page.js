import {IRouter} from '../../../app/web/router/react/interfaces';
import {RouterProvider} from '../../../app/web/router/react/RouterProvider';
import {SessionProvider} from '../../../app/web/session/SessionProvider';
import {PageContent} from '../../../app/web/components/page-content/PageContent';
import {StoreContext} from '../../../app/web/components/state-manange';
import {IStore} from '../../../app/web/components/state-manange/interfaces';
import {QuotasConfirmDialog} from '../../quotas/quotas-confirm-dialog';

import {Header} from './Header';
import {QuotasForm} from './QuotasForm';


export function Page({
    store,
    router
}) {
    return (
        <RouterProvider router={router}>
            <StoreContext.Provider value={{
                store
            }}>
                <SessionProvider>
                    <PageContent>
                        <Header />
                        <QuotasForm />
                        <QuotasConfirmDialog isUserQuotas={true} />
                    </PageContent>
                </SessionProvider>
            </StoreContext.Provider>
        </RouterProvider>
    );
}


Page.propTypes = {
    store: IStore.isRequired,
    router: IRouter
};
