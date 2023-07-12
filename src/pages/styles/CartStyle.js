import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container:{
        flex:1,
        padding:5,
        backgroundColor:"#f8f8ff",
        
    },
    price:{
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center",

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
    },
    buy_button:{
        backgroundColor:"#ff9800",
        borderRadius:15,
        padding:5,
        marginRight:5,
        shadowColor: 'black',
        shadowRadius: 5,
        elevation: 5,
    },
    buy_text:{
        color:"white",
        fontSize:20,
    }
    
})