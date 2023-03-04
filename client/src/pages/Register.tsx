import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/store";
import { createUser, setLoading, logError } from "../features/userSlice";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { isLoading, errMsg } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading());
    const { name, email, password } = userData;
    try {
      const { data } = await axios.post(import.meta.env.VITE_APP_REGISTER_API, {
        name,
        email,
        password,
      });
      dispatch(createUser({ name: data.user.name }));
      navigate("/login");
    } catch (error: any) {
      dispatch(logError(error));
      console.log(error);
    }
    setUserData({
      ...userData,
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-3">
      <div className="bg-white max-w-lg w-full flex flex-col justify-center items-center p-7 rounded">
        <div className="flex justify-center items-center rounded mb-14 gap-2">
          <div className="bg-[#188FA7] h-10 w-10 flex justify-center items-center rounded">
            <span className="text-white font-bold text-3xl">Q</span>
          </div>
          <span className="font-bold font-0 text-[#188FA7] text-xl">
            Smarty Pants
          </span>
        </div>
        <span className="text-2xl mt-3">Register</span>
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="bg-[#9dbbae] rounded text-white mb-5 mt-1 p-1"
          />
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
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="bg-[#9dbbae] rounded text-white mb-5 mt-1 p-1"
          />
          <button type="submit" className="text-xl mb-2">
            {isLoading ? "Creating new user..." : "Submit"}
          </button>
        </form>
        <span className="m-1 text-red-600">{errMsg}</span>
        <Link to="/login">
          <p>
            Have an account? <span className="text-[#9dbbae]">Login</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Register;
