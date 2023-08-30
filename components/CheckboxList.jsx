import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CheckboxList = ({ items = [] }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <View>
      {items.map((item) => (
        <TouchableOpacity key={item} onPress={() => toggleItem(item)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: selectedItems.includes(item) ? 'blue' : 'gray',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 8,
              }}
            >
              {selectedItems.includes(item) && (
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: 'blue',
                  }}
                />
              )}
            </View>
            <Text>{item}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CheckboxList;
