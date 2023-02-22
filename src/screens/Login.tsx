import styled from 'styled-components/native';
import {BtnCTA, BtnText} from '../styles/styledConsts';
import colors from '../styles/colors';
import {NavigationProps} from '../constants/constants';
import React, {useEffect} from 'react';
import {useGetBaseLine} from '../queries/baseLine';
import {validateToken, getUserData} from '../query/query';

import {DatePickerIOSBase} from 'react-native';

const Login = ({navigation: {navigate}}: NavigationProps) => {
  //유저값 check 후 화면 이동
  const {data, isLoading} = useGetBaseLine();
  console.log('login/data:', data);

  // const signInWithKakao = async (): Promise<void> => {
  //   const isTokenValid = await validateToken();
  //   if (isTokenValid && Object.values(data?.data).includes('')) {
  //     navigate('InputNav', {screen: 'FirstInput'});
  //   } else if (
  //     isTokenValid &&
  //     Object.values(data?.data).includes('') === false
  //   ) {
  //     navigate('BottomTabNav', {screen: 'Home'});
  //   }
  // };
  useEffect(() => {
    if (data != undefined) navigate('BottomTabNav', {screen: 'Home'});
  }, [data]);

  const signInWithKakao = async (): Promise<void> => {
    const {isTokenValid} = await validateToken();
    if (isTokenValid) navigate('InputNav', {screen: 'FirstInput'});
  };
  return (
    <Container>
      <Box>
        <TitleText>{'식단조절은\n두비에게'}</TitleText>
        <BtnKakaoLogin btnStyle="kakao" onPress={signInWithKakao}>
          {/* <BtnKakaoLogin
          btnStyle="kakao"
          onPress={() => {
            console.log(Object.values(data?.data));
          }}> */}
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
