import styled from 'styled-components/native';
import {BtnCTA, BtnText} from '../styles/styledConsts';
import colors from '../styles/colors';
import {NavigationProps} from '../constants/constants';
import React, {useEffect} from 'react';
import {useGetBaseLine} from '../query/queries/baseLine';
import {validateToken} from '../queries/token';

const Login = ({navigation: {navigate}}: NavigationProps) => {
  // 기존 사용자정보 있는지 확인
  // TBD | isLoading 인 경우 indicator 추가?!

  const {data, isLoading} = useGetBaseLine();
  useEffect(() => {
    if (data != undefined) {
      navigate('BottomTabNav', {screen: 'Home'});
    }
  }, [data]);

  const signInWithKakao = async (): Promise<void> => {
    const {isTokenValid} = await validateToken();
    if (isTokenValid) {
      navigate('InputNav', {screen: 'FirstInput'});
    }
  };

  return (
    <Container>
      <Box>
        <TitleText>{'식단조절은\n두비에게'}</TitleText>
        <BtnKakaoLogin btnStyle="kakao" onPress={signInWithKakao}>
          {/* <BtnKakaoLogin btnStyle="kakao" onPress={getUserBaseLine}> */}
          <BtnTextKakao>카카오 로그인</BtnTextKakao>
        </BtnKakaoLogin>
      </Box>
    </Container>
  );
};

export default Login;

const Container = styled.View`
  flex: 1;
  padding: 0px 16px 0px 16px;
`;

const Box = styled.View`
  width: 100%;
  position: absolute;
  bottom: 70px;
  align-self: center;
`;

const TitleText = styled.Text`
  margin-bottom: 70px;
  color: ${colors.textMain};
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  line-height: 35px;
  text-align: center;
`;

const BtnKakaoLogin = styled(BtnCTA)`
  align-self: center;
`;

const BtnTextKakao = styled(BtnText)`
  color: ${colors.textMain};
`;
