import React, { Component } from "react";
import { Card, Typography } from "@material-tailwind/react";

import { withRouter } from "../common/with-router";
import LoginComponent from "../components/login.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import VerifyEmailComponent from "../components/verifyEmail.component";

class VerifyScreen extends Component {
  render() {
    return <VerifyEmailComponent />;
  }
}

export default withRouter(VerifyScreen);
