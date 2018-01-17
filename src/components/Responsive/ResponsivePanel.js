import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './ResponsivePanel.styl';
import ResponsiveContainer from './ResponsiveContainer';
import ResponsivePanelHeader from './ResponsivePanelHeader';

export const ResponsivePanel = (props) => {
  return (
    <ResponsiveContainer className={props.className}>
      <div className={style.container}>
        <h2 className={style['container__title']}>
          <ResponsivePanelHeader header={props.header}
                                 showImage={props.showImage}
                                 image={props.image}
                                 href={props.href}
          />
        </h2>
        <div className={style.wrapper}>
          <p className={style['wrapper__description']}>{props.description}</p>
          {props.children}
        </div>
      </div>
    </ResponsiveContainer>
  );
};

ResponsivePanel.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.any,
  description: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  href: PropTypes.string,
  image: PropTypes.string,
  showImage: PropTypes.bool
};

export default withStyles(style)(ResponsivePanel);
