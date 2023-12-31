import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthService from './services/auth.service';
import userService from './services/user.service';
import AuthVerify from './common/authVerify';
import { Routes, BrowserRouter, Navigate, Route, Link } from 'react-router-dom';
import { SidesMenu } from './components/sidebar.component';
import LoginScreen from './screen/loginScreen';
import XemGoiBaoHiemScreen from './screen/xemGoiBaoHiemScreen';
import DongPhiScreen from './screen/dongPhiScreen';
import CongTyScreen from './screen/congTyScreen';
import Home from './components/home.component';
import Lading from './components/lading.component';
import Signup from './components/signup.component';
import EditUser from './components/edituser.component';
import Profile from './components/profile.component';
// import ChiTietGoiBaoHiem from './components/chiTietGoiBaoHiem.component';
import SimpleFooter from './components/footer.component';
import ChiTietDongPhi from './components/chiTietDongPhi.component';
import Bus from './common/bus';
import SignupScreen from './screen/signupScreen';
import Register_Insurance from './components/register.component';
import User_Profile from './components/user_profile.component';
import EditAccount from './components/editAccount.component';
import Health_Declaration from './components/health_declaration.component';

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: undefined,
            roles: '',
            token: '',
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user !== null) {
            const roles = user.taiKhoan.loaiTaiKhoan;
            const token = user.accessToken;

            this.setState({
                currentUser: user,
                roles: roles,
                token: token,
            });
        }
        alert(user.taiKhoan.loaiTaiKhoan);
        alert(user.accessToken);

        Bus.on('logout', () => {
            this.logOut();
        });
    }

    componentWillUnmount() {
        Bus.remove('logout');
    }

    logOut() {
        AuthService.logout();
        this.setState({
            currentUser: undefined,
            roles: '',
            token: '',
        });
    }

    render() {
        const currentUser = this.state.currentUser;
        const curentRole = this.state.roles;

        return (
            <div className="">
                {/* headers */}
                <div className="pt-3 pb-4 px-32 flex flex-row  justify-between border-b mb-2 bg-black">
                    <div className="flex flex-row flex-wrap text-lg  items-center">
                        <a href="/" className="nav-link">
                            <img src="./assets/logo_0.png" className="h-16 w-auto mr-2" alt="logo" />
                        </a>
                    </div>

                    {currentUser ? (
                        // Header sau khi đăng nhập

                        <div className="flex flex-row gap-2 text-lg">
                            <a href="/" className="nav-link">
                                <div className=" rounded-lg hover:bg-pink-400 hover:cursor-pointer hover:ease-linear duration-300">
                                    Trang chủ
                                </div>
                            </a>
                            <a href="/user_profile" className="nav-link">
                                <div className=" rounded-lg hover:bg-pink-400 hover:cursor-pointer hover:ease-linear duration-300">
                                    Hồ sơ cá nhân
                                </div>
                            </a>

                            {
                                <a href="/xemGoiBaoHiem" className="nav-link">
                                    <div className=" rounded-lg hover:bg-pink-400 hover:cursor-pointer hover:ease-linear duration-300">
                                        Danh mục sản phẩm
                                    </div>
                                </a> /*
              <a href="/status_user" className="nav-link">
                <div className="px-6 py-2.5 rounded-lg hover:bg-pink-400 hover:cursor-pointer hover:ease-linear duration-300">
                  Tình trạng đăng ký 
                </div>
              </a> */
                            }
                            <a href="/login" className="nav-link" onClick={this.logOut}>
                                <div
                                    className=" rounded-lg hover:bg-pink-400
                 hover:cursor-pointer hover:ease-linear duration-300"
                                >
                                    Đăng xuất
                                </div>
                            </a>
                        </div>
                    ) : (
                        <div className="flex flex-row gap-2 text-lg">
                            <a href="/" className="nav-link">
                                <div className=" rounded-lg hover:bg-pink-400 hover:cursor-pointer hover:ease-linear duration-300">
                                    Trang chủ
                                </div>
                            </a>
                            <a href="/xemGoiBaoHiem" className="nav-link">
                                <div className=" rounded-lg hover:bg-pink-400 hover:cursor-pointer hover:ease-linear duration-300">
                                    Danh mục sản phẩm
                                </div>
                            </a>
                            <Link to={'/signup'} className="nav-link">
                                <div
                                    className=" rounded-lg hover:bg-pink-400
                 hover:cursor-pointer hover:ease-linear duration-300"
                                >
                                    Đăng ký
                                </div>
                            </Link>
                            <Link to={'/login'} className="nav-link">
                                <div className=" rounded-lg hover:bg-pink-400  hover:cursor-pointer hover:ease-linear duration-300">
                                    Đăng nhập
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
                {/* {role==""? ( */}
                <div className="min-h-screen flex">
                    <div
                        className="flex-none w-64 
          "
                    >
                        {currentUser && <SidesMenu />}
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 p-4">
                            <Routes>
                                <Route path="/login" element={<LoginScreen />} />
                                <Route path="/signup" element={<SignupScreen />} />
                                <Route path="/xemGoiBaoHiem" element={<XemGoiBaoHiemScreen />} />
                                <Route path="/congTy" element={<CongTyScreen />} />
                                <Route path="/dongPhi" element={<DongPhiScreen idUser={1} />} />
                                <Route path="/chiTietDongPhi" element={<ChiTietDongPhi />} />
                                {/* <Route path="/chi-tiet-goi-bao-hiem/:id" element={<ChiTietGoiBaoHiem />} /> */}
                                <Route
                                    exact
                                    path="/"
                                    element={currentUser ? <Navigate replace to="/home" /> : <Lading />}
                                />
                                <Route path="/home" element={<Home />} />
                                <Route
                                    path="/edituser"
                                    element={currentUser ? <EditUser /> : <Navigate replace to="/" />}
                                />
                                {/* <Route path="/profile" element={<Profile />} /> */}{' '}
                                <Route path="/register" element={<Register_Insurance />} />
                                <Route path="/user_profile" element={<User_Profile />} />
                                <Route path="/edituser" element={<EditUser />} />
                                <Route path="/editAccount" element={<EditAccount />} />
                                <Route path="/healthDeclaration" element={<Health_Declaration />} />
                            </Routes>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 flex flex-col h-48 w-full">
                    <SimpleFooter></SimpleFooter>
                </div>
                <AuthVerify logOut={this.logOut} />
            </div>
        );
    }
}

export default App;
