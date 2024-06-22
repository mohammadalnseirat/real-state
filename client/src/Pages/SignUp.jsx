import React from "react";
import {Link} from 'react-router-dom'

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-4xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username..."
          id="username"
          className="p-3 border rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="p-3 border rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="p-3 border rounded-lg"
        />
        <button className="bg-slate-600 text-lg font-semibold text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-75">
          sign up
        </button>
      </form>
      <div className="flex items-center gap-4 mt-5">
        <span>Already Have An Account?</span>
        <Link to={'/sign-in'} className="text-blue-600 underline font-semibold">
        Sign In</Link>
      </div>
    </div>
  );
};

export default SignUp;
