import { useCallback, useState } from 'react';
import { Text, SafeAreaView, View, TouchableHighlight } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const Course = () => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <SafeAreaView
      style={{
        padding: 20,
      }}
    >
      <View style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
          }}
        >
          React Complete Guide
        </Text>
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={'iee2TATGMyI'}
          onChangeState={onStateChange}
        />
        <TouchableHighlight style={{ marginTop: -90 }} onPress={togglePlaying}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'teal',
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 4,
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 600 }}>
              {playing ? 'Pause' : 'Play'}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default Course;
