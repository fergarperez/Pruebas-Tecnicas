import { useRef, useState } from 'react'
import library from "../lib/books.json"
import { Welcome } from '../types'
import { useLectureList } from '../hooks/useLectureList'

function Library() {
  const [shelf, setShelf] = useState<Welcome>(library)
  const { list, addToList, deleteBookFromList } = useLectureList()

  const initialLibrary = useRef<Welcome>(library)
  const genres = useRef<string[]>([])

  initialLibrary.current.library.forEach(book => {
    if(!genres.current.includes(book.book.genre)) {
      genres.current.push(book.book.genre)
    } 
  })

  function handleGenreChange(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault()
    
    const filteredArrayByGenre = initialLibrary.current.library.filter(book => {
      return book.book.genre === event.target.value
    })

    if(filteredArrayByGenre.length > 0) {
      setShelf({
        library: filteredArrayByGenre
      })
    } else {
      setShelf({
        library: initialLibrary.current.library
      })
    }
  }

  function handlePagesChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    const filteredArrayByPages = initialLibrary.current.library.filter(
      book => book.book.pages > +event.target.value
    )

    setShelf({
      library: filteredArrayByPages
    })
  }

  return (
    <section>
      <h3>
        {
          shelf.library.length + " libros disponibles"
        }
      </h3>
      <h4>
        {
          list.length + " en la lista de lectura"
        }
      </h4>
      <section style={{display: "flex"}}>
        <div className='pages-filter'>
          <h4>Filtrar por páginas</h4>
          <input type="range" name="" id="" onChange={handlePagesChange} 
          min={0} max={1200}/>
        </div>
        <div className='genre-filter'>
          <h4>Filtrar por género</h4>
          <select name="genre" onChange={handleGenreChange}>
            <option value="todos">Todos</option>
            {
              genres.current.map(genre => {
                return (
                  <option value={genre}>{genre}</option>
                )
              })
            }
          </select>
        </div>
      </section>
      <section style={{display: 'flex', gap: "12px", alignItems: "start"}}>
        <ul style={{maxWidth: "700px"}}>
            {
              shelf.library.map(book => {

                const finded = list.find(item => item.title === book.book.title)

                if(finded) {
                  return (
                    <li key={book.book.ISBN} style={{scale: "0.95", pointerEvents: "none", 
                      cursor: "not-allowed", opacity: "0.5"
                    }}>
                      <img src={book.book.cover} alt={book.book.title} />
                    </li>
                  )
                }
                
                return (
                  <li key={book.book.ISBN}>
                    <img src={book.book.cover} alt={book.book.title}
                    onClick={() => {
                      addToList(book.book)
                    }}/>
                  </li>
                )
              })
            }
          </ul>
          {list?.length > 0 && (
            <section style={{maxWidth: "400px", borderRadius: "20px", border: "2px solid lightgray",
              width: "100%"
            }}>
              <h2>Lista de Lectura</h2>
              <ul>
                {list.map((book) => (
                  <li key={book.ISBN} style={{position: "relative", alignSelf: "start"}}>
                    <img src={book.cover} alt={book.title}/>
                    <button style={{padding: "8px",
                      position: "absolute", top: "-10px", right: "-10px"
                    }}
                    onClick={() => {
                      deleteBookFromList(book)
                    }}>x</button>
                  </li>
                ))}
              </ul>
            </section>
          )}
      </section>
    </section>
  )
}

export default Library