import React, { useState } from 'react'
import { Modal } from 'react-native'

import { Input } from '../../components/Form/Input'
import { Button } from '../../components/Form/Button'
import { TransctionTypeButton } from '../../components/Form/TransctionTypeButton'

import { CategorySelect } from '../CategorySelect'

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes,
} from './styles'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'

export function Register(){
    const [category, setCategory] = useState({
        key: "category",
        name: "Categoria",
    })

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true)
    };

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false)
    }

    function handleTransactionTypeSelect(type: 'up' | 'down'){
        setTransactionType(type)
    };

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
                    
                    <CategorySelectButton 
                    onPress={handleOpenSelectCategoryModal}
                    title={category.name}/>

            </Fields>
            <Button 
            title='Enviar'/>
        </Form>

        <Modal visible={categoryModalOpen}>
            <CategorySelect 
                category = {category}
                setCategory = {setCategory}
                closeSelectCategory= {handleCloseSelectCategoryModal}
            />
        </Modal>

        </Container>
    
    )
   
}