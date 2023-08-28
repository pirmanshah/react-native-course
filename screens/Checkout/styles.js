import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
  },
  cartItemName: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 13,
    marginRight: 10,
    color: 'gray',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: '#EAEAEA',
    paddingTop: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#171717',
    borderRadius: 4,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  emptyCartText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
