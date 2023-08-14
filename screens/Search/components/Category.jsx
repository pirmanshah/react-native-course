import { TouchableOpacity, Text } from 'react-native';

const Category = ({ item, active, setCategory }) => {
  return (
    <TouchableOpacity
      onPress={() => setCategory(item.id)}
      style={{
        borderRadius: 100,
        paddingVertical: 5,
        borderColor: 'gray',
        paddingHorizontal: 10,
        borderWidth: active ? 0 : 1,
        backgroundColor: active ? '#50B072' : '#FFF',
      }}
    >
      <Text style={{ color: active ? 'white' : 'gray' }}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default Category;
