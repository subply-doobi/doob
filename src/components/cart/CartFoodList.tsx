import {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {
  useDeleteDietDetail,
  useListDiet,
  useListDietDetail,
  useUpdateDietDetail,
} from '../../query/queries/diet';
import {BASE_URL} from '../../query/queries/urls';
import {RootState} from '../../stores/store';
import colors from '../../styles/colors';
import {
  Col,
  HorizontalLine,
  Row,
  TextMain,
  TextSub,
} from '../../styles/styledConsts';
import DAlert from '../common/alert/DAlert';
import DeleteAlertContent from '../common/alert/DeleteAlertContent';

const CartFoodList = () => {
  // redux
  const {currentDietNo} = useSelector((state: RootState) => state.cart);

  // react-query
  const {data: dietData} = useListDiet();
  const {data: dietDetailData, isFetching: dietDetailIsFetching} =
    useListDietDetail(currentDietNo);
  const updateMutation = useUpdateDietDetail();
  const deleteMutation = useDeleteDietDetail();

  // state
  const [deleteAlertShow, setDeleteAlertShow] = useState(false);
  const [productNoToDelete, setProductNoToDelete] = useState('');

  const minusBtnOnPress = (
    productNo: string,
    qty: string = '1',
    minQty: string,
  ) => {};
  const plusBtnOnPress = (
    productNo: string,
    qty: string = '1',
    minQty: string,
  ) => {};
  const onDelete = () => {
    dietData &&
      deleteMutation.mutate({
        dietNo: currentDietNo,
        productNo: productNoToDelete,
      });
    setDeleteAlertShow(false);
  };
  return dietDetailIsFetching ? (
    <ActivityIndicator />
  ) : (
    <Container>
      {dietDetailData?.map((food, idx) => (
        <FoodBox key={idx}>
          <Row
            style={{
              width: '100%',
              alignItems: 'flex-start',
            }}>
            <ThumbnailImage source={{uri: `${BASE_URL}${food.mainAttUrl}`}} />
            <Col style={{marginLeft: 8, flex: 1}}>
              <Row style={{justifyContent: 'space-between'}}>
                <SellerText>{food.platformNm}</SellerText>
                <DeleteBtn
                  onPress={() => {
                    setProductNoToDelete(food.productNo);
                    setDeleteAlertShow(true);
                  }}>
                  <DeleteImage
                    source={require('../../assets/icons/24_cancel_round.png')}
                  />
                </DeleteBtn>
              </Row>
              <ProductNmText numberOfLines={1} ellipsizeMode="tail">
                {food.productNm}
              </ProductNmText>
              <NutrientText>
                칼로리{' '}
                <NutrientValue>{parseInt(food.calorie)}kcal </NutrientValue>
                탄수화물 <NutrientValue>{parseInt(food.carb)}g </NutrientValue>
                단백질 <NutrientValue>{parseInt(food.protein)}g </NutrientValue>
                지방 <NutrientValue>{parseInt(food.fat)}g </NutrientValue>
              </NutrientText>
              <Row style={{marginTop: 12, justifyContent: 'space-between'}}>
                <ProductPrice>{food.price}원</ProductPrice>
                <QuantityControlBox>
                  <PlusMinusBtn>
                    <PlusMinusImage
                      source={require(`../../assets/icons/12_numberMinus.png`)}
                    />
                  </PlusMinusBtn>
                  <Quantity>{food.qty}</Quantity>
                  <PlusMinusBtn>
                    <PlusMinusImage
                      source={require(`../../assets/icons/12_numberPlus.png`)}
                    />
                  </PlusMinusBtn>
                </QuantityControlBox>
              </Row>
            </Col>
          </Row>
          <HorizontalLine style={{marginTop: 16}} />
        </FoodBox>
      ))}
      <DAlert
        alertShow={deleteAlertShow}
        confirmLabel="삭제"
        onConfirm={onDelete}
        onCancel={() => {
          setDeleteAlertShow(false);
        }}
        renderContent={() => <DeleteAlertContent dietSeq={'해당식품을'} />}
      />
    </Container>
  );
};

export default CartFoodList;

const Container = styled.View`
  width: 100%;
  margin-top: 12px;
`;

const FoodBox = styled.View`
  width: 100%;
  margin-top: 12px;
`;

const ThumbnailImage = styled.Image`
  width: 72px;
  height: 72px;
  background-color: ${colors.highlight};
  border-radius: 3px;
`;

const SellerText = styled(TextMain)`
  font-size: 14px;
  font-weight: bold;
`;

const DeleteBtn = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`;

const DeleteImage = styled.Image`
  width: 24px;
  height: 24px;
`;

const ProductNmText = styled(TextMain)`
  margin-top: 8px;
  font-size: 14px;
`;

const NutrientText = styled(TextSub)`
  margin-top: 4px;
  font-size: 12px;
`;
const NutrientValue = styled(TextMain)`
  font-size: 12px;
  font-weight: bold;
`;

const ProductPrice = styled(TextMain)`
  font-size: 16px;
`;

const QuantityControlBox = styled.View`
  flex-direction: row;
  width: 98px;
  align-items: center;
  justify-content: space-between;
`;

const Quantity = styled(TextMain)`
  font-size: 16px;
  font-weight: bold;
`;

const PlusMinusBtn = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;
const PlusMinusImage = styled.Image`
  width: 12px;
  height: 12px;
`;
