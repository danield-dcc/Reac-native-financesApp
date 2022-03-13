import React, { useState } from 'react'
import { Alert, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native'

import { useForm } from 'react-hook-form'

import { Button } from '../../components/Form/Button'
import { InputForm } from '../../components/Form/InputForm'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'
import { TransctionTypeButton } from '../../components/Form/TransctionTypeButton'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { CategorySelect } from '../CategorySelect'

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes,
} from './styles'
export type FormData = {
    // name: string;
    // amount: string;
    
    //qualquer key do tipo string
    [name: string]:any
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup.number().typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatorio')
})

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

    const { control,
         handleSubmit,
         formState:{errors}
     } = useForm({
        resolver: yupResolver(schema)
    });

    function handleRegister(form: FormData){

        if(!transactionType){
            return Alert.alert('Selecione o tipo de transação')
        }

        if(category.key === 'category'){
            return Alert.alert('Selecione a cetegoria')
        }

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }

       console.log(data)
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            
            <Header>
                <Title>Cadastro</Title>
            </Header>

        <Form>
            <Fields>
                <InputForm
                error={errors.name && errors.name.message}
                name='name'
                control={control} //assinatura indicando que fazem parte do mesmo form
                placeholder='Nome'
                autoCapitalize='sentences'
                autoCorrect={false}
                />
                <InputForm
                error={errors.amount && errors.amount.message}
                name='amount'
                control={control}
                placeholder='Preço'
                keyboardType='numeric'
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
            title='Enviar'
            onPress={handleSubmit(handleRegister)} //o handleSubmit vai passar os valores para o handleRegister
            />
        </Form>

        <Modal visible={categoryModalOpen}>
            <CategorySelect 
                category = {category}
                setCategory = {setCategory}
                closeSelectCategory= {handleCloseSelectCategoryModal}
            />
        </Modal>
       
        </Container>
        </TouchableWithoutFeedback>
    
    )
   
}