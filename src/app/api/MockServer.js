import { Server } from "miragejs";
import { v4 as uuid } from 'uuid';
const MockServer = ()=>{
   return new Server({
    routes() {
    this.namespace = "api";
    this.get("/accounts/", () => {
    let currentToken=localStorage.getItem('jwt');
    let allUserAccounts = localStorage.hasOwnProperty("SavedAccounts")?JSON.parse(localStorage.getItem('SavedAccounts')).filter(function (pro) {
        return pro.userRef === currentToken        
      }):[];
      return allUserAccounts;
    });
    this.post("/accounts/", (schema, request) => {
        let oldAccounts = localStorage.hasOwnProperty("SavedAccounts")?JSON.parse(localStorage.getItem('SavedAccounts')):[];
        if(request.requestBody){
        let account= JSON.parse(request.requestBody);
        if(account){
        oldAccounts.push(JSON.parse(request.requestBody));
        let tr1={id: uuid(),
          date: account.date,
          description: 'default for test',
          AccountRef: account.id,
          Credit: 100,
          Debit:  null,
          Blance: 1000}
        let tr2={id: uuid(),
          date: account.date,
          description: 'default for test',
          AccountRef: account.id,
          Credit: null,
          Debit:  50,
          Blance: 950}
          localStorage.setItem('SavedTransactions',JSON.stringify([tr1,tr2]));
        }
        }
        
        localStorage.setItem('SavedAccounts',JSON.stringify(oldAccounts));
        
      });
      this.get("/profile/", (request) => {
        let currentToken= localStorage.getItem('jwt');
        let currentUser = localStorage.hasOwnProperty("Savedprofiles")?JSON.parse(localStorage.getItem('Savedprofiles')).filter(function (pro) {
            return pro.token === currentToken.token        
          }):[];
          if(currentUser.length>=1){
            localStorage.setItem('CurrentUser',JSON.stringify(currentUser));
            return currentUser[0];
            }
    });
      this.post("/profile/login", (schema, request) => {
        let cred=request.requestBody? JSON.parse(request.requestBody):null;
        if(localStorage.hasOwnProperty("Savedprofiles") && cred){
        let currentUser = JSON.parse(localStorage.getItem('Savedprofiles')).filter(function (pro) {
            return pro.email === cred.email &&
                   pro.password ===cred.password                   
          });
        if(currentUser.length>=1){
        localStorage.setItem('jwt', currentUser.token);
        localStorage.setItem('CurrentUser',JSON.stringify(currentUser));
       return currentUser[0];
        }else return null;
      }else{
        return null;
      }
     });
     this.post("/profile/register", (schema, request) => { 
       
      let cred=request.requestBody?JSON.parse(request.requestBody):null;
      let newtoken=uuid();
      let newUser=cred?{password : cred.password, displayname : cred.displayname, token: newtoken, email: cred.email}:null;
      let currentUsers = localStorage.hasOwnProperty("Savedprofiles")?JSON.parse(localStorage.getItem('Savedprofiles')):[];
      if(newUser)currentUsers.push(newUser);
      localStorage.setItem('jwt', newtoken);
      if(currentUsers.length>0){
      localStorage.setItem("Savedprofiles", JSON.stringify(currentUsers));
      }
      if(newUser)
      localStorage.setItem('CurrentUser',JSON.stringify(newUser));
      // InitializeAccount();
      return newUser;
     
   });
   this.post('/transactions/',(schema, request)=>{
     if(localStorage.hasOwnProperty("SavedTransactions")){
      // let currentToken= localStorage.getItem('jwt');
      let accountTransactions = localStorage.hasOwnProperty("SavedTransactions")?JSON.parse(localStorage.getItem('SavedTransactions')).filter(function (pro) {
            return pro.AccountRef === request.requestBody //&& pro.userRef ===currentToken                 
          }):[];
        if(accountTransactions.length>=1){
        return accountTransactions;
        }else return [];
      }else return [];
   })
  }
});

}
export default MockServer;