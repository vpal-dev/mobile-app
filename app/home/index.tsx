import { Button } from '@/components/ui/button';
import { View, StyleSheet, FlatList } from 'react-native';
import { ListCheckIcon, PencilIcon, ShapesIcon } from 'lucide-react-native'
import { FeatureBox } from '@/components/feature-box';
import { FEATURES_DATA } from '@/constants/features-data';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.btnGroup}>
        <Button text="All" style={{ paddingHorizontal: 8 }} />
        <Button text="Create" Icon={PencilIcon} />
        <Button text="Check" Icon={ListCheckIcon} />
        <Button text="Differentiate" Icon={ShapesIcon} />
      </View>


      <FlatList
        data={FEATURES_DATA}
        contentContainerStyle={styles.featuresList}
        renderItem={data => {
          return <FeatureBox {...data.item} />
        }}
        keyExtractor={item => item.id}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 32,
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  featuresList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,

    paddingBottom: 20,
  }
});


