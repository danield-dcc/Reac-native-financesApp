import React from "react";
import { Container, Title } from "./styles";

import { RectButtonProps } from 'react-native-gesture-handler'

interface Props extends RectButtonProps{
    title: string;
    onPress?: ()=> void;
}

export function Button({onPress, title, ...props }: Props){
    return(
        <Container 
        onPress={onPress}
        {...props}>
            <Title>
                {title}
            </Title>
        </Container>
    )
}