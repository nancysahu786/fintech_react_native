import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Link, useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const CustomHeader = () => {
    const { top } = useSafeAreaInsets();
    const router = useRouter();
    return (
        <BlurView
            intensity={80}
            tint='extraLight'
            style={{ padding: top }}>
            <View style={[inStyles.container]}>
                <Link href="/(authenticated)/(modals)/account" asChild>
                <TouchableOpacity style={inStyles.roundBtn} >
                    <Text style={[{ color: 'white', fontSize: 16, fontWeight: '500' }]}>NS</Text>
                </TouchableOpacity>
                </Link>
                <View style={inStyles.searchSection}>
                    <Ionicons style={inStyles.searchIcon} name="search" size={24} />
                    <TextInput style={inStyles.input}
                        placeholder="Search"
                        placeholderTextColor={'black'} />
                </View>

                <View style={inStyles.circle}>
                    <Ionicons name="stats-chart" size={20} />
                </View>
                <View style={inStyles.circle}>
                    <Ionicons name="card" size={20} />
                </View>
            </View>
        </BlurView>
    )
}

const inStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        height: 60,
        backgroundColor: 'transparent',
        // paddingHorizontal:20
    },
    roundBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        // textAlign: 'center'
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'lightgrey',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchIcon: {
        padding: 10
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 0,
        color: 'black'
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default CustomHeader;