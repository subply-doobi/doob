import React from 'react';
import styled from 'styled-components/native';
import {
  AccordionContentContainer,
  TextMain,
  Col,
  Row,
  HorizontalLine,
} from '../../styles/styledConsts';
import {BASE_URL} from '../../query/queries/urls';
import {IProductData} from '../../query/types/product';
import colors from '../../styles/colors';
import {IDietDetailData} from '../../query/types/diet';

interface GroupedByDietNo {
  [key: string]: IProductData[];
}

const FoodToOrder = ({
  listDietDetailAll,
}: {
  listDietDetailAll: IDietDetailData | undefined;
}) => {
  function groupFoodsByDietNo(foods: IDietDetailData): GroupedByDietNo {
    const groups: GroupedByDietNo = {};

    for (const food of foods) {
      if (!groups[food.dietNo]) {
        groups[food.dietNo] = [food];
      } else {
        groups[food.dietNo].push(food);
      }
    }

    return groups;
  }
  const groupedFoods = groupFoodsByDietNo(listDietDetailAll);

  return (
    <AccordionContentContainer>
      {Object.keys(groupedFoods).map((el, index) => {
        return (
          <Col key={index}>
            <MenuTitle>{el}</MenuTitle>
            <HorizontalLine
              style={{marginTop: 8, backgroundColor: colors.line}}
            />
            {groupedFoods[el].map((product, index) => (
              <Row key={index} style={{marginTop: 16}}>
                <FoodThumbnail
                  source={{
                    uri: `${BASE_URL}${product.mainAttUrl}`,
                  }}
                />
                <Col style={{flex: 1, marginLeft: 8}}>
                  <SellerText numberOfLines={1} ellipsizeMode="tail">
                    {product.platformNm}
                  </SellerText>
                  <ProductName numberOfLines={1} ellipsizeMode="tail">
                    {product.productNm}
                  </ProductName>
                  <Row
                    style={{
                      marginTop: 8,
                      justifyContent: 'space-between',
                    }}>
                    <PriceAndQuantity>{product.price}</PriceAndQuantity>
                    <QuantityBox>
                      <PriceAndQuantity>{product.qty}개</PriceAndQuantity>
                    </QuantityBox>
                  </Row>
                </Col>
              </Row>
            ))}
            <HorizontalLine
              lineColor={colors.lineLight}
              style={{marginTop: 16}}
            />
          </Col>
        );
      })}
    </AccordionContentContainer>
  );
};

export default FoodToOrder;

const MenuTitle = styled(TextMain)`
  margin-top: 16px;
  font-size: 16px;
  font-weight: bold;
  align-self: center;
`;

const FoodThumbnail = styled.Image`
  width: 72px;
  height: 72px;
`;

const SellerText = styled(TextMain)`
  font-size: 14px;
  font-weight: bold;
`;

const ProductName = styled(TextMain)`
  font-size: 14px;
`;

const QuantityBox = styled.View`
  width: 80px;
  height: 24px;
`;

const PriceAndQuantity = styled(TextMain)`
  font-size: 16px;
  font-weight: bold;
`;
