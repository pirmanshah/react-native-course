import React from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, SIZES } from '../../../constants';
import { styles } from './welcome.style';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeText(COLORS.black, SIZES.small)}>
          Find Your
        </Text>
        <Text style={styles.welcomeText(COLORS.primary, -18)}>
          Favorite Lesson
        </Text>
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Feather name="search" size={24} style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            value=""
            style={styles.searchInput}
            placeholder="Search for anything"
            onPressIn={() => navigation.navigate('Search')}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons
              size={SIZES.xLarge}
              name="camera-outline"
              color={COLORS.secondary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
