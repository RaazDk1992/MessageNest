import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useForm } from "react-hook-form";
import MNinput from "../utility/MNinput"; // Custom MNinput component
import { StatusBar } from "react-native";
import { IconButton } from "react-native-paper";
const CreatePost = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  return (
   <>
        <StatusBar barStyle="light-content" translucent={false}/>
        <SafeAreaView style={styles.container}>
                
                <MNinput
                control={control} 
                name="postContent" 
                placeholder="Your thoughts.." 
                rules={{ required: "Post content is required" }} 
                error={errors.postContent?.message} 
                customstyles={styles.content_area} 
                multiline={true} 
                numberOfLines={4} 
                />
                
                <View style={styles.extra_content}>
                        <IconButton icon="image" size={28}/>
                        <IconButton icon="video"  size={33}/>
                        <IconButton style={styles.btn_send} icon="send" size={30}/>
                        
                </View>
            
            </SafeAreaView>
   
   </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    padding: 5,
    alignItems: "center",
    justifyContent: "flex-start", 
  },
  extra_content:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'flex-start'
    
  },
  content_area: {
    width: "100%",
    height: 50, // Height for multi-line input
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 5,
    textAlignVertical: "top", 
    backgroundColor: "#f9f9f9", 
  },
  btn_send:{
    position:'absolute',
    right:'1%'
  }
});

export default CreatePost;
