import styled from 'styled-components'
import {colors} from '../../styles/variables'
import { Like } from '../Like'
// @ts-ignore
import picnic from "./picnic.jpg"

const Flex = styled.div`
  display: flex;
`

const Vertical = styled(Flex)`
  flex-direction: column;
`

const CardWrapper = styled.div`
  border-bottom: 1px solid grey;
  height: 80px;
  padding-bottom: 10px;
  margin-bottom: 10px;
`

const labelSize = '10px'
const CardColorLabel = styled.div`
  height: ${labelSize};
  line-height: ${labelSize};
  border-radius: 30px;
  padding: 5px 10px 5px 10px;
  color: white;
  background-color: ${({color}) => color === 'green' ? colors.green : colors.orange};
`

export const Card = ({data}: any) => (
    <CardWrapper style={{display: 'flex'}}>
        <div>
          <div style={{width: '120px', height: '80px', backgroundImage: 'data', overflow: 'hidden',}}>
            <img src={data.picURL ? 'https://simbir-events.herokuapp.com/upload/' + data.picURL : picnic} alt=""/>
          </div>
        </div>
        <Flex style={{justifyContent: 'space-between', width: '100%'}}>
            <div style={{marginLeft: '20px'}}>
                <div>{data.name}</div>
                <div style={{color: colors.headerLinkInactive, marginTop: '5px'}}>
                    {data.time}
                </div>
            </div>
            <Vertical style={{justifyContent: 'space-between', alignItems: 'end'}}>
                <CardColorLabel color={'green'}>{data.city}</CardColorLabel>
                <Like isLike={data.like} />
            </Vertical>
        </Flex>
    </CardWrapper>
)
