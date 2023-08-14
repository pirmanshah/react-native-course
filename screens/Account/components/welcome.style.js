import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  welcomeText: (color, top) => ({
    fontFamily: 'bold',
    fontSize: SIZES.xxLarge - 10,
    marginTop: top,
    color: color,
    marginHorizontal: 12,
  }),
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F9FB',
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    marginHorizontal: SIZES.small,
    height: 50,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: '#F6F9FB',
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  searchInput: {
    fontFamily: 'regular',
    width: '100%',
    height: '100%',
    paddingHorizontal: SIZES.small,
  },
  searchBtn: {
    width: 50,
    height: '100%',
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
});
