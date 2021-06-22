import { Server } from "miragejs";
import { v4 as uuid } from 'uuid';
const MockServer = ()=>{
    function generate_token(length){
        var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        var b = [];  
        for (var i=0; i<length; i++) {
            var j = (Math.random() * (a.length-1)).toFixed(0);
            b[i] = a[j];
        }
        return b.join("");
    }
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
        let cred=JSON.parse(request.requestBody);
        if(localStorage.hasOwnProperty("Savedprofiles")){
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
       
      let cred=JSON.parse(request.requestBody);
      let newtoken=generate_token(15);
      let newUser={password : cred.password, displayname : cred.displayname, token: newtoken, email: cred.email};
      let currentUsers = localStorage.hasOwnProperty("Savedprofiles")?JSON.parse(localStorage.getItem('Savedprofiles')):[];
      currentUsers.push(newUser);
      localStorage.setItem('jwt', newtoken);
      localStorage.setItem("Savedprofiles", JSON.stringify(currentUsers));
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