// import { use } from "react";
import { userService  } from "../../services/user.service.js";
import {store, SET_USER} from "../store.js"

export function login(credentials){
    return userService.login(credentials)
    .then(user => {
        store.dispatch({ type: SET_USER, user })
    })
    .catch(err => {
        console.log('user actions -> Cannot login', err)
        throw err
    })
}

export function signup(credentials){
    return userService.signup(credentials)
    .then(user => {
        store.dispatch({ type: SET_USER, user })
    })
    .catch(err => {
        console.log('user actions -> Cannot signup', err)
        throw err
    })
}

export function logout(){
    return userService.logout()
    .then(user => {
        store.dispatch({ type: SET_USER, user })
    })
    .catch(err => {
        console.log('user actions -> Cannot logout', err)
        throw err
    })
}

export function changeBalance(diff){
    return userService.updateBalance(diff)
    .then(user => {
        store.dispatch({ type: SET_USER, user })
        return user.balance
    })
    .catch(err => {
        console.error('Cannot change balance:', err)
        throw err
    })
}

export function updatePrefs(user) {
    return userService.updatePref(user)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            return user.pref
        })
        .catch(err => {
            console.error('Cannot change balance:', err)
            throw err
        })
}

