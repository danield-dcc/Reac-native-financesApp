import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/goFinances.svg'

import { 
    Container,
    Header,
    TittleWrapper,
    Title,
    SignInTitle,
    Footer
 } from "./styles";

export function SignIn(){
    return(
        <Container>
            <Header>
                <TittleWrapper>
                    <LogoSvg 
                    width={RFValue(120)}
                    height={RFValue(68)}
                    />
                    <Title>
                        Controle suas {'\n'}
                        finanças de forma{'\n'}
                        muito simples
                    </Title>
                </TittleWrapper>

                <SignInTitle>
                    Faça seu login com{'\n'}
                    uma das contas abaixo
                </SignInTitle>
            </Header>
            <Footer>

            </Footer>

        </Container>

    );
}