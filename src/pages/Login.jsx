import React from "react";

import { BiWallet } from "react-icons/bi";
import { useIdentityKit } from "@nfid/identitykit/react";

const Login = () => {
  const { connect } = useIdentityKit();

  return (
    <div className="flex justify-center items-center">
      <div className="flex text-black font-semibold justify-center items-center gap-1 text-lg border border-red-300 bg-yellow-200 p-1 rounded-md cursor-pointer">
        <BiWallet />
        <button onClick={() => connect()}>Login</button>
      </div>
    </div>
  );
};

export default Login;
