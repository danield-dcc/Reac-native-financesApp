import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard"

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
} from './styles'

export interface DataListProps extends TransactionCardProps {
    id: string
}

export function Dashboard() {

    const data: DataListProps[] = [{
        id: '1',
        type: 'positve',
        title: "Desenvolvimento de site",
        amount: "R$ 12.000,00",
        category: {
            name: 'vendas',
            icon: 'dollar-sign'
        },
        date: "13/04/2020",
    },
    {
        id: '2',
        type: 'negative',
        title: "Hamburgeria Pizzy",
        amount: "R$ 59,00",
        category: {
            name: 'Alimentação',
            icon: 'coffee'
        },
        date: "10/04/2020",
    },
    {
        id: '3',
        type: 'negative',
        title: 'Aluguel do Apartamento',
        amount: "R$ 1.200,00",
        category: {
            name: 'casa',
            icon: 'shopping-bag'
        },
        date: "10/04/2020",
    },

    ]

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: "https://avatars.githubusercontent.com/u/71035802?v=4" }} />
                        <User>
                            <UserGreeting>Olá</UserGreeting>
                            <UserName>Daniel</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power" />
                </UserWrapper>
            </Header>
            <HighlightCards>
                <HighlightCard
                    type="up"
                    title="Entradas"
                    amount="R$17.400,00"
                    lastTransaction="Última entrada no dia 13 de abril"
                />
                <HighlightCard
                    type="down"
                    title="Saidas"
                    amount="R$1.259,00"
                    lastTransaction="Última saída dia 03 no dia 13 de abril"
                />
                <HighlightCard
                    type="total"
                    title="Total"
                    amount="R$16.141,00"
                    lastTransaction="01 à 16 de abril"
                />

            </HighlightCards>



            <Transactions>
                <Title>Listagem</Title>

                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}


                />


            </Transactions>
        </Container>
    )
}
