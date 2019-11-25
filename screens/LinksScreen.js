import React from "react";

import {
  Animated,
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  ImageBackground,
  Dimensions,
  Platform,
  TouchableOpacity
} from "react-native";

import * as Font from "expo-font";
import * as theme from "../theme";
import { LinearGradient } from "expo-linear-gradient";
// icons
import LockIcon from "../assets/lock.svg";
import LampkIcon from "../assets/lamp.svg";
import TempkIcon from "../assets/temp.svg";
import WindowIcon from "../assets/window.svg";
import ColdIcon from "../assets/ColdIcon.svg";
import MinusIcon from "../assets/MinusIcon.svg";
import PlusIcon from "../assets/PlusIcon.svg";
import Ellipse from "../assets/Ellipse.svg";
import EllipseTop from "../assets/EllipseTop.svg";
import Rain from "../assets/Rain.svg";
import Termometr from "../assets/Termometr.svg";
import BlueLine from "../assets/BlueLine.svg";
const { width, height } = Dimensions.get("window");
const mocks = [
  {
    id: 1,
    location: "Кухня",
    temperature: 43,
    uri: require("../assets/room1.jpg")
  },
  {
    id: 2,
    location: "Спальня",
    temperature: 12,
    uri: require("../assets/room2.jpg")
  },
  {
    id: 3,
    location: "Гостинная",
    temperature: 23,
    uri: require("../assets/room3.jpg")
  }
];

function elevationShadowStyle(elevation) {
  return {
    elevation,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation
  };
}

const styles = StyleSheet.create({
  flex: {
    flex: 0
  },
  column: {
    flexDirection: "column"
  },
  row: {
    flexDirection: "row"
  },
  row_reverse: {
    flexDirection: "row-reverse"
  },
  column_reverse: {
    flexDirection: "column-reverse"
  },
  header: {
    backgroundColor: theme.colors.dark_navy,
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding * 1.33,
    paddingBottom: theme.sizes.padding * 0.66,
    justifyContent: "center"
  },

  destinations: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 10
  },
  destination: {
    width: width - theme.sizes.padding * 2,
    height: width * 0.6,
    marginVertical: theme.sizes.margin / 2,
    marginHorizontal: theme.sizes.margin,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding,
    borderRadius: theme.sizes.radius

    // width: width - theme.sizes.padding * 2,
    // height: width * 0.6,
    // marginVertical: theme.sizes.margin / 2,
    // marginHorizontal: theme.sizes.margin,
    // paddingHorizontal: theme.sizes.padding,
    // paddingVertical: theme.sizes.padding,
    // borderRadius: theme.sizes.radius
  },

  recommendationTemp: {
    fontSize: theme.sizes.font * 1.25,
    color: theme.colors.white
  },

  shadow: {
    ...elevationShadowStyle(18)
  },
  shadowSlider: {
    ...elevationShadowStyle(20)
  },
  dots: {
    width: 10,
    height: 10,
    borderWidth: 2.5,
    borderRadius: 5,
    marginHorizontal: 12,
    backgroundColor: theme.colors.gray,
    borderColor: "transparent"
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    borderColor: theme.colors.white
  },
  sliderHeader: {
    borderTopRightRadius: theme.sizes.radius_slider,
    borderTopLeftRadius: theme.sizes.radius_slider,
    width: width,

    backgroundColor: theme.colors.medium_navy
  },
  sliderNotch: {
    backgroundColor: "#454858",
    width: 100,
    height: 10,
    borderWidth: 2.5,
    borderRadius: 5,
    marginHorizontal: 12,
    borderColor: "transparent"
  },
  activePanel: {
    borderColor: "transparent",
    backgroundColor: theme.colors.medium_navy
  },
  linePanel: {
    backgroundColor: theme.colors.gray,
    width: 100,
    height: 2,

    borderRadius: 5,

    borderColor: "transparent"
  },
  panelIcon: {
    width: 24,
    height: "auto",

    marginHorizontal: 12,

    borderColor: "transparent"
  },
  panelIconActive: {
    width: 5,
    height: 5,
    borderRadius: 3,
    borderColor: theme.colors.active
  },
  temperaturePanel: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.medium_navy
  },
  bigRoundToggle: {
    justifyContent: "center",
    alignItems: "center",
    width: theme.sizes.bigRoundToggle,
    height: theme.sizes.bigRoundToggle,
    borderWidth: 1.5,
    borderRadius: 100,
    marginVertical: 33,
    marginHorizontal: 12,
    backgroundColor: "transparent",
    borderColor: theme.colors.gray
  }
});

export default class LinksScreen extends React.Component {
  state = {
    fontLoaded: false,
    temperature: 15
  };

  scrollX = new Animated.Value(0);

  renderDots() {
    const { destinations } = this.props;
    const dotPosition = Animated.divide(this.scrollX, width);
    return (
      <View
        style={[
          styles.flex,
          styles.row,
          {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent"
          }
        ]}
      >
        {destinations.map((item, index) => {
          const borderWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 2.5, 0],
            extrapolate: "clamp"
          });
          return (
            <Animated.View
              key={`step-${item.id}`}
              style={[
                styles.dots,
                styles.activeDot,
                { borderWidth: borderWidth }
              ]}
            />
          );
        })}
      </View>
    );
  }

  renderDestinations = () => {
    return (
      <View style={[styles.column, styles.destinations]}>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          style={{
            overflow: "visible",
            height: 280
          }}
          data={this.props.destinations}
          keyExtractor={(item, index) => `${item.id}`}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: this.scrollX } } }
          ])}
          renderItem={({ item }) => this.renderDestination(item)}
        />
        {this.renderDots()}
      </View>
    );
  };

  renderDestination = item => {
    let imgSource = item.uri;
    return (
      <TouchableOpacity activeOpacity={0.8}>
        <ImageBackground
          style={[styles.flex, styles.destination, styles.shadow]}
          imageStyle={{ borderRadius: theme.sizes.radius }}
          source={imgSource}
        >
          <View
            style={[
              {
                paddingHorizontal: theme.sizes.padding * 0.5,
                paddingTop: theme.sizes.padding * 4,
                alignItems: "flex-start"
              }
            ]}
          >
            {this.state.fontLoaded ? (
              <Text
                style={{
                  color: theme.colors.white,
                  fontFamily: "montserrat-semi-bold",
                  fontSize: 18
                }}
              >
                {item.location}
              </Text>
            ) : null}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  renderSlider = () => {
    return (
      <View
        style={[
          styles.column,
          styles.sliderHeader,

          {
            justifyContent: "center",
            alignItems: "center",

            height: 50
          }
        ]}
      >
        <View style={[styles.flex, styles.row, styles.sliderNotch]}></View>
      </View>
    );
  };

  renderActivePanel = () => {
    return (
      <View>
        <View
          style={[
            styles.row,
            styles.activePanel,
            {
              justifyContent: "space-around",
              alignItems: "center",
              height: 50
            }
          ]}
        >
          <LockIcon width={90} height={30} />
          <WindowIcon width={90} height={30} />
          <LampkIcon width={90} height={30} />
          <TempkIcon width={90} height={30} />
        </View>
        <View
          style={{
            width: "auto",
            height: 1,
            backgroundColor: "#363946"
          }}
        ></View>
        <BlueLine
          style={[
            styles.row,
            {
              position: "absolute",

              marginTop: 40,
              marginLeft: 90
            }
          ]}
        />
      </View>
    );
  };

  // failed try of making radial gradient
  renderBigRoundToggle = () => {
    const temp = this.state.temperature;
    return (
      <View style={[styles.row, styles.bigRoundToggle]}>
        <ColdIcon
          style={{
            marginRight: 20
          }}
        />
        {this.renderRoundCircleIconTop()}
        {this.renderRoundCircleIcon()}
        {this.state.fontLoaded ? (
          <Text
            style={{
              fontFamily: "montserrat-regular",
              color: theme.colors.white,
              fontSize: 50,
              marginRight: 20
            }}
          >
            {temp}°
          </Text>
        ) : null}
      </View>
    );
  };

  renderRoundCircleIcon = () => {
    return <Ellipse style={{ position: "absolute" }} />;
  };
  renderRoundCircleIconTop = () => {
    return <EllipseTop style={{ position: "absolute", top: -22 }} />;
  };

  increaseTemp = () => {
    this.setState(prevState => ({ temperature: prevState.temperature + 1 }));

    console.log(this.state.temperature);
  };

  decreaseTemp = () => {
    this.setState(prevState => ({ temperature: prevState.temperature - 1 }));

    console.log(this.state.temperature);
  };

  renderTempreturePanel = () => {
    return (
      <View style={[styles.flex, styles.row, styles.temperaturePanel, {}]}>
        <TouchableOpacity style={{ padding: 40 }} onPress={this.decreaseTemp}>
          <MinusIcon />
        </TouchableOpacity>
        {this.renderBigRoundToggle()}

        <TouchableOpacity style={{ padding: 40 }} onPress={this.increaseTemp}>
          <PlusIcon />
        </TouchableOpacity>
      </View>
    );
  };
  renderCityWeatherPanel = () => {
    return (
      <View
        style={[
          styles.flex,
          styles.row,
          {
            backgroundColor: theme.colors.medium_navy,
            justifyContent: "space-around",
            paddingHorizontal: 20,
            paddingBottom: 10
          }
        ]}
      >
        <View style={[styles.flex, styles.row, {}]}>
          <Termometr height={45} style={{ marginRight: 4 }} />

          {this.state.fontLoaded ? (
            <View>
              <Text
                style={{
                  fontFamily: "montserrat-regular",
                  color: theme.colors.gray,
                  fontSize: 30
                }}
              >
                21°C
              </Text>
              <Text
                style={{
                  fontFamily: "montserrat-regular",
                  color: theme.colors.white,
                  fontSize: 12
                }}
              >
                текущая
              </Text>
            </View>
          ) : null}
        </View>
        <View style={[styles.flex, styles.row, {}]}>
          <Rain height={45} style={{ marginRight: 4 }} />
          {this.state.fontLoaded ? (
            <View>
              <Text
                style={{
                  fontFamily: "montserrat-regular",
                  color: theme.colors.gray,
                  fontSize: 30
                }}
              >
                11°C
              </Text>
              <Text
                style={{
                  fontFamily: "montserrat-regular",
                  color: theme.colors.white,
                  fontSize: 12
                }}
              >
                Санкт-Петербург
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  async componentDidMount() {
    await Font.loadAsync({
      "montserrat-regular": require("../assets/fonts/Montserrat-Regular.ttf"),
      "montserrat-medium": require("../assets/fonts/Montserrat-Medium.ttf"),
      "montserrat-semi-bold": require("../assets/fonts/Montserrat-SemiBold.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: theme.colors.light_navy
        }}
      >
        {this.renderDestinations()}
        {this.renderSlider()}
        {this.renderActivePanel()}
        {this.renderTempreturePanel()}
        {this.renderCityWeatherPanel()}
      </ScrollView>
    );
  }
}
LinksScreen.defaultProps = {
  destinations: mocks
};
LinksScreen.navigationOptions = {
  header: (
    <View style={[styles.flex, styles.row, styles.header]}>
      <Text
        style={{
          fontSize: theme.sizes.font,
          color: theme.colors.white
        }}
      >
        Гостинная
      </Text>
    </View>
  )
};
