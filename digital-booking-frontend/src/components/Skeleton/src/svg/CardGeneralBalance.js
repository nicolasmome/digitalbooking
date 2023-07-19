/* eslint-disable max-len */
const React = require('react');
const { node, string } = require('prop-types');

const CardGeneralBalance = ({ width, height, children }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 1200 171"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_2049_53908)">
      <rect
        x="2"
        y="1.17676"
        width="1196"
        height="166"
        rx="5.98"
        fill="white"
      />
    </g>
    <path
      d="M2 124.212H1198V161.197C1198 164.5 1195.32 167.177 1192.02 167.177H7.97999C4.67733 167.177 2 164.5 2 161.197V124.212Z"
      fill="#F5F5F5"
    />
    <rect
      x="33.8933"
      y="28.5178"
      width="124.583"
      height="13.6706"
      rx="1.99333"
      fill="url(#linear_garadient)"
    />
    <rect
      x="33.8933"
      y="138.859"
      width="564.113"
      height="13.6706"
      rx="1.99333"
      fill="url(#linear_garadient)"
    />
    <rect
      x="33.8933"
      y="83.2002"
      width="62.79"
      height="13.6706"
      rx="1.99333"
      fill="url(#linear_garadient)"
    />
    <rect
      x="33.8933"
      y="51.9531"
      width="136.543"
      height="22.4588"
      rx="1.99333"
      fill="url(#linear_garadient)"
    />
    <ellipse
      cx="521.263"
      cy="49.9993"
      rx="3.98667"
      ry="3.90508"
      fill="url(#linear_garadient)"
    />
    <ellipse
      cx="738.537"
      cy="49.9993"
      rx="3.98667"
      ry="3.90508"
      fill="url(#linear_garadient)"
    />
    <ellipse
      cx="950.827"
      cy="49.9993"
      rx="3.98667"
      ry="3.90508"
      fill="url(#linear_garadient)"
    />
    <ellipse
      cx="414.62"
      cy="62.6944"
      rx="38.87"
      ry="38.0824"
      fill="url(#linear_garadient)"
    />
    <mask
      id="mask0_2049_53908"
      style={{ 'mask-type': 'luminance' }}
      maskUnits="userSpaceOnUse"
      x="375"
      y="24"
      width="79"
      height="77"
    >
      <ellipse cx="414.62" cy="62.6944" rx="38.87" ry="38.0824" fill="white" />
    </mask>
    <g mask="url(#mask0_2049_53908)">
      <rect
        x="375.75"
        y="24.6121"
        width="77.74"
        height="76.1647"
        fill="url(#linear_garadient)"
      />
    </g>
    <ellipse cx="414.62" cy="62.6943" rx="23.92" ry="23.4353" fill="white" />
    <rect
      x="533.223"
      y="43.1648"
      width="86.71"
      height="13.6706"
      rx="1.99333"
      fill="url(#linear_garadient)"
    />
    <rect
      x="750.497"
      y="43.1648"
      width="83.72"
      height="13.6706"
      rx="1.99333"
      fill="url(#linear_garadient)"
    />
    <rect
      x="962.787"
      y="43.1648"
      width="75.7467"
      height="13.6706"
      rx="1.99333"
      fill="url(#linear_garadient)"
    />
    <rect
      x="533.223"
      y="66.6003"
      width="96.6767"
      height="13.6706"
      rx="1.99333"
      fill="url(#linear_garadient)"
    />
    <rect
      x="750.497"
      y="66.6003"
      width="96.6767"
      height="13.6706"
      rx="1.99333"
      fill="url(#linear_garadient)"
    />
    <rect
      x="962.787"
      y="66.6003"
      width="96.6767"
      height="13.6706"
      rx="1.99333"
      fill="url(#linear_garadient)"
    />
    <defs>
      <filter
        id="filter0_d_2049_53908"
        x="0.00666678"
        y="0.180091"
        width="1199.99"
        height="169.987"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="0.996667" />
        <feGaussianBlur stdDeviation="0.996667" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2049_53908"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2049_53908"
          result="shape"
        />
      </filter>
      {children}
    </defs>
  </svg>
);

CardGeneralBalance.propTypes = {
  width: string,
  height: string,
  children: node.isRequired,
};

CardGeneralBalance.defaultProps = {
  width: '100%',
  height: '172',
};

module.exports = CardGeneralBalance;
