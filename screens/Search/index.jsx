import React, { useState } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SIZES, baseUrl } from '../../constants';
import ListItem from '../../components/listItem';
import Category from './components/Category';
import { categories } from '../../data';
import { styles } from './styles';

const Search = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(1);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');

  const onSearch = (text) => {
    const fetchData = async () => {
      try {
        setSearch(text);
        setLoading(true);
        const response = await fetch(`${baseUrl}/course/search?title=${text}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        const data = json.data;

        setCourses(data.courses);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#FFF' }}>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons name="camera-outline" size={24} style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            value={search}
            onChangeText={onSearch}
            style={styles.searchInput}
            placeholder="Search for anything"
          />
        </View>
        <View>
          <TouchableOpacity onPress={onSearch} style={styles.searchBtn}>
            <Feather
              name="search"
              size={SIZES.xLarge}
              color={COLORS.secondary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingHorizontal: 12, paddingBottom: 15 }}>
        <FlatList
          horizontal
          data={categories}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Category
              item={item}
              setCategory={setCategory}
              active={category === item.id}
            />
          )}
          contentContainerStyle={{ columnGap: 10 }}
        />
      </View>
      <ScrollView style={{ backgroundColor: '#FFF', height: '100%' }}>
        {loading && (
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
        {!loading && (
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
