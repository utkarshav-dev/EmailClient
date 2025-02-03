/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import Icon, { Icons } from '../contant/icons';


export default function Header({
    goBackicon,
    title,
    onPress,
}) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', height: 55, paddingHorizontal: 15, borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>
            {goBackicon && (
                <TouchableOpacity
                    onPress={onPress}
                    style={{ width: '5%', height: 28 }}>
                    <Icon type={Platform.OS == 'ios' ? Icons.AntDesign : Icons.FontAwesome6} name={Platform.OS == 'ios' ? 'left' : 'arrow-left-long'} color={'gray'} size={25} style={undefined} />
                </TouchableOpacity>
            )}
            <View style={{ justifyContent: 'center', flex: 1, marginLeft: 15 }}>
                <Text numberOfLines={1} style={{ fontWeight: '700', fontSize:20, color:'black', textAlign: 'left', width: '85%' }}>
                    {title}
                </Text>
            </View>
        </View>
    );
}

