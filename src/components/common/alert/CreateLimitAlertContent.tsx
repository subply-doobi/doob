import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {Col, TextMain} from '../../../styles/styledConsts';

const CreateLimitAlertContent = () => {
  return (
    <Container>
      <Col style={{marginTop: 28, alignItems: 'center'}}>
        <AlertText>끼니는 3개 까지만 추가가 가능해요</AlertText>
      </Col>
    </Container>
  );
};

export default CreateLimitAlertContent;

const Container = styled.View`
  padding: 0px 16px 24px 16px;
`;

const AlertText = styled(TextMain)`
  font-size: 16px;
`;
