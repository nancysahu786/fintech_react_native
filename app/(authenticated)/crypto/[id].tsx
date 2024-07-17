import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, SectionList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { useEffect } from "react";
import { Circle, useFont } from "@shopify/react-native-skia";
import { format } from "date-fns";
import * as Haptics from "expo-haptics";
import Animated,{ SharedValue, useAnimatedProps } from "react-native-reanimated";
Animated.addWhitelistedNativeProps({text:true});
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
function Tooltip({x,y}:{x:SharedValue<number>;y:SharedValue<number>}){
return <Circle cx={x} cy={y} r={8} color={'yellow'}/>
}


const Page = () => {
    const { id } = useLocalSearchParams();

   
    console.log("id detals",id);
    const { data } = useQuery({
        queryKey: ['info', id],
        queryFn: async () => {
            const info = await fetch(`/api/info?id=${id}`).then((res) => res.json())
            // const logo = info[+id].logo;
            return info[+id];
        }

    })

   
    console.log("data",data);
    const headerHeight = useHeaderHeight();
    const font = useFont(require('../../../assets/fonts/SpaceMono-Regular.ttf'),12);
    const {state,isActive} = useChartPressState({x:0,y:{price:0}});
     
    useEffect(()=>{
console.log(isActive);
if(isActive) Haptics.selectionAsync();

    },[isActive]);
    
    const categories = ['Overview', 'News', 'Orders', 'Transactions'];
    const { data:tickers } = useQuery({
        queryKey: ['tickers'],
        queryFn: async (): Promise<any[]> => fetch(`/api/tickers`).then((res) => res.json())
          
        

    })

    useEffect(()=>{
        console.log("tickers",tickers);
        
    },[tickers])

    // const tickers = useQuery({
    //     queryKey: ['tickers'],
    //     queryFn: async () => {
    //       const response = await fetch('/api/tickers');
    //       console.log("response",response);
          
    //       if (!response.ok) {
    //         throw new Error('Failed to fetch');
    //       }
    //       return response.json();
    //     },
    //   });
    const animatedText = useAnimatedProps(()=>{
        return {
            text: `${state.y.price.value.value.toFixed(2)} $`, 
            defaultValue: '',
        }
    });
    const animatedDateText = useAnimatedProps(()=>{
        const date = new Date(state.x.value.value);
        return {
            text: `${date.toLocaleDateString()}`, 
            defaultValue: '',
        }
    })
    return (
        <>
            <Stack.Screen options={{ title: data?.name }} />
            <SectionList
                style={{ marginTop: headerHeight }}
                keyExtractor={(i) => i.title}
                sections={[{ data: [{ title: 'Chart' }] }]}
                contentInsetAdjustmentBehavior="automatic"
                renderSectionFooter={() => (
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 16,
                            paddingBottom: 8,
                            backgroundColor: 'fff',
                            borderBottomColor: 'lightgrey',
                            borderBottomWidth: 1
                        }}>
                        {
                            categories.map((item, index) => (
                                <TouchableOpacity>
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            ))
                        }

                    </ScrollView>
                )}
                ListHeaderComponent={() => (
                    <>
                        <View style={{
                            flexDirection: 'row',
                            marginHorizontal: 16,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Text style={inStyles.head}>{data?.symbol}</Text>
                            <Image source={{ uri: data?.logo }} style={{ width: 60, height: 60 }} />
                        </View>
                    </>
                )}
                renderItem={({ item }) => (
                    <>
                        {/* char */}
                        <View style={[{ height: 500},inStyles.block]}>
                            {
                                tickers && 
                                (
                                    <>
                                    {
                                        !isActive && (
                                            <>
                                            <Text style={{fontSize:30,fontWeight:'bold',color:'black'}}>{tickers[tickers.length -1].price.toFixed(2)} $</Text>
                                            <Text style={{fontSize:18,color:'black'}}>Today</Text>
                                            </>
                                        )
                                    }
                                      {
                                        isActive && (
                                            <>
                                            <AnimatedTextInput
                                            editable={false}
                                            underlineColorAndroid={'transparent'}
                                            animatedProps={animatedText}>
                                            <Text style={{fontSize:30,fontWeight:'bold',color:'black'}}></Text>
                                            </AnimatedTextInput>
                                            <AnimatedTextInput
                                            editable={false}
                                            underlineColorAndroid={'transparent'}
                                            animatedProps={animatedDateText}>
                                            <Text style={{fontSize:30,color:'black'}}></Text>
                                            </AnimatedTextInput>
                                            </>
                                        )
                                    }
                                <CartesianChart chartPressState={state} data={tickers!} xKey="timestamp" yKeys={['price']}
                                axisOptions={{
                                  font,  
                                  tickCount:5,
                                  labelOffset:{x:-2,y:0},
                                  labelColor:"grey",
                                  formatYLabel:(v) => `${v} $`,
                                  formatXLabel:(ms) => format(new Date(ms),'MM/yy')
                                }}>
                                    {
                                        ({points})=>(
                                            <>

                                            <Line points={points.price} color={'red'} strokeWidth={3}/>
                                            {isActive && <Tooltip x={state.x.position} y={state.y.price.position}/>}
                                            </>
                                            
                                        )
                                    }
                                </CartesianChart>
                                </>
                )
                            }
                            
                           
                        </View>
                        <View style={[inStyles.block, { marginTop: 20 }]}>
                            <Text style={inStyles.head}>Overview</Text>
                            <Text style={{ color: "grey" }}>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit enim magni temporibus, incidunt minima deserunt possimus quis necessitatibus magnam ab, nesciunt natus accusantium aut mollitia eum veritatis, ullam officiis ratione?
                            </Text>
                        </View>
                    </>
                )}>

            </SectionList>

        </>
    )
}

const inStyles = StyleSheet.create({
    block: {
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,

    },
    head: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600'
    }
})

export default Page;