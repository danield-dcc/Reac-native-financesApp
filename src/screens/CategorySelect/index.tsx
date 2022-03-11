import React from 'react';
import { FlatList } from 'react-native';
import { categories } from '../../utils/categories';
import { Button } from "../../components/Form/Button"
import { 
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer,

} from './styles';

//criou duas interfaces. Uma para lidar com os elemtetos de Category e outra como props para parassar para a função

interface Category{
    key:string;
    name: string;
}
interface Props {
    category: Category;
    setCategory:(category: Category) => void; //função para aualizar o estado
    closeSelectCategory: () => void;        //função para fechar o modal
}

export function CategorySelect({
    category,
    setCategory,
    closeSelectCategory,
}: Props ){
        //recebe um item que é do tipo Category
    function handleCategorySelect(category: Category){
        setCategory(category)
    }

    return(
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>
            <FlatList
                data={categories}
                style={{flex:1, width:'100%'}}
                keyExtractor={(item) => item.key}
                renderItem={({item})=> (
                    <Category
                        onPress={() => handleCategorySelect(item)} //toda vez que clicar será passado o item(com os elementos de category) para dentro de handleCategorySelect
                        isActive={category.key === item.key} //saber qua o item de dentro da modal foi selecionado
                    >
                       <Icon name={item.icon}/>
                       <Name>{item.name}</Name> 
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator/>}
            />

            <Footer>
                <Button  
                onPress={closeSelectCategory}
                title='Selecionar' />
            </Footer>

        </Container>
    )
}