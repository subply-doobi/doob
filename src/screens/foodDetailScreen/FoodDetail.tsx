import React, {useState} from 'react';
import {Text, ScrollView, SafeAreaView} from 'react-native';
import styled from 'styled-components/native';

import {BASE_URL} from '../../query/queries/urls';

import {
  BtnCTA,
  BtnText,
  BtnBottomCTA,
  Col,
  Container,
  Row,
  TextMain,
  TextSub,
  StickyFooter,
} from '../../styles/styledConsts';
import colors from '../../styles/colors';

import NutrientsProgress from '../../components/common/NutrientsProgress';
import NutrientPart from './foodDetailSubScreen/NutrientPart';
import {Food} from '../../util/dummyData';

const food = Food;

const FoodPart = () => {
  return <Text>식품 상세 표시</Text>;
};
const ReviewPart = () => {
  return <Text>후기 표시</Text>;
};
const ShippingPart = () => {
  return <Text>배송 표시</Text>;
};

const ShowPart = i => {
  return i.index === 0 ? (
    <NutrientPart food={food} />
  ) : i.index === 1 ? (
    <FoodPart />
  ) : i.index === 2 ? (
    <ReviewPart />
  ) : i.index === 3 ? (
    <ShippingPart />
  ) : (
    <NutrientPart />
  );
};

const FoodDetail = () => {
  // const index = arg.route.params.menuIndex;

  const detailMenu = ['영양성분', '식품상세', '후기', '배송정책'];
  const [clicked, setClicked] = useState(0);

  // TODO : 이거 나중에 PRODUCT_LIST API가 나오면 GET_USER를 제거하고 PRODUCT_LIST를 받아와야함
  // const {isLoading, error, data} = useQuery({
  //   queryKey: ['PRODUCT_LIST'],
  //   queryFn: () =>
  //     queryFn(`${PRODUCT_LIST}?searchText=도시락&categoryCd=&sort`),
  // });

  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }

  // if (error) {
  //   console.warn(error);
  //   return <Text>Error </Text>;
  // }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Container>
        <ScrollView style={{marginBottom: 20}}>
          <NutrientsProgress menuIndex={0} />
          <FoodImageContainer
            source={{
              uri: `${BASE_URL}${food.mainAttUrl}`,
            }}
          />
          <SellerText>[{food.platformNm}]</SellerText>
          <ProductName>{food.productNm}</ProductName>
          <Row>
            <Col>
              <ShippingText>20000원 이상 무료배송 </ShippingText>
              <ShippingText>최소수량: 2개</ShippingText>
            </Col>
            <Price>{food.price}원</Price>
          </Row>
          <Row
            style={{
              justifyContent: 'space-between',
            }}>
            {detailMenu.map((el, index) => {
              return (
                <React.Fragment key={index}>
                  <DetailMenu
                    onPress={() => setClicked(index)}
                    selected={index === clicked}>
                    <DetailMenuText>{el}</DetailMenuText>
                  </DetailMenu>
                </React.Fragment>
              );
            })}
          </Row>
          <PartContainer>
            <ShowPart index={clicked} />
          </PartContainer>
        </ScrollView>
      </Container>
      <StickyFooter>
        <BtnBottomCTA btnStyle={'activated'}>
          <BtnText>장바구니 추가</BtnText>
        </BtnBottomCTA>
      </StickyFooter>
    </SafeAreaView>
  );
};

export default FoodDetail;

const FoodImageContainer = styled.Image`
  margin-left: 50px;
  width: 240px;
  height: 180px;
`;
const SellerText = styled(TextSub)`
  margin-top: 10px;
  font-size: 14px;
`;
const ProductName = styled(TextMain)`
  margin-top: 4px;
  font-size: 20px;
  font-weight: bold;
`;
const ShippingText = styled(TextMain)`
  margin-top: 4px;
  font-size: 14px;
`;
const Price = styled(TextMain)`
  font-size: 28px;
  font-weight: bold;
  margin-left: 90px;
`;
interface DetailMenuProps {
  onPress: () => void;
  selected?: boolean;
}

const DetailMenu = styled.TouchableOpacity<DetailMenuProps>`
  width: 74px;
  height: 32px;
  margin-top: 20px;
  margin-right: 5px;
  margin-bottom: 10px;
  border: 1px;
  border-radius: 5px;
  border-color: ${colors.inactivated};
  background-color: ${({selected}) =>
    selected ? colors.inactivated : 'white'};
  align-items: center;
  justify-content: center;
`;

const DetailMenuText = styled(TextMain)`
  font-size: 14px;
`;

const PartContainer = styled.View``;
