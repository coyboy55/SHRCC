import React, { useState, useEffect } from 'react';
import SessionContext from './SessionContext';
import { setCookie, getCookie, removeCookie } from '../../cookie';
import { toast } from 'react-toastify';

export default function SessionProvider({ children }) {

    const [session, setValue] = useState({
        user: {
            token: getCookie('token')
        }
    });

    useEffect(() => {
        function initializeSession() {
            let id = getCookie('id');
            let token = getCookie('token');
            if (token) fetch(`http://localhost:8080/admin/${id}`, {
                headers: {
                    'token': token
                }
            }).then(res => res.json()).then(res => {
                let user = { ...res.data, token };
                updateSession({ user });
            });
        }
        initializeSession();
    }, []);

    function updateSession(nextSession) {
        let value = typeof nextSession === "function" ?
            nextSession : prevSession => ({ ...prevSession, ...nextSession });
        setValue(value);
    }

    async function login({ username, password }) {

        // try to login
        let { error, id=4, token } = await fetch('http://localhost:8080/login', {
            method: "post",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        }).then(res => res.json());

        // return from the function if you have an error
        if (error || !token) return toast.error(error);

        // get the data of the loggedin user
        let result = await fetch(`http://localhost:8080/admin/${id}`, {
            headers: {
                'token': token
            }
        }).then(res => res.json());
        let user = { ...result, token };
        setCookie('id', id,30);
        setCookie('token', token,30);
        updateSession({ user });
        toast.success(`Welcome ${user[0].username}!`);
    }

    async function  logout() {
        let id=getCookie('id');
        let token=getCookie('token')
        let body=null;
         body = new URLSearchParams();

        body.append('token',token);
        body.append('id',id);

        await fetch(`http://localhost:8080/logout`, {
            
            method: "post",
            body,
             headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
             }
         })
        updateSession({ user: { token: null } });
        removeCookie('id');
        removeCookie('token');
    }

    const context = {
        session,
        actions: {
            login,
            logout,
            updateSession
        }
    }

    return (
        <SessionContext.Provider value={context}>
            {children}
        </SessionContext.Provider>
    )
}