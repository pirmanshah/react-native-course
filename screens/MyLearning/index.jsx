import React, { useContext, useMemo } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { AuthContext } from '../../store/AuthContext';
import courseService from './service/courseService';
import ListItem from '../../components/listItem';
import CartIcon from '../../components/cartIcon';
import { styles } from './styles';
import LoadingOverlay from '../../components/LoadingOverlay';

const MyLearning = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const user = authCtx?.user;

  const queryClient = useQueryClient();

  const { data: courses = [], isLoading = false } = useQuery(
    ['my-learning', user?.id],
    () => courseService.fetchCourses(user?.id),
    {
      enabled: !!user?.id, // Only enable the query when user.id is available
    }
  );

  const handleRefresh = () => {
    // Memanfaatkan queryClient untuk merefetch query
    queryClient.refetchQueries(['my-learning', user?.id]);
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

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
      <ScrollView
        style={{ backgroundColor: '#FFF', height: '100%' }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
      >
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
            onPress={({ id }) =>
              navigation.navigate('Course', { courseId: id })
            }
          />
        )}
        <View style={{ marginBottom: 120 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyLearning;
