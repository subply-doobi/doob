import React, {useState} from 'react';
import {FlatList, Text, TouchableWithoutFeedback} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {
  useCreateDiet,
  useDeleteDiet,
  useListDiet,
} from '../../query/queries/diet';
import {setMenuIndex} from '../../stores/slices/cartSlice';
import {RootState} from '../../stores/store';
import colors from '../../styles/colors';
import {Col, HorizontalLine, TextMain} from '../../styles/styledConsts';
import {checkMenuEmpty} from '../../util/checkEmptyMenu';
import CreateLimitAlertContent from './alert/CreateLimitAlertContent';
import DAlert from './alert/DAlert';

interface IMenuSelect {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  center?: boolean;
}
const MenuSelect = ({setOpen, center}: IMenuSelect) => {
  // react-query
  const {data: dietData} = useListDiet();
  const createDietMutation = useCreateDiet();
  const deleteDietMutation = useDeleteDiet();

  // redux
  const {menuIndex} = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [deleteAlertShow, setDeleteAlertShow] = useState(false);
  const [createAlertShow, setCreateAlertShow] = useState(false);

  const addAlertStatus = dietData
    ? checkMenuEmpty(dietData) === undefined
      ? dietData?.length >= 3
        ? 'limit'
        : 'none'
      : 'empty'
    : 'none';

  const deleteAlertContent = (index: number) => {
    return (
      <Container>
        <Col style={{marginTop: 28, alignItems: 'center'}}>
          <AlertText>끼니 {index + 1}</AlertText>
          <AlertText>삭제하시겠어요?</AlertText>
        </Col>
      </Container>
    );
  };

  const createLimitAlertContent = () => {
    return <CreateLimitAlertContent />;
  };
  const menuEmptyAlertContent = () => {
    const emptyMenuIndex = checkMenuEmpty(dietData);
    return (
      <Container>
        <Col style={{marginTop: 28, alignItems: 'center'}}>
          <AlertText>{`끼니${emptyMenuIndex - 1}을 먼저 구성하고`}</AlertText>
          <AlertText>{`이용해보세요`}</AlertText>
        </Col>
      </Container>
    );
  };

  const onCreateDiet = () => {
    if (addAlertStatus === 'none') {
      createDietMutation.mutate();
      return;
    }
    setCreateAlertShow(true);
  };

  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <SelectContainer center={center}>
        {dietData?.map((menu, index) => (
          <Col key={menu.dietNo}>
            <Menu
              onPress={() => {
                dispatch(setMenuIndex(index));
                setOpen(false);
              }}>
              <MenuText isActivated={index === menuIndex}>
                {menu.dietSeq}
              </MenuText>
              {dietData.length === 1 || (
                <DeleteBtn
                  onPress={() => {
                    deleteDietMutation.mutate({dietNo: menu.dietNo});
                    setDeleteAlertShow(true);
                  }}>
                  <DeleteImg
                    source={require('../../assets/icons/24_icon=close.png')}
                  />
                </DeleteBtn>
              )}
            </Menu>
            <HorizontalLine />
          </Col>
        ))}

        <Menu onPress={onCreateDiet}>
          <MenuText>끼니 추가하기</MenuText>
        </Menu>

        <DAlert
          alertShow={deleteAlertShow}
          renderContent={() => deleteAlertContent(menuIndex)}
          onConfirm={() => setDeleteAlertShow(false)}
          onCancel={() => setDeleteAlertShow(false)}
        />
        <DAlert
          alertShow={createAlertShow}
          renderContent={() =>
            addAlertStatus === 'limit' ? (
              createLimitAlertContent()
            ) : addAlertStatus === 'empty' ? (
              menuEmptyAlertContent()
            ) : (
              <></>
            )
          }
          onConfirm={() => setCreateAlertShow(false)}
          onCancel={() => setCreateAlertShow(false)}
          NoOfBtn={1}
        />
      </SelectContainer>
    </TouchableWithoutFeedback>
  );
};

export default MenuSelect;

const Container = styled.View`
  padding: 0px 16px 24px 16px;
`;

const AlertText = styled(TextMain)`
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
