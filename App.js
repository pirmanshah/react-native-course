import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import AuthContextProvider, { AuthContext } from './store/AuthContext';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import {
  Cart,
  Checkout,
  Course,
  Login,
  ProductDetail,
  Register,
  Transaction,
} from './screens';
import { AcsessToken, UserKey } from './constants';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: '#FFF',
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: '#FFF',
        },
      }}
    >
      <Stack.Screen
        name="Bottom Navigation"
        component={BottomTabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          title: 'My Cart',
        }}
      />
      <Stack.Screen
        name="Transaction"
        component={Transaction}
        options={{
          title: 'Transaction History',
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          title: 'Konfirmasi Pembayaran',
        }}
      />
      <Stack.Screen
        name="Course"
        component={Course}
        options={{
          title: 'Course Detail',
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem(AcsessToken);
      const storedUserData = await AsyncStorage.getItem(UserKey);

      if (storedToken && storedUserData) {
        try {
          const storedUser = JSON.parse(storedUserData);
          authCtx.authenticate(storedToken, storedUser);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
        }
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/Poppins-Regular.ttf'),
    light: require('./assets/fonts/Poppins-Light.ttf'),
    medium: require('./assets/fonts/Poppins-Medium.ttf'),
    semibold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    bold: require('./assets/fonts/Poppins-Bold.ttf'),
    extrabold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Fragment>
      <StatusBar style="auto" translucent={true} />
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </QueryClientProvider>
    </Fragment>
  );
}
