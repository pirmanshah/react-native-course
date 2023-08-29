import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants';

const CourseButton = ({ course, navigation, handleAdd }) => {
  let buttonContent;

  if (course.alreadyInCourse) {
    buttonContent = (
      <TouchableOpacity
        style={styles.cartBtn}
        onPress={() => navigation.navigate('Course', { courseId: course.id })}
      >
        <Text style={styles.cartTitle}>go to course</Text>
      </TouchableOpacity>
    );
  } else if (course.alreadyEnroll) {
    buttonContent = (
      <TouchableOpacity style={styles.cartBtn} onPress={() => {}}>
        <Text style={styles.cartTitle}>already enroll</Text>
      </TouchableOpacity>
    );
  } else if (course.inCart) {
    buttonContent = (
      <TouchableOpacity
        style={styles.cartBtn}
        onPress={() => navigation.navigate('Cart')}
      >
        <Text style={styles.cartTitle}>go to cart</Text>
      </TouchableOpacity>
    );
  } else {
    buttonContent = (
      <TouchableOpacity style={styles.cartBtn} onPress={handleAdd}>
        <Text style={styles.cartTitle}>Add to cart</Text>
      </TouchableOpacity>
    );
  }

  return buttonContent;
};

export default CourseButton;

const styles = StyleSheet.create({
  cartBtn: {
    width: '94%',
    backgroundColor: COLORS.black,
    padding: SIZES.xSmall,
    borderRadius: SIZES.large,
    marginLeft: 12,
  },
  cartTitle: {
    marginLeft: SIZES.small,
    textAlign: 'center',
    fontFamily: 'semibold',
    fontSize: 15,
    color: COLORS.lightWhite,
    textTransform: 'uppercase',
  },
  addCart: {
    width: 42,
    height: 42,
    borderRadius: 50,
    margin: SIZES.small,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
