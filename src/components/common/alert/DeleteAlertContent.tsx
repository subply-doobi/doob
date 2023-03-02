import styled from 'styled-components/native';
import {Col, TextMain} from '../../../styles/styledConsts';

const DeleteAlertContent = ({index}: {index: number}) => {
  return (
    <Container>
      <Col style={{marginTop: 28, alignItems: 'center'}}>
        <AlertText>끼니 {index + 1}</AlertText>
        <AlertText>삭제하시겠어요?</AlertText>
      </Col>
    </Container>
  );
};

export default DeleteAlertContent;

const Container = styled.View`
  padding: 0px 16px 24px 16px;
`;

const AlertText = styled(TextMain)`
  font-size: 16px;
`;
