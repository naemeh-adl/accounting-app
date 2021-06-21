import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Label, Table} from 'semantic-ui-react';
import { Transaction } from '../../app/models/transactions';
import { useStore } from '../../app/stores/store';
interface Props {
  accountId: string;
}
export default observer(function Transactions(props:Props){
    const {transactionStore} = useStore();
    const [transactions, settransactions] = useState<Transaction[]>([]);
 const {loadTransactions} = transactionStore;
    useEffect(() => {
      loadTransactions(props.accountId).then(x=>settransactions(x));
      debugger;
    }, [props.accountId, loadTransactions])
  
    return(
        <Table celled>
        <Table.Header>
          <Table.Row>
           <Table.HeaderCell > </Table.HeaderCell> 
            <Table.HeaderCell >Date</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Credit</Table.HeaderCell>
            <Table.HeaderCell>Debit</Table.HeaderCell>
            <Table.HeaderCell>Balance</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
        {transactions.map(x=>(
        <Table.Row>
            <Table.Cell>
              <Label ribbon color={x.Debit==null?"green":"red"}>{x.Debit==null?"+":"-"}</Label>
            </Table.Cell>
            <Table.Cell>{x.date}</Table.Cell>
            <Table.Cell>{x.description}</Table.Cell>
            <Table.Cell>{x.Credit}</Table.Cell>
            <Table.Cell>{x.Debit}</Table.Cell>
            <Table.Cell>{x.Blance}</Table.Cell>
          </Table.Row>
        ))}  
        </Table.Body>  
        <Table.Footer>
          <Table.Row>       
          </Table.Row>
        </Table.Footer>
      </Table>
      
    )
})