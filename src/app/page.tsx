import Carousel from './components/Carousel'

export default function Home() {

  const carousel = [{
    image: '/polo1.png',
    title: 'Gran variedad de polos al mejor precio!',
    description: 'Los mejores polos, la mejor calidad del mercado a tan solo un solo click de distancia y a un preciasooo!'
  ,}, {
    image: '/polo2.png',
    title: 'Envios hasta la puerta de tu CASA',
    description: 'Con envios a todas las partes del pais, y a tan solo un click de compra, no esperas mas, no camines, solo espera y relajate.'
  }, {
    image: '/polo3.png',
    title: 'Todos los estilos',
    description: 'Luce un gran polo con un gran estilo, se la envidia de todo tu barrio.'
  }]

  return (
      <section className="w-full h-screen">
        <Carousel className='w-full h-80 bg-slate-800'>
          { carousel.map((article, i) => {
            return <div key={i}>
              <h1>{ article.title }</h1>
            </div>
          }) }
        </Carousel>
      </section>
  )
}
