import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './styles';
import Welcome from './components/Welcome';
import Carousel from './components/Carousel';
import Heading from './components/Heading';
import ProductRow from '../../components/product/ProductRow';
import { baseUrl } from '../../constants';
import CartIcon from '../../components/cartIcon';

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/course/populars`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        const data = json.data;

        setData(data.courses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#FFF' }}>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <View>
            <Text style={styles.location}>Welcome</Text>
            <Text style={styles.name}>Pirmansyah</Text>
          </View>

          <CartIcon />
        </View>
      </View>
      <ScrollView>
        <Welcome />
        <Carousel />
        <Heading />
        <View style={{ marginTop: 5, marginBottom: 85 }}>
          <ProductRow products={data} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
