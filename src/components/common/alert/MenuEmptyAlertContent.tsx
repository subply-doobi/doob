import styled from 'styled-components/native';
import {useListDiet} from '../../../query/queries/diet';
import {Col, TextMain} from '../../../styles/styledConsts';
import {checkMenuEmpty} from '../../../util/checkEmptyMenu';

const MenuEmptyAlertContent = ({}) => {
  // TBD | dietData 가 아니라 끼니별 식품들 데이터 넣어줘야함
  const {data: dietData} = useListDiet();
  const emptyMenuIndex = checkMenuEmpty(dietData);
  return (
    <Container>
      <Col style={{marginTop: 28, alignItems: 'center'}}>
        <AlertText>{`끼니${emptyMenuIndex - 1} 먼저 구성하고`}</AlertText>
        <AlertText>{`이용해보세요`}</AlertText>
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
