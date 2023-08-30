import { useQuery } from 'react-query';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import transactionService from './service/transactionService';
import { AuthContext } from '../../store/AuthContext';
import { formatDate } from '../../utils';
import LoadingOverlay from '../../components/LoadingOverlay';

const TransactionItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemTitle}>{formatDate(item?.createdAt)}</Text>
      </View>
      <Text
        style={[
          styles.rightText,
          {
            color:
              item?.statusId === 1
                ? 'teal'
                : item?.statusId === 2
                ? 'orange'
                : 'red',
          },
        ]}
      >
        {item?.status}
      </Text>
    </View>
  );
};

const Transaction = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const user = authCtx?.user;
  const userId = user?.id;

  const { data: transactions = [], isLoading = false } = useQuery(
    ['transaction-history', userId],
    () => transactionService.getByUserId(userId)
  );

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {transactions.length > 0 ? (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TransactionItem item={item} />}
          contentContainerStyle={{ flexGrow: 1 }} // Add this line
        />
      ) : (
        <Text style={styles.emptyText}>Your transaction history is empty.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
  },
  itemTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 600,
  },
  removeButton: {
    padding: 7,
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: 8,
  },
  rightText: {
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Transaction;
