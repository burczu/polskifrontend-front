import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ResponsivePanelHeader.styl';
import ReactImageFallback from 'react-image-fallback';
import noImage from '../../../public/no_image.png';

export const ResponsivePanelHeader = (props) => {
  let image = props.showImage && props.image ? (
    <ReactImageFallback alt={`${props.header} - ikona`}
                        className={styles.favicon}
                        src={props.image}
                        fallbackImage={noImage}
                        initialImage={noImage} />
  ) : null;

  if (props.href && props.href !== '') {
    image = (
      <a className={styles.link} target="_blank" href={props.href} rel="nofollow">
        {image}
      </a>
    );
  }

  return (
    <div>
      {image}
      {props.header}
    </div>
  );
};

ResponsivePanelHeader.propTypes = {
  header: PropTypes.string.isRequired,
  href: PropTypes.string,
  image: PropTypes.string,
  showImage: PropTypes.bool
};

export default withStyles(styles)(ResponsivePanelHeader);
