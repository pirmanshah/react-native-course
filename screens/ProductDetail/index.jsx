import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { formatRupiah } from '../../utils';
import { Rating } from 'react-native-ratings';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AuthContext } from '../../store/AuthContext';
import cartService from '../../services/cartService';

const ProductDetail = ({ route, navigation }) => {
  const { item } = route.params;
  const queryClient = useQueryClient();

  const authCtx = useContext(AuthContext);
  const user = authCtx?.user;

  const { data = [] } = useQuery('cart', cartService.fetchCarts);

  const isItemInCart = (cartItems, newItem) => {
    return cartItems.some((cartItem) => cartItem.courseId === newItem.id);
  };

  const mutation = useMutation(({ payload }) => cartService.post(payload), {
    onSuccess: () => {
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
          uri: item.thumbnail,
        }}
      />

      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.judul}</Text>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            <Rating
              imageSize={24}
              readonly={true}
              startingValue={Number(item.rating)}
            />
          </View>
        </View>

        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.descriptionText}>{item.deskripsi}</Text>
        </View>

        <Text style={styles.price}>{formatRupiah(item.harga)}</Text>
        {isItemInCart(data, item) ? (
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => navigation.navigate('Cart')}
          >
            <Text style={styles.cartTitle}>go to cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.cartBtn} onPress={handleAdd}>
            <Text style={styles.cartTitle}>Add to cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ProductDetail;
