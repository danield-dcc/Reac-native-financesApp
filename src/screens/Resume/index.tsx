import React, { useCallback, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import { ActivityIndicator } from 'react-native'
import { VictoryPie } from 'victory-native'
import { RFValue } from 'react-native-responsive-fontsize';


import { HistoryCard } from '../../components/HistoryCard';


import { useTheme } from 'styled-components/native'
import { useAuth } from '../../hooks/auth';
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
    LoadContainer,

} from './styles'
import { categories } from '../../utils/categories';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

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
    const [isLoading, setIsLoading] = useState(false)
    const [selectdDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    const theme = useTheme()
    const { user } = useAuth()

    //função responsável por lidar com a seleção das datas
    function handleDateChange(action: 'next' | 'prev'){

        if(action === 'next'){
            //usadno a lib date-fns' basata adicionar o "1" para somar o próximo mês
          setSelectedDate(addMonths(selectdDate, 1))
        }else{
          setSelectedDate(subMonths(selectdDate, 1))
        }
    }

    async function loadData(){
        setIsLoading(true)

        const dataKey = `@gofinances:transactions_user${user.id}`;
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormated = response ? JSON.parse(response): [];

       //filtrando as transações de saida
       const expensives = responseFormated
       .filter((expensive: TransactionData) => 
       expensive.type === 'negative' && 
       new Date(expensive.date).getMonth() === selectdDate.getMonth() &&
       new Date(expensive.date).getFullYear() === selectdDate.getFullYear()
       ); //adiciona comparação entre o mês e o ano
    
        //reduce pega a coleção e soma o elementos(a + b)
        const expensiveTotal = expensives
        .reduce((acumullator: number, expesive: TransactionData) => {
            return acumullator + Number(expesive.amount)
        }, 0);


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
       setIsLoading(false)
    }

     useFocusEffect(useCallback(() => {
        loadData();
    },[selectdDate]));


    return(
        <Container>
            <Header>
                <Title>Resumo por Categoria</Title>
            </Header>

            {isLoading ?
                <LoadContainer>
                    <ActivityIndicator
                        color={theme.colors.primary}
                        size="large"
                    />
                </LoadContainer> :

                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingBottom: useBottomTabBarHeight(),
                    }}
                    style={{ flex: 1, }}>


                    <MonthSelect>
                        <MonthSelectBotton onPress={() => handleDateChange('prev')}>
                            <MonthSelectIcon name="chevron-left" />
                        </MonthSelectBotton>

                        <Mouth>{format(selectdDate, 'MMMM, yyyy', { locale: ptBR })}</Mouth>

                        <MonthSelectBotton onPress={() => handleDateChange('next')}>
                            <MonthSelectIcon name="chevron-right" />
                        </MonthSelectBotton>

                    </MonthSelect>

                    <ChartContainer>
                        <VictoryPie
                            data={totalByCategories}
                            colorScale={totalByCategories.map(category => category.color)}
                            style={{
                                labels: {
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
            }
        </Container>
    )
}