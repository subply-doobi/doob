import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  KakaoOAuthToken,
  login,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login';
import axios from 'axios';
import {
  PRODUCT_LIST,
  GET_TOKEN,
  GET_AUTH,
  RE_ISSUE_TOKEN,
  GET_BASE_LINE,
} from './urls';

// doobi server------------------ //
// 카카오 토큰으로 DoobiToken 발급
export const getDoobiToken = async (kakaoAccessToken: string | null) => {
  try {
    console.log('getDoobiToken!');
    const result = await axios.get(`${GET_TOKEN}/${kakaoAccessToken}`);
    console.log(result.status);
    return result?.status === 200 ? result.data : undefined;
  } catch (e) {
    console.log('getDoobiToken: ', e);
  }
};

// asyncStorage ------------------------ //
export const storeToken = async (
  accessToken: string,
  refreshToken?: string,
) => {
  await AsyncStorage.setItem('ACCESS_TOKEN', accessToken);
  refreshToken && (await AsyncStorage.setItem('REFRESH_TOKEN', refreshToken));
};

export const getStoredToken = async () => {
  const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
  const refreshToken = await AsyncStorage.getItem('REFRESH_TOKEN');
  return {
    accessToken,
    refreshToken,
  };
};

/** 토큰 만료되었으면 재발급받거나 or 카카오로그인 후
 * 유효한 토큰을 발급받아 다시 저장 후 성공/실패 반환
 * @return  토큰 재발급 성공 / 실패
 */
export const validateToken = async () => {
  let isTokenValid = false;
  let validToken: string | null = '';
  try {
    const {accessToken, refreshToken} = await getStoredToken();
    try {
      // 인증여부 조회
      const auth = await axios.get(`${GET_AUTH}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('auth res: ', auth.data);
      isTokenValid = true;
      validToken = accessToken;
    } catch (e) {
      console.log(e, 'accessToken 만료');
      // 토큰 재발급
      const reIssue = await axios.get(`${RE_ISSUE_TOKEN}`, {
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
      });
      await storeToken(reIssue.data.accessToken, reIssue.data.refreshToken);
      console.log('reIssue res: ', reIssue.data);
      isTokenValid = true;
      validToken = reIssue.data.accessToken;
    }
  } catch (e) {
    console.log(e, 'refreshToken 만료');
    const kakaoToken: KakaoOAuthToken = await login();
    // const kakaoToken: KakaoOAuthToken = await loginWithKakaoAccount();
    console.log('kakaoLogin kakaoToken: ', JSON.stringify(kakaoToken));
    const {accessToken, refreshToken} = await getDoobiToken(
      kakaoToken?.accessToken,
    );
    if (accessToken && refreshToken) {
      await storeToken(accessToken, refreshToken);
    }
    isTokenValid = true;
    validToken = accessToken;
  }
  return {isTokenValid, validToken};
};