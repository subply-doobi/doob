import React, {useState} from 'react';
import styled from 'styled-components/native';
import {
  Row,
  HorizontalLine,
  BtnCTA,
  BtnBottomCTA,
} from '../../styles/styledConsts';
import {useListProduct} from '../../query/queries/product';

const SortModalContent = props => {
  const {closeModal} = props;
  const [priceToggle, setPriceToggle] = useState(0);
  const [calorieToggle, setCalorieToggle] = useState(0);
  const [proteinToggle, setProteinToggle] = useState(0);
  const [param, setParam] = useState('');
  const [last, setLast] = useState('');
  const {data} = useListProduct();

  console.log(data);
  console.log('last:', last);
  const toggleButton = arg => {
    const {price, calorie, protein} = arg;
    // setCalorieToggle(0);
    // setProteinToggle(0);
    price === 0
      ? setParam('Price,DESC')
      : price === 1
      ? setParam('Price,ASC')
      : price === 2
      ? setParam('')
      : null;
    calorie === 0
      ? setParam('PriceCalorieCompare,DESC')
      : arg.calorie === 1
      ? setParam('PriceCalorieCompare,ASC')
      : arg.calorie === 2
      ? setParam('')
      : null;
    protein === 0
      ? setParam('PriceProteinCompare,DESC')
      : arg.protein === 1
      ? setParam('PriceProteinCompare,ASC')
      : arg.protein === 2
      ? setParam('')
      : null;
    // if (price) {
    //   setCalorieToggle(0);
    //   setProteinToggle(0);
    //   price === 0
    //     ? setParam('Price,DESC')
    //     : price === 1
    //     ? setParam('Price,ASC')
    //     : price === 2
    //     ? setParam('ㄴㄴ')
    //     : null;
    // } else if (calorie) {
    //   setPriceToggle(0);
    //   setProteinToggle(0);
    //   calorie === 0
    //     ? setParam('Calorie,DESC')
    //     : arg.calorie === 1
    //     ? setParam('Calorie,ASC')
    //     : arg.calorie === 2
    //     ? setParam('')
    //     : null;
    // } else if (protein) {
    //   setPriceToggle(0);
    //   setCalorieToggle(0);
    //   protein === 0
    //     ? setParam('Protein,DESC')
    //     : arg.protein === 1
    //     ? setParam('Protein,ASC')
    //     : arg.protein === 2
    //     ? setParam('')
    //     : null;
    // }
  };

  console.log('param:', param);

  return (
    <>
      <Button
        onPress={() => {
          setCalorieToggle(0);
          setProteinToggle(0);
          toggleButton({price: priceToggle});
          setPriceToggle(
            priceToggle % 2 === 0 && priceToggle !== 0 ? 0 : priceToggle + 1,
          );
        }}>
        <SortRow>
          <Text>가격</Text>
          {priceToggle === 0 ? (
            <Image source={require('../../assets/icons/24_sort.png')} />
          ) : priceToggle === 1 ? (
            <Image
              source={require('../../assets/icons/24_sort_descending.png')}
            />
          ) : (
            <Image
              source={require('../../assets/icons/24_sort_ascending.png')}
            />
          )}
        </SortRow>
      </Button>
      <HorizontalLine />
      <Button
        onPress={() => {
          setPriceToggle(0);
          setProteinToggle(0);
          setCalorieToggle(
            calorieToggle % 2 === 0 && calorieToggle !== 0
              ? 0
              : calorieToggle + 1,
          );
          toggleButton({calorie: calorieToggle});
        }}>
        <SortRow>
          <Text>가칼비</Text>
          {calorieToggle === 0 ? (
            <Image source={require('../../assets/icons/24_sort.png')} />
          ) : calorieToggle === 1 ? (
            <Image
              source={require('../../assets/icons/24_sort_descending.png')}
            />
          ) : (
            <Image
              source={require('../../assets/icons/24_sort_ascending.png')}
            />
          )}
        </SortRow>
      </Button>
      <HorizontalLine />

      <Button
        onPress={() => {
          setPriceToggle(0);
          setCalorieToggle(0);
          setProteinToggle(
            proteinToggle % 2 === 0 && proteinToggle !== 0
              ? 0
              : proteinToggle + 1,
          );
          toggleButton({protein: proteinToggle});
        }}>
        <SortRow>
          <Text>가단비</Text>
          {proteinToggle === 0 ? (
            <Image source={require('../../assets/icons/24_sort.png')} />
          ) : proteinToggle === 1 ? (
            <Image
              source={require('../../assets/icons/24_sort_descending.png')}
            />
          ) : (
            <Image
              source={require('../../assets/icons/24_sort_ascending.png')}
            />
          )}
        </SortRow>
      </Button>
      <BottomRow>
        <BtnCTA btnStyle="border" width="200">
          <BottomText>초기화</BottomText>
        </BtnCTA>
        <BtnCTA
          btnStyle="border"
          width="200"
          onPress={() => {
            closeModal(false);
          }}>
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
