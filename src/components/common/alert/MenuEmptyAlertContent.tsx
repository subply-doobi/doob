import styled from 'styled-components/native';
import {useListDiet} from '../../../query/queries/diet';
import {Col, TextMain} from '../../../styles/styledConsts';
import {checkEmptyMenuIndex} from '../../../util/checkEmptyMenu';

const MenuEmptyAlertContent = () => {
  // TBD | dietData 가 아니라 끼니별 식품들 데이터 넣어줘야함
  const {data: dietData} = useListDiet();
  const emptyMenuIndex = checkEmptyMenuIndex(dietData);
  return (
    <Container>
      <Col style={{marginTop: 28, alignItems: 'center'}}>
        <AlertText>{`비어있는 끼니를 `}</AlertText>
        <AlertText>{`먼저 구성하고 이용해보세요`}</AlertText>
      </Col>
    </Container>
  );
};

export default MenuEmptyAlertContent;

const Container = styled.View`
  padding: 0px 16px 24px 16px;
`;

const AlertText = styled(TextMain)`
  font-size: 16px;
`;
