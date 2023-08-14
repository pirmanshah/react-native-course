import { Ionicons } from '@expo/vector-icons';
import React, { memo, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from 'react-query';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from 'react-native';
import { AuthContext } from '../../store/AuthContext';
import cartService from '../../services/cartService';
import { styles } from './productCardView.style';
import { formatRupiah } from '../../utils';
import { COLORS } from '../../constants';

const ProductCardView = ({ item }) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const authCtx = useContext(AuthContext);
  const user = authCtx?.user;

  const mutation = useMutation(({ payload }) => cartService.post(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('cart');
      Alert.alert('Add to cart success 🎉');
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });

  const handleAdd = (item) => {
    const payload = {
      courseId: item?.id,
      userId: user?.id,
    };

    mutation.mutate({ payload });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('ProductDetail', { item: item })}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: item.thumbnail,
            }}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{item.judul}</Text>
          <Text style={styles.lecture}>{item.deskripsi}</Text>
          <Text style={styles.price}>{formatRupiah(item.harga)}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={() => handleAdd(item)}>
          <Ionicons name="add-circle" size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(ProductCardView);
