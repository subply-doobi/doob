import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {useListDiet, useListDietDetailAll} from '../../query/queries/diet';
import {IProductData} from '../../query/types/product';
import {RootState} from '../../stores/store';
import {TextMain, TextSub} from '../../styles/styledConsts';
import {reGroupBySeller, sumUpPrice} from '../../util/sumUp';
import {View} from 'react-native';

const CartSummary = () => {
  // react-query
  const {data: dietData} = useListDiet();
  const {data: dietAllData} = useListDietDetailAll();

  // 끼니1+끼니2+.... 텍스트
  const menuTotalText = dietData?.reduce(
    (acc, cur, idx) =>
      (acc += idx === 0 ? `${cur.dietSeq}` : `+${cur.dietSeq}`),
    '',
  );

  const reGroupedProducts = dietAllData && reGroupBySeller(dietAllData);

  return (
    <TotalSummaryContainer>
      <MenuTotalText>{menuTotalText}</MenuTotalText>
      {reGroupedProducts &&
        reGroupedProducts.map((group, idx) => (
          <View key={idx}>
            <SellerText>{group[0]?.platformNm}</SellerText>
            <SellerProductPrice>
              식품: {sumUpPrice(group)} 원
            </SellerProductPrice>
            <SellerShippingPrice>
              배송비: 3,000원 (10,000원 이상 무료배송)
            </SellerShippingPrice>
          </View>
        ))}
    </TotalSummaryContainer>
  );
};

export default CartSummary;

const TotalSummaryContainer = styled.View`
  padding: 0px 8px 0px 8px;
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
