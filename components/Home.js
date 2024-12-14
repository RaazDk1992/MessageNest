import { StyleSheet, View } from "react-native";
import CreatePost from "./CreatePost";

const Home=()=>{


    return(<View style={styles.container}>
       

       <CreatePost/>


    </View>)

}

const styles = StyleSheet.create({

    container:{
        flex:1,
    },
    create_post:{

    },
    feeds:{
        flex:1
    }
});
export default Home;
