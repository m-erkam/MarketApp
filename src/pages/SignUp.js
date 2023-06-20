import React from 'react'
import { View, Text } from 'react-native'
import SignUpInputBox from './components/SignUpInputBox';

function SignUp(){

    return(
        <View>
            <SignUpInputBox title="First Name" />
            <SignUpInputBox title="Last Name" />
            <SignUpInputBox title="Date of Birth" />
            <SignUpInputBox title="Email" />
        </View>
    )
    
}

export default SignUp;