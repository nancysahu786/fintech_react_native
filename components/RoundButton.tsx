import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type RoundButtonType = {
    text: string;
    icon: typeof Ionicons.defaultProps;
    onPress?: () => void

}
const RoundButton = ({ icon, text, onPress }: RoundButtonType) => {
    return (
        <TouchableOpacity style={inStyles.container} onPress={onPress}>
            <View style={inStyles.circle}>
                <Ionicons name={icon} size={30} color={'black'} />
                
            </View>
            <Text style={inStyles.label}>{text}</Text>
        </TouchableOpacity>
    )
}

const inStyles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        alignItems:'center',
        padding: 5
       
    },
    circle:{
        width:60,
        height:60,
        borderRadius:30,
        backgroundColor:'lightgrey',
        alignItems:'center',
        justifyContent:'center'
    },
    label:{
        fontSize:16,
        fontWeight:'500',
        color:'black'
    }
})

export default RoundButton;