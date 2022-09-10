import React from 'react'
import styled from 'styled-components'
import {colors} from '../styles/variables'

const headerHeight = '80px';
const headerLinkTextSize = '24px';


const HeaderLine = styled.div`
  display: flex;
  justify-content: center;
  height: 85vh;
  align-items: center;
  // height: ${headerHeight}; 
  // border-bottom: 1px solid grey;
`

const TitleLogo = styled.div`
  color: ${colors.blue};
  margin: 14px 80px 0 20px;
  cursor: default;
`

const LinksBox = styled.div`
  display: flex;
`


const HeaderLink = styled.div<{ active?: boolean }>`
  color: ${({active}) => active ? 'black' : colors.headerLinkInactive};
  line-height: ${headerHeight};
  font-size: ${headerLinkTextSize};
  margin-right: 50px;
  cursor: pointer;
}
`


const LoggedName = styled.b`
  line-height: ${headerHeight}; 
  margin-right: 20px;
`

const FlexCont = styled.div`
  display: flex;
`

const FieldsName = styled(FlexCont)`
    color: grey;
    font-size: 12px;
`

const Title = styled.b`
  display: flex;
  color: ${colors.blue};
  justify-content: center;
  font-size: 22px;
  margin-bottom: 40px;
`

const InputBox = styled.div`
  // width: 350px;
  margin-bottom: 20px;
`

const InputField = styled.input`
  width: 350px;
`

const SubmitButton = styled.button`
  margin-top: 20px;
  border-radius: 30px;
  background-color: ${colors.blue};
  height: 50px;
  line-height: 50px;
  width: 110px;
  color: white;
  font-weight: 700;
`


function Header() {
    return (
        <HeaderLine>
            <form >
                <Title>Авторизация</Title>
                <InputBox>
                    <FieldsName>Логин</FieldsName>
                    <InputField type={"text"}/>
                </InputBox>
                <InputBox>
                    <FieldsName>Пароль</FieldsName>
                    <InputField type={"password"}/>
                </InputBox>
                <FlexCont style={{justifyContent: 'end'}}>
                    <SubmitButton type={"submit"}>Войти</SubmitButton>
                </FlexCont>
            </form>
        </HeaderLine>
    );
}


export default Header;
