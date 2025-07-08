import React from 'react';
import {Video} from "./pages";
import {CarouselItem, FAQ, Services} from "../components/components";

function Home() {
  
  return (
    <div>
      <CarouselItem />
      <Services />
      <Video />
      <Video onlyFeedback={true} />
      <FAQ />
    </div>
  )
}

export default Home
