import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../apiCalls/user';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate()

  const [data, setData] = useState({
      email: '',
      password: ''
  })

  const handleSubmit = async(e) => {
      e.preventDefault()
      console.log(data)

      let response = null
      try {
          response = await userLogin(data);
          console.log(response.user._id)
          if(response.success)
          {
              toast.success(response.message)
              localStorage.setItem('token',response.token)
              navigate('/')
          }
          else{
              toast.error(response.message)
              navigate('/login')
          }
      } catch (error) {
          toast.error(response.message)
          navigate('/login')
      }

  }
return (
  <div className="container">
  <div className="container-back-img"></div>
  <div className="container-back-color"></div>
  <div className="card">
  <div className="card_title">
      <h1>Login Here</h1>
  </div>
  <div className="form">
  <form onSubmit={handleSubmit}>
      <input type="email" 
       value={data.email}
       onChange={(e)=> setData({...data, email:e.target.value})}
       placeholder="Email"/>
      <input type="password" 
       value={data.password}
       onChange={(e)=> setData({...data, password:e.target.value})}
       placeholder="Password" />
      <button>Login</button>
  </form>
  </div>
  <div className="card_terms"> 
      <span>Don't have an account yet?
          <Link to='/signup'>Signup Here</Link>
      </span>
  </div>
  </div>
</div>
)
}

export default Login