import { View, Text, StyleSheet } from "react-native";

const TestScreen = () => {
    return ( 
        <View style={styles.root}>
            <Text>TEST SCREEN</Text>
        </View>
     );
}
 
export default TestScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    }
});