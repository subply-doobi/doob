import React from 'react';
import styled from 'styled-components/native';
import {
  Row,
  HorizontalLine,
  BtnCTA,
  BtnBottomCTA,
} from '../../styles/styledConsts';

const SortModalContent = () => {
  return (
    <>
      <Button
        onPress={() => {
          console.log;
        }}>
        <SortRow>
          <Text>가격</Text>
          <Image source={require('../../assets/icons/24_sort.png')} />
        </SortRow>
      </Button>
      <HorizontalLine />
      <Button>
        <SortRow>
          <Text>가칼비</Text>
          <Image source={require('../../assets/icons/24_sort.png')} />
        </SortRow>
      </Button>
      <HorizontalLine />

      <Button>
        <SortRow>
          <Text>가단비</Text>
          <Image source={require('../../assets/icons/24_sort.png')} />
        </SortRow>
      </Button>
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

export default SortModalContent;

const Text = styled.Text`
  font-size: 16px;
  margin-bottom: 10px;
`;
const BottomText = styled.Text`
  font-size: 16px;
`;
const Button = styled.TouchableOpacity``;
const Image = styled.Image`
  width: 24px;
  height: 24px;
`;
const SortRow = styled(Row)`
  margin: 10px;
  justify-content: center;
`;
const BottomRow = styled.View`
  flex-direction: row;
  justify-content: center;
`;
