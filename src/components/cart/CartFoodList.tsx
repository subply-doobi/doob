import {useState} from 'react';
import {ActivityIndicator, Text} from 'react-native';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {
  useDeleteDietDetail,
  useListDiet,
  useListDietDetail,
  useListDietDetailAll,
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
import {
  commaToNum,
  makePriceObjBySeller,
  reGroupBySeller,
} from '../../util/sumUp';
import DAlert from '../common/alert/DAlert';
import DeleteAlertContent from '../common/alert/DeleteAlertContent';
import DBottomSheet from '../common/DBottomSheet';
import NumberPickerContent from './NumberPickerContent';
import QuantityControl from './QuantityControl';

const CartFoodList = () => {
  // redux
  const {currentDietNo} = useSelector((state: RootState) => state.cart);

  // react-query
  const {data: dietData} = useListDiet();
  const {data: dietDetailData, isFetching: dietDetailIsFetching} =
    useListDietDetail(currentDietNo);
  const {data: dietAllData} = useListDietDetailAll();
  const updateMutation = useUpdateDietDetail();
  const deleteMutation = useDeleteDietDetail();

  // state
  const [deleteAlertShow, setDeleteAlertShow] = useState(false);
  const [productNoToDelete, setProductNoToDelete] = useState('');
  const [numberPickerShow, setNumberPickerShow] = useState(false);
  const [numberPickerInfo, setNumberPickerInfo] = useState({
    platformNm: '',
    productNo: '',
    productNm: '',
    price: '',
    minQty: '',
    freeShippingPrice: '',
    shippingPrice: '',
  });

  // etc
  const onDelete = () => {
    dietData &&
      deleteMutation.mutate({
        dietNo: currentDietNo,
        productNo: productNoToDelete,
      });
    setDeleteAlertShow(false);
  };

  // 판매자별 총액계산
  const reGroupedProducts = dietAllData && reGroupBySeller(dietAllData);
  const priceBySeller =
    reGroupedProducts && makePriceObjBySeller(reGroupedProducts);
  return (
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
                <ProductPrice>{commaToNum(food.price)}원</ProductPrice>
                <QuantityControl
                  food={food}
                  setNumberPickerShow={setNumberPickerShow}
                  setNumberPickerInfo={setNumberPickerInfo}
                />
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
      <DBottomSheet
        alertShow={numberPickerShow}
        setAlertShow={setNumberPickerShow}
        renderContent={() =>
          priceBySeller ? (
            <NumberPickerContent
              setNumberPickerShow={setNumberPickerShow}
              platformNm={numberPickerInfo.platformNm}
              productNo={numberPickerInfo.productNo}
              productNm={numberPickerInfo.productNm}
              price={numberPickerInfo.price}
              minQty={numberPickerInfo.minQty}
              freeShippingPrice={numberPickerInfo.freeShippingPrice}
              shippingPrice={numberPickerInfo.shippingPrice}
              priceBySeller={priceBySeller}
            />
          ) : (
            <></>
          )
        }
        onCancel={() => setNumberPickerShow(false)}
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
