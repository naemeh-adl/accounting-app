import InitializeAccount from "../api/InitializeAccount";
import MockServer from "../api/MockServer";
export default function InitializeServer(){
// var hasUser = localStorage.hasOwnProperty("Savedprofiles");
// if (!hasUser) {
//   localStorage.setItem(
//     "Savedprofiles",
//     JSON.stringify([
//       {
//         email: "nami@gmail.com",
//         displayname: "Naeme",
//         password: "123",
//         token: "fc51-4c72-b7ed-2d62886b5449",
//       },
//     ])
//   );
//   localStorage.setItem('jwt', "fc51-4c72-b7ed-2d62886b5449");
//   InitializeAccount()
// } else {
//   let oldusers = localStorage.getItem("Savedprofiles");
//   localStorage.setItem("Savedprofiles", oldusers + "");
// }
MockServer();
}