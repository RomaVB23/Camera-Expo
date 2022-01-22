import {StyleSheet, Dimensions} from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    video: {
        alignSelf: 'center',
        width: '100%',
        height: '90%',
    },
    
    // 
    spacer: {
        flex: 1
    },
    buttonsContainer: {
        flexDirection: 'row',
        margin: 20,
    },
    playButton: {
        alignItems: 'center',
        flex: 1,
        borderColor: 'lightgray',
        backgroundColor: 'green',
        borderWidth: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 4,
        marginRight: 10
    },
    cancelButton: {
        alignItems: 'center',
        flex: 1,
        borderColor: 'lightgray',
        borderWidth: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 4,
        marginRight: 10
    },
    postButton: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#ff4040',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 4,
        marginRight: 10
    },
    playButtonText: {
        marginLeft: 5,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    cancelButtonText: {
        marginLeft: 5,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16
    },
    postButtonText: {
        marginLeft: 5,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
})
export default styles