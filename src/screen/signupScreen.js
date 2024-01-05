import React, { Component } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { withRouter } from "../common/with-router";

import SignupComponent from "../components/signup.component";

class SignupScreen extends Component {
  render() {
    return (
      <div className="grid grid-cols-12 gap-2 justify-items-center content-around place-items-center mt-3 -ml-2">
        <div className="col-span-12 flex items-center justify-center ">
          <Card className="py-12 px-5 w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto flex items-center justify-center shadow-lg rounded">
            <Typography
              variant="h2"
              color="black"
              className="text-4xl font-bold text-center  mb-2"
            >
              Đăng ký tài khoản
            </Typography>
            <Typography className="text-base text-zinc-950 mb-6">
              Để có trải nghiệm đầy đủ và tốt nhất, hãy đăng nhập với tư cách
              thành viên của Vietnam Health Insurance
            </Typography>
            <SignupComponent />
          </Card>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupScreen);
