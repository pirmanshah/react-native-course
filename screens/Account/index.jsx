import React, { useContext } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SIZES } from '../../constants';
import { styles } from './styles';
import { TouchableHighlight } from 'react-native';
import { AuthContext } from '../../store/AuthContext';
import CartIcon from '../../components/cartIcon';

const Account = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const user = authCtx?.user;

  return (
    <SafeAreaView style={{ backgroundColor: '#FFF' }}>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <View>
            <Text style={styles.name}>Account</Text>
          </View>
          <CartIcon />
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          paddingVertical: SIZES.medium,
        }}
      >
        <Image
          style={{
            height: 100,
            aspectRatio: 1,
            borderRadius: 1000,
            marginBottom: SIZES.small,
          }}
          source={{
            uri: `https://ui-avatars.com/api/?name=${user?.nama}&color=000`,
          }}
        />
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: SIZES.xLarge,
              textTransform: 'capitalize',
              marginBottom: SIZES.xSmall - 5,
            }}
          >
            {user?.nama}
          </Text>
          <Text
            style={{
              color: '#171717',
            }}
          >
            {user?.email}
          </Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 20,
            gap: 10,
          }}
        >
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 15,
              borderRadius: 4,
              backgroundColor: '#FDE7D3',
            }}
            onPress={() => navigation.navigate('Transaction')}
          >
            <FontAwesome name="history" size={28} color="#F8AD51" />
            <Text style={{ color: '#F8AD51' }}>Transaction History</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: SIZES.xLarge }}>
          <TouchableHighlight onPress={() => authCtx.logout()}>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'teal',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 4,
              }}
            >
              <Text style={{ color: '#FFF' }}>Logout</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Account;
