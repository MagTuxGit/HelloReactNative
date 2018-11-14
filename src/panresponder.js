const React = require("react");
const ReactNative = require("react-native");
const { PanResponder, StyleSheet, View } = ReactNative;

import type { PanResponderInstance, GestureState } from "PanResponder";
import type { PressEvent } from "CoreEventTypes";

const CIRCLE_SIZE = 80;

class PanResponderExample extends React.Component {
  static title = "PanResponder Sample";
  static description =
    "Shows the Use of PanResponder to provide basic gesture handling";

  _handleStartShouldSetPanResponder = (event, gestureState) => {
    // Should we become active when the user presses down on the circle?
    return true;
  };

  _handleMoveShouldSetPanResponder = (event, gestureState) => {
    // Should we become active when the user moves a touch over the circle?
    return true;
  };

  _handlePanResponderGrant = (event, gestureState) => {
    //this._highlight();

    this.touchLocation = {
      x: event.nativeEvent.locationX,
      y: event.nativeEvent.locationY
    };
    this.tapTimeOut = false;
    this.singleTapTimer = setTimeout(() => {
      this.tapTimeOut = true;
      this.singleTapTimer = null;
    }, 100);
  };

  _handlePanResponderMove = (event, gestureState) => {
    this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    this._circleStyles.style.top = this._previousTop + gestureState.dy;
    this._updateNativeStyles();
  };

  _handlePanResponderEnd = (event, gestureState) => {
    //this._unHighlight();

    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;

    if (!this.tapTimeOut) {
      if (
        Math.abs(event.nativeEvent.locationX - this.touchLocation.x) < 10 &&
        Math.abs(event.nativeEvent.locationY - this.touchLocation.y) < 10
      ) {
        this.onSingleTap(this.touchLocation);
      }
    }
    this.release(event);
  };

  release() {
    if (this.singleTapTimer) {
      clearTimeout(this.singleTapTimer);
      this.singleTapTimer = null;
    }
  }

  onSingleTap() {
    this._changeColor();
  }

  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
    onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
    onPanResponderGrant: this._handlePanResponderGrant,
    onPanResponderMove: this._handlePanResponderMove,
    onPanResponderRelease: this._handlePanResponderEnd,
    onPanResponderTerminate: this._handlePanResponderEnd
  });

  _previousLeft = 0;
  _previousTop = 0;
  _circleStyles = { style: {} };
  circle = null;

  UNSAFE_componentWillMount() {
    this._previousLeft = 20;
    this._previousTop = 84;
    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop,
        backgroundColor: "green"
      }
    };
  }

  componentDidMount() {
    this._updateNativeStyles();
  }

  _changeColor() {
    if (this._circleStyles.style.backgroundColor == "rgb(0, 0, 255)") {
      this._circleStyles.style.backgroundColor = "green";
    } else {
      this._circleStyles.style.backgroundColor = "rgb(0, 0, 255)";
    }
    this._updateNativeStyles();
  }

  _highlight() {
    this._circleStyles.style.backgroundColor = "blue";
    this._updateNativeStyles();
  }

  _unHighlight() {
    this._circleStyles.style.backgroundColor = "green";
    this._updateNativeStyles();
  }

  _updateNativeStyles() {
    this.circle && this.circle.setNativeProps(this._circleStyles);
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          ref={circle => {
            this.circle = circle;
          }}
          style={styles.circle}
          {...this._panResponder.panHandlers}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: "absolute",
    left: 0,
    top: 0
  },
  container: {
    flex: 1,
    paddingTop: 64
  }
});

module.exports = PanResponderExample;
