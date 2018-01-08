import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './BlogSubmit.styl';
import { connect } from 'react-redux';
import mapPublicStateToProps from '../../core/redux/mapPublicStateToProps';
import mapPublicDispatchToProps from '../../core/redux/mapPublicDispatchToProps';
import SubmitForm from './parts/SubmitForm';
import Message from '../../components/Indicators/Message';
import HeaderSettings from '../../components/Layout/HeaderSettings';

class BlogSubmit extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    submitState: PropTypes.object.isRequired
  };

  onUrlChange(event) {
    const { actions: { submitUrlChanged } } = this.props;
    submitUrlChanged(event.target.value || '');
  }

  onEmailChange(event) {
    const { actions: { submitEmailChanged } } = this.props;
    submitEmailChanged(event.target.value || '');
  }

  onCapchaChange(value) {
    const { actions: { submitCaptchaChanged } } = this.props;
    submitCaptchaChanged(value);
  }

  onBlogSubmit(event) {
    event.preventDefault();

    const { actions: {
      submitBlogRequestSend
    }, submitState } = this.props;

    if (submitState.urlValid && (submitState.emailValid || submitState.emailDirty === false) && submitState.captcha !== null) {
      submitBlogRequestSend(submitState.url, submitState.email);
    }
  }

  onSubmitAgain(event) {
    event.preventDefault();

    const { actions: { submitStateReset } } = this.props;
    submitStateReset();
  }

  onGoBackClick() {
    const { actions: { submitStateReset } } = this.props;
    submitStateReset();
  }

  render() {
    const { submitState, context } = this.props;
    const title = 'Zgłoś serwis | Polski Front-End';
    const description = 'Jeśli znasz polski serwis, stronę lub blog o front-endzie - zgłoś go tutaj!';

    return (
      <div className={styles.container}>
        <HeaderSettings description={description} title={title} currentPath={context.path} />
        <SubmitForm onUrlChange={this.onUrlChange.bind(this)}
                    onEmailChange={this.onEmailChange.bind(this)}
                    onCaptchaChange={this.onCapchaChange.bind(this)}
                    onSubmit={this.onBlogSubmit.bind(this)}
                    onSubmitAgain={this.onSubmitAgain.bind(this)}
                    onGoBackClick={this.onGoBackClick.bind(this)}
                    captcha={submitState.captcha}
                    urlValid={submitState.urlValid}
                    urlDirty={submitState.urlDirty}
                    emailValid={submitState.emailValid}
                    emailDirty={submitState.emailDirty}
                    isSending={submitState.sending}
                    sent={submitState.sent}
                    shouldCleanUp={submitState.shouldCleanUp}
        />
        <Message type="alert" message="Próba wysłania zgłoszenia nie udana. Spróbuj ponownie!" isVisible={submitState.sendError} />
      </div>
    );
  }
}

export default connect(mapPublicStateToProps, mapPublicDispatchToProps)(withStyles(styles)(BlogSubmit));
