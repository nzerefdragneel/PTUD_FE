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

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user == null) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <div className=" ">HOME</div>
    </>
  );
};
export default Home;
