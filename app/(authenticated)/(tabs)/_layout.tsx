import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const Layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: 'primary'
        }}>
            <Tabs.Screen name="home" options={{
                title: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="registered" size={24} />
                )
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