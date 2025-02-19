import Svg, { Path } from 'react-native-svg';
import { moderateScale } from 'react-native-size-matters';

import type { SvgProps } from 'react-native-svg';

export default (props: SvgProps) => (
  <Svg
    width={moderateScale(12)}
    height={moderateScale(20)}
    viewBox="0 0 12 20"
    fill="none"
    {...props}>
    <Path
      d="M.61 10.007c.006-.194.045-.37.117-.531.072-.16.182-.316.332-.465L9.376.959c.238-.238.531-.357.88-.357.232 0 .443.055.63.166.194.11.347.26.457.448a1.242 1.242 0 01-.216 1.536l-7.52 7.247 7.52 7.254c.26.266.39.568.39.905 0 .238-.057.451-.174.64-.11.188-.263.337-.456.448a1.176 1.176 0 01-.631.174c-.349 0-.642-.122-.88-.365l-8.317-8.052a1.514 1.514 0 01-.34-.465 1.322 1.322 0 01-.109-.531z"
      fill="black"
    />
  </Svg>
);
