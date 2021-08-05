import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const VosAvisScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Page des avis</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default VosAvisScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
