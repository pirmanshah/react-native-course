import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { formatRupiah } from '../../utils';
import { Rating } from 'react-native-ratings';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AuthContext } from '../../store/AuthContext';
import cartService from '../../services/cartService';
import courseService from './service/courseService';
import CourseButton from './components/CourseButton';
import { ActivityIndicator } from 'react-native';
import LoadingOverlay from '../../components/LoadingOverlay';
import { imageUrl } from '../../constants';

const ProductDetail = ({ route, navigation }) => {
  const { item } = route.params;
  const queryClient = useQueryClient();

  const authCtx = useContext(AuthContext);
  const user = authCtx?.user;

  const { data: course = {}, isLoading = false } = useQuery(
    ['course-detail-id', item?.id],
    () => courseService.getDetail(item?.id),
    {
      enabled: !!item?.id,
    }
  );

  const mutation = useMutation(({ payload }) => cartService.post(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('courses');
      queryClient.invalidateQueries('cart');
      Alert.alert('Add to cart success 🎉');
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });

  const handleAdd = () => {
    const payload = {
      courseId: item?.id,
      userId: user?.id,
    };

    mutation.mutate({ payload });
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="heart" size={30} />
        </TouchableOpacity>
      </View>
      <Image
        style={styles.image}
        source={{
          uri: imageUrl + course.thumbnail,
        }}
      />

      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{course.judul}</Text>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            <Rating
              imageSize={24}
              readonly={true}
              startingValue={Number(course.rating)}
            />
          </View>
        </View>

        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.descriptionText}>{course.deskripsi}</Text>
        </View>

        <Text style={styles.price}>{formatRupiah(course.harga)}</Text>
        <CourseButton
          navigation={navigation}
          handleAdd={handleAdd}
          course={course}
        />
      </View>
    </View>
  );
};

export default ProductDetail;
