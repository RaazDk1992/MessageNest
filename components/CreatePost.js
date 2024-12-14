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
                control={control} // Control from react-hook-form
                name="postContent" // Field name
                placeholder="Your thoughts.." // Placeholder text
                rules={{ required: "Post content is required" }} // Validation rules
                error={errors.postContent?.message} // Error message from validation
                customstyles={styles.content_area} // Custom styles for input
                multiline={true} // Allow multi-line input
                numberOfLines={4} // Specify number of lines
                />

                <View style={styles.extra_content}>
                        <IconButton icon="image" size={28}/>
                        <IconButton icon="video"  size={33}/>
                        
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
});

export default CreatePost;
