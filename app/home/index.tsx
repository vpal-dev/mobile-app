import React from 'react';
import { Button } from '@/components/ui/button';
import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { ListCheckIcon, LucideIcon, PencilIcon, ShapesIcon } from 'lucide-react-native';
import { FeatureBox } from '@/components/feature-box';
import { FeatureDataItem, FEATURES_DATA, FeatureType } from '@/constants/features-data';

type ButtonItem = {
  id: string;
  filter_type: "all" | FeatureType
  text: string;
  Icon: React.ComponentType | null;
};

type FeatureItem = FeatureDataItem

type ListItem = { type: 'buttons' } | (FeatureItem & { type: 'feature' });

const buttons: ButtonItem[] = [
  { id: '1', filter_type: "all", text: 'All', Icon: null },
  { id: '2', filter_type: "create", text: 'Create', Icon: PencilIcon },
  { id: '3', filter_type: "check", text: 'Check', Icon: ListCheckIcon },
  { id: '4', filter_type: "differentiate", text: 'Differentiate', Icon: ShapesIcon },
];

export default function HomeScreen() {
  const [activeFilter, setActiveFilter] = React.useState<ButtonItem['filter_type']>('all');

  // TODO: Fix this type issue
  // @ts-ignore
  const data: ListItem[] = [{ type: 'buttons' }, ...Object.values(FEATURES_DATA).filter(
    item => activeFilter === 'all' || item.feature_type === activeFilter
  ).map(item => ({ type: 'feature', ...item }))];

  const renderItem: ListRenderItem<ListItem> = ({ item }) => {
    if (item.type === 'buttons') {
      return (
        <View style={styles.btnGroup}>
          {buttons.map(button => (
            <Button
              key={button.id}
              text={button.text}
              // TODO: Fix this type issue
              Icon={button.Icon as LucideIcon}
              style={{ paddingHorizontal: 8 }}
              onPress={() => { setActiveFilter(button.filter_type) }}
            />
          ))}
        </View>
      );
    } else if (item.type === 'feature') {
      return <FeatureBox {...item} />;
    }
    return null;
  };

  return (
    <FlatList
      data={data}
      // TODO: Fix this type issue
      // @ts-ignore
      keyExtractor={(item, index) => item.id || `section-${index}`}
      contentContainerStyle={styles.container}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  btnGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

