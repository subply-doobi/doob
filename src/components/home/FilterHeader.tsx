import React from 'react';
import {Row, TextMain} from '../../styles/styledConsts';
import styled from 'styled-components/native';

const FilterHeader = props => {
  const {onPress} = props;

  return (
    <>
      <Row>
        <FilterBtn onPress={onPress}>
          <FilterBtnText>카테고리</FilterBtnText>
        </FilterBtn>
        <FilterBtn onPress={onPress}>
          <FilterBtnText>영양성분</FilterBtnText>
        </FilterBtn>
        <FilterBtn onPress={onPress}>
          <FilterBtnText>가격</FilterBtnText>
        </FilterBtn>
        <FilterBtn onPress={onPress}>
          <FilterBtnText>식단구성</FilterBtnText>
        </FilterBtn>
      </Row>
    </>
  );
};
export default FilterHeader;

const FilterBtn = styled.TouchableOpacity`
  height: 20px;
  margin-right: 36px;
`;
const FilterBtnText = styled(TextMain)`
  font-size: 14px;
`;
