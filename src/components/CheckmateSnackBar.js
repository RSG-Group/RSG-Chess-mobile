import React from "react";
import NavigationContext from "./NavigationContext";
import Snackbar from "react-native-snackbar";

class CallSnackBar extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.checkmate !== prevProps.checkmate && this.props.checkmate) {
      Snackbar.show({
        title: "Your game ended...",
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          title: "TAKE A LOOK",
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
      />
    )}
  </NavigationContext.Consumer>
);

export default CheckmateSnackBar;
