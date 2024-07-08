
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import RoundButton from "@/components/RoundButton";
import Dropdown from "@/components/DropDown";
import { useBalanceStore } from "@/store/balanceStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {useHeaderHeight} from "@react-navigation/elements";

interface Transaction {
    id: string,
    amount: number,
    date: Date,
    title: string
}

const Home = () => {
    const [balance, setBalance] = useState<number>(0);
    // const {balance,runTransaction,transaction,clearTransactions} = useBalanceStore();


    const initialTransaction: Transaction[] = [{
        id: Math.random().toString(),
        amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
        date: new Date(),
        title: 'Add Money',
    }]
    const [transactionData, setTransactionData] = useState<Transaction[]>(initialTransaction);

    const onAddMoney = async () => {
        // Update transactionData state (example)
        const newTransaction: Transaction = {
            id: Math.random().toString(),
            amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
            date: new Date(),
            title: 'Add Money',
        };

        // Calculate the updated balance based on the new transaction
        const updatedBalance = balance + newTransaction.amount;

        // Update balance state
        setBalance(updatedBalance);

        // Add new transaction to existing transactions
        const updatedTransactions = [...transactionData, newTransaction];

        const jsonTransaction = JSON.stringify(updatedTransactions);

        await AsyncStorage.setItem("transaction", jsonTransaction);
        const storedTransaction = await AsyncStorage.getItem("transaction");
        // const data = await AsyncStorage.getItem("title");
        if (storedTransaction) {
            const parsedTransaction = JSON.parse(storedTransaction);
            setTransactionData(parsedTransaction);
            // setBalance(parsedTransaction.map((item)=>{

            // }))
            console.log("transactionData", transactionData);

        }


    }

    const clearTransactions = async () => {
        await AsyncStorage.removeItem("transaction");
        setBalance(0);
        setTransactionData([]);
    }

    const headerHeight = useHeaderHeight();
    return (
        <ScrollView contentContainerStyle={{
         paddingTop:headerHeight,
         paddingBottom:100
        }}>
            <View style={inStyles.account}>
                <View style={inStyles.row}>
                    <Text style={inStyles.balance}>{balance}</Text>
                    <Text style={inStyles.currency}>$</Text>
                </View>
            </View>

            <View style={inStyles.actionrow}>
                <RoundButton icon={'add'} text={'Add Money'} onPress={onAddMoney} />
                <RoundButton icon={'refresh'} text={'Exchange'} onPress={clearTransactions} />
                <RoundButton icon={'list'} text={'Details'} />
                <RoundButton icon={'ellipsis-horizontal-outline'} text={'More'} />
            </View>

            <Text style={inStyles.sectionheader}>Transaction data</Text>
            <View style={inStyles.transactions}>
                {
                    transactionData.length === 0 ? <Text style={{ color: 'grey', padding: 14 }}>No Transactions</Text> : ''
                }

                {
                    transactionData.reverse().map(transaction => (
                        <View key={transaction.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                            <View style={inStyles.circle} >
                                <Ionicons name={transaction.amount > 0 ? 'add' : 'remove'} size={24} />


                            </View>
                            <View style={{flex:1}}>
                                <Text style={{ fontWeight: '400' }}>{transaction.title}</Text>
                                <Text style={{ color: 'grey', fontSize: 12 }}>{transaction.date.toLocaleString()}</Text>
                                

                                
                            </View>
                            <Text>{transaction.amount}$</Text>

                        </View>

                    ))
                }
            </View>
            <View >



            </View>

        </ScrollView>
    )
}

const inStyles = StyleSheet.create({
    account: {
        margin: 80,
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 10
    },
    balance: {
        fontSize: 60,
        fontWeight: 'bold'
    },
    currency: {
        fontSize: 30,
        fontWeight: '500'
    },
    actionrow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        // margin: 10
    },
    sectionheader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        margin: 20,
        marginTop: 10
    },
    transactions: {
        marginHorizontal: 20,
        // margin:15,
        // color:'grey',
        // fontSize:15,
        padding: 14,
        backgroundColor: '#fff',
        borderRadius: 16,
        gap: 20
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default Home;