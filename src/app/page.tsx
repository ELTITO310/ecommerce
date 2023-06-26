import Image from 'next/image'
import Carousel from './components/Carousel'

export default function Home() {

  const carousel = [{
    image: '/polo12.png',
    title: 'Gran variedad de polos al mejor precio!',
    description: 'Los mejores polos, la mejor calidad del mercado a tan solo un solo click de distancia y a un preciasooo!',
    color: '#4C7CFF'
    ,}, {
    image: '/polo2.png',
    title: 'Envios hasta la puerta de tu CASA',
    description: 'Con envios a todas las partes del pais, y a tan solo un click de compra, no esperas mas, no camines, solo espera y relajate.',
    color: '#FF4C4C'
  }, {
    image: '/polo3.png',
    title: 'Todos los estilos',
    description: 'Luce un gran polo con un gran estilo, se la envidia de todo tu barrio.',
    color: '#804CFF'
  }]

  return (
      <section className="w-full h-screen">
        <Carousel className='max-w-7xl mx-auto h-96'>
          { carousel.map((article, i) => {
            const to = `to-[${article.color}]`
            return <div key={i} className={`relative h-full w-full grid grid-cols-2`} style={{
              backgroundImage: `linear-gradient(to right, #000, ${article.color});`
            }}>
              <div className='w-full h-full flex justify-center items-center flex-col text-center px-12'>
                <h1 className='text-3xl font-extrabold'>{ article.title }</h1>
                <p>
                  {article.description}
                </p>
              </div>
              <div className={`w-full h-full relative flex justify-end items-end`}>
                <Image src={article.image} alt={article.image} fill={true} className={`object-contain`}/>
              </div>
            </div>
          }) }
        </Carousel>
      </section>
  )
}
