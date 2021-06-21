import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import AccountList from './AccountList';

export default observer(function AccountDashboard() {
    const {accountStore} = useStore();
    const {loadAccounts, accountRegistry} = accountStore;

    useEffect(() => {
      if (accountRegistry.size <= 1) loadAccounts();
    }, [accountRegistry.size, loadAccounts])
  
    if (accountStore.loadingInitial) return <LoadingComponent content='Loading accounts...' />

    return (
        <Grid>
            <Grid.Column >
                <AccountList />
            </Grid.Column>
        </Grid>
    )
})