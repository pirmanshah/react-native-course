import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const CheckboxList = ({ title, items, onChange }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (label) => {
    if (selectedItems.includes(label)) {
      setSelectedItems(selectedItems.filter((item) => item !== label));
    } else {
      setSelectedItems([...selectedItems, label]);
    }
  };

  useEffect(() => {
    onChange(selectedItems); // Panggil fungsi onChange saat selectedItems berubah
  }, [selectedItems]);

  return (
    <View style={{ marginVertical: 3 }}>
      <Text style={{ marginBottom: 5 }}>{title}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
        {items.map((item) => (
          <View
            key={item.value}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 10,
              marginBottom: 5,
              gap: 5,
            }}
          >
            <Checkbox
              tintColors={{ true: '#4630EB' }}
              value={selectedItems.includes(item.label)}
              onValueChange={() => toggleItem(item.label)}
            />
            <Text>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CheckboxList;
