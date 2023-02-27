import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import colors from '../../../styles/colors';
import {Food} from '../../../util/dummyData';
import {Dot} from '../../../styles/styledConsts';
import {useGetBaseLine} from '../../../query/queries/baseLine';
import {useUserProfile} from '../../../query/queries/member';

const food = Food;

interface TableItem {
  name: string;
  column1: string;
  column2: string;
  color?: string;
}

const NutrientPart = () => {
  const userProfileQuery = useUserProfile();
  const {isLoading, data} = userProfileQuery;
  const table: TableItem[] = [
    {
      name: 'calorie',
      column1: '칼로리',
      column2: `${Math.ceil(Number(food.calorie))}`,
      color: colors.main,
    },
    {
      name: 'carb',
      column1: '탄수화물',
      column2: `${Math.ceil(Number(food.carb))}`,
      color: colors.blue,
    },
    {
      name: 'protein',
      column1: '단백질',
      column2: `${Math.ceil(Number(food.protein))}`,
      color: colors.green,
    },
    {
      name: 'fat',
      column1: '지방',
      column2: `${Math.ceil(Number(food.fat))}`,
      color: colors.orange,
    },
  ];
  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <>
      <View style={[styles.row, styles.firstItem]}>
        <View style={[styles.rowLeftItem, styles.firstItem]}>
          <Text style={styles.text}>총 내용량</Text>
        </View>
        <View style={[styles.rowRightItem, styles.firstItem]}>
          <Text style={styles.text}>250g</Text>
          <View>
            <Text style={styles.subText}>{data.nickNm}님의 1일</Text>
            <Text style={styles.subText}>목표섭취량에 대한 비율</Text>
          </View>
        </View>
      </View>
      {table.map(el => (
        <RenderItem item={el} key={el.column1} />
      ))}
    </>
  );
};

interface Props {
  item: TableItem;
}

function RenderItem({item}: Props) {
  const userBaseLine = useGetBaseLine();
  const {data, isLoading} = userBaseLine;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.row}>
      <View style={styles.rowLeftItem}>
        <Text style={styles.text}>{item.column1}</Text>
        {item.color ? <Dot backgroundColor={item.color} /> : null}
      </View>
      <View style={styles.rowRightItem}>
        <Text style={styles.text}>{item.column2}g</Text>
        <View>
          <Text style={styles.text}>
            {Math.round((Number(item.column2) / Number(data[item.name])) * 100)}
            %
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  firstItem: {
    height: 64,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.inactivated,
    height: 36,
  },
  rowRightItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    flex: 1,
    height: 36,
  },
  rowLeftItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 120,
    paddingHorizontal: 8,
    height: 36,
    borderColor: colors.inactivated,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    color: colors.textMain,
  },
  subText: {
    fontSize: 12,
    color: colors.textMain,
    textAlign: 'right',
  },
});

export default NutrientPart;
