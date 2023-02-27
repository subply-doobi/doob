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
    return result?.status === 200 ? result.data : undefined;
  } catch (e) {
    console.log('getDoobiToken: ', e);
  }
};

// asyncStorage ------------------------ //
export const storeToken = async (accessToken: string, refreshToken: string) => {
  await AsyncStorage.setItem('ACCESS_TOKEN', accessToken);
  await AsyncStorage.setItem('REFRESH_TOKEN', refreshToken);
};

export const getStoredToken = async () => {
  const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
  const refreshToken = await AsyncStorage.getItem('REFRESH_TOKEN');
  return {
    accessToken,
    refreshToken,
  };
};

const kakaoLogin = async () => {
  const kakaoToken: KakaoOAuthToken = await login();
  const {accessToken, refreshToken} = await getDoobiToken(
    kakaoToken?.accessToken,
  );
  if (accessToken && refreshToken) await storeToken(accessToken, refreshToken);

  return accessToken;
};

export const validateToken = async () => {
  let isTokenValid = false;
  let validToken: string | null = '';
  const {accessToken, refreshToken} = await getStoredToken();
  if (!accessToken || !refreshToken) {
    try {
      validToken = await kakaoLogin();
      isTokenValid = true;
    } catch (e) {
      console.log('카카오로그인 실패', e);
    }
  }

  if (!isTokenValid) {
    try {
      // 인증여부 조회
      const auth = await axios.get(`${GET_AUTH}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      isTokenValid = true;
      validToken = accessToken;
    } catch (e) {
      console.log('인증되지 않은 토큰: ', e);
    }
  }

  if (!isTokenValid) {
    try {
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
    } catch (e) {
      console.log('토큰 재발급 실패: ', e);
    }
  }

  if (!isTokenValid) {
    try {
      validToken = await kakaoLogin();
      isTokenValid = true;
    } catch (e) {
      console.log('카카오로그인 실패', e);
    }
  }

  return {isTokenValid, validToken};
};
