import React from 'react';
import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {VerticalSpace} from '../../styles/styledConsts';
import * as Progress from 'react-native-progress';
import {useSelector} from 'react-redux';
import {RootState} from '../../stores/store';
import {calculateCartNutr} from '../../util/targetCalculation';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {getUserBaseLine} from '../../query/query';
import {ActivityIndicator} from 'react-native';

const ProgressBarContainer = styled.View`
  flex: 1;
  height: 70px;
  justify-content: center;
`;

const ProgressBarTitle = styled.Text`
  font-size: 12px;
  color: ${colors.textMain};
  text-align: left;
`;
const ProgressBarNumber = styled.Text`
  font-size: 12px;
  margin-top: 5px;
  color: ${colors.textMain};
  text-align: right;
`;

const Container = styled.View`
  background-color: ${colors.white};
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const indicatorColorsByTitle: {[key: string]: string} = {
  '칼로리(g)': colors.main,
  '탄수화물(g)': colors.blue,
  '단백질(g)': colors.green,
  '지방(g)': colors.orange,
};

const NutrUpperBoundByTitle: {[key: string]: number} = {
  '칼로리(g)': 50,
  '탄수화물(g)': 15,
  '단백질(g)': 5,
  '지방(g)': 5,
};

/** props:
 * 1. title '칼로리(g)' | '탄수화물(g)' | '단백질(g)' | '지방(g)'
 * 2. numerator(일부값)
 * 3. denominator(전체값) */
interface INutrientProgress {
  title: string;
  numerator: number;
  denominator: number;
}
const ProgressBar = ({title, numerator, denominator}: INutrientProgress) => {
  const indicatorColor =
    numerator > denominator + NutrUpperBoundByTitle[title]
      ? colors.warning
      : indicatorColorsByTitle[title];
  return (
    <ProgressBarContainer>
      <ProgressBarTitle>{title}</ProgressBarTitle>
      <Progress.Bar
        style={{marginTop: 5}}
        progress={numerator / denominator}
        width={null}
        height={4}
        color={indicatorColor}
        unfilledColor={colors.bgBox}
        borderWidth={0}
      />
      <ProgressBarNumber>{`${numerator}/${denominator}`}</ProgressBarNumber>
    </ProgressBarContainer>
  );
};

const NutrientsProgress = ({menuIndex}: {menuIndex: string}) => {
  // react-query test
  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['baseLine'],
    queryFn: getUserBaseLine,
  });
  console.log(isLoading, error, data, isFetching);
  // const {cart} = useSelector((state: RootState) => state?.cart);
  // const {calorie, carb, protein, fat} = calculateCartNutr(cart[menuIndex]);

  // const {calorie, carb, protein, fat} = data;
  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <ProgressBar
            title="칼로리(g)"
            numerator={parseInt(data?.calorie)}
            denominator={parseInt(data?.calorie)}
          />
          <VerticalSpace width={8} />

          <ProgressBar
            title="탄수화물(g)"
            numerator={parseInt(data?.carb)}
            denominator={parseInt(data?.carb)}
          />
          <VerticalSpace width={8} />

          <ProgressBar
            title="단백질(g)"
            numerator={parseInt(data?.protein)}
            denominator={parseInt(data?.protein)}
          />
          <VerticalSpace width={8} />

          <ProgressBar
            title="지방(g)"
            numerator={parseInt(data?.fat)}
            denominator={parseInt(data?.fat)}
          />
        </>
      )}
    </Container>
  );
};

export default NutrientsProgress;
