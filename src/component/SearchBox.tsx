import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon, { Icons } from '../contant/icons';

export default function SearchBox({ value, placeholder, onChangeText, editable, style, onOpenMenu }) {
  return (
    <View style={styles.searchContainer}>
      <Icon type={Icons.Ionicons} name="search" color="grey" size={20} />
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={'grey'}
        maxLength={50}
        style={[style, styles.input]}
        editable={editable}
      />
      <TouchableOpacity onPress={onOpenMenu}>
        <Icon type={Icons.Entypo} name="menu" color="gray" size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: 25,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 15,
    opacity: 0.9,
    borderWidth: 1,
    borderColor: 'grey',
    elevation: 7,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    marginBottom: 10,
  },
  input: {
    color: 'black',
    width: '85%',
    fontSize: 16,
    marginLeft: 5,
    paddingVertical: Platform.OS === 'ios' ? 15 : 0,
    fontWeight: '500',
  },
});
