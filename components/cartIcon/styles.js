import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  cartCount: {
    position: 'absolute',
    bottom: 25,
    width: 16,
    right: 6,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'teal',
    zIndex: 999,
  },
  cartNumber: {
    fontFamily: 'regular',
    fontWeight: '600',
    fontSize: 10,
    color: COLORS.lightWhite,
  },
});
