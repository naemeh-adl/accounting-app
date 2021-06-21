import { Server } from "miragejs";
import InitializeAccount from "./InitializeAccount";
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
    let allUserAccounts = JSON.parse(localStorage.getItem('SavedAccounts')).filter(function (pro) {
        return pro.userRef === currentToken        
      });
      return allUserAccounts;
    });
    this.post("/accounts/", (schema, request) => {
        let oldAccounts = JSON.parse(localStorage.getItem('SavedAccounts'));
        oldAccounts.push(JSON.parse(request.requestBody));
        localStorage.setItem('SavedAccounts',JSON.stringify(oldAccounts));
        
      });
      this.get("/profile/", () => {
        let currentToken=localStorage.getItem('jwt');
        let currentUser = JSON.parse(localStorage.getItem('Savedprofiles')).filter(function (pro) {
            return pro.token === currentToken.token        
          });
          if(currentUser.length>=1){
            localStorage.setItem('CurrentUser',JSON.stringify(currentUser));
            return currentUser[0];
            }
    });
      this.post("/profile/login", (schema, request) => {
        let cred=JSON.parse(request.requestBody);
        let currentUser = JSON.parse(localStorage.getItem('Savedprofiles')).filter(function (pro) {
            return pro.email === cred.email &&
                   pro.password ===cred.password                   
          });
        if(currentUser.length>=1){
        localStorage.setItem('CurrentUser',JSON.stringify(currentUser));
        localStorage.setItem('jwt', currentUser.token);

        return currentUser[0];
        }else return null;
     });
     this.post("/profile/register", (schema, request) => { 
      let cred=JSON.parse(request.requestBody);
      let newtoken=generate_token(15);
      let newUser={password : cred.password, displayname : cred.displayname, token: newtoken, email: cred.email};
      let currentUsers = JSON.parse(localStorage.getItem('Savedprofiles'));
      currentUsers.push(newUser);
      localStorage.setItem("Savedprofiles", JSON.stringify(currentUsers));
      localStorage.setItem('CurrentUser',JSON.stringify(newUser));
      localStorage.setItem('jwt', newtoken);
      InitializeAccount();
      return newUser;
   });
   this.post('/transactions/',(schema, request)=>{
     if(localStorage.hasOwnProperty("SavedTransactions")){
      let accountTransactions = JSON.parse(localStorage.getItem('SavedTransactions')).filter(function (pro) {
            return pro.AccountRef === request.requestBody                  
          });
        if(accountTransactions.length>=1){
        return accountTransactions;
        }else return null;
      }else return null;
   })
  }
});

}
export default MockServer;