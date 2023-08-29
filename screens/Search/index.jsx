import React, { useState } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from 'react-query';
import { COLORS, SIZES } from '../../constants';
import ListItem from '../../components/listItem';
import { styles } from './styles';
import courseService from './service/courseService';

const Search = ({ navigation }) => {
  const [search, setSearch] = useState('');

  // Use useQuery to fetch and cache the data
  const { data: courses = [], isLoading = false } = useQuery(
    ['courses', search],
    () => courseService.getByTitle(search),
    {
      enabled: !!search,
    }
  );

  return (
    <SafeAreaView style={{ backgroundColor: '#FFF' }}>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons name="camera-outline" size={24} style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            value={search}
            onChangeText={(text) => setSearch(text)}
            style={styles.searchInput}
            placeholder="Search for anything"
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              // No need to pass onSearch function, use setSearch instead
              setSearch(search);
            }}
            style={styles.searchBtn}
          >
            <Feather
              name="search"
              size={SIZES.xLarge}
              color={COLORS.secondary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ backgroundColor: '#FFF', height: '100%' }}>
        {isLoading && (
          <View
            style={{
              flex: 1,
              marginTop: 20,
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        )}
        {!isLoading && (
          <ListItem
            items={courses}
            onPress={(item) =>
              navigation.navigate('ProductDetail', { item: item })
            }
          />
        )}
        <View style={{ marginBottom: 120 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
