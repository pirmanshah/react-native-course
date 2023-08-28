import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const AccordionList = ({ data, onClick }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleItem = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const RenderSectionItem = ({ item, onPress }) => {
    return (
      <TouchableOpacity
        style={styles.sectionItem}
        onPress={() => onPress(item.link)}
      >
        <Text>{item.judul_video}</Text>
        <MaterialCommunityIcons
          size={18}
          color="black"
          name="television-play"
          style={{ paddingRight: 5 }}
        />
      </TouchableOpacity>
    );
  };

  const RenderItem = ({ item, onPress }) => {
    const isExpanded = item.id === expandedItem;

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => toggleItem(item.id)}
          style={styles.itemHeader}
        >
          <Text style={styles.itemHeaderText}>{item.title}</Text>
          <AntDesign
            name={isExpanded ? 'up' : 'down'}
            size={14}
            color="#333"
            style={styles.icon}
          />
        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.expandedContent}>
            <FlatList
              data={item.sections}
              renderItem={({ item }) => (
                <RenderSectionItem item={item} onPress={onPress} />
              )}
              keyExtractor={(section) => section.id.toString()}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <RenderItem item={item} onPress={onClick} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 5,
    paddingVertical: 5,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    padding: 10,
  },
  itemHeaderText: {
    fontWeight: 'bold',
  },
  expandedContent: {
    marginTop: 10,
  },
  sectionItem: {
    display: 'flex',
    marginLeft: 10,
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginLeft: 10,
  },
});

export default AccordionList;
