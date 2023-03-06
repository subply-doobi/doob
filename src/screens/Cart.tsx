import React, {useState} from 'react';
import {TouchableWithoutFeedback, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../stores/store';
import colors from '../styles/colors';
import {
  BtnSmall,
  BtnSmallText,
  TextMain,
  Row,
  HorizontalSpace,
  TextSub,
} from '../styles/styledConsts';

import NutrientsProgress from '../components/common/NutrientsProgress';
import MenuHeader from '../components/common/MenuHeader';
import MenuSelect from '../components/common/MenuSelect';
import {useListDiet, useListDietDetail} from '../query/queries/diet';
import AutoMenuBtn from '../components/cart/AutoMenuBtn';
import BottomMenuSelect from '../components/cart/BottomMenuSelect';
import AutoDietModal from '../components/cart/AutoDietModal';
import CartFoodList from '../components/cart/CartFoodList';
import {compareNutrToTarget, sumUpNutrients} from '../util/sumUp';
import {useGetBaseLine} from '../query/queries/baseLine';

const Cart = () => {
  // redux
  const {currentDietNo} = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  // react-query
  const {data: baseLineData} = useGetBaseLine();
  const {data: dietData} = useListDiet();
  const {data: dietDetailData} = useListDietDetail(currentDietNo);

  // useState
  const [menuSelectOpen, setMenuSelectOpen] = useState(false);
  const [checkAllClicked, setCheckAllClicked] = useState(false);
  const [autoDietModalShow, setAutoDietModalShow] = useState(false);

  // etc
  // 끼니1+끼니2+.... 텍스트
  const menuTotalText = dietData?.reduce(
    (acc, cur, idx) =>
      (acc += idx === 0 ? `${cur.dietSeq}` : `+${cur.dietSeq}`),
    '',
  );

  // 현재 끼니의 식품들이 목표섭취량에 부합하는지 확인
  // empty/notEnough/exceed 에 따라 autoMenuBtn 디자인이 다름
  const {cal, carb, protein, fat} = sumUpNutrients(dietDetailData);
  const menuStatus = baseLineData
    ? compareNutrToTarget(
        {cal, carb, protein, fat},
        {
          cal: parseInt(baseLineData.calorie),
          carb: parseInt(baseLineData.carb),
          protein: parseInt(baseLineData.protein),
          fat: parseInt(baseLineData.fat),
        },
      )
    : 'empty';
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setMenuSelectOpen(false);
      }}>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SelectedDeleteRow>
            <SelectAllBox>
              <SelectAllCheckbox
                onPress={() => setCheckAllClicked(clicked => !clicked)}>
                {checkAllClicked ? (
                  <CheckboxImage
                    source={require('../assets/icons/24_checkbox_selected.png')}
                  />
                ) : (
                  <CheckboxImage
                    source={require('../assets/icons/24_checkbox.png')}
                  />
                )}
              </SelectAllCheckbox>

              <SelectAllText>전체 선택</SelectAllText>
            </SelectAllBox>
            <BtnSmall onPress={() => console.log('선택삭제')}>
              <BtnSmallText isActivated={true}>선택 삭제</BtnSmallText>
            </BtnSmall>
          </SelectedDeleteRow>

          {/* 끼니 카드 */}
          <Card>
            <CardMenuHeader>
              <MenuHeader
                menuSelectOpen={menuSelectOpen}
                setMenuSelectOpen={setMenuSelectOpen}></MenuHeader>
            </CardMenuHeader>
            <HorizontalSpace height={24} />
            <NutrientsProgress currentDietNo={currentDietNo} />

            {/* 현재 끼니 식품들 */}
            <CartFoodList />

            {/* 자동구성 버튼 */}
            <AutoMenuBtn
              status={menuStatus}
              onPress={() => setAutoDietModalShow(true)}
            />
            <AutoDietModal
              modalVisible={autoDietModalShow}
              setModalVisible={setAutoDietModalShow}
            />
            <MenuTotalPrice>합계 0원</MenuTotalPrice>
            {menuSelectOpen && (
              <MenuSelect setOpen={setMenuSelectOpen} center={true} />
            )}
          </Card>

          {/* 카드 하단 끼니 선택 및 추가 */}
          <BottomMenuSelect />

          {/* 끼니 정보 요약 */}
          <TotalSummaryContainer>
            <MenuTotalText>{menuTotalText}</MenuTotalText>
            <SellerText>존맛식품</SellerText>
            <SellerProductPrice>식품: 5,700원</SellerProductPrice>
            <SellerShippingPrice>
              배송비: 3,000원 (10,000원 이상 무료배송)
            </SellerShippingPrice>
          </TotalSummaryContainer>
        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Cart;

// style //
const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0px 8px 0px 8px;
  background-color: ${colors.backgroundLight};
`;

const SelectedDeleteRow = styled(Row)`
  padding: 0px 8px 0px 8px;
  height: 52px;
  justify-content: space-between;
`;

const SelectAllBox = styled(Row)``;

const SelectAllCheckbox = styled.TouchableOpacity``;

const CheckboxImage = styled.Image`
  width: 24px;
  height: 24px;
  background-color: ${colors.highlight};
`;

const SelectAllText = styled(TextMain)`
  margin-left: 10px;
  font-size: 14px;
`;

const Card = styled.View`
  background-color: ${colors.white};
  width: 100%;
  padding: 0px 8px 16px 8px;
`;

const CardMenuHeader = styled.View`
  margin-top: 16px;
  align-self: center;
`;

const TotalSummaryContainer = styled.View`
  padding: 0px 8px 0px 8px;
`;

const MenuTotalPrice = styled(TextMain)`
  margin-top: 24px;
  font-size: 16px;
  font-weight: bold;
  align-self: flex-end;
`;

const MenuTotalText = styled(TextMain)`
  align-self: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 16px;
`;

const SellerText = styled(TextMain)`
  font-size: 16px;
  font-weight: bold;
  margin-top: 16px;
`;

const SellerProductPrice = styled(TextMain)`
  font-size: 14px;
  margin-top: 4px;
`;
const SellerShippingPrice = styled(TextSub)`
  font-size: 14px;
`;
