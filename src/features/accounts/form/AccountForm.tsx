import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import { Account } from '../../../app/models/account';

export default observer(function AccountForm() {
    const history = useHistory();
    const { accountStore } = useStore();
    const { createAccount, loading, loadAccount, loadingInitial } = accountStore;
    const { id } = useParams<{ id: string }>();

    const [account, setAccount] = useState<Account>({
        id: '',
        name: '',
        type: '',
        description: '',
        date: null,
        status: '',
        userRef:''
    });

    const validationSchema = Yup.object({
        name: Yup.string().required('The account name is required'),
        description: Yup.string(),
        type: Yup.string().required(),
         })

    useEffect(() => {
        if (id) loadAccount(id).then(account => setAccount(account!))
    }, [id, loadAccount]);

    function handleFormSubmit(account: Account) {
        if (account.id.length === 0) {
            let newAccount = {
                ...account,
                id: uuid()
            };
            createAccount(newAccount).then(() => history.push(`/accounts/`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading account...' />

    return (
        <Segment clearing>
            <Header content='Account Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={account} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='name' placeholder='Name' />
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <MySelectInput options={categoryOptions} placeholder='Type'  name='type' />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right' 
                            positive type='submit' content='Submit' />
                        <Button as={Link} to='/accounts' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})