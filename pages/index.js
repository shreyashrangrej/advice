import { useState } from 'react'
import axios from 'axios';
import { Button, Switch, useTheme, Card, Text, Grid, Row, Spacer } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes'

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
    <div>
      <Grid.Container gap={2}>
        <Grid sm={12} md={5}>
          <Card css={{ mw: "330px" }}>
            <Card.Header>
              <Text b h3>Advices</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: "$10" }}>
              <Text>
                {data.slip.advice}
              </Text>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <Row justify="center">
                <Switch shadow
                  checked={isDark}
                  onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                />
                <Spacer x={2} />
                <Button onClick={refresh} shadow color="gradient" auto>
                  Seek Advice 🤲
                </Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </div>
  )
}
Home.getInitialProps = fetchData;
