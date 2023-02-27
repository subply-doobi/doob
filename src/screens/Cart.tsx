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
import {useListDiet} from '../query/queries/diet';
import AutoMenuBtn from '../components/cart/AutoMenuBtn';
import BottomMenuSelect from '../components/cart/BottomMenuSelect';
import {useGetBaseLine} from '../query/queries/baseLine';

const Cart = () => {
  // react-query
  const {data: dietData} = useListDiet();
  const menuTotalText = dietData?.reduce(
    (acc, cur, idx) =>
      (acc += idx === 0 ? `${cur.dietSeq}` : `+${cur.dietSeq}`),
    '',
  );

  // redux
  const {menuIndex} = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  // useState
  const [menuSelectOpen, setMenuSelectOpen] = useState(false);
  const [checkAllClicked, setCheckAllClicked] = useState(false);
  const [createDietAlertShow, setCreateDietAlertShow] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setMenuSelectOpen(false)}>
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
          <Card>
            <CardMenuHeader>
              <MenuHeader
                menuSelectOpen={menuSelectOpen}
                setMenuSelectOpen={setMenuSelectOpen}></MenuHeader>
            </CardMenuHeader>
            <HorizontalSpace height={24} />
            <NutrientsProgress menuIndex={menuIndex} />

            <AutoMenuBtn status="empty" />
            <MenuTotalPrice>합계 0원</MenuTotalPrice>
            {menuSelectOpen && (
              <MenuSelect setOpen={setMenuSelectOpen} center={true} />
            )}
          </Card>

          {/* 카드 하단 끼니 선택 및 추가 */}
          <BottomMenuSelect
            createDietAlertShow={createDietAlertShow}
            setCreateDietAlertShow={setCreateDietAlertShow}
          />

          {/* 끼니 정보 요약 */}
          <MenuTotalText>{menuTotalText}</MenuTotalText>
          <SellerText>존맛식품</SellerText>
          <SellerProductPrice>식품: 5,700원</SellerProductPrice>
          <SellerShippingPrice>
            배송비: 3,000원 (10,000원 이상 무료배송)
          </SellerShippingPrice>
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
