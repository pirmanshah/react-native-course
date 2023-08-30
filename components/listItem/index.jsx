import { Fragment, memo } from 'react';
import { Rating } from 'react-native-ratings';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SIZES, imageUrl } from '../../constants';

const RenderItems = ({ items, onPress }) => {
  return (
    <Fragment>
      {items?.length > 0 ? (
        items.map((item) => (
          <TouchableWithoutFeedback key={item.id} onPress={() => onPress(item)}>
            <View
              key={item.id}
              style={{
                padding: SIZES.small,
                display: 'flex',
                flexDirection: 'row',
                gap: SIZES.medium,
              }}
            >
              <Image
                style={{
                  aspectRatio: 1,
                  height: 70,
                  width: 70,
                  borderRadius: 4,
                }}
                source={{
                  uri: imageUrl + item.thumbnail,
                }}
              />
              <View style={{ alignItems: 'flex-start' }}>
                <Text style={{ fontSize: SIZES.large - 3, fontWeight: 'bold' }}>
                  {item.judul}
                </Text>
                <Text style={{ color: 'gray', paddingBottom: 5 }}>
                  {item.deskripsi}
                </Text>
                <Rating
                  imageSize={18}
                  readonly={true}
                  startingValue={Number(item.rating)}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))
      ) : (
        <View>
          <Text
            style={{
              textAlign: 'center',
              color: '#6A6F73',
              padding: 10,
              fontSize: 16,
            }}
          >
            Course is empty
          </Text>
        </View>
      )}
    </Fragment>
  );
};

const comparePropTable = (prevProp, nextProp) => {
  if (prevProp.items === nextProp.items) {
    return true;
  }

  return false;
};

const ListItem = memo(RenderItems, comparePropTable);

export default ListItem;
