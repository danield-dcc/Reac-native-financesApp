import React, { useEffect, useState } from 'react'
import { Alert, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native'

import { useForm } from 'react-hook-form'

import { Button } from '../../components/Form/Button'
import { InputForm } from '../../components/Form/InputForm'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'
import { TransctionTypeButton } from '../../components/Form/TransctionTypeButton'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

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
   //qualquer key do tipo string
    [name: string]:any
}

type NavigationProps = {
    navigate:(screen:string) => void
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
    });

    
    const navigation = useNavigation<NavigationProps>();

    

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true)
    };

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false)
    }

    function handleTransactionTypeSelect(type: 'positive' | 'negative'){
        setTransactionType(type)
    };

    const { control,
         handleSubmit,
         formState:{errors},
         reset
     } = useForm({
        resolver: yupResolver(schema)
    });


    async function handleRegister(form: FormData){

        if(!transactionType){
            return Alert.alert('Selecione o tipo de transação')
        }

        if(category.key === 'category'){
            return Alert.alert('Selecione a cetegoria')
        }

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }

       try{
           // aqui é definido uma chave
            const dataKey = '@gofinances:transactions';
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data): [];

            const dataFormatted = [
                //pega todos os dados que já estavam salvos e adiciona o novo
                ...currentData, newTransaction
            ]

           //depois passamos a chave e o objeto no formato de json
           await AsyncStorage.setItem(dataKey,JSON.stringify(dataFormatted))

           //resetando input
           reset(),
            setTransactionType('')
            setCategory({
                key: 'category',
                name: 'Categoria',
            });

            navigation.navigate('Listagem');

       }catch(error){
           console.log(error)
           Alert.alert('Não foi possível salvar')
       }
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
                        onPress={()=>handleTransactionTypeSelect('positive')}
                        //se o up é o selecionado, ele fica como true
                        isActive={transactionType === 'positive'}
                        />
                        <TransctionTypeButton
                        type='down'
                        title='Outcome'
                        onPress={()=>handleTransactionTypeSelect('negative')}
                        //se o down é o selecionado, ele fica como true
                        isActive={transactionType === 'negative'}
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