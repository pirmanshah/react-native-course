import { useQuery } from 'react-query';
import { useCallback, useState } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AccordionList from '../../components/AccordionList';
import courseService from './service/courseService';
import { getYouTubeVideoId } from '../../utils';

const Course = () => {
  const [link, setLink] = useState('');
  const [playing, setPlaying] = useState(false);
  const courseId = 44; // Replace with the desired course ID

  const { data = [] } = useQuery(['course-detail', courseId], () =>
    courseService.getByCourseId(courseId)
  );

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
        flex: 1,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
          }}
        >
          {data?.title}
        </Text>
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={link}
          onChangeState={onStateChange}
        />
        <TouchableHighlight style={{ marginTop: -95 }} onPress={togglePlaying}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'teal',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 4,
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 600 }}>
              {playing ? 'Pause' : 'Play'}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.courseContentContainer}>
        <Text style={styles.courseContentTitle}>Course content</Text>
        <ScrollView>
          {/* Debugging: Ensure that there's content inside AccordionList */}
          <AccordionList
            data={data?.courses}
            onClick={(link) => setLink(getYouTubeVideoId(link))}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  courseContentContainer: {
    flex: 1,
  },
  courseContentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Course;
