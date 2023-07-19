const React = require('react');
const { node, string } = require('prop-types');

const FilterModal = ({ width, height, children }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 502 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="120" height="14" rx="2" fill="url(#linear_garadient)" />
    <rect
      x="186"
      width="113"
      height="14"
      rx="2"
      fill="url(#linear_garadient)"
    />
    <rect
      x="382"
      width="120"
      height="14"
      rx="2"
      fill="url(#linear_garadient)"
    />
    <defs>{children}</defs>
  </svg>
);

FilterModal.propTypes = {
  width: string,
  height: string,
  children: node.isRequired,
};

FilterModal.defaultProps = {
  width: '502',
  height: '14',
};

module.exports = FilterModal;
