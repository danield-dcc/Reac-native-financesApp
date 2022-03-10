import React, { useState } from 'react'
import { Input } from '../../components/Form/Input'
import { Button } from '../../components/Form/Button'
import { TransctionTypeButton } from '../../components/Form/TransctionTypeButton'


import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes,
} from './styles'
import { CategorySelect } from '../../components/Form/CategorySelect'

export function Register(){
    const [transactionType, setTransactionType] = useState('');

    function handleTransactionTypeSelect(type: 'up' | 'down'){
        setTransactionType(type)
    }

    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

        <Form>
            <Fields>
                <Input
                placeholder='Nome'
                />
                <Input
                placeholder='Preço'
                />
                   <TransactionsTypes>
                    <TransctionTypeButton
                    type='up'
                    title='Income'
                    onPress={()=>handleTransactionTypeSelect('up')}
                    //se o up é o selecionado, ele fica como true
                    isActive={transactionType === 'up'}
                    />
                    <TransctionTypeButton
                    type='down'
                    title='Outcome'
                    onPress={()=>handleTransactionTypeSelect('down')}
                    //se o down é o selecionado, ele fica como true
                    isActive={transactionType === 'down'}
                    />
                    </TransactionsTypes>
                    <CategorySelect title='Categoria'/>

            </Fields>
            <Button title='Enviar'/>
        </Form>

        </Container>
    
    )
   
}