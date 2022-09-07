/*
  https://dev.to/ansonh/simplest-way-to-install-babel-plugins-in-create-react-app-7i5
*/
import { useBabelRc, override } from "customize-cra";
export default override(useBabelRc());
