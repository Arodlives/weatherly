import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
// import styles from '../styles/Home.module.css'
import {Paper,TextInput,Button,Text,Group} from "@mantine/core"
import {useState} from 'react'

// const inter = Inter({ subsets: ['latin'] })
const API_KEY= "6a53d7248676811a54ee9fe5c65e2551";

export default function Home() {
  const[cityInput,setCityInput] = useState("");
  const[weatherData,setWeatherData]=useState<any>({});

  async function getweatherdata(){
    try{const serverResponse=await fetch(
      "https://api.openweathermap.org/data/2.5/weather?"+
      "q="+cityInput+"&appid="+API_KEY+"&units=imperial"
    )
    const data =await serverResponse.json();
    console.log(data);
    if(data?.cod ==="400")throw data;
    setWeatherData(data);
    }
    catch(err){
      console.log(err);
    }
  }


  return (
    <>
    <div style={{position:"static",height:"100vh",backgroundImage:"url('https://littlevisuals.co/images/atlantic_ride.jpg')",backgroundSize:"cover"}}>

      <div style={{
        position:"absolute",
        left:"50%",
        top:"50%",
        transform:"translate(-50%,-50%)",
      }}>
      <Paper withBorder p="lg" style={{maxWidth:"500px"}}>
        <Group position="apart">
          <Text size="lg" weight={500}>
            Get Weather Here Below
          </Text>
        </Group>
        <Group position="apart" mb="xs">
          <TextInput size="lg" 
          label="City Name" 
          placeholder='ex: San Diego'
          onChange={(e)=>setCityInput(e.target.value)}
          />
        </Group>
        <Group position="apart">
          <Button variant="gradient" size="md" onClick={() => getweatherdata()} >
            WeatherNow
          </Button>
        </Group>
        {Object.keys(weatherData).length !==0?
        <>
        <Group position="left" mb="xs">
          <Text>
            {weatherData.name} Weather 
          </Text>
        </Group>
        <Group position="left" mb="xs">
          <Image
           src={"http://openweathermap.org/img/wn/" + weatherData.weather[0].icon+".png"}
           width={"100"} height={"100"} alt="weather" 
          />

          <Text size="lg" weight={500}>
            Currently {weatherData.main.temp} &deg;F 
          </Text>
        </Group>
        </>
        :null}
      </Paper>
      </div>
    </div>
    </>
  )
}
