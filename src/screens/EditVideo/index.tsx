import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Video } from "expo-av";
// import Video from 'react-native-video';

// const video = React.useRef(null);
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

const EditVideoScreen = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Video
        // ref={video}
        style={styles.video}
        source={{
          uri: props.route.params.source,
        }}
        useNativeControls
        resizeMode="contain"
        resizeMode="cover"
        isLooping
        // onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      {/* <Video
            source={{uri: props.route.params.source}}
            style={styles.video}
            // onError={(e) => console.log(e)}
            resizeMode={'cover'}
            repeat={true}
            // paused={paused}
          /> */}
          <View style={styles.spacer} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        >
          <Feather name="x" size={24} color="black" />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSavePost()}
          style={styles.postButton}
        >
          <Feather name="corner-left-up" size={24} color="white" />
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditVideoScreen;

// source={{ uri: props.route.params.source }}
