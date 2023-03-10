import React, {useState} from 'react';
import {TouchableWithoutFeedback, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {
  useCreateDiet,
  useDeleteDiet,
  useListDiet,
} from '../../query/queries/diet';
import {setCurrentDietNo} from '../../stores/slices/cartSlice';
import {RootState} from '../../stores/store';
import colors from '../../styles/colors';
import {Col, HorizontalLine, TextMain} from '../../styles/styledConsts';
import {checkEmptyMenuIndex} from '../../util/checkEmptyMenu';
import {findDietSeq} from '../../util/findDietSeq';
import CreateLimitAlertContent from './alert/CreateLimitAlertContent';
import DAlert from './alert/DAlert';
import DeleteAlertContent from './alert/DeleteAlertContent';
import MenuEmptyAlertContent from './alert/MenuEmptyAlertContent';

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
  const {currentDietNo} = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  // state
  const [deleteAlertShow, setDeleteAlertShow] = useState(false);
  const [createAlertShow, setCreateAlertShow] = useState(false);
  const [dietNoToDelete, setDietNoToDelete] = useState<string>();

  // TBD | BottomMenuSelect랑 겹치는 기능
  const NoOfDiet = dietData?.length;
  const addAlertStatus =
    NoOfDiet === undefined
      ? 'error'
      : checkEmptyMenuIndex(dietData)
      ? 'empty'
      : NoOfDiet >= 3
      ? 'limit'
      : 'possible';

  const onCreateDiet = () => {
    if (addAlertStatus === 'possible') {
      createDietMutation.mutate();
      // TBD | 여기서 빈 끼니 있는지도 확인
      return;
    }
    setCreateAlertShow(true);
  };

  const onDeleteDiet = () => {
    dietNoToDelete && deleteDietMutation.mutate({dietNo: dietNoToDelete});
    dietData &&
      dispatch(setCurrentDietNo(dietData[dietData.length - 2]?.dietNo));
    setOpen(false);
    setDeleteAlertShow(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <SelectContainer center={center}>
        {dietData?.map((menu, index) => (
          <Col key={menu.dietNo}>
            <Menu
              onPress={() => {
                dispatch(setCurrentDietNo(menu.dietNo));
                setOpen(false);
              }}>
              <MenuText isActivated={menu.dietNo === currentDietNo}>
                {menu.dietSeq}
              </MenuText>
              {dietData.length === 1 || (
                <DeleteBtn
                  onPress={() => {
                    setDietNoToDelete(menu.dietNo);
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

        <Menu
          onPress={() => {
            onCreateDiet();
          }}>
          <MenuText>끼니 추가하기</MenuText>
        </Menu>

        <DAlert
          alertShow={deleteAlertShow}
          renderContent={() => (
            <DeleteAlertContent
              dietSeq={dietData ? findDietSeq(dietData, dietNoToDelete) : ''}
            />
          )}
          onConfirm={() => onDeleteDiet()}
          onCancel={() => setDeleteAlertShow(false)}
        />
        <DAlert
          alertShow={createAlertShow}
          renderContent={() =>
            addAlertStatus === 'limit' ? (
              <CreateLimitAlertContent />
            ) : addAlertStatus === 'empty' ? (
              <MenuEmptyAlertContent />
            ) : (
              <></>
            )
          }
          onConfirm={() => {
            setOpen(false);
            setCreateAlertShow(false);
          }}
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
