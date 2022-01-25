import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container:{
        flex: 1, 
    },
    camera: {
        flex: 1,
        backgroundColor: 'black',
        aspectRatio: 9 / 16,
    },
    bottomBarContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        marginBottom: 30,
    },
    recordButtonContainer: {
        flex: 1,
        marginHorizontal: 30,
    },
    buttonRecord: {
        borderWidth: 8,
        borderColor: '#ff404087',
        backgroundColor: '#ff4040',
        borderRadius: 100,
        height: 80,
        width: 80,
        alignSelf: 'center'
      },
    buttonStop: {
        marginVertical: 20,
        height: 50,
        width: 50,
        borderRadius: 3,
        backgroundColor: '#ff4343',
        alignSelf: 'center'
    },
    galleryButton: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        width: 50,
        height: 50,
    },
    galleryButtonImage: {
        width: 50,
        height: 50,
    },
    sideBarContainer: {
        top: 60,
        right: 0,
        marginHorizontal: 20,
        position: 'absolute'
    },
    iconText: {
        color: 'white',
        fontSize: 12,
        marginTop: 5
    },
    sideBarButton: {
        alignItems: 'center',
        marginBottom: 25
    },
    counter: {
        color: 'white', 
        position: 'absolute', 
        top: -28, 
        left: 46, 
        fontSize: 25,
    },
})
export default styles