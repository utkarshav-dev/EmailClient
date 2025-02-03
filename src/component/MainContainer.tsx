import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
export default function MainContainer  ({
    Loading,
    open,
    header,
    content,
    children,
    btntext,
    onPress,
    backgroundColor,
    ...props
}) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {/* <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}> */}
            <StatusBar animated={true}  backgroundColor={backgroundColor ? backgroundColor:"white"} barStyle={"dark-content"} />
            {
                Loading == true ? (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <ActivityIndicator size={"large"} color={"orange"} />
                        {/* <Lottie source={require('../assets/json/Animation - 1706529427083.json')} autoPlay loop style={{ width: 100, height: 100 }} /> */}
                    </View>
                ) : (
                    <View style={{ flex: 1, }}>
                        {children}
                    </View>
                )
            }
            {/* </KeyboardAwareScrollView> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

