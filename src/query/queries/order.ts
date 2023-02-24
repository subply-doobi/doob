import axios from 'axios';
import {useMutation} from '@tanstack/react-query';
import {kakaoAppAdminKey} from '../../constants/constants';
import {setOrderSummary} from '../../stores/slices/orderSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../stores/store';
//기존 testKakaoPay

export const useKakaoPayReady = () => {
  const dispatch = useDispatch();
  const kakaoPayConfig = {
    headers: {
      Authorization: `KakaoAK ${kakaoAppAdminKey}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    params: {
      cid: 'TC0ONETIME',
      partner_order_id: 'partner_order_id',
      partner_user_id: 'partner_user_id',
      item_name: '테스트',
      quantity: 1,
      tax_free_amount: 0,
      approval_url: 'http://localhost:8081/',
      cancel_url: 'http://localhost:8081/',
      fail_url: 'http://localhost:8081/',
    },
  };

  const kakaoPayMutation = useMutation(async (price: number) => {
    const res = await axios.post(
      'https://kapi.kakao.com/v1/payment/ready',
      null,
      {
        ...kakaoPayConfig,
        params: {
          ...kakaoPayConfig.params,
          total_amount: price,
          vat_amount: 0.1 * price,
        },
      },
    );
    //TBD : ShippingFee 는 정책에 따라 결정할 것
    dispatch(
      setOrderSummary({foodPrice: price, tid: res.data.tid, shippingFee: 0}),
    );
    return res.data;
  });

  return {
    isLoading: kakaoPayMutation.isLoading,
    isError: kakaoPayMutation.isError,
    error: kakaoPayMutation.error,
    paymentUrl: kakaoPayMutation.isSuccess
      ? kakaoPayMutation.data.next_redirect_mobile_url
      : undefined,
    pay: kakaoPayMutation.mutate,
  };
};

export const useKakaopayApprove = () => {
  const {tid, foodPrice, shippingFee} = useSelector(
    (state: RootState) => state.order.orderSummary,
  );
  const kakaoPayConfig = {
    headers: {
      Authorization: `KakaoAK ${kakaoAppAdminKey}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    params: {
      cid: 'TC0ONETIME',
      partner_order_id: 'partner_order_id',
      partner_user_id: 'partner_user_id',
      total_amount: foodPrice,
      tid: tid, //tid,pgtoken은 매번 달라진다.
      pg_token: 'c516c0a9cf0e306e7197',
    },
  };

  const kakaoPayMutation = useMutation(async () => {
    const res = await axios.post(
      'https://kapi.kakao.com/v1/payment/approve',
      null,
      kakaoPayConfig,
    );
    //TBD : ShippingFee 는 정책에 따라 결정할 것
    return res.data;
  });

  return {
    isLoading: kakaoPayMutation.isLoading,
    isError: kakaoPayMutation.isError,
    error: kakaoPayMutation.error,
    getPaymentResult: kakaoPayMutation.mutate,
    data: kakaoPayMutation.data,
  };
};
