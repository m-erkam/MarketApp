import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container:{
        flex:1,
        
    },
    image:{
        padding:10,
        margin:10,
        alignItems:"center",
        flex:10,
    },
    after_image:{
        padding:10,
        margin:10,
        flex:6,
    },
    title:{
        fontSize:30,
        fontWeight:"bold",
    },
    description:{
        fontSize:17,
        fontWeight:"500",
    },
    price_box:{
        flexDirection:"row",
        justifyContent:"flex-end",
        backgroundColor:"#AFEEEE",
        flex:2,
        
    },
    price_inner_box:{
        flexDirection:"row",
        alignItems:"center",
        padding:10,
    },
    price:{
        fontSize:20,
        fontWeight:"bold",
        marginRight:15,
        color:"#85BB65",
    },
    cart:{
        backgroundColor:"white",
        justifyContent:"center",
        borderRadius:20,
        flexDirection:"row",
        padding:5,
    },
    cart_text:{
        fontSize:22,
        fontWeight:"500",
        color:"orange",
    }
})