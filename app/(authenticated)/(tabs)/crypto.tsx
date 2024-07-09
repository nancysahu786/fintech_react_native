import { useEffect } from "react";
import { View, Text,Image, TouchableOpacity, ScrollView,StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query"
import { Link } from "expo-router";
import {useHeaderHeight} from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";

const Crypto = () => {
    const currencies = useQuery({
        queryKey: ['currencies'],
        queryFn: () => fetch('/api/listings').then((res) => res.json())
    })

    const ids = currencies.data?.map((currency: any) => currency.id).join(',');
    console.log(ids);

    const {data} = useQuery({
        queryKey:['info','ids'],
        queryFn:()=>fetch(`/api/info?id=${ids}`).then((res)=>res.json()),
        enabled: !!ids
    })

    // useEffect(() => {
    //     console.log("curr", currencies.data[0].name);

    // }, [currencies])
    const headerHeight = useHeaderHeight();
    return (
        <ScrollView contentContainerStyle={{
            paddingTop:headerHeight,
            paddingBottom:100
           }}>
            <Text style={inStyles.sectionheader}>Latest Crypto</Text>
            <View style={inStyles.block}>
            {
                currencies.data?.map((currency: any) => (
                    <Link href={`/crypto/${currency.id}`} key={currency.id} asChild>
                    <TouchableOpacity style={{flexDirection:'row',gap:14,alignItems:'center',margin:10}}>
                        <Image source={{uri:data?.[currency.id].logo}} style={{height:40,width:40}}/>
                        <View style={{flex:1,gap:6}}>
                        <Text style={inStyles.textSty}>{currency.name}</Text>
                        <Text style={{color:'grey'}}>{currency.symbol}</Text>
                        </View>

                        <View style={{alignItems:'flex-end',gap:6}}>
                            <Text>{currency.quote.EUR.price.toFixed(2)} $</Text>
                            <View style={{flexDirection:'row',gap:4}}>
                                <Ionicons name={currency.quote.EUR.percent_change_1h > 0 ? 'arrow-up' : 'arrow-down'} size={20} color={currency.quote.EUR.percent_change_1h > 0?'green':'red'}/>
                                <Text style={{color:currency.quote.EUR.percent_change_1h > 0 ? 'green' : 'red'}}>
                                    {currency.quote.EUR.percent_change_1h.toFixed(2)} %
                                </Text>
                            </View>
                        </View>
                        
                    </TouchableOpacity>
                    </Link>
                ))
            }
            </View>
         
        </ScrollView>
    )
}

const inStyles = StyleSheet.create({
    sectionheader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        margin: 20,
        marginTop: 10
    },
    block:{
        padding:10,
        margin:10,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'white',
        borderRadius:10
    },
    textSty:{
        fontWeight:'600',
        color:'black'
    }
})

export default Crypto;