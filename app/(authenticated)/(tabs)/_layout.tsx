import CustomHeader from "@/components/CustomHeader";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";

const Layout = () => {
    return (
        <Tabs screenOptions={{
            // tabBarActiveTintColor: 'primary',
            tabBarBackground:() => {
             return (
                <BlurView 
                intensity={100}
                tint='extraLight'
                style={{
                    flex:1,
                    backgroundColor:'rgba(0,0,0,0.3)'}}/>
             )  
                },
            tabBarStyle:{
                backgroundColor:'transparent',
                position:'absolute',
                bottom:0,
                left:0,
                right:0
            }
        }}>
            <Tabs.Screen name="home" options={{
                title: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="registered" size={24} />
                ),
                header: ()=> <CustomHeader />,
                headerTransparent:true
            }} />
            <Tabs.Screen name="invest" options={{
                title: 'Invest',
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="line-chart" size={24} />
                )
            }} />
            <Tabs.Screen name="transfers" options={{
                title: 'Transfers',
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="exchange" size={24} />
                )
            }} />
            <Tabs.Screen name="crypto" options={{
                title: 'Crypto',
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="bitcoin" size={24} />
                )
            }} />
            <Tabs.Screen name="lifestyle" options={{
                title: 'Lifestyle',
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="th" size={24} />
                )
            }} />
          
        </Tabs>
    )
}

export default Layout;