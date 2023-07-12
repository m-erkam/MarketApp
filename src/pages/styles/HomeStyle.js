import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    item:{
        height:2,
    },
    container:{
        padding:5,
        backgroundColor:"#f8f8ff",
    },
    button_part:{
        padding:5,
        margin:5,
        flexDirection:"row",
        justifyContent:"space-between",
    },
    welcome:{
        fontSize:25,
        fontWeight:"400",
        margin:5,
        color:"#ff9800"
    },
    search:{
        borderRadius:10,
        flex:1,
        
        backgroundColor:"white",
        height:45,
        shadowColor: 'black',
        shadowRadius: 5,
        elevation: 15,
        
    },
    search_text:{
        marginLeft:3,
    },  
    options:{
        flexDirection:"row",
        
        alignItems:"center",
        marginBottom:5,
        padding:3,
  
   
    },
    option_button:{
        margin:2,
        borderRadius:10,
        padding:2,
        
        justifyContent:"center",
        backgroundColor:"white",
        shadowColor: 'black',
        shadowRadius: 5,
        elevation: 15,
       
    },
    modal:{  
        padding:15,
        
    },
    inner_modal:{  
        backgroundColor: '#ff9800',
        padding:10,
        borderRadius:15,
    },
    category_container:{
        justifyContent:"center",
        flex:1,
        padding:15,
    },
    modal_scroll:{
        backgroundColor: '#ff9800',
    },
    filter_text:{
        fontWeight:"bold",
        fontSize:20,
        color:"white",
    }

})