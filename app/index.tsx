import { useAssets } from 'expo-asset';
import { Video } from 'expo-av';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

const Page = () => {
    const [assest] = useAssets([require('../assets/videos/video_preview_h264.mp4')])
    useEffect(() => {
        console.log("asset", assest);

    },[assest])
    return (
        <GestureHandlerRootView style={styles.container}>

            {
                assest && (<Video
                    isMuted
                    isLooping
                    shouldPlay
                    source={{ uri: assest[0].uri }} style={styles.video} resizeMode="cover" />)
            }
            <View style={{ padding: 20, marginTop: 80 }}>
                <Text style={styles.header}>Ready to change the way you money?</Text>
            </View>
            <View style={styles.buttons}>
                <Link href={'/login'} style={styles.linkButton}>
                <TouchableOpacity>
                    <Text style={styles.buttontext}>Log In</Text>
                </TouchableOpacity>
                </Link>
                <Link href={'/signup'} style={styles.linkButton}>
                <TouchableOpacity>
                    <Text style={styles.buttontext}>Signp Up</Text>
                </TouchableOpacity>
                </Link>
            </View>
        </GestureHandlerRootView>
    )
}

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,  // Ensure the container takes up the entire screen
        justifyContent: 'space-between',  // Align content in the center if needed
        // marginTop: 40,  // Adjust margin as per your layout

    },
    video: {
        //    flex:1,
        //    alignSelf:'stretch'
        width: '100%',
        height: '100%',
        position: 'absolute'

    },
    header: {
        fontSize: 40,
        fontWeight: '900',
        color: 'white',
        textTransform: 'uppercase'
    },
    buttons: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'center',
        marginBottom: 60,
        paddingHorizontal: 20
    },
    buttontext: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign:'center'
    },
    linkButton:{
        flex:1,
        width:25,
        padding:20,
        borderWidth:1,
        borderRadius:40,
        backgroundColor:'black',
        textAlign:'center'
    }
})