import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Api from "../utility/Api";

const Feed = () => {

    const[updates,setUpdate] = useState([]);
    const[loading,setLoading] = useState(true);

    useEffect(()=>{
        Api.get("/api/posts/public").then((response)=>{

           // console.log(JSON.stringify(response.data));

        }).catch((error)=>console.log(error))
        .finally()
    },[]);

  
  return (
    <View style={styles.container}>
      <Text>Feed Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fills the remaining space
    alignItems: "center",
    justifyContent: "center",
   
  },
});

export default Feed;
