import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User } from "../models/user";
import { store } from "./store";

export default class USerStore{
    user: User | null =null;
    refreshTokenTimeout: any;
    constructor(){
        makeAutoObservable(this)
    }
    get isLoggedIn(){
        return !! this.user;
    }
    login= async (creds: User)=>{
        try{
            const user= await agent.profile.login(creds);
            if(user){
            store.commonStore.setToken(user.token);
            localStorage.setItem('jwt', user.token);
            runInAction(() => this.user = user);
            //history.push('/accounts');
            store.modalStore.closeModal();
            }else{
                throw new Error('Wrong Credentials');
            }
        }catch(error){
            throw error;
        }
    }
    logout= ()=>{
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }
    getUser = async () => {
        try {
            const user = await agent.profile.current();
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }
    register = async (creds: User) => {
        try{
            debugger;
            const user= await agent.profile.register(creds);
            if(user){
            store.commonStore.setToken(user.token);
            localStorage.setItem('jwt', user.token);
            runInAction(() => this.user = user);
            this.login(user);
            //history.push('/accounts');
            store.modalStore.closeModal();
            }else{
                throw new Error('Error in Saving!');
            }
        }catch(error){
            throw error;
        }
    }
}