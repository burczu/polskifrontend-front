import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Login.styl';
import LoginForm from './parts/LoginForm';
import { connect } from 'react-redux';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';
import Message from '../../components/Indicators/Message';
import HeaderSettings from '../../components/Layout/HeaderSettings';

class Login extends React.Component {
  static propTypes = {
    context: PropTypes.object,
    loginState: PropTypes.object.isRequired,
    publicActions: PropTypes.object.isRequired
  };

  onUserChange(event) {
    event.preventDefault();

    const { publicActions: { loginUserChange } } = this.props;
    loginUserChange(event.target.value);
  }

  onPasswordChange(event) {
    event.preventDefault();

    const { publicActions: { loginPasswordChange } } = this.props;
    loginPasswordChange(event.target.value);
  }

  onLoginClick(event) {
    event.preventDefault();

    const { publicActions: { loginInvoke }, loginState: { userName, password } } = this.props;
    if (userName !== '' && password !== '') {
      loginInvoke(userName, password);
    }
  }

  componentDidUpdate() {
    // TODO: redirect to restricted area here (or other way?)
  }

  render() {
    const { loginState: { buttonDisabled, loginError } } = this.props;
    const { context } = this.props;
    const errorMessage = loginError ? 'Logowanie nie udane - spóbuj ponownie' : '';

    const title = 'Zaloguj | Polski Front-End';
    const description = 'Strona logowania do panelu administracyjnego serwisu Polski Front-End';

    return (
      <div className={style.container}>
        <HeaderSettings description={description} title={title} currentPath={context.path} />
        <LoginForm onUserChange={this.onUserChange.bind(this)}
                   onPasswordChange={this.onPasswordChange.bind(this)}
                   onLoginClick={this.onLoginClick.bind(this)}
                   buttonDisabled={buttonDisabled}
        />
        <Message type="alert" message={errorMessage} isVisible={loginError}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Login));
