import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { formatRupiah } from '../../utils';
import { Rating } from 'react-native-ratings';

const ProductDetail = ({ route, navigation }) => {
  const { item } = route.params;

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
          <Text style={styles.descriptionText}>
            Lorem ipsum dolor sit consectetur, adipisicing elit. Temporibus
            soluta illo deserunt delectus ipsam laudantium reiciendis quam
            recusandae dolorem laboriosam, dignissimos autem harum
            necessitatibus maxime ratione sunt!
          </Text>
        </View>

        <Text style={styles.price}>{formatRupiah(item.harga)}</Text>

        <TouchableOpacity style={styles.cartBtn} onPress={() => {}}>
          <Text style={styles.cartTitle}>Enrol Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetail;
