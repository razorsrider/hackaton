import React from 'react'
import styled from 'styled-components'
import {colors} from '../styles/variables'

const headerHeight = '80px';
const headerLinkTextSize = '24px';


const HeaderLine = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${headerHeight}; 
  border-bottom: 1px solid grey;
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

const Ava = styled.div`
  padding: 15px 0;
  margin-right: 20px;
`

const HeadbarSide = styled.div`
  display: flex;
`


function Header() {
    return (
        <HeaderLine>
            <HeadbarSide>
                <TitleLogo>
                    <b style={{fontSize: '26px'}}>SimbirSoft</b>
                    <div style={{fontSize: '16px'}}>Все мероприятия в одном месте</div>
                </TitleLogo>
                <LinksBox>
                    <HeaderLink active>
                        Календарь
                    </HeaderLink>
                    <HeaderLink>
                        Расписание на сегодня
                    </HeaderLink>
                    <HeaderLink>
                        Создать мероприятие
                    </HeaderLink>
                </LinksBox>
            </HeadbarSide>
            {true && <HeadbarSide>
                <LoggedName>Алена Моисеева</LoggedName>
                <Ava>
                    <div style={{borderRadius: '100%', backgroundColor: 'red', width: '50px', height: '50px'}}/>
                </Ava>
            </HeadbarSide>}

        </HeaderLine>
    );
}


export default Header;
