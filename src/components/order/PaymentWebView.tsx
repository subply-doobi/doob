import {useNavigation} from '@react-navigation/native';
import React, {SetStateAction, useEffect, useState} from 'react';
import {Modal, AppState} from 'react-native';
import {Text} from 'react-native-svg';
import WebView from 'react-native-webview';
import styled from 'styled-components/native';

const Cancel = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  background-color: red;
  position: absolute;
  right: 16px;
  top: 16px;
`;

interface IPaymentWebView {
  uri: string;
  isPaymentModalVisible: boolean;
  setIsPaymentModalVisible: React.Dispatch<SetStateAction<boolean>>;
}

const PaymentWebView = ({
  uri,
  isPaymentModalVisible,
  setIsPaymentModalVisible,
}: IPaymentWebView) => {
  /* Webview 컴포넌트는 testPay가 실행되면 열리고, 결제가 끝나고나면 그 페이지가 만료되기 때문에 WebView component의 onError가 발생하기 때문에
  onError일 경우 PaymentComplete 화면으로 넘어가면 된다.
  */

  const [token, setToken] = useState('');

  const navigation = useNavigation();

  const handleWebViewError = () => {
    setIsPaymentModalVisible(false);
    navigation.navigate('PaymentComplete', {token});
  };

  const handleNavigationStateChange = event => {
    const url = event.url;
    const newToken = url.match(/pg_token=([\w]+)/);
    const pgToken = newToken ? newToken[1] : null;
    setToken(pgToken);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPaymentModalVisible ? true : false}>
        <WebView
          source={{uri: uri}}
          onError={handleWebViewError}
          onNavigationStateChange={handleNavigationStateChange}
        />
        <Cancel onPress={() => setIsPaymentModalVisible(false)}>
          <Text>취소</Text>
        </Cancel>
      </Modal>
    </>
  );
};

export default PaymentWebView;
