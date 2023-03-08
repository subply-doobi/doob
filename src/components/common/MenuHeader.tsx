import {ActivityIndicator} from 'react-native';
import React, {SetStateAction} from 'react';
import styled from 'styled-components/native';
import {TextMain} from '../../styles/styledConsts';
import {useSelector} from 'react-redux';
import {RootState} from '../../stores/store';
import {useListDiet} from '../../query/queries/diet';
import {findDietSeq} from '../../util/findDietSeq';

const Header = styled.TouchableOpacity`
  flex-direction: row;
`;

const HeaderText = styled(TextMain)`
  font-size: 18px;
  font-weight: bold;
`;

const Arrow = styled.Image`
  width: 24px;
  height: 24px;
`;

interface IMenuHeader {
  menuSelectOpen: boolean;
  setMenuSelectOpen: React.Dispatch<SetStateAction<boolean>>;
}
const MenuHeader = ({menuSelectOpen, setMenuSelectOpen}: IMenuHeader) => {
  // react-query
  const {data: dietData, isLoading: dietDataIsLoading} = useListDiet();
  // redux
  const {currentDietNo} = useSelector((state: RootState) => state.cart);
  return dietDataIsLoading ? (
    <ActivityIndicator />
  ) : (
    <Header onPress={() => setMenuSelectOpen(v => !v)}>
      <HeaderText>
        {dietData && findDietSeq(dietData, currentDietNo)}
      </HeaderText>
      {menuSelectOpen ? (
        <Arrow source={require('../../assets/icons/24_dropdown_up.png')} />
      ) : (
        <Arrow source={require('../../assets/icons/24_dropdown_down.png')} />
      )}
    </Header>
  );
};

export default MenuHeader;
