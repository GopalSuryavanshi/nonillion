import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const CircleLoader = ({ visible }) => {
  const animations = useRef([...Array(5)].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animate = (index) => {
      Animated.sequence([
        Animated.timing(animations[index], {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animations[index], {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => animate(index));
    };

    animations.forEach((_, index) => {
      setTimeout(() => animate(index), index * 100); // Delay each circle's animation
    });
  }, []);

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        {animations.map((animation, index) => {
          const scale = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1.5],
          });
          const opacity = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
          });
          const backgroundColor = animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['#003f8a', '#00c8ff'],
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.circle,
                {
                  transform: [{ scale }],
                  opacity,
                  backgroundColor,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Slight overlay background
  },
  loader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 150,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default CircleLoader;
