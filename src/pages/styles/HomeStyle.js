import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    item:{
        height:2,
    },
    container:{
        margin:5,
        padding:5,
        paddingBottom:0,
        
    },
    button_part:{
        padding:5,
        margin:5,
        flexDirection:"row",
        justifyContent:"space-between",
    },
    welcome:{
        fontSize:20,
        fontWeight:"400",
        margin:5,
    },
    search:{
        borderRadius:15, 
        justifyContent:"flex-end", 
        backgroundColor: '#AFEEEE',
        flex:1,
    },
    search_text:{
        marginLeft:3,
    },  
    options:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:5,
    },
    option_button:{
        margin:2,
        borderRadius:10,
        padding:7,
        alignItems:"center",
        backgroundColor: '#AFEEEE',
        justifyContent:"center",
    },
    modal:{  
        backgroundColor: '#AFEEEE',
        borderRadius: 20,
        
        
    }
})