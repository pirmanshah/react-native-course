import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  Image,
  TouchableHighlight,
} from 'react-native';
import cartService from '../../services/cartService';
import { formatRupiah } from '../../utils';

const CartItem = ({ item, onPressRemove }) => {
  return (
    <View style={styles.cartItemContainer}>
      <View>
        <Text style={styles.cartItemName}>{item.judul}</Text>
        <Text style={styles.cartItemPrice}>{formatRupiah(item.harga)}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => onPressRemove(item.id)}
      >
        <Text style={styles.removeButtonText}>❌</Text>
      </TouchableOpacity>
    </View>
  );
};

const Checkout = () => {
  const queryClient = useQueryClient();
  const { data: cartItems = [] } = useQuery('cart', cartService.fetchCarts);
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const deleteMutation = useMutation(
    ({ cartId }) => cartService.deleted(cartId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart');
        Alert.alert('Delete cart success 🎉');
      },
      onError: (error) => {
        Alert.alert(error.message);
      },
    }
  );

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + Number(item.harga), 0);
  };

  const handleRemoveItem = (cartId) => {
    deleteMutation.mutate({ cartId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ letterSpacing: 0.5 }}>
        Pastikan anda telah melengkapi seluruh informasi sebelum upload bukti
        transfer. Admin kami akan memeriksa bukti transfer anda dalam 24 jam.
      </Text>

      <Text style={{ paddingVertical: 10, fontSize: 16, fontWeight: 'bold' }}>
        Info Rekening Bank
      </Text>

      <TouchableHighlight
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 60,
          borderWidth: 1,
          borderRadius: 4,
          borderStyle: 'dashed',
        }}
        onPress={pickImage}
      >
        <MaterialIcons name="cloud-upload" size={35} color="black" />
      </TouchableHighlight>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: '100%' }} />
      )}
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CartItem item={item} onPressRemove={handleRemoveItem} />
            )}
            contentContainerStyle={{ flexGrow: 1 }} // Add this line
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              {formatRupiah(getTotalPrice())}
            </Text>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
  },
  cartItemName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 14,
    marginRight: 10,
    color: 'gray',
  },
  removeButton: {
    padding: 7,
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: '#EAEAEA',
    paddingTop: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#171717',
    borderRadius: 4,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  emptyCartText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Checkout;
