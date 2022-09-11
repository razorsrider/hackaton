import React, {useRef} from 'react'
import styled from 'styled-components'
import {colors} from '../styles/variables'
import {Link, useLocation} from "react-router-dom";

const headerHeight = '80px';
const headerLinkTextSize = '24px';


const HeaderLine = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${headerHeight}; 
  border-bottom: 1px solid grey;
`


const LinksBox = styled.div`
  display: flex;
`

const TitleLogo = styled.div`
  color: ${colors.blue};
  margin: 14px 80px 0 20px;
  cursor: default;
  text-align: center;
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

const Link1 = styled(Link)`
  text-decoration: none;
`

function Header() {

    const {pathname} = useLocation()

    const reg_cal = /calendar/g
    const reg_sch = /schedule/g
    const reg_create_ev = /create_ev/g
    return (
        <HeaderLine>
            <HeadbarSide>
                <TitleLogo>
                    <b style={{fontSize: '26px'}}>SimbirSoft</b>
                    <div style={{fontSize: '16px'}}>Все мероприятия в одном месте</div>
                </TitleLogo>
                {true && <LinksBox>
                  <Link1 to={'/calendar'}>
                    <HeaderLink active={!!pathname.match(reg_cal)}>
                      Календарь
                    </HeaderLink>
                  </Link1>
                  <Link1 to={'/schedule'}>
                    <HeaderLink active={!!pathname.match(reg_sch)}>
                      Расписание на сегодня
                    </HeaderLink>
                  </Link1>
                  <Link1 to={'/create_ev'}>
                    <HeaderLink active={!!pathname.match(reg_create_ev)}>
                      Создать мероприятие
                    </HeaderLink>
                  </Link1>
                </LinksBox>}
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
