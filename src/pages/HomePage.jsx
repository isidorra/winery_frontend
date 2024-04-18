import logo from "../assets/icons/logo.png";
const HomePage = () => {
  return (
    <div className="">
        
        <div className="hero-background mx-auto text-center text-white-smoke pt-24">
            <img src={logo} className="w-52 mx-auto"/>
            <div className="flex items-center justify-between mt-10 md:mt-0">
              <div className="py-0.5 sm:w-1/3 md:w-full bg-secondary opacity-20 rounded-xs"></div>
              <h1 className="hero-heading text-center text-secondary font-dorsa mx-auto justify-center -mt-24">Velou<span className="no-letter-spacing">r</span></h1>
              <div className="py-0.5 sm:w-1/3 md:w-full bg-secondary opacity-20 rounded-xs"></div>
            </div>

            
            <h3 className="text-5xl md:text-7xl hero-subheading -mt-5 sm:-mt-10 md:-mt-24 font-dorsa text-secondary opacity-80">vineyard<span className="no-letter-spacing">s</span></h3>
        </div>
    </div>
  )
}

export default HomePage