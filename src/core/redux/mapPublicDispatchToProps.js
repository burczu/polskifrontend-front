import _ from 'lodash';
import { bindActionCreators } from 'redux';
import actions from '../../actions/actions';

export default function mapPublicDispatchToProps(dispatch) {
  const publicMerged = _.merge(...actions.publicActions);

  const publicCreators = _.pickBy(publicMerged, value => typeof value === 'function');

  return {
    actions: bindActionCreators(publicCreators, dispatch),
    dispatch
  };
}
