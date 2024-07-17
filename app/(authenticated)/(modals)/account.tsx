import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";


const ICONS = [
    {
        name: 'Default',
        icon: require('../../../assets/images/icon.png')
    },
    {
        name: 'Dark',
        icon: require('../../../assets/images/rise.png')
    },

]
const Account = () => {
    const { user } = useUser();
    const { signOut } = useAuth();
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [edit, setEdit] = useState(false);

    // const [activeIcon, setActiveIcon] = useState('Default');

    // useEffect(() => {
    //     const loadCurrentIconPref = async () => {
    //         const Icon = getAppIcon();
    //         setActiveIcon(Icon);
    //     }
    //     loadCurrentIconPref();
    // }, [])
    const onSaveUser = async () => {
        try {
            await user?.update({ firstName: firstName!, lastName: lastName! });
            setEdit(false);
        } catch (error) {
            console.log("error", error);

        } finally {
            setEdit(false)
        }

    }
    const onCaptureImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.75,
            base64: true
        }

        )
        if (!result.canceled) {
            const base64 = `data:image/png;base64,${result.assets[0].base64}`;
            user?.setProfileImage({
                file: base64
            })
        }
    }
    console.log("user", user?.firstName);

    // const onChangeAppIcon = async (icon: string) => {
    //     await setActiveIcon(icon.toLowerCase())
    //     setActiveIcon(icon)
    // }

    return (
        <BlurView tint={'dark'} intensity={150} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', paddingTop: 100 }}>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={onCaptureImage} style={inStyles.captureBtn}>
                    {
                        user?.imageUrl && <Image source={{ uri: user?.imageUrl }} style={inStyles.avatar} />
                    }
                </TouchableOpacity>
                {
                    user && (
                        <View style={{ flexDirection: 'row', gap: 6 }}>
                            {
                                !edit && (
                                    <View style={inStyles.editRow}>
                                        <Text style={{ fontSize: 26, color: '#fff' }}>{firstName} {lastName}</Text>
                                        <TouchableOpacity onPress={() => setEdit(true)}>
                                            <Ionicons name="ellipsis-horizontal" size={24} color={'#fff'} />
                                        </TouchableOpacity>
                                    </View>

                                )
                            }

                            {
                                edit && (
                                    <View style={inStyles.editRow}>
                                        <TextInput placeholder="Enter First Name" value={firstName || ''} onChangeText={setFirstName} style={[inStyles.inputField]} />
                                        <TextInput placeholder="Enter Last Name" value={lastName || ''} onChangeText={setLastName} style={[inStyles.inputField]} />
                                        <TouchableOpacity onPress={onSaveUser}>
                                            <Ionicons name="checkmark-outline" size={24} color={'#fff'} />
                                        </TouchableOpacity>
                                    </View>

                                )
                            }
                        </View>
                    )
                }
            </View>
            {/* <View style={inStyles.actions}>
                {ICONS.map((icon) => (
                    <TouchableOpacity
                        key={icon.name}
                        style={inStyles.btn}
                        onPress={() => onChangeAppIcon(icon.name)}
                    >
                        <Image source={icon.icon} style={{ width: 24, height: 24 }} />
                        <Text style={{ color: '#fff', fontSize: 18 }}>{icon.name}</Text>
                    </TouchableOpacity>
                ))}
            </View> */}
        </BlurView>
    )
}
const inStyles = StyleSheet.create({
    editRow: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        marginTop: 20
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'grey'
    },
    captureBtn: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'grey'
    },
    inputField: {
        width: 140,
        height: 44,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff'
    },
    actions: {
        backgroundColor: 'rgba(256,256,256,0.1)',
        gap: 0,
        borderRadius: 16,
        margin: 20
    },
    btn: {
        padding: 14,
        flexDirection: 'row',
        gap: 20
    }

})
export default Account;