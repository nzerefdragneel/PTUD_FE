import React, { useEffect } from 'react'
import { withRouter } from '../common/with-router'

import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid'

function Lading() {

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search)
        const accessToken = queryParameters.get("accessToken")

        if (accessToken != null) {
            const decodedJwt = parseJwt(accessToken);
            if (decodedJwt != null) {
                decodedJwt.user.exp = decodedJwt.exp;
                decodedJwt.user.iat = decodedJwt.iat;
                decodedJwt.user.accessToken = accessToken;
                localStorage.setItem("user", JSON.stringify(decodedJwt.user));
                window.location.replace(`${process.env.REACT_APP_URL}/home`); ///home
                // // window.location.reload();

            }

        }
    }, [])

    return (
        <div className="">
            <div className='flex flex-col items-start gap-2 px-2 py-2 my-5 mr-5 -ml-36'>
                <h1>TRANG CHỦ-CHƯA Login</h1>
            </div>


        </div>
    )
}

export default withRouter(Lading)