import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, Text, Button } from "react-native";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import { Feather } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/native";

import { useInterval } from "usehooks-ts";

import styles from "./styles";

const CameraScreen = () => {
  const navigation = useNavigation();
  // разрешение на использование Камеры, Аудио, Галереи
  const [hasCameraPermissions, setHasCameraPermissions] = useState(false);
  const [hasAudioPermissions, setHasAudioPermissions] = useState(false);
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);

  const [galleryItems, setGalleryItems] = useState([]);

  const [cameraRef, setCameraRef] = useState(null);
  // тип камеры
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  // вспышка
  const [cameraFlash, setCameraFlash] = useState(
    Camera.Constants.FlashMode.off
  );
  const [isCameraReady, setIsCameraReady] = useState(false);

  const isFocused = useIsFocused();

  //
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status == "granted");

      const audioStatus = await Audio.requestPermissionsAsync();
      setHasAudioPermissions(audioStatus.status == "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermissions(galleryStatus.status == "granted");

      if (galleryStatus.status == "granted") {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({
          sortBy: ["creationTime"],
          mediaType: ["video"],
        });
        setGalleryItems(userGalleryMedia.assets);
      }
    })();
  }, []);

  const recordVideo = async () => {
    if (cameraRef) {
      try {
        const options = {
          maxDuration: 15,
          quality: Camera.Constants.VideoQuality["480"],
        };
        const videoRecordPromise = cameraRef.recordAsync(options);
        if (videoRecordPromise) {
          setIsVideoRecording(true);
          const data = await videoRecordPromise;
          const source = data.uri;
          navigation.navigate("EditVideo", { source });
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const stopVideo = async () => {
    if (cameraRef) {
      cameraRef.stopRecording();
      setIsVideoRecording(false);
    }
  };

  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.cancelled) {
      navigation.navigate("EditVideo", { source: result.uri });
    }
  };
  //
  //
  let [startingTime, setStartingTime] = useState<Number>();
  const onStartRecording = async () => {
    setStartingTime(Date.now());
  };

  let [currentTime, setCurrentTime] = useState(Date.now());

  useInterval(() => {
    setCurrentTime(Date.now());
  }, 16);

  const MAX_RECORDING_TIME = 16 * 1000;

  let timePassed = currentTime - (startingTime || 0);
  let recordingTimeLeft = MAX_RECORDING_TIME - timePassed;

  let timeLeftSeconds = Math.max(0, recordingTimeLeft / 1000);

  const renderVideoRecordIndicator = () => (
    <View>
      <progress
        value={timeLeftSeconds * 1000}
        max={MAX_RECORDING_TIME}
      ></progress>
      <Text style={styles.counter}>{Math.floor(timeLeftSeconds)}</Text>
    </View>
  );

  //
  //
  //
  if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
    return <View></View>;
  }
  return (
    <View style={styles.container}>
      {isFocused ? (
        <Camera
          ref={(ref) => setCameraRef(ref)}
          style={styles.camera}
          ratio="16:9"
          type={cameraType}
          flashMode={cameraFlash}
          onCameraReady={() => setIsCameraReady(true)}
        />
      ) : null}

      <View style={styles.sideBarContainer}>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            setCameraType(
              cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            )
          }
        >
          <Feather name="refresh-ccw" size={24} color={"white"} />
          <Text style={styles.iconText}>Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            setCameraFlash(
              cameraFlash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            )
          }
        >
          <Feather name="zap" size={24} color={"white"} />
          <Text style={styles.iconText}>Flash</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBarContainer}>
        <View style={{ flex: 1 }}></View>
        <View style={styles.recordButtonContainer}>
          {isVideoRecording && renderVideoRecordIndicator()}
          <TouchableOpacity
            disabled={!isCameraReady}
            onPress={() => {
              recordVideo();
              onStartRecording();
            }}
            onLongPress={() => recordVideo()}
            onPressOut={() => stopVideo()}
            style={isVideoRecording ? styles.buttonStop : styles.buttonRecord}
          />
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => pickFromGallery()}
            style={styles.galleryButton}
          >
            {galleryItems[0] == undefined ? (
              <></>
            ) : (
              <Image
                style={styles.galleryButtonImage}
                source={{ uri: galleryItems[0].uri }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CameraScreen;
