import { useState } from 'react'
import axios from 'axios';
import styles from '@/styles/Home.module.css'

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
  return (
    <div className={styles.App}>
      <h2 className={styles.headerText}> Advice </h2>
      <p className={styles.paragraph}>{data.slip.advice}</p>
      <button className={styles.button} onClick={refresh}>
        Seek Advice 🤲
      </button>
    </div>
  )
}
Home.getInitialProps = fetchData;
