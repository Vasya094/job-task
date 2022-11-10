function Home() {
  return (
    <div className='home-page-container'>
      <section>
        <h1>
          <strong>Wellcome</strong>
        </h1>
        <p>Don't repeat yourself</p>
      </section>

      <img
        className='home-page-container_cat-img'
        src='https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg'
        alt='cat'
      />

      <section>
        <h3>You have not set any goals</h3>
      </section>
    </div>
  )
}

export default Home
