export const Footer = ({ pag, loading }: {pag: number, loading: boolean}) => {
  return (
    <div>
      <div className='loading-container'>
        {loading && <span className='visually-hidden'>Loading...</span>}
      </div>
      <div className='pagination'>
        <span>Current of downloaded pages: {pag}</span>
      </div>
    </div>
  )
}
