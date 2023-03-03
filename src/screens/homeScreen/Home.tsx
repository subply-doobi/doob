import React, {useEffect, useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../stores/store';
import {
  BtnCTA,
  BtnText,
  Container,
  HorizontalLine,
  Row,
  TextMain,
  TextSub,
} from '../../styles/styledConsts';

import NutrientsProgress from '../../components/common/NutrientsProgress';
import colors from '../../styles/colors';
import MenuSelect from '../../components/common/MenuSelect';
import MenuHeader from '../../components/common/MenuHeader';
import {useGetBaseLine} from '../../query/queries/baseLine';
import {useListDiet} from '../../query/queries/diet';
import {queryFn} from '../../query/queries/requestFn';
import {LIST_DIET} from '../../query/queries/urls';
import {setCurrentDietNo} from '../../stores/slices/cartSlice';

const Home = () => {
  // redux
  const dispatch = useDispatch();

  // state

  const {currentDietNo} = useSelector((state: RootState) => state.cart);
  const [searchText, setSearchText] = useState('');
  const [menuSelectOpen, setMenuSelectOpen] = useState(false);
  const filterMenus = [
    {id: 1, text: '카테고리'},
    {id: 2, text: '영양성분'},
    {id: 3, text: '가격'},
    {id: 4, text: '끼니구성'},
  ];

  useEffect(() => {
    // 앱 시작할 때 내가 어떤 끼니를 보고 있는지 redux에 저장해놓기 위해 필요함
    console.log('HOme');
    queryFn(LIST_DIET).then(res => {
      res[0] && dispatch(setCurrentDietNo(res[0]?.dietNo));
    });
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setMenuSelectOpen(false);
      }}>
      <Container>
        <MenuAndSearchBox>
          <MenuHeader
            menuSelectOpen={menuSelectOpen}
            setMenuSelectOpen={setMenuSelectOpen}
          />
          <SearchInput
            onChangeText={setSearchText}
            value={searchText}
            placeholder="검색어 입력"
            onSubmitEditing={() => console.log('search!!')}
          />
        </MenuAndSearchBox>
        <NutrientsProgress currentDietNo={currentDietNo} />
        <Row style={{justifyContent: 'space-between', marginTop: 32}}>
          <Row>
            <ListTitle>전체 식품</ListTitle>
            <NoOfFoods>87개</NoOfFoods>
          </Row>
          <SortBtn></SortBtn>
        </Row>
        <HorizontalLine style={{marginTop: 8}} />
        <BtnCTA btnStyle="activated" onPress={async () => {}}>
          <BtnText>테스트 데이터</BtnText>
        </BtnCTA>
        {menuSelectOpen && <MenuSelect setOpen={setMenuSelectOpen} />}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Home;

const MenuAndSearchBox = styled.View`
  flex-direction: row;
  width: 100%;
  height: 48px;
  align-items: center;
`;

const HeaderText = styled(TextMain)`
  font-size: 18px;
  font-weight: bold;
`;

const Arrow = styled.Image`
  width: 24px;
  height: 24px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  height: 32px;
  margin-left: 8px;
  border-radius: 4px;
  background-color: ${colors.bgBox};
  padding: 5px 8px 5px 8px;
  font-size: 14px;
  color: ${colors.textSub};
`;

const ListTitle = styled(TextMain)`
  font-size: 16px;
  font-weight: bold;
`;
const NoOfFoods = styled(TextSub)`
  font-size: 16px;
  font-weight: bold;
`;

const SortBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 32px;
`;

const SortBtnText = styled(TextSub)`
  font-size: 14px;
`;

const SortImage = styled.Image`
  width: 24px;
  height: 24px;
`;
const FilterBtn = styled.TouchableOpacity`
  height: 20px;
  margin-right: 36px;
`;
const FilterBtnText = styled(TextMain)`
  font-size: 14px;
`;
const FilterMenuContainer = styled.View`
  background: white;
  flex-direction: row;
  margin-top: 10px;
  margin-left: 10px;
`;
