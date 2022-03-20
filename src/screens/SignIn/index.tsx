import React,{ useState } from "react";
import { ActivityIndicator, Alert, Platform } from 'react-native'
import { RFValue } from "react-native-responsive-fontsize";


import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/goFinances.svg'

import { SignInSocialButton } from '../../components/SignInSocialButton'
import { useAuth } from "../../hooks/auth";

import { 
    Container,
    Header,
    TittleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
 } from "./styles";
 import { useTheme } from 'styled-components'


export function SignIn(){
    const [isLoading, setIsloading] = useState(false);
    const { signInWithGoogle, signInWithApple } = useAuth();
    const theme = useTheme();

    async function handleSignInWithGoogle() {
        try {
            setIsloading(true);
            return await signInWithGoogle();
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possível conectar a conta Google');
            setIsloading(false);
        } 
    }

    async function handleSignInWithApple() {
        try {
            setIsloading(true);
            return await signInWithApple();
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possível conectar a conta Apple');
            setIsloading(false);
        }
    }

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
                <FooterWrapper>
                    <SignInSocialButton 
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />

                    {
                    Platform.OS === 'ios' &&
                        <SignInSocialButton
                            title="Entrar com Apple"
                            svg={AppleSvg}
                            onPress={handleSignInWithApple}
                        />
                    }
                </FooterWrapper>

                {isLoading &&
                    <ActivityIndicator color={theme.colors.shape}
                        style={{ margin: 2 }}
                        size="small"
                    />}
            </Footer>
        </Container>

    );
}