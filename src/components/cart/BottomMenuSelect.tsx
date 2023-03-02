import React, {useState} from 'react';
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
import {checkMenuEmpty} from '../../util/checkEmptyMenu';
import MenuEmptyAlertContent from '../common/alert/MenuEmptyAlertContent';

const BottomMenuSelect = () => {
  // react-query
  const {data: dietData} = useListDiet();
  const createDietMutation = useCreateDiet();

  // redux
  const {menuIndex} = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  // state
  const [createAlertShow, setCreateAlertShow] = useState(false);

  // TBD | MenuSelect랑 겹치는 기능  //
  const NoOfDiet = dietData?.length;
  const addAlertStatus = NoOfDiet
    ? checkMenuEmpty(dietData) === undefined
      ? NoOfDiet >= 3
        ? 'limit'
        : 'none'
      : 'empty'
    : 'none';

  const onCreateDiet = () => {
    if (addAlertStatus === 'none') {
      createDietMutation.mutate();
      NoOfDiet && dispatch(setMenuIndex(NoOfDiet));
      return;
    }
    setCreateAlertShow(true);
  };

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
                  {menu?.dietSeq}
                </BtnSmallText>
              </BtnSmall>
              <VerticalSpace width={8} />
            </Row>
          );
        })}
        <Row>
          <BtnSmall style={{marginBottom: 8}} onPress={() => onCreateDiet()}>
            <BtnSmallText style={{color: colors.inactivated}}>+</BtnSmallText>
          </BtnSmall>
        </Row>
      </Row>
      <DAlert
        alertShow={createAlertShow}
        onCancel={() => setCreateAlertShow(false)}
        onConfirm={() => {
          setCreateAlertShow(false);
        }}
        NoOfBtn={1}
        renderContent={() =>
          addAlertStatus === 'limit' ? (
            <CreateLimitAlertContent />
          ) : addAlertStatus === 'empty' ? (
            <MenuEmptyAlertContent />
          ) : (
            <></>
          )
        }
      />
    </Col>
  );
};

export default BottomMenuSelect;
