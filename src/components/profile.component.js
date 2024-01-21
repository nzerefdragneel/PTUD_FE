import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";
import UserService from "../services/user.service";
import authService from "../services/auth.service";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  List,
  Button,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  IconButton,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { SimpleNavbar } from "./simplenavbar.component";

export default class Profile extends Component {
  render() {
    // const user = localStorage.getItem('user');
    // alert(user.taiKhoan.loaiTaiKhoan);
    const user = authService.getCurrentUser();
    alert(user.taiKhoan.loaiTaiKhoan);
    if (user == null) {
      return <Navigate replace to="/" />;
    }
    return (
      <>
        <div className=" ">
          <div className="grid place-items-center items-center place-content-centers content-center gap-4">
            <Link to={"/edituser"} className=" text-gray-900 hover:none">
              <button className="rounded-md text-gray-900 px-3 py-2 text-sm font-semibold shadow-sm bg-green-600 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
