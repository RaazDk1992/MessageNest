import React, { useState } from 'react';
import { Image, View, StyleSheet, ScrollView, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../assets/Colors';
import MNinput from '../utility/MNinput';
import { useForm } from 'react-hook-form';
import Api from '../utility/Api';

const Details = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [selectedMedia, setSelectedMedia] = useState([]); // Initialize as an empty array

    const { width } = Dimensions.get("window");

    const pickMedia = async (mediaType) => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: mediaType==="images"?"images":"videos",
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                setSelectedMedia(result.assets); // Set the array of selected assets
            }
        } catch (error) {
            console.error("An error occurred: " + error);
        }
    };

    const onSubmit = (data) => {
        
        const  fdata = new FormData();
        fdata.append("bio",data.bio);
        selectedMedia.forEach((media,index)=>{
            fdata.append("pic",{
                uri:media.uri,
                type: media.type === "image" ? media.mimeType || "image/jpeg" : "video/mp4",
                name: `file-${index}.${media.uri.split(".").pop()}`,
            })
        });
        Api.post("/api/user/update/details", data)
            .then((response) => { })
            .catch((error) => { })
            .finally((error) => console.log(error));
    };

    return (
        <>
        <StatusBar barStyle="light-content" translucent={false}/>
        <SafeAreaView style={styles.container}>

       
            
            <View style={styles.header}>
                <Button 
                    onPress={() => navigation.navigate("home")} 
                    labelStyle={styles.skipButtonLabel}
                >
                    Skip this
                </Button>
            </View>


            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.wrapper}>
                    
                    <View style={[styles.avatarPreview, { width: width * 0.35, height: width * 0.35 }]}>
                        {selectedMedia.length>0 &&
                            <Image
                                source={{ uri: selectedMedia[0].uri }} // Display the first image
                                style={[styles.avatarImage, { width: width * 0.35, height: width * 0.35 }]}
                            />
                        
                           
                        }
                         <IconButton
                                icon="camera"
                                size={30}
                                style={styles.cameraIcon}
                                iconColor={Colors.bg_primary}
                                onPress={() => pickMedia("images")}
                            />
                    </View>

                    <MNinput
                        control={control}
                        name="bio"
                        label="Bio"
                        placeholder="Something about yourself"
                        multiline={true}
                        numberOfLines={4}
                        error={errors.firstname?.message}
                        customstyles={styles.bio}
                    />

                    <Button
                        mode="contained"
                        onPress={handleSubmit(onSubmit)}
                        contentStyle={styles.buttonContent}
                        labelStyle={styles.buttonLabel}
                        buttonColor={Colors.bg_primary}
                        style={styles.btn}
                    >
                        Submit
                    </Button>
                </View>
            </ScrollView>
        
        </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    bio: {
        width: "100%",
        height: 100,
    },
    avatarPreview: {
        borderWidth: 2,
        borderColor: Colors.bg_primary,
        borderRadius: 100, // Circular shape
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 10,
        overflow: 'hidden', // Ensure image stays circular
    },
    avatarImage: {
        resizeMode: 'cover',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: -20,
        left: '32%',
        zIndex: 10,
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    wrapper: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        width: '50%',
        borderRadius: 4,
    },
    buttonContent: {
        paddingVertical: 8,
    },
    buttonLabel: {
        color: 'white',
        fontWeight: 'bold',
    },

    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end', 
        padding: 10, 
        backgroundColor: '#fff', 
    },
});

export default Details;
