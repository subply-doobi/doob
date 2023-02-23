// export const BASE_URL = `http://13.125.244.117:8080`;
// export const BASE_URL = 'http://15.165.159.244:8080';
export const BASE_URL = 'http://52.79.208.191:8080';
// >>>>>>> feature/home
export const GET_TOKEN = `${BASE_URL}/api/every/token/get-token`; //토큰 조회
export const GET_AUTH = `${BASE_URL}/api/member/auth/get-auth`; //인증 여부 조회
export const RE_ISSUE_TOKEN = `${BASE_URL}/api/member/auth/re-issue-token`;
export const GET_USER = `${BASE_URL}/api/member/user/get-user`; //사용자 정보 조회
export const CREATE_BASE_LINE =
  //기본 정보 생성
  `${BASE_URL}/api/member/baseline/create-base-line`;

//기본 정보 업데이트
export const UPDATE_BASE_LINE = `${BASE_URL}/api/member/baseline/update-base-line`;
export const GET_BASE_LINE =
  //기본 정보 조회
  `${BASE_URL}/api/member/baseline/get-base-line`;
export const CREATE_DIET =
  //끼니정보생성
  `${BASE_URL}/api/member/diet/create-diet`;
export const LIST_DIET = `${BASE_URL}/api/member/diet/list-diet`; //끼니 정보 목록 조회
export const PRODUCT_LIST = `${BASE_URL}/api/member/product/list-product`;

//공통 코드 목록 조회
//SP002 : 식단의 목적
//SP003 : 웨이트 목적
//SP004 : 유산소 목적
export const DIET_COMMON_CODE = `${BASE_URL}/api/member/code/list-code/SP002`;
export const WEIGHT_COMMON_CODE = `${BASE_URL}/api/member/code/list-code/SP003`;
export const AEROBIC_COMMON_CODE = `${BASE_URL}/api/member/code/list-code/SP004`;
