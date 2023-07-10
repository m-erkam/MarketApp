import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
    container:{
        backgroundColor:"#f8f8ff",
        flex:1,
        padding:5,
    },
    title:{
        padding:5,
        margin:5,
        fontSize:20,
        fontWeight:"bold",
        color:"black"
        
    },
    top_part:{
        marginTop:5,

    },
    logout:{
        padding:5,
        margin:5,
        borderRadius:15,
        backgroundColor:"#E42217",
        maxWidth:Dimensions.get("window").width*2/9,
    },
    logout_text:{
        color:"white",
        fontSize:20,
    }
})