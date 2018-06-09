import React from "react";
import NavigationContext from "./NavigationContext";
import Snackbar from "react-native-snackbar";
import { strings } from "../config";

class CallSnackBar extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.checkmate !== prevProps.checkmate && this.props.checkmate) {
      Snackbar.show({
        title: strings.gameOver[this.props.lang],
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          title: strings.takeLook[this.props.lang],
          color: "green",
          onPress: () => {
            this.props.navigate("Play");
          }
        }
      });
    }
  }

  render() {
    return null;
  }
}

const CheckmateSnackBar = (props) => (
  <NavigationContext.Consumer>
    {data => (
      <CallSnackBar
        navigate={props.navigate}
        checkmate={data.checkmate}
        lang={data.lang}
      />
    )}
  </NavigationContext.Consumer>
);

export default CheckmateSnackBar;
