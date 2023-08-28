import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

export const styles = StyleSheet.create({
  appBarWrapper: {
    marginHorizontal: 12,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'regular',
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  name: {
    fontFamily: 'semibold',
    fontSize: SIZES.large,
    color: COLORS.black,
    textTransform: 'capitalize',
  },
});
