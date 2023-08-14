import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import ListItem from '../../components/listItem';
import CartIcon from '../../components/cartIcon';
import { baseUrl } from '../../constants';
import { styles } from './styles';

const MyLearning = ({ navigation }) => {
  const userId = 58;
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/course/user?userId=${userId}`);
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
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#FFF' }}>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <View>
            <Text style={styles.name}>My Learning</Text>
          </View>

          <CartIcon />
        </View>
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
            onPress={() => navigation.navigate('Course')}
          />
        )}
        <View style={{ marginBottom: 120 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyLearning;
