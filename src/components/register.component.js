import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
    Card,
    CardBody,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";

export function SimpleCard() {
    return (
        <Card className="mt-6 w-96 h-auto">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    UI/UX Review Check
                </Typography>
                <Typography>
                    The place is close to Barceloneta Beach and bus stop just 2 min by
                    walk and near to &quot;Naviglio&quot; where you can enjoy the main
                    night life in Barcelona.
                </Typography>
            </CardBody>
        </Card>
    );
}


const Register_Insurance = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user == null) {
        return <Navigate replace to="/" />;
    }

    return (
        <>
            <div className=" ">
                    ĐĂNG KÝ BẢO HIỂM
            </div>
            <div className=" flex items-center justify-end gap-x-6">
            <Link to={"/healthDeclaration"} className=" text-gray-900 hover:none">
                  <button  className="rounded-md bg-indigo-600 px-3 py-2 my-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Điền tờ khai sức khoẻ 
                  </button>
                </Link>
              </div>
        </>
    );
};
export default Register_Insurance;
