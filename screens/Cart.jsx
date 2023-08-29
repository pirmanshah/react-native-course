import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import cartService from '../services/cartService';
import { formatRupiah } from '../utils';
import LoadingOverlay from '../components/LoadingOverlay';

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

const Cart = ({ navigation }) => {
  const queryClient = useQueryClient();
  const { data: cartItems = [], isLoading = false } = useQuery(
    'cart',
    cartService.fetchCarts
  );

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

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <SafeAreaView style={styles.container}>
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
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('Checkout')}
            >
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

export default Cart;
