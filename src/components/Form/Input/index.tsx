import React from 'react';
import { TextInputProps } from 'react-native';

import { Container} from './styles'

//recebe todos os elementos deTextInputProps
type Props = TextInputProps;

export function Input({...props}: Props){
    return(
        <Container {...props}>

        </Container>
    )
}