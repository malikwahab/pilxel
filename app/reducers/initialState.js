const initialState = {
    loginShow: false,
    signUpShow: false,
    LandingButtonShow: true,
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
}

export default initialState;
