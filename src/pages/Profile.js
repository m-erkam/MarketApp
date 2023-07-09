import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ProfileBox from './components/ProfileBox';
import styles from './styles/ProfileStyle'


function Profile({navigation, route}){
    const user = route.params;
    
    const returnLogin = () => {
        navigation.navigate("Login");
    }
    return(
        <View style={styles.container}>
            <View >
                <Text style={styles.title}>First Name</Text>
                <ProfileBox value={user.firstName}/> 
            </View>
            <View>
                <Text style={styles.title}>Last Name</Text>
                <ProfileBox value={user.lastName}/> 
            </View>
            <View>
                <Text style={styles.title}>Birth Date</Text>
                <ProfileBox value={user.birthDate}/> 
            </View>
            <View>
                <Text style={styles.title}>Email</Text>
                <ProfileBox value={user.email}/> 
            </View>
            <TouchableOpacity onPress={returnLogin} style={styles.logout}>
                <Text style={styles.logout_text}> Log out </Text>
            </TouchableOpacity>
        </View>
    )
}


export default Profile;
