import React, {useEffect, useState} from 'react';
import { View, FlatList, Text } from 'react-native';
import ProfileBox from './components/ProfileBox';
import styles from './styles/ProfileStyle'


function Profile({route}){
    
    const user = route.params;
 
    return(
        <View style={styles.container}>
            <View style={styles.top_part}>
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
        </View>
    )
}


export default Profile;