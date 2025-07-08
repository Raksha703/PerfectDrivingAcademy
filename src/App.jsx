import {Routes , Route, useLocation} from "react-router-dom";
import {Header, Footer, Services} from "./components/components"
import {Course, Video, Home, Instructor, Login, Logsheet, Profile, Register, User, Contact, CourseSubCategory, VideoSettings} from "./pages/pages";
import {bg} from "./assets/assets";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";

function App() {

  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname])

  return (

    <div style={{
      backgroundImage: `url(${bg})`,
      backgroundColor: "#ffffff",
    }}
    className="min-h-screen w-full overflow-x-hidden bg-white">
      <Header />
      <main className="pt-[100px]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course" element={<Course />} />
        <Route path="/video" element={<Video />} />
        <Route path="/services" element={<Services />} />
        <Route path="/instructor" element={<Instructor />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user" element={<User />} />
        <Route path="/logsheet/:userId?" element={<Logsheet />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/course" element={<Course />} />
        <Route path="/coursesubcategory/:category" element={<CourseSubCategory />} />        
        <Route path="/videoSettings" element={<VideoSettings />} />

      </Routes>
      <Footer />
      </main>
      
    <ToastContainer />
    </div>
  )
}

export default App
