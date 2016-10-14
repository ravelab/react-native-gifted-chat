var React = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  Animated,
  StyleSheet,
  View,
  TouchableWithoutFeedback
} = ReactNative;
var ANIMATION_END_X = 320;
var Heart = React.createClass({
    render: function() {
        return (
            <View {...this.props} style={[styles.heart, this.props.style]}>
                <View style={[styles.leftHeart, styles.heartShape]} />
                <View style={[styles.rightHeart, styles.heartShape]} />
            </View>
        )
    }
});
var AnimatedHeart = React.createClass({
  getDefaultProps: function() {
    return {
      onComplete: function() {}
    };
  },
  getInitialState: function() {
    return {
      position: new Animated.Value(0)
    };
  },
  componentWillMount: function() {
    this._xAnimation = this.state.position.interpolate({
      inputRange: [0, ANIMATION_END_X],
      outputRange: [ANIMATION_END_X, 0]
    });
    this._opacityAnimation = this._xAnimation.interpolate({
      inputRange: [0, ANIMATION_END_X],
      outputRange: [0, 1]
    });
    this._scaleAnimation = this._xAnimation.interpolate({
      inputRange: [0, 15, 30],
      outputRange: [0, 1.2, 1],
      extrapolate: 'clamp'
    });
    this._yAnimation = this._xAnimation.interpolate({
      inputRange: [0, ANIMATION_END_X/2, ANIMATION_END_X],
      outputRange: [10, 30, 10]
    })
    this._rotateAnimation = this._xAnimation.interpolate({
      inputRange: [0, ANIMATION_END_X/4, ANIMATION_END_X/3, ANIMATION_END_X/2, ANIMATION_END_X],
      outputRange: ['0deg', '-3deg', '0deg', '3deg', '0deg']
    });
  },
  componentDidMount: function() {
    Animated.timing(this.state.position, {
      duration: 3000,
      toValue: ANIMATION_END_X
    }).start(this.props.onComplete);
  },
  getHeartAnimationStyle: function() {
    return {
      transform: [
        {translateX: this.state.position},
        {translateY: this._yAnimation},
        {scale: this._scaleAnimation},
        {rotate: this._rotateAnimation}
      ],
      opacity: this._opacityAnimation
    }
  },
  render: function() {
    return (
        <Animated.View style={[styles.heartWrap, this.getHeartAnimationStyle(), this.props.style]}>
          <Heart />
        </Animated.View>
    )
  }
})
var styles = StyleSheet.create({
  container: {
    width: 300,
    height: 35,
    backgroundColor: 'blue'
  },
  heartWrap: {
      position: 'absolute',
      left: 10,
      backgroundColor: 'transparent'
  },
  heart: {
    width: 17,
    height: 17,
    backgroundColor: 'transparent'
  },
  heartShape: {
    width: 10,
    height: 15,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: '#ff008a',
  },
  leftHeart: {
    transform: [
        {rotate: '-45deg'}
    ],
    left: 2
  },
  rightHeart: {
    transform: [
        {rotate: '45deg'}
    ],
    right: 2
  }
});
export default AnimatedHeart
