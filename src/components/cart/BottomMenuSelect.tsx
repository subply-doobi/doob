import React from 'react';
import {
  BtnSmall,
  BtnSmallText,
  Col,
  Row,
  VerticalSpace,
} from '../../styles/styledConsts';
import {TDietData} from '../../query/types/diet';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../stores/store';
import {setMenuIndex} from '../../stores/slices/cartSlice';
import {
  useCreateDiet,
  useListDiet,
  useListDietDetail,
} from '../../query/queries/diet';
import DAlert from '../common/alert/DAlert';
import CreateLimitAlertContent from '../common/alert/CreateLimitAlertContent';
import colors from '../../styles/colors';

interface IBottomMenuSelect {
  createDietAlertShow: boolean;
  setCreateDietAlertShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const BottomMenuSelect = ({
  createDietAlertShow,
  setCreateDietAlertShow,
}: IBottomMenuSelect) => {
  // react-query
  const {data: dietData} = useListDiet();
  const createDietMutation = useCreateDiet();
  const NoOfDiet = dietData?.length;

  // redux
  const {menuIndex} = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  return (
    <Col>
      {/* 끼니선택 및 추가 버튼 */}
      <Row
        style={{
          width: '100%',
          flexWrap: 'wrap',
          marginTop: 16,
        }}>
        {dietData?.map((menu, index) => {
          const isActivated = menuIndex === index ? true : false;
          return (
            <Row key={menu.dietNo}>
              <BtnSmall
                isActivated={isActivated}
                style={{marginBottom: 8}}
                onPress={() => dispatch(setMenuIndex(index))}>
                <BtnSmallText isActivated={isActivated}>
                  {menu.dietSeq}
                </BtnSmallText>
              </BtnSmall>
              <VerticalSpace width={8} />
            </Row>
          );
        })}
        <Row>
          <BtnSmall
            style={{marginBottom: 8}}
            onPress={() => {
              if (NoOfDiet && NoOfDiet >= 3) {
                setCreateDietAlertShow(true);
                return;
              }
              createDietMutation.mutate();
              NoOfDiet && dispatch(setMenuIndex(NoOfDiet));
            }}>
            <BtnSmallText style={{color: colors.inactivated}}>+</BtnSmallText>
          </BtnSmall>
        </Row>
      </Row>
      <DAlert
        alertShow={createDietAlertShow}
        onCancel={() => setCreateDietAlertShow(false)}
        onConfirm={() => setCreateDietAlertShow(false)}
        NoOfBtn={1}
        renderContent={() => <CreateLimitAlertContent />}
      />
    </Col>
  );
};

export default BottomMenuSelect;
