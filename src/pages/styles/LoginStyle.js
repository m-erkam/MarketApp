import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
        flex:1,
        backgroundColor:"#f8f8ff",
    },
    button:{
        padding:5,
        margin:6,
        height:50,
        width:325,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#ff9800",
        borderRadius:20,
        shadowColor: 'black',
        shadowRadius: 5,
        elevation: 5,
    },
    button_view:{
        
    },
    button_text:{
        fontSize:25,
        fontWeight:"bold",
        color:"white",
    },
    input_box:{
        padding:5,
        margin:5,
        height:55,
        width:350,
        borderRadius:8,
        fontWeight:"bold",
        backgroundColor:"white",
        shadowColor: 'black',
        shadowRadius: 5,
        elevation: 15,
    },
})