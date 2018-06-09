import React from "react";
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

export default CallSnackBar;
