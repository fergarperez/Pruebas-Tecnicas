import { useEffect, useState } from 'react'
import './App.css'

const CatEndpointFact = `https://catfact.ninja/fact`

type Fact = {
  fact: string
  length: number
}

function App() {
  const [fact, setFact] = useState<Fact | null>(null)
  const [img, setImg] = useState<string>("")

  useEffect(() => {
    async function fetchApi() {
      const res = await fetch(CatEndpointFact)
      const data: Fact = await res.json()

      setFact(data)

      const firstwordThreeWords = data?.fact.split(" ").slice(0, 3).join(" ")

      const response = await fetch(`https://cataas.com/cat/says/${firstwordThreeWords}?size=50&fontColor=white`)
      console.log(response)
      const {url} = response

      setImg(url)
    }

    fetchApi()
  }, [])  

  return (
    <>
      <h1>Prueba Técnica, React + TypeScript</h1>

      <p>{fact?.fact}</p>

      <img src={img} alt={fact?.fact} style={{width: "450px", height: "450px"}}/>
    </>
  )
}

export default App
