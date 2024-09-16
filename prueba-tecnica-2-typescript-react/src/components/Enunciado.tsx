
function Enunciado() {
  return (
    <section className='bg-black text-white max-h-[90vh] overflow-auto'>
      <h1 className='my-3 text-3xl font-semibold'>Prueba técnica con TypeScript y React</h1>
      <p className='my-3'>
        Esto es una prueba técnica de una empresa europea para un sueldo de 55000 €/anuales.
      </p>
      <p className='my-3'>
        El objetivo de esta prueba técnica es crear una aplicación similar a la que se proporciona en este enlace: 
        <a href="https://midu-react-11.surge.sh/" target="_blank" rel="noopener noreferrer">
          https://midu-react-11.surge.sh/
        </a>. Para lograr esto, debe usar la API proporcionada por 
        <a href="https://randomuser.me/" target="_blank" rel="noopener noreferrer">
          https://randomuser.me/
        </a>.
      </p>

      <h2 className='my-3'>Los pasos a seguir:</h2>
      <ul className='flex flex-col gap-1 ml-4'> 
        <li className='list-disc'>Fetch 100 rows of data using the API.</li>
        <li className='list-disc'>Display the data in a table format, similar to the example.</li>
        <li className='list-disc'>Provide the option to color rows as shown in the example.</li>
        <li className='list-disc'>Allow the data to be sorted by country as demonstrated in the example.</li>
        <li className='list-disc'>Enable the ability to delete a row as shown in the example.</li>
        <li className='list-disc'>Implement a feature that allows the user to restore the initial state, meaning that all deleted rows will be recovered.</li>
        <li className='list-disc'>Handle any potential errors that may occur.</li>
        <li className='list-disc'>Implement a feature that allows the user to filter the data by country.</li>
        <li className='list-disc'>Avoid sorting users again the data when the user is changing filter by country.</li>
        <li className='list-disc'>Sort by clicking on the column header.</li>
      </ul>
    </section>
  )
}

export default Enunciado
