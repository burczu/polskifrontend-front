import _ from 'lodash';
import { bindActionCreators } from 'redux';
import actions from '../../actions/actions';

export default function mapDispatchToProps(dispatch) {
  const publicMerged = _.merge(...actions.publicActions);
  const restrictedMerged = _.merge(...actions.restrictedActions);

  const publicCreators = _.pickBy(publicMerged, value => typeof value === 'function');
  const restrictedCreators = _.pickBy(restrictedMerged, value => typeof value === 'function');

  return {
    publicActions: bindActionCreators(publicCreators, dispatch),
    restrictedActions: bindActionCreators(restrictedCreators, dispatch),
    dispatch
  };
}
