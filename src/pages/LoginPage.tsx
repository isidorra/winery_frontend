import image from "../assets/image/auth.jpg";

const LoginPage = () => {
  return (
    <div className="max-container justify-center">
      <div className="flex items-center justify-between mt-10">
                <div className="w-1/2 mx-auto">
                    <h2 className="text-5xl">Login</h2>
                    <p>Welcome Back!</p>

                    <form>
                        <div>
                            <label className="block uppercase text-sm mt-5">Username</label>
                            <input placeholder="Username" type="text" className="border border-neutral-400 outline-none p-2 rounded-lg w-full"/>
                        </div>

                        <div>
                            <label className="block uppercase text-sm mt-5">Password</label>
                            <input placeholder="Password" type="password" className="border border-neutral-400 outline-none p-2 rounded-lg w-full"/>
                        </div>    

                        <button className="w-full bg-neutral-800 p-2 rounded-lg text-white mt-4">Login</button>
                    </form>
                </div>
                <div>
                    <img src={image} alt="Wineyard" className="w-1/2 mx-auto"/>
                </div>
      </div>
    </div>
  );
};

export default LoginPage;
