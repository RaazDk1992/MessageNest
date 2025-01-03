import { StyleSheet, View } from "react-native";
import CreatePost from "./../components/CreatePost";
import Feed from "./../components/Feed";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.create_post}>
        <CreatePost />
      </View>
      <View style={styles.feeds}>
        <Feed />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  create_post: {
    flexShrink: 0, // Prevent CreatePost from stretching
  },
  feeds: {
    flex: 1, // Feed takes up the remaining space
  },
});

export default Home;
