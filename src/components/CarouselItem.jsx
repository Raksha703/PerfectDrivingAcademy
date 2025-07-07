import Carousel from 'react-bootstrap/Carousel';
import { Button } from 'react-bootstrap';
import {car, bike, scooty} from "../assets/assets";

const slides = [
  {
    img: car,
    title: 'Become a Confident Driver',
    desc: 'Hands-on training with certified instructors in cars, bikes & scooties.',
    hasButton: true,
  },
  {
    img: bike,
    title: 'Expert Instructors, Real-Road Training',
    desc: 'Learn in real-world conditions with professional guidance.',
    hasButton: false,
  },
  {
    img: scooty,
    title: 'Track Progress with Online Logsheets',
    desc: 'Monitor your daily sessions and feedback digitally.',
    hasButton: false,
  },
];

function CarouselItem() {
  return (
    <Carousel fade>
      {slides.map((slide, idx) => (
        <Carousel.Item key={idx} interval={4000}>
          <div className="relative w-full h-[600px]">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                {slide.title}
              </h2>
              <p className="mt-3 text-md md:text-lg text-gray-200 max-w-2xl">
                {slide.desc}
              </p>
              {slide.hasButton && (
                <Button
                  variant="light"
                  className="mt-5 px-6 py-3 font-semibold text-black"
                  onClick={() => (window.location.href = '/register')}
                >
                  Join Now
                </Button>
              )}
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselItem;
