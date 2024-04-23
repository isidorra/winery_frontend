import logo from "../assets/icons/logo.png";
const HomePage = () => {
  return (
    <div className="">
        
        <div className="hero-background mx-auto text-center text-white-smoke pt-14">
            <img src={logo} className="w-40 md:w-64 mx-auto"/>
            <div className="nav-gradient">
              <h1 className="hero-heading text-center text-secondary font-dorsa mx-auto justify-center -mt-16 md:-mt-24 pt-10">Velou<span className="no-letter-spacing">r</span></h1>
              <h3 className="text-5xl md:text-7xl hero-subheading -mt-5 sm:-mt-10 md:-mt-24 font-dorsa text-secondary opacity-80 pb-24">vineyard<span className="no-letter-spacing">s</span></h3>
            </div>

            
            
        </div>
    </div>
  )
}

export default HomePage