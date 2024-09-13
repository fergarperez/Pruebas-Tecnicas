import { useEffect, useRef, useState } from "react"
import { Button } from "./components/ui/button"
import { User } from "./types"
import { Input } from "./components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Enunciado from "./components/Enunciado"

const apiEndpoint = "https://randomuser.me/api/?results=100"

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [colour, setColour] = useState<boolean>(false)
  const [sorted, setSorted] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")

  const originalUsers = useRef<User[]>([])

  useEffect(() => {
    fetch(apiEndpoint)
    .then(async res => await res.json())
    .then(data => {setUsers(data.results) 
      originalUsers.current = data.results})
  }, [])

  function SortByCountry() {
    if(sorted) {
      setSorted(false)
      setUsers(originalUsers.current)
    } else {
      const newArray = structuredClone(users)
      newArray.sort((user1, user2) => {
        return user1.location.country.localeCompare(user2.location.country)
      })
      setUsers(newArray)
      setSorted(true)
    }
  }

  function sortByInput(search: string) {
    if(search !== null && search.length > 0) {
      const newArray = users.filter(user => user.location.country.toLowerCase().includes(search.toLowerCase()))
      setUsers(newArray)
    } else {
      setUsers(originalUsers.current)
    }
  }

  function handleDelete(email: string) {
    const newArray = users.filter(user => user.email !== email)
    setUsers(newArray)
  }

  function resetState() {
    setUsers(originalUsers.current)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
    sortByInput(event.target.value)
  }

  return (
    <main className="mt-20">
      <nav className="flex justify-center items-center gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Enunciado</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px] bg-black">
            <Enunciado />
          </DialogContent>
        </Dialog>
        <h1 className="text-white font-bold text-3xl">Prueba Técnica</h1>
      </nav>
      <div>
        <ul className="flex justify-center items-center gap-3 mt-6">
          <li>
            <Button onClick={() => {
              setColour(!colour)
            }}>Colorear</Button>
          </li>
          <li>
            <Button onClick={SortByCountry}>Ordenar por País</Button>
          </li>
          <li>
            <Button onClick={resetState}>Resetear el Estado</Button>
          </li>
          <li>
            <Input type="text" placeholder="filter by country"
            onChange={handleInputChange} value={search} className="text-white font-semibold"/>
          </li>
        </ul>
      </div>
      <table width={"100%"} className="mt-12 text-white">
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th onClick={SortByCountry} className="cursor-pointer">País</th>
          <th>Acciones</th>
        </tr>
        {
          users.map((user, i) => {
              return (
              <tr key={user.email} className={`${colour ? i%2 === 0 ? "bg-[#333]" : "bg-[#555]" : "bg-transparent"}`}>
                <td>
                  <img src={user.picture.thumbnail} alt={user.name.title} />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td><Button onClick={() => {
                  handleDelete(user.email)
                }}>Borrar</Button></td>
              </tr>
            )
          })
        }
      </table>
    </main>
  )
}

export default App
