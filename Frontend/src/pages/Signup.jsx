import React, { useState } from 'react';
import { userSignup } from '../apiCalls/user';
import { toast } from 'react-hot-toast';
import { Link,useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
      name: '',
      email: '',
      password: '',
      country: ''
  })


  const handleSubmit = async(e) => {
      e.preventDefault()
      console.log(data)
      let response = null;
      try {
          response = await userSignup(data)
          if(response.success)
          {
              toast.success(response.message)
              navigate('/login')
          }
          else
          {
              toast.error(response.message)
          }

      } catch (error) {
          toast.error(response.message)
      }
  }
return (
  <div className="container">
      <div className="container-back-img"></div>
      <div className="container-back-color"></div>
      <div className="card">
          <div className="card_title">
              <h1>Create Account</h1>
          </div>
          <div className="form">
              <form onSubmit={handleSubmit}>
                 
                <input type="text" value={data.name}
                onChange={(e)=> setData({...data, name:e.target.value})}
                placeholder="Name" />
                      
                  <input type="email" 
                  value={data.email}
                  onChange={(e)=> setData({...data, email:e.target.value})} 
                  placeholder="Email" />
                  
                  <input type="password" 
                  value={data.password}
                  onChange={(e)=> setData({...data, password:e.target.value})}
                  placeholder="Password" />
                  
                  <input type="text"  value={data.country}
                   onChange={(e)=> setData({...data, country:e.target.value})}
                   placeholder="Country" />
                  <button>Sign Up</button>
                  
              </form>
          </div>
          <div className="card_terms">
              <span>Already have an account?
                  <Link to='/login'>Login Here</Link>
              </span>
          </div>
      </div>
  </div>
)
}

export default Signup