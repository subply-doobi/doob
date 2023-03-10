import React, {useState} from 'react';
import styled from 'styled-components/native';
import {
  Row,
  HorizontalLine,
  BtnCTA,
  BtnBottomCTA,
} from '../../styles/styledConsts';
import {useWeightPurposeCode, useFilterCode} from '../../query/queries/code';
import {useListProduct} from '../../query/queries/product';
import {useListCategory, useCountCategory} from '../../query/queries/category';
import {ProgressBarAndroidComponent} from 'react-native';

interface CategoryItem {
  categoryCd: string;
  CategoryCdNm: string;
  productCnt: number;
}

const FilterModalContent = () => {
  const [clicked, setClicked] = useState(0);
  const CategoryContent = () => {
    // const filter = useFilterCode('Protein');
    // console.log('filterTest:', filter);
    const list = useListProduct();
    // console.log('filterModal/listproduct:', list);
    const count = useCountCategory();
    const onPress = arg => {
      console.log('pressed', arg);
    };
    return count.data?.map((e, i) => (
      <>
        <CategoryButton
          key={e.categoryCd}
          onPress={() => onPress(e.categoryCd)}>
          <CategoryText>
            {e.categoryCdNm}( {e.productCnt})
          </CategoryText>
          <HorizontalLine />
        </CategoryButton>
      </>
    ));
  };
  const NutritionContent = () => {
    return <Text>nutrition</Text>;
  };
  const PriceContent = () => {
    return <Text>price</Text>;
  };
  const AutoDietContent = () => {
    return <Text>auto</Text>;
  };
  const FilterHeaderText = () => {
    return (
      <>
        <FilterRow>
          <Button
            onPress={() => {
              setClicked(0);
            }}>
            <Text>카테고리</Text>
          </Button>
          <Button
            onPress={() => {
              setClicked(1);
            }}>
            <Text>영양성분</Text>
          </Button>
          <Button
            onPress={() => {
              setClicked(2);
            }}>
            <Text>가격</Text>
          </Button>
          <Button
            onPress={() => {
              setClicked(3);
            }}>
            <Text>식단구성</Text>
          </Button>
          <Button>
            <Image
              style={{marginTop: 5}}
              source={require('../../assets/icons/24_filterInitialize.png')}
            />
          </Button>
        </FilterRow>
      </>
    );
  };
  const ShowContent = (i: any) => {
    return i.index === 0 ? (
      <CategoryContent />
    ) : i.index === 1 ? (
      <NutritionContent />
    ) : i.index === 2 ? (
      <PriceContent />
    ) : i.index === 3 ? (
      <AutoDietContent />
    ) : (
      <CategoryContent />
    );
  };
  return (
    <>
      <FilterHeaderText />
      <ShowContent index={clicked} />
      <BottomRow>
        <BtnCTA btnStyle="border" width="200">
          <BottomText>초기화</BottomText>
        </BtnCTA>
        <BtnCTA btnStyle="border" width="200">
          <BottomText>확인</BottomText>
        </BtnCTA>
      </BottomRow>
    </>
  );
};

export default FilterModalContent;

const Text = styled.Text`
  font-size: 18px;
  margin: 15px;
`;
const CategoryText = styled.Text`
  font-size: 16px;
  margin: 15px;
  text-align: center;
`;
const CategoryButton = styled.TouchableOpacity``;

const BottomText = styled.Text`
  font-size: 16px;
`;
const Button = styled.TouchableOpacity``;
const Image = styled.Image`
  width: 24px;
  height: 24px;
`;
const FilterRow = styled(Row)`
  justify-content: center;
`;
const BottomRow = styled.View`
  flex-direction: row;
  justify-content: center;
`;
