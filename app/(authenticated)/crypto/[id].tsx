import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, SectionList, StyleSheet,Image } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useQuery } from "@tanstack/react-query";
const Page = () => {
    const { id } = useLocalSearchParams();
    console.log(id);
    const headerHeight = useHeaderHeight();
    const { data} = useQuery({
        queryKey: ['info', id],
        queryFn: async () => {
            const info = await fetch(`/api/info?id=${id}`).then((res) => res.json())
            // const logo = info[+id].logo;
            return info[+id];
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
                renderSectionFooter={()=><View style={{flex:1,backgroundColor:"red",height:30}}/>}
                ListHeaderComponent={() => (
                    <>
                        <View style={{
                            flexDirection: 'row',
                            marginHorizontal: 16,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Text style={inStyles.head}>{data?.symbol}</Text>
                            <Image source={{uri:data?.logo}} style={{width:60,height:60}} />
                        </View>
                    </>
                )}
                renderItem={({ item }) => (
                    <>
                        {/* char */}
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