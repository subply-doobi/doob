import React from 'react';
import styled from 'styled-components/native';
import {
  Row,
  HorizontalLine,
  BtnCTA,
  BtnBottomCTA,
} from '../../styles/styledConsts';
import {useWeightPurposeCode} from '../../query/queries/code';

const CategoryContent = () => {
  const weightTimeCd = useWeightPurposeCode('SP005');
  console.log('filtermodal/008:', weightTimeCd);
  return <Text>ooooo</Text>;
};
const filterMenus = [
  {id: 1, text: '카테고리'},
  {id: 2, text: '영양성분'},
  {id: 3, text: '가격'},
  {id: 4, text: '끼니구성'},
];
const FilterHeaderText = () => {
  return (
    <>
      <FilterRow>
        <Button
          onPress={() => {
            console.log('카테고리');
          }}>
          <Text>카테고리</Text>
          <CategoryContent />
        </Button>
        <Button
          onPress={() => {
            console.log('영양성분');
          }}>
          <Text>영양성분</Text>
        </Button>
        <Button>
          <Text>가격</Text>
        </Button>
        <Button>
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

const FilterModalContent = () => {
  return (
    <>
      <FilterHeaderText />
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
