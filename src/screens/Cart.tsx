import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../stores/store';
import colors from '../styles/colors';
import {BtnSmall, BtnSmallText, TextMain, Row} from '../styles/styledConsts';

import NutrientsProgress from '../components/common/NutrientsProgress';
import MenuHeader from '../components/common/MenuHeader';

const Container = styled.View`
  flex: 1;
  padding: 0px 8px 0px 8px;
  background-color: ${colors.backgroundLight};
`;

const SelectedDeleteRow = styled(Row)`
  height: 52px;
  justify-content: space-between;
`;

const SelectAllBox = styled.View`
  flex-direction: row;
`;

const SelectAllCheckbox = styled.Image`
  width: 24px;
  height: 24px;
  background-color: ${colors.highlight};
`;

const SelectAllText = styled(TextMain)`
  font-size: 14px;
`;

const Card = styled.View`
  background-color: ${colors.white};
  width: 100%;
  padding: 0px 8px 0px 8px;
`;

const CardMenuHeader = styled.View`
  margin-top: 16px;
  align-self: center;
`;

const Cart = () => {
  const {cart, menuIndex, pickedCart} = useSelector(
    (state: RootState) => state.cart,
  );
  const dispatch = useDispatch();

  const [menuSelectOpen, setMenuSelectOpen] = useState(false);
  const [checkAllClicked, setCheckAllClicked] = useState(false);
  // const checkPrice = () =>
  //   cart[menuIndex].length === 0 ? setTotalPrice(0) : totalPrice;
  // useEffect(() => {
  //   checkPrice();
  // }, [cart[menuIndex].length]);
  // const menuInfo = arg =>
  //   arg.map((el, index) => {
  //     return `끼니 ${index + 1}`;
  //   });
  // let cardMenuArray = menuInfo(cart).map(el => {
  //   return el;
  // });
  // const getPlatformNm = () =>
  //   cart[0].map((el, index) => {
  //     return el.platformNm;
  //   });
  // const set = new Set(getPlatformNm());
  // const platformArray = [...set];

  //결제정보 관련
  // const getProductInfo = (index: number) =>
  //   cart[index]?.map(el => {
  //     return {
  //       cartIndex: index,
  //       productNo: el.productNo,
  //       qty: el.qty,
  //       price: el.price,
  //     };
  //   });
  // let productInfoArray = [];
  // for (let i = 0; i < 3; i++) {
  //   productInfoArray.push(getProductInfo(i));
  // }

  return (
    <Container>
      <SelectedDeleteRow>
        <SelectAllBox>
          {checkAllClicked ? (
            <SelectAllCheckbox
              source={require('../assets/icons/24_checkbox_selected.png')}
            />
          ) : (
            <SelectAllCheckbox
              source={require('../assets/icons/24_checkbox.png')}
            />
          )}

          <SelectAllText>전체 선택</SelectAllText>
        </SelectAllBox>
        <BtnSmall>
          <BtnSmallText isActivated={true}>선택 삭제</BtnSmallText>
        </BtnSmall>
      </SelectedDeleteRow>
      <Card>
        <CardMenuHeader>
          <MenuHeader
            menuSelectOpen={menuSelectOpen}
            setMenuSelectOpen={setMenuSelectOpen}></MenuHeader>
        </CardMenuHeader>
      </Card>
    </Container>
  );
};

export default Cart;
