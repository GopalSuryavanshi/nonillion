import React, {useState} from 'react';
import {View, Switch, StyleSheet} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
const Switchbtn = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{false: '#D9D9D9', true: '#D9D9D9'}}
        thumbColor={isEnabled ? '#198754' : '#f4f3f4'}
        
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchContainer: {
    width: 20000, // Set the desired width for the track
  },
});

export default Switchbtn;