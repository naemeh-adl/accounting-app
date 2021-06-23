import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Account } from '../../../app/models/account';
import {format} from 'date-fns';
import {useStore} from '../../../app/stores/store';
import Transactions from '../../Transactions/Transactions';

interface Props {
    account: Account
}

export default function AccountListItem({ account }: Props) {
     const {modalStore} = useStore();
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' alt='AccountImage' circular src={`/assets/typeImages/${account.type}.png`} />
                        <Item.Content>
                            <Item.Header>
                                {account.name}
                            </Item.Header>
                            <Item.Description>{account.description}</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(account.date!, 'dd MMM yyyy h:mm aa')}
                    </span><span>
                   <span style={{color:account.status==='Pending'?'red':'green'}}> <Icon name='history' color={account.status==='Pending'?'red':'green'}/>{account.status}</span> 
                </span>
            </Segment>
            <Segment clearing>
                <span>{account.description}</span>
                 <Button onClick={() => {modalStore.setSize("large");modalStore.openModal(<Transactions accountId={account.id}/>)}} size='medium'color='teal'floated='right'content='Transactions'/> 
                
            </Segment>
        </Segment.Group>
    )
}