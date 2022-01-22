import React from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { Video } from "expo-av";

import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

const EditVideoScreen = (props:any) => {
  const navigation = useNavigation();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: props.route.params.source,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    
      <View style={styles.spacer} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
          style={styles.playButton}
        >
          <FontAwesome5 name="play" size={24} color="white" />
          <Text style={styles.playButtonText}>Play</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        >
          <Feather name="x" size={24} color="black" />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={() => handleSavePost()}
          style={styles.postButton}
        >
          <Feather name="corner-left-up" size={24} color="white" />
          <Text style={styles.postButtonText}>Save</Text>
        </TouchableOpacity>
        {/* <Button
            title={status.isPlaying ? 'Pause' : 'Play'}
            onPress={() =>
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
          /> */}
      </View>
    </View>
  );
};

export default EditVideoScreen;


