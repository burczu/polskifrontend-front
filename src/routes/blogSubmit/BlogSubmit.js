import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './BlogSubmit.styl';
import { connect } from 'react-redux';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';
import SubmitForm from './parts/SubmitForm';
import Message from '../../components/Indicators/Message';
import HeaderSettings from '../../components/Layout/HeaderSettings';

class BlogSubmit extends React.Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
    publicActions: PropTypes.object.isRequired,
    submitState: PropTypes.object.isRequired
  };

  onUrlChange(event) {
    const { publicActions: { submitUrlChanged } } = this.props;
    submitUrlChanged(event.target.value || '');
  }

  onEmailChange(event) {
    const { publicActions: { submitEmailChanged } } = this.props;
    submitEmailChanged(event.target.value || '');
  }

  onCapchaChange(value) {
    const { publicActions: { submitCaptchaChanged } } = this.props;
    submitCaptchaChanged(value);
  }

  onBlogSubmit(event) {
    event.preventDefault();

    const { publicActions: {
      submitBlogRequestSend
    }, submitState } = this.props;

    if (submitState.urlValid && (submitState.emailValid || submitState.emailDirty === false) && submitState.captcha !== null) {
      submitBlogRequestSend(submitState.url, submitState.email);
    }
  }

  onSubmitAgain(event) {
    event.preventDefault();

    const { publicActions: { submitStateReset } } = this.props;
    submitStateReset();
  }

  onGoBackClick() {
    const { publicActions: { submitStateReset } } = this.props;
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BlogSubmit));
