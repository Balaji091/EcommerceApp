import {Component} from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg:' ',
    showSubmitError:false,
  }
  onSubmitFailure=errorMsg=>{
    this.setState({showSubmitError:true,errorMsg})
  }
  onSubmitSuccess=jwtToken=>{
    const{navigate}=this.props;
    Cookies.set('jwt_token', jwtToken, {
      expires: 7, // Days until expiry
      path: '/',
      secure: false, // Set to true in production with HTTPS
      sameSite: 'Lax', // Adjust based on your CORS setup
    });
    localStorage.setItem('jwt_token', jwtToken);

                                                            
    navigate('/');

  }
  onValidation=async(event)=>{
            event.preventDefault();
            const{username,password}=this.state;
            const userDetails={username,password}
            const url="https://apis.ccbp.in/login";
            const options={
                method:'POST',
                body:JSON.stringify(userDetails),
            }
            const response=await fetch(url,options);
            const data=await response.json();
            if(response.ok===true)
            {
                this.onSubmitSuccess(data.jwt_token)
            }
            else
            {
                this.onSubmitFailure(data.error_msg);
            }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const{errorMsg,showSubmitError}=this.state
    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.onValidation}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className='error-message'>*{errorMsg}</p>}
        </form>
      </div> 
    )
  }
}
function WrapperComponent(){
    const navigate=useNavigate();
    return<LoginForm navigate={navigate}/>
}

export default WrapperComponent;
