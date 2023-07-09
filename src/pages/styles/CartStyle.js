import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container:{
        flex:1,
        padding:5,
        backgroundColor:"#e5e4e2",
        
    },
    price:{
        justifyContent:"flex-end",
        alignItems:"flex-end",

    },
    price_text:{
        fontWeight:"bold",
        fontSize:20,
        color:"black",
    },
    separator:{
        height:2,
    },
    top_text:{
        color:"black",
        textAlign:"center",
        fontSize:20,
        fontWeight:"bold",
    },
    top_bar:{
        borderBottomWidth:1,
        borderBottomColor:"grey",
        alignItems:"center",
        padding:5,
    }
    
})