import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 280,
    marginEnd: 12,
    borderRadius: 4,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    shadowColor: '#4d4d4d',
    marginBottom: SIZES.small,
  },
  imageContainer: {
    flex: 1,
    width: 190,
    marginLeft: SIZES.small / 2,
    marginTop: SIZES.small / 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  details: {
    padding: SIZES.small,
  },
  title: {
    fontFamily: 'bold',
    fontSize: SIZES.medium,
    marginBottom: 1,
  },
  lecture: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  price: {
    fontFamily: 'bold',
    fontSize: 14,
  },
  addBtn: {
    position: 'absolute',
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});
