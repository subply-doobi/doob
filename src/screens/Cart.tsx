import React, {useState, useEffect} from 'react';
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
  BtnCTA,
} from '../styles/styledConsts';
import {Text} from 'react-native';

import NutrientsProgress from '../components/common/NutrientsProgress';
import MenuHeader from '../components/common/MenuHeader';
import MenuSelect from '../components/common/MenuSelect';
import {
  useCreateDiet,
  useCreateDietDetail,
  useListDiet,
  useListDietDetail,
} from '../query/queries/diet';
import AutoMenuBtn from '../components/cart/AutoMenuBtn';

const Cart = () => {
  const {data: dietData, refetch: refetchDietData} = useListDiet({
    enabled: false,
  });
  const {data: dietDetailData, refetch: refetchDietDetailData} =
    useListDietDetail({enabled: false});
  const createDietMutation = useCreateDiet();
  const createDietDetailMutation = useCreateDietDetail();

  console.log('dietData: ', dietData);
  console.log('dietDetailData: ', dietDetailData);

  const {menuIndex} = useSelector((state: RootState) => state.cart);
  const [menuSelectOpen, setMenuSelectOpen] = useState(false);
  const [checkAllClicked, setCheckAllClicked] = useState(false);

  return (
    <Container>
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
        {menuSelectOpen && (
          <MenuSelect setOpen={setMenuSelectOpen} center={true} />
        )}

        <AutoMenuBtn status="empty" />
        <MenuTotalPrice>합계 0원</MenuTotalPrice>
      </Card>

      <BtnSmall onPress={() => createDietMutation.mutate()}>
        <Text> 끼니생성 </Text>
      </BtnSmall>
      <BtnSmall onPress={() => refetchDietData()}>
        <Text> 끼니조회 </Text>
      </BtnSmall>
      <BtnSmall onPress={() => refetchDietDetailData()}>
        <Text> 세부조회 </Text>
      </BtnSmall>
      <BtnSmall
        onPress={() =>
          createDietDetailMutation.mutate({
            dietNo: 'DT20230223000000002',
            productNo: 'PD20220713000000017',
          })
        }>
        <Text> 식품추가 </Text>
      </BtnSmall>
    </Container>
  );
};

export default Cart;

// style //
const Container = styled.View`
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
