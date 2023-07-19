import classNames from 'classnames';
import { string, bool } from 'prop-types';

const namespace = 'skeleton';

const Skeleton = ({
  type,
  width,
  height,
  animated,
  className,
}) => {
  const skeletonClasses = classNames(namespace, className, {
    [`${namespace}--${type}`]: type,
    [`${namespace}--animated`]: animated,
  });
  return (
    <div
      style={{ width, height }}
      className={skeletonClasses}
    />
  );
};

Skeleton.propTypes = {
  type: string,
  width: string,
  height: string,
  animated: bool,
  className: string,
};

Skeleton.defaultProps = {
  type: null,
  width: '100%',
  height: '14px',
  animated: true,
  className: '',
};

export default Skeleton;
