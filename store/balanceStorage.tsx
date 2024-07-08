import { create } from "zustand"
import {  persist } from "zustand/middleware";
import {createJSONStorage} from "zustand/middleware";
import { zustandStorage } from "./mmkv-storage";


export interface Transaction{
    id:string,
    amount:number,
    date:Date,
    title:string
}

export interface BalanceState{
    transaction:Array<Transaction>[],
    runTransaction:(transaction:Transaction) => void,
    balance: ()=>number,
    clearTransactions: ()=> void
}

export const useBalanceStore = create<BalanceState>(
    persist((set,get)=>({
        transaction: [],
        runTransaction: (transaction:Transaction)=>{
            set((state: { transaction: any; })=>({transaction:[...state.transaction,transaction]}))
        },
        balance:()=> 0,
        clearTransactions:()=>{
            set({transaction:[]})
        },

    }),{
        name:'balance',
        storage:createJSONStorage(()=>zustandStorage)
    }) as any

  
);