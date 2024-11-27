import React from 'react';
import { Button } from '@/components/ui/button';
import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { ListCheckIcon, PencilIcon, ShapesIcon } from 'lucide-react-native';
import { FeatureBox, FeatureBoxProps } from '@/components/feature-box';
import { FeatureDataItem, FEATURES_DATA } from '@/constants/features-data';

type ButtonItem = {
  id: string;
  text: string;
  Icon: React.ComponentType | null;
};

type FeatureItem = FeatureDataItem

type ListItem = { type: 'buttons' } | (FeatureItem & { type: 'feature' });

const buttons: ButtonItem[] = [
  { id: '1', text: 'All', Icon: null },
  { id: '2', text: 'Create', Icon: PencilIcon },
  { id: '3', text: 'Check', Icon: ListCheckIcon },
  { id: '4', text: 'Differentiate', Icon: ShapesIcon },
];

export default function HomeScreen() {
  const data: ListItem[] = [{ type: 'buttons' }, ...FEATURES_DATA.map(item => ({ type: 'feature', ...item }))];

  const renderItem: ListRenderItem<ListItem> = ({ item }) => {
    if (item.type === 'buttons') {
      return (
        <View style={styles.btnGroup}>
          {buttons.map(button => (
            <Button
              key={button.id}
              text={button.text}
              Icon={button.Icon}
              style={{ paddingHorizontal: 8 }}
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

