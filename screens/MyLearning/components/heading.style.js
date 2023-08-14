import { SIZES } from '../../../constants';

const { StyleSheet } = require('react-native');

export const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
    marginBottom: SIZES.xSmall,
    marginHorizontal: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: SIZES.medium,
  },
});
