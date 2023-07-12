import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import SignUpInputBox from './components/SignUpInputBox';
import { useForm, FormProvider, Controller } from "react-hook-form";

function SignUp(){
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm()

    return(
        <View style={styles.container}>
            <Controller
                control={control}
                render={()=>(<SignUpInputBox title="First Name" />)} name="first name">
            </Controller>
            <Controller
                control={control}
                render={()=>(<SignUpInputBox title="Last Name" />)} name="first name">
            </Controller>
            <Controller
                control={control}
                render={()=>(<SignUpInputBox title="Date of Birth" />)} name="first name">
            </Controller>
            <Controller
                control={control}
                render={()=>(<SignUpInputBox title="Email" />)} name="first name">
            </Controller>






            {/* <SignUpInputBox title="First Name" />
                <SignUpInputBox title="Last Name" />
                <SignUpInputBox title="Date of Birth" />
                <SignUpInputBox title="Email" /> */}
            <View style={styles.outer_button}>
                <View style={styles.button}>
                    <TouchableOpacity>
                        <Text style={styles.text}> Sign up! </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#ebf4fa",
        flex:1,
        padding:5,
        
    },
    button:{
        backgroundColor:"#ff9800",
        borderRadius:5,
        maxWidth:Dimensions.get("window").width*2/9,
        padding:5,
        margin:5,
    },
    text:{
        color:"white",
        fontSize:20,
    },
    outer_button:{
        alignItems:"flex-end",
    }
})

export default SignUp;