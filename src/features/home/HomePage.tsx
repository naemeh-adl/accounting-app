import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';
import {useStore} from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

export default observer(function HomePage() {
    const {userStore, modalStore, accountStore} = useStore();
     return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
                    Accounting
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to Accounting' />
                        <Button onClick={()=>accountStore.loadAccounts()} as={Link} to='/accounts/' size='huge' inverted>
                        {/* { as={Link} to='/accounts/' size='huge' inverted>} */}
                            Show My Accounts
                        </Button>
                    </>

                ) : (
                        <>
                            <Button onClick={() => {modalStore.setSize("mini");modalStore.openModal(<LoginForm />)}} size='huge' inverted>
                                Login!
                            </Button>
                            <Button onClick={() => {modalStore.setSize("mini");modalStore.openModal(<RegisterForm />)}} size='huge' inverted>
                                Register!
                            </Button> 
                            
                        </>

                    )}
            </Container>
        </Segment>
    )
})