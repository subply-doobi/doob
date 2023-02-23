import {View, Text, FlatList, Alert} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../stores/store';
import {setMenuIndex} from '../../stores/slices/cartSlice';
import {Col, HorizontalLine, TextMain} from '../../styles/styledConsts';
import {IProduct} from '../../constants/constants';
import DAlert from './DAlert';
const Container = styled.View`
  padding: 0px 16px 24px 16px;
`;

const DeleteText = styled(TextMain)`
  font-size: 16px;
`;
const SelectContainer = styled.View`
  position: absolute;
  top: 48px;
  left: ${({center}: {center?: boolean}) => (center ? `32%` : `16px`)};
  width: 144px;
  background-color: ${colors.white};
  border-radius: 3px;
  border-width: 1px;
  border-color: ${colors.inactivated};
`;
const Menu = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  height: 48px;
  align-items: center;
  justify-content: center;
`;
const MenuText = styled.Text`
  font-size: 16px;
  color: ${({isActivated}: {isActivated?: boolean}) =>
    isActivated ? colors.main : colors.textMain};
`;

const DeleteBtn = styled.TouchableOpacity`
  position: absolute;
  right: 8px;
  width: 24px;
  height: 24px;
`;

const DeleteImg = styled.Image`
  width: 24px;
  height: 24px;
`;

interface IMenuSelect {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  center?: boolean;
}
const MenuSelect = ({setOpen, center}: IMenuSelect) => {
  // redux
  const {menuIndex} = useSelector((state: RootState) => state.cart);
  const [alertShow, setAlertShow] = useState(false);

  const deleteAlertContent = (index: number) => {
    return (
      <Container>
        <Col style={{marginTop: 24, marginLeft: 24}}>
          <DeleteText>끼니 {index + 1}를 삭제하시겠어요?</DeleteText>
        </Col>
      </Container>
    );
  };

  const renderMenuList = ({item}) => {
    return (
      <Menu
        onPress={() => {
          console.log(`끼니 ${item.index} 선택`);
          setOpen(false);
        }}>
        <MenuText isActivated={item.index === menuIndex}>{item.label}</MenuText>
        {item.index == 0 || (
          <>
            <DeleteBtn onPress={() => setAlertShow(true)}>
              <DeleteImg
                source={require('../../assets/icons/24_icon=close.png')}
              />
            </DeleteBtn>
          </>
        )}
      </Menu>
    );
  };

  return (
    <SelectContainer center={center}>
      <FlatList
        data={[{index: 0, label: '0'}]}
        renderItem={renderMenuList}
        keyExtractor={item => item.label}
        ItemSeparatorComponent={() => <HorizontalLine />}
      />

      <HorizontalLine />
      <Menu
        onPress={() => {
          console.log('끼니 추가하기');
        }}>
        <MenuText>끼니 추가하기</MenuText>
      </Menu>
      <DAlert
        alertShow={alertShow}
        renderContent={() => deleteAlertContent(menuIndex)}
        onConfirm={() => setAlertShow(false)}
        onCancel={() => setAlertShow(false)}
      />
    </SelectContainer>
  );
};

export default MenuSelect;
