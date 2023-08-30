import React from 'react';
import { View, FlatList } from 'react-native';
import ProductCardView from './ProductCardView';

const ProductRow = ({ products }) => {
  return (
    <View>
      <FlatList
        horizontal
        data={products}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: 0 }}
        renderItem={({ item }) => <ProductCardView item={item} />}
      />
    </View>
  );
};

export default React.memo(ProductRow);
