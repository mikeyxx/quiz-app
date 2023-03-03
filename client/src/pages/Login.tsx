import axios from "axios";
import { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/store";
import { loginUser, setLoading, logError } from "../features/userSlice";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, errMsg } = useAppSelector((state) => state.users);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = userData;
    dispatch(setLoading());
    try {
      const { data } = await axios.post(import.meta.env.VITE_APP_LOGIN_API, {
        email,
        password,
      });
      dispatch(loginUser({ name: data.user.name, token: data.token }));
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user.name, token: data.token })
      );
      navigate("/questions");
      console.log(data.token);
    } catch (error: any) {
      dispatch(logError(error.response.data.msg));
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-7">
      <div className="bg-white max-w-lg w-full flex flex-col justify-center items-center p-7">
        <div className="bg-[#188FA7] h-16 w-16 flex justify-center items-center rounded">
          <span className="text-white font-bold text-5xl">Q</span>
        </div>
        <span className="text-2xl mt-3">Login</span>
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="bg-[#9dbbae] rounded text-white mb-5 mt-1 p-1"
          />
          <label htmlFor="name">Password</label>
          <input
            type="text"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="bg-[#9dbbae] rounded text-white mb-5 mt-1 p-1"
          />
          <button type="submit" className="text-xl mb-6">
            {isLoading ? "Granting access" : "Login"}
          </button>
        </form>

        <span className="m-1 text-red-600">{errMsg}</span>

        <Link to="/">
          <p>
            Don't have an account?{" "}
            <span className="text-[#9dbbae]">Register</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
