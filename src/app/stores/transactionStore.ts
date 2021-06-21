import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Transaction } from "../models/transactions";

export default class TransactionStore {
    TransactionRegistry = new Map<string, Transaction>();
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }
    loadTransactions = async (AccountId: string) => {
        return await agent.Transactions.listByAccount(AccountId);
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
}