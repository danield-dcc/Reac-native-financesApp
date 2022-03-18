import React, { useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native'
import { RFValue } from 'react-native-responsive-fontsize';

import { HistoryCard } from '../../components/HistoryCard';


import { useTheme } from 'styled-components/native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { 
    Container,
    Header,
    Title,
    ChartContainer,
    MonthSelect,
    MonthSelectBotton,
    MonthSelectIcon,
    Mouth,

} from './styles'
import { categories } from '../../utils/categories';
import { ScrollView } from 'react-native-gesture-handler';

interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    key: string;
    name: string;
    total: number;
    totalFormated: string;
    color: string;
    percent:string;
}

export function Resume(){
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    const theme = useTheme()

    async function loadData(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormated = response ? JSON.parse(response): [];

       //filtrando as transações de saida
       const expensives = responseFormated
       .filter((expensive: TransactionData) => expensive.type === 'negative')
    
        //reduce pega a coleção e soma o elementos(a + b)
        const expensiveTotal = expensives
        .reduce((acumullator: number, expesive: TransactionData) => {
            return acumullator + Number(expesive.amount)
        }, 0)

        console.log(expensiveTotal)

       //vetor auxiliar
        const totalByCategory: CategoryData[] = [];

        //percorrendo cada categoria
       categories.forEach(category => {
           let categorySum = 0;
        
           //conferindo se a chave da bate com a categoria que estamo percorrendo
           expensives.forEach((expensive: TransactionData) => {
               if(expensive.category === category.key){
                categorySum += Number(expensive.amount)
               }
           });

           if (categorySum > 0) {

            const totalFormated = categorySum.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })

            const percent = `${(categorySum / expensiveTotal * 100).toFixed(0)}%`

               totalByCategory.push({
                   key: category.key,
                   name: category.name,
                   color: category.color,
                   total: categorySum,
                   totalFormated,
                   percent,
               })
           }
       });

       setTotalByCategories(totalByCategory)
    }

    useEffect(() => {
        loadData()
    },[])


    return(
        <Container>
            <Header>
                <Title>Resumo por Categoria</Title>
            </Header>
            


            <ScrollView 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 24,
                paddingBottom: useBottomTabBarHeight(),
            }}
            style={{flex:1, }}>


            <MonthSelect>
                <MonthSelectBotton>
                    <MonthSelectIcon name="chevron-left"/>
                </MonthSelectBotton>

                <Mouth>Maio</Mouth>

                <MonthSelectBotton>
                    <MonthSelectIcon name="chevron-right"/>
                </MonthSelectBotton>

            </MonthSelect>

                <ChartContainer>
                    <VictoryPie
                        data={totalByCategories}
                        colorScale={totalByCategories.map(category => category.color)}
                        style={{
                            labels:{
                                fontSize: RFValue(18),
                                fontWeight: 'bold',
                                fill: theme.colors.shape
                            }
                        }}
                        labelRadius={50}
                        x="percent"
                        y="total"
                    />
                </ChartContainer>


                {
                    totalByCategories.map(item => (
                        <HistoryCard
                            key={item.key}
                            title={item.name}
                            amount={item.totalFormated}
                            color={item.color}
                        />
                    ))
                }
           
           </ScrollView>
        </Container>
    )
}