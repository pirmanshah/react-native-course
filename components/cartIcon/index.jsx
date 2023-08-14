import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useQuery } from 'react-query';
import cartService from '../../services/cartService';

const CartIcon = () => {
  const navigation = useNavigation();

  const { data = [] } = useQuery('cart', cartService.fetchCarts);

  return (
    <TouchableOpacity
      style={{
        alignItems: 'flex-end',
        padding: 10,
      }}
      onPress={() => navigation.navigate('Cart')}
    >
      <View style={styles.cartCount}>
        <Text style={styles.cartNumber}>{data?.length}</Text>
      </View>
      <Ionicons name="cart" size={28} />
    </TouchableOpacity>
  );
};

export default CartIcon;
