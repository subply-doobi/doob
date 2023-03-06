import {View, Text} from 'react-native';
import {IProductData} from '../../query/types/product';
import styled from 'styled-components/native';
import {TextMain} from '../../styles/styledConsts';
import {useState} from 'react';
import {makePickerItem} from '../../util/numberPickerItem';
import DropDownPicker from 'react-native-dropdown-picker';

const QuantityControl = ({food}: {food: IProductData}) => {
  // state
  const [pickerOpen, setPickerOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(makePickerItem('5'));

  return (
    <QuantityControlBox>
      <PlusMinusBtn>
        <PlusMinusImage
          source={require(`../../assets/icons/12_numberMinus.png`)}
        />
      </PlusMinusBtn>
      <Quantity>{food.qty}</Quantity>
      {/* <DropDownPicker
        open={pickerOpen} 
        value={value}
        items={items}
        setOpen={setPickerOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={'1'}
        showTickIcon={false}
        showArrowIcon={false}
        style={{
          borderWidth: 0,
          backgroundColor: 'red',
        }}
        containerStyle={{
          width: 32,
        }}
      /> */}
      <PlusMinusBtn>
        <PlusMinusImage
          source={require(`../../assets/icons/12_numberPlus.png`)}
        />
      </PlusMinusBtn>
    </QuantityControlBox>
  );
};

export default QuantityControl;

const QuantityControlBox = styled.View`
  flex-direction: row;
  width: 98px;
  align-items: center;
  justify-content: space-between;
`;

const Quantity = styled(TextMain)`
  font-size: 16px;
  font-weight: bold;
`;

const PlusMinusBtn = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;
const PlusMinusImage = styled.Image`
  width: 12px;
  height: 12px;
`;
