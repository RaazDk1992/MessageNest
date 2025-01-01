import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { useForm } from "react-hook-form";
import MNinput from "../utility/MNinput";
import { StatusBar } from "react-native";
import { IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { FlatList } from "react-native-gesture-handler";
import Api from "../utility/Api";

const CreatePost = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [selectedMedia, setSelectedMedia] = useState([]);

  const pickMedia = async (mediaType) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: mediaType === "images" ? "images" : "videos",
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        setSelectedMedia((prev) => [...prev, ...result.assets]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderMedia = ({ item }) => {
    if (item.type === "image") {
      return <Image source={{ uri: item.uri }} style={styles.mediaPreview} />;
    } else if (item.type === "video") {
      return (
        <View style={styles.mediaPreview}>
          <Text style={styles.mediaText}>Video</Text>
        </View>
      );
    }
    return null;
  };


  const submitPost =(data)=>{
    const formData = new FormData();
    formData.append("post",data.postContent);
    selectedMedia.forEach((media,index)=>{
    
      formData.append("media",{
        uri:media.uri,
        type: media.type ==="image"?media.mimeType||"image/jpeg":"video/mp4",
        name: `file-${index}.${media.uri.split('.').pop()}`

      })

    });

    try {
      
      Api.post("/api/posts/createpost",formData);
    } catch (error) {
      console.log(error);
    }
   
  }
  return (
    <>
      <StatusBar barStyle="light-content" translucent={false} />
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

        {selectedMedia.length > 0 && (
          <FlatList
            data={selectedMedia}
            keyExtractor={(item, index) => `${item.uri}-${index}`}
            renderItem={renderMedia}
            horizontal
            style={styles.preview_frame}
            scrollEnabled
          />
        )}

        <View style={styles.extra_content}>
          <IconButton
            icon="image"
            size={28}
            onPress={() => pickMedia("images")}
            style={styles.btns}
          />
          <IconButton
            icon="video"
            size={33}
            onPress={() => pickMedia("videos")}
            style={styles.btns}
          />
          <IconButton
            style={styles.btns}
            icon="send"
            onPress={handleSubmit(submitPost)}
            size={30}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 5,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  extra_content: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center", 
    marginBottom: 1,
  },
  content_area: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 5,
    textAlignVertical: "top",
    backgroundColor: "#f9f9f9",
  },
  btns: {
    margin: 0, 
    padding: 0,
  },
  preview_frame: {
    width: "100%",
    maxHeight: 100,
    marginTop: 5,
    marginBottom: 1,
    paddingBottom: 2,
  },
  mediaPreview: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  mediaText: {
    textAlign: "center",
    lineHeight: 80,
    color: "#fff",
  },
});

export default CreatePost;
