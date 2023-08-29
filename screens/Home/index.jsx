import React, { useContext } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductRow from '../../components/product/ProductRow';
import { AuthContext } from '../../store/AuthContext';
import CartIcon from '../../components/cartIcon';
import homeService from './service/homeService';
import Carousel from './components/Carousel';
import Welcome from './components/Welcome';
import Heading from './components/Heading';
import { styles } from './styles';
import LoadingOverlay from '../../components/LoadingOverlay';

const Home = () => {
  const authCtx = useContext(AuthContext);
  const user = authCtx?.user;

  const queryClient = useQueryClient();

  const { data = {}, isLoading = false } = useQuery(
    ['courses', user?.id],
    () => homeService.getAll(user?.id),
    {
      enabled: !!user?.id, // Only enable the query when user.id is available
    }
  );

  const handleRefresh = () => {
    queryClient.refetchQueries('courses');
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#FFF' }}>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <View>
            <Text style={styles.location}>Welcome</Text>
            <Text style={styles.name}>{user?.nama}</Text>
          </View>

          <CartIcon />
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
      >
        <Welcome />
        <Carousel />
        <Heading />
        <View>
          <ProductRow products={data?.recommendedCourses} />
        </View>

        <Heading title="Others" />
        <View style={{ marginTop: 5, marginBottom: 85 }}>
          <ProductRow products={data?.notRecommendedCourses} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
