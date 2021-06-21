
export default function InitializeAccount(){
  let UserRef= localStorage.getItem('jwt');
   var hasAccountProperty = localStorage.hasOwnProperty("SavedAccounts");
   var hasTransactionProperty = localStorage.hasOwnProperty("SavedTransactions");
   var hasAccount=false;
   let AllPrevAccounts =null;
   let AllPrevTransactions =null;
   if(hasAccountProperty){
   AllPrevAccounts = JSON.parse(localStorage.getItem("SavedAccounts"));
   AllPrevTransactions = JSON.parse(localStorage.getItem("SavedTransactions"));
  let currentUserAccounts = AllPrevAccounts.filter(function (pro) {
    return pro.userRef === UserRef        
  });
  if(currentUserAccounts.length>=1){
    hasAccount=true;
    }
  }
if (!hasAccount) {
  // let UserRef="fc51-4c72-b7ed-2d62886b5449";
  // InitializeAccount({UserRef:UserRef});
    let userAccountsArray=[
      {
        id: "f43f0e70-fc51-4c72-b7ed-2d62886b5449",
        name: "NetBankSaver",
        date: "2021-04-17T13:55:20",
        description: "Default Account",
        type: "netbankSaver",
        status: "Approved",
        userRef: UserRef
      },
      {
        id: "a2b07fbd-66bd-4311-9bff-ba05f808320e",
        name: "SmartAccess",
        date: "2021-05-17T13:55:21",
        description: "Default Account",
        type: "smartAccess",
        status: "Approved",
        userRef: UserRef
      },
      {
        id: "8fc3074b-c1c5-4345-a878-ebddfcf8d57d",
        name: "Everyday",
        date: "2021-07-17T13:55:22",
        description: "Default Account",
        type: "everyday",
        status: "Approved",
        userRef: UserRef
      },
    ];
    let TransactionArray=[
      {
        id: "8fc3074b-c1c5",
        date: "2021-04-17T13:55:23",
        description: "Shopping1",
        AccountRef: "f43f0e70-fc51-4c72-b7ed-2d62886b5449",
        Credit: null,
        Debit:  100,
        Blance: 150
      },
      {
        id: "8fc3074b-c1c5",
        date: "2021-04-17T13:55:24",
        description: "Payment1",
        AccountRef: "f43f0e70-fc51-4c72-b7ed-2d62886b5449",
        Credit: 50,
        Debit:  null,
        Blance: 200
      },
      {
        id: "a2b07fbd-ddcc",
        date: "2021-05-17T13:55:25",
        description: "Shopping2",
        AccountRef: "a2b07fbd-66bd-4311-9bff-ba05f808320e",
        Credit: null,
        Debit:  567,
        Blance: 5600
      },
      {
        id: "a2b07fbd-aabb",
        date: "2021-05-17T13:55:26",
        description: "Payment2",
        AccountRef: "a2b07fbd-66bd-4311-9bff-ba05f808320e",
        Credit: 10,
        Debit:  null,
        Blance: 5610
      },
      {
        id: "a2b07fbd-kkkk",
        date: "2021-07-17T13:55:27",
        description: "Shopping3",
        AccountRef: "8fc3074b-c1c5-4345-a878-ebddfcf8d57d",
        Credit: null,
        Debit:  50,
        Blance: 52369
      },
      {
        id: "a2bkkkbd-66bd",
        date: "2021-07-17T13:55:28",
        description: "Payment3",
        AccountRef: "8fc3074b-c1c5-4345-a878-ebddfcf8d57d",
        Credit: 50,
        Debit:  null,
        Blance: 52419
      }
    ];
    if(AllPrevAccounts && hasAccountProperty)
    AllPrevAccounts.forEach(element => {
       userAccountsArray.push(element);
    });
    if(AllPrevTransactions && hasTransactionProperty)
    AllPrevTransactions.forEach(element => {
      TransactionArray.push(element);
    });
    localStorage.setItem(
        "SavedAccounts",
        JSON.stringify(userAccountsArray)
      );
      localStorage.setItem(
        "SavedTransactions",
        JSON.stringify(TransactionArray)
      );
     }
    

}