import { useState } from 'react'
import axios from 'axios';
import { Button, Switch, useTheme, Card, Text, Grid, Row, Spacer } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes'
import { SunIcon } from '@/public/icon/sunicon';
import { MoonIcon } from '@/public/icon/moonicon';

async function fetchData() {
  const response = await axios.get("https://api.adviceslip.com/advice");
  const data = response.data;
  return { data };
}
export default function Home(props) {
  const [data, setData] = useState(props.data);
  async function refresh() {
    const refreshedProps = await fetchData();
    setData(refreshedProps.data);
  }
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  return (
    <div className='container'>
      <Grid.Container gap={2} justify='center' alignItems='center' alignContent='center'>
        <Grid alignItems='center' alignContent='center'>
          <Card css={{ mw: "330px" }}>
            <Card.Header>
              <Text b h3>Advices</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: "$10" }}>
              <Text size={20}>
                {data.slip.advice}
              </Text>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <Row justify="center">
                <Switch shadow
                  checked={isDark}
                  onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                  iconOn={<MoonIcon filled />}
                  iconOff={<SunIcon filled />}
                  size='lg'
                />
                <Spacer/>
                <Button onClick={refresh} shadow color="gradient" auto>
                  Seek Advice 🤲
                </Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
      <style jsx>
        {`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
      `}
      </style>
    </div>
  )
}
Home.getInitialProps = fetchData;
