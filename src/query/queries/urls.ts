export const BASE_URL = 'http://52.79.208.191:8080';

export const GET_TOKEN = `${BASE_URL}/api/every/token/get-token`; //토큰 조회
export const GET_AUTH = `${BASE_URL}/api/member/auth/get-auth`; //인증 여부 조회
export const RE_ISSUE_TOKEN = `${BASE_URL}/api/every/token/re-issue-token`;
export const GET_USER = `${BASE_URL}/api/member/user/get-user`; //사용자 정보 조회

// base-line-controller
export const CREATE_BASE_LINE = `${BASE_URL}/api/member/baseline/create-base-line`;
export const GET_BASE_LINE = `${BASE_URL}/api/member/baseline/get-base-line`;
export const UPDATE_BASE_LINE = `${BASE_URL}/api/member/baseline/update-base-line`;

// diet-controller
export const CREATE_DIET = `${BASE_URL}/api/member/diet/create-diet`;
export const CREATE_DIET_DETAIL = `${BASE_URL}/api/member/diet/create-diet-detail`;
export const UPDATE_DIET_DETAIL = `${BASE_URL}/api/member/diet/update-diet-detail`;
export const LIST_DIET = `${BASE_URL}/api/member/diet/list-diet`;
export const LIST_DIET_DETAIL = `${BASE_URL}/api/member/diet/list-diet-detail`;
export const DELETE_DIET = `${BASE_URL}/api/member/diet/delete-diet`;
export const DELETE_DIET_DETAIL = `${BASE_URL}/api/member/diet/delete-diet-detail`;

export const PRODUCT_LIST = `${BASE_URL}/api/member/product/list-product`;

// api-member-code-controller
export const COMMON_CODE = `${BASE_URL}/api/member/code/list-code`;
