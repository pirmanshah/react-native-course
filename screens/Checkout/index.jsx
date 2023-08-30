import React, { useContext } from 'react';
import mime from 'mime';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Picker } from '@react-native-picker/picker';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Alert,
} from 'react-native';
import checkoutService from './service/checkoutService';
import { AuthContext } from '../../store/AuthContext';
import { formatRupiah } from '../../utils';
import { styles } from './styles';
import LoadingOverlay from '../../components/LoadingOverlay';

const Checkout = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const user = authCtx?.user;

  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading: cartLoading = false } = useQuery(
    'cart',
    checkoutService.fetchCarts
  );
  const { data: banks = [], isLoading: bankLoading = false } = useQuery(
    'banks',
    checkoutService.fetchBanks
  );

  const [image, setImage] = React.useState(null);
  const [selectedBank, setSelectedBank] = React.useState('');
  const [sender, setSender] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [account, setAccount] = React.useState('');

  const mutation = useMutation(
    ({ formData }) => checkoutService.post(formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart');
        queryClient.invalidateQueries('my-learning');
        Alert.alert('Bukti transaksi berhasil diupload 🎉');
        setAccount('');
        setAmount('');
        setSender('');
        navigation.navigate('Transaction');
      },
      onError: (error) => {
        Alert.alert(error.message);
      },
    }
  );

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (
      sender.trim() === '' ||
      selectedBank === '' ||
      account.trim() === '' ||
      amount.trim() === '' ||
      image === null ||
      image === ''
    ) {
      return Alert.alert('Mohon isi semua informasi ❌');
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount)) {
      return Alert.alert('Amount harus berupa angka ❌');
    }

    const parsedAccount = Number(account);
    if (isNaN(parsedAccount)) {
      return Alert.alert('Account harus berupa angka ❌');
    }

    const formData = new FormData();
    formData.append('sender', sender);
    formData.append('bankId', selectedBank);
    formData.append('account', parsedAccount);
    formData.append('amount', parsedAmount);
    formData.append('userId', user?.id);
    formData.append('filename', `${user?.id}-${Date.now()}`);
    formData.append('carts', JSON.stringify(cartItems));

    const newImageUri = 'file:///' + image.split('file:/').join('');
    formData.append('file', {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split('/').pop(),
    });

    mutation.mutate({ formData });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + Number(item.harga), 0);
  };

  if (cartLoading || bankLoading) {
    return <LoadingOverlay />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          paddingBottom: 5,
          fontSize: 18,
          fontWeight: 'bold',
        }}
      >
        No Rekening Tujuan
      </Text>
      <Text
        style={{
          paddingVertical: 5,
          fontSize: 14,
          fontWeight: 'bold',
        }}
      >
        632784748 - Mandiri
      </Text>

      <Text
        style={{
          paddingTop: 10,
          paddingBottom: 5,
          fontSize: 18,
          fontWeight: 'bold',
        }}
      >
        Info Rekening Bank
      </Text>
      <Text style={{ paddingVertical: 5, fontSize: 14 }}>
        Nama pengirim di rekening Bank:
      </Text>
      <TextInput
        style={{
          height: 40,
          padding: 8,
          borderRadius: 4,
          borderWidth: 0.8,
          borderColor: 'gray',
        }}
        value={sender}
        placeholder="Nama Lengkap"
        onChangeText={(text) => setSender(text)}
      />

      <Text style={{ paddingTop: 5, fontSize: 14 }}>Transfer dari Bank:</Text>
      <Picker
        style={{ borderWidth: 1, borderColor: '#171717', fontSize: 14 }}
        selectedValue={selectedBank}
        onValueChange={(itemValue, itemIndex) => setSelectedBank(itemValue)}
      >
        <Picker.Item
          label="Pilih Bank"
          value="not set"
          style={{ fontSize: 14, padding: 0 }}
        />
        {banks.map((bank) => (
          <Picker.Item
            key={bank.id}
            label={bank.name}
            value={bank.id}
            style={{ fontSize: 14, padding: 0 }}
          />
        ))}
      </Picker>

      <Text style={{ paddingVertical: 5, fontSize: 14 }}>
        Nomor rekening anda:
      </Text>
      <TextInput
        style={{
          height: 40,
          padding: 8,
          borderRadius: 4,
          borderWidth: 0.8,
          borderColor: 'gray',
        }}
        value={account}
        placeholder="Nomor rekening"
        onChangeText={(text) => setAccount(text)}
      />

      <Text style={{ paddingVertical: 5, fontSize: 14 }}>
        Jumlah ditransfer (Rp):
      </Text>
      <TextInput
        style={{
          height: 40,
          padding: 8,
          borderRadius: 4,
          borderWidth: 0.8,
          borderColor: 'gray',
        }}
        value={amount}
        placeholder="Nominal"
        onChangeText={(text) => setAmount(text)}
      />

      <Text style={{ paddingVertical: 5, fontSize: 14 }}>
        Upload bukti transaksi:
      </Text>

      <TouchableHighlight
        style={{
          height: 60,
          borderWidth: 1,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          borderStyle: 'dashed',
          justifyContent: 'center',
          backgroundColor: image ? '#D8FEE4' : '#fff',
        }}
        onPress={pickImage}
      >
        {image ? (
          <AntDesign name="checkcircle" size={30} color="#171717" />
        ) : (
          <MaterialIcons name="cloud-upload" size={35} color="#171717" />
        )}
      </TouchableHighlight>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>{formatRupiah(getTotalPrice())}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleSubmit}>
          <Text style={styles.checkoutButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;
