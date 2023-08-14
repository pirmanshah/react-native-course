import { createContext, useContext } from 'react';
import { useQuery, useMutation } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { baseUrl } from '../constants';

// Create a cart context
const CartContext = createContext();

// Provide cart data using React Query
const CartProvider = ({ children }) => {
  // Define your fetchToken function
  const fetchToken = async () => {
    try {
      const value = await AsyncStorage.getItem('accessToken');
      return value;
    } catch (error) {
      console.error('Error fetching token:', error);
      return null;
    }
  };

  // Define your fetchCartData function
  const fetchCartData = async (token) => {
    try {
      const response = await fetch(`${baseUrl}/carts`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const responseJson = await response.json();
      const data = responseJson?.data?.carts;
      return data;
    } catch (error) {
      console.error('Error fetching cart data:', error);
      throw error; // Rethrow the error for React Query to handle
    }
  };

  // Use React Query to manage cart data
  const { data: cartData, refetch: refetchCart } = useQuery(
    ['cart', fetchToken()],
    fetchCartData
  );

  // Your updateCartData function (useMutation)
  const { mutate: updateCart } = useMutation(updateCartData);

  // Implement your updateCartData function
  const updateCartData = async (newCartData) => {
    try {
      // Implement your cart data update logic here, e.g., update data on the server
      // Don't forget to update the local cartData with the newCartData
      // Also, you might want to refetch the cart data after updating
      // This function should return the updated cart data
      return newCartData;
    } catch (error) {
      console.error('Error updating cart data:', error);
      throw error; // Rethrow the error for React Query to handle
    }
  };

  return (
    <CartContext.Provider value={{ cartData, updateCart, refetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart data and functions
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
