// import React, { Component } from 'react'
import { useNavigate  } from 'react-router-dom';
export default function widthRouter(Component) {
    function ComponentWithRouterProp(props) {
        let navigate = useNavigate()
        return (
            <Component {...props} navigate={navigate} ></Component>
        )
    }
    return ComponentWithRouterProp
}