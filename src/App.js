import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthService from './services/auth.service';
import userService from './services/user.service';
import AuthVerify from './common/authVerify';
import { Routes, BrowserRouter, Navigate, Route, Link } from 'react-router-dom';
import { SidesMenu } from './components/sidebar.component';
import LoginScreen from './screen/loginScreen';
import XemGoiBaoHiem from './screen/xemGoiBaoHiem';
import Home from './components/home.component';
import Lading from './components/lading.component';
import Signup from './components/signup.component';
import GoiBaoHiem from './components/item.component';

import EditUser from './components/edituser.component';
import Profile from './components/profile.component';
import SimpleFooter from './components/footer.component';
import Bus from './common/bus';
class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: undefined,
            roles: '',
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user !== null) {
            const roles = userService.getRoles(user.id);
            this.setState({
                currentUser: user,
                roles: roles,
            });
        }

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
        });
    }

    render() {
        const currentUser = this.state.currentUser;
        const roles = this.state.roles;

        return (
            <div className="">
                <div className="pt-3 pb-4 px-32 flex flex-row flex-wrap justify-between border-b mb-2">
                    <div className="flex flex-row flex-wrap text-lg items-center">
                        <img src="./assets/logo.png" className="w-10 h-10 mr-2" alt="logo" />
                        <a href="/" className="nav-link">
                            <div className="px-6 py-2.5 mr-2 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300">
                                Home
                            </div>
                        </a>
                    </div>
                    {currentUser ? (
                        <div className="flex flex-row gap-2 text-lg">
                            <a href="/profile" className="nav-link">
                                <div className="px-6 py-2.5 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300">
                                    Profile
                                </div>
                            </a>
                            <a href="/login" className="nav-link" onClick={this.logOut}>
                                <div className="px-6 py-2.5 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300">
                                    LogOut
                                </div>
                            </a>
                        </div>
                    ) : (
                        <div className="flex flex-row gap-2 text-lg">
                            <Link to={'/xemGoiBaoHiem'} className="nav-link">
                                <div className="px-6 py-2.5 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300">
                                    Sản phẩm
                                </div>
                            </Link>
                            <Link to={'/xemGoiBaoHiem'} className="nav-link">
                                <div className="px-6 py-2.5 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300">
                                    Yêu cầu chi trả bảo hiểm
                                </div>
                            </Link>
                            <Link to={'/xemGoiBaoHiem'} className="nav-link">
                                <div className="px-6 py-2.5 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300">
                                    Đóng phí
                                </div>
                            </Link>
                            <Link to={'/signup'} className="nav-link">
                                <div className="px-6 py-2.5 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300">
                                    Sign up
                                </div>
                            </Link>

                            <Link to={'/login'} className="nav-link">
                                <div className="px-6 py-2.5 rounded-lg hover:bg-medium-green hover:cursor-pointer hover:ease-linear duration-300">
                                    Log in
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
                {/* {!roles ? ( */}
                <div className="min-h-screen flex">
                    <div className="flex-none w-64 h-14">{currentUser && <SidesMenu />}</div>

                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 p-4">
                            <Routes>
                                <Route path="/login" element={<LoginScreen />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/xemGoiBaoHiem" element={<XemGoiBaoHiem />} />
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
                                <Route path="/profile" element={<Profile />} />
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
