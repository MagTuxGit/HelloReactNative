//ES2015
import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';

class NavigationBar extends Component {
  render() {
    return (
      <View style={{width: '100%', height: 64, backgroundColor: "steelblue", paddingTop: 44}}>
        <Text style={{textAlign:"center", color: "white"}}>{this.props.title}</Text>
      </View>
    )
  }
}

class Bananas extends Component {
  render() {
    return (
      // You can put any {JavaScript expression} inside braces in JSX.
      <Image source={this.props.pic} style={{width: 193, height: 110}}/>
    );
  }
}

class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}

class LotsOfGreetings extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Greeting name='Andrew' />
        <Greeting name='Ivan' />
        <Greeting name='Alexandr' />
      </View>
    );
  }
}

class Blink extends Component {
  constructor(props) {
    super(props);
    // state
    this.state = {isShowingText: true};

    // Toggle the state every second
    setInterval(() => {
      this.setState(previousState => {
        return { isShowingText: !previousState.isShowingText };
      });
    }, 1000);
  }

  render() {
    let display = this.state.isShowingText ? this.props.text : ' ';
    return (
      <Text>{display}</Text>
    );
  }
}

class LotsOfStyles extends Component {
  render() {
    return (
      <View>
        <Text style={styles.red}>just red</Text>
        <Text style={styles.bigblue}>just bigblue</Text>
        <Text style={[styles.bigblue, styles.red]}>bigblue, then red</Text>
        <Text style={[styles.red, styles.bigblue]}>red, then bigblue</Text>
      </View>
    );
  }
}

class FlexDimensionsBasics extends Component {
  render() {
    return (
      // Try removing the `flex: 1` on the parent View.
      // The parent will not have dimensions, so the children can't expand.
      // What if you add `height: 300` instead of `flex: 1`?
      <View style={{height: 300}}>
        <View style={{flex: 1, backgroundColor: 'powderblue'}} />
        <View style={{flex: 3, backgroundColor: 'skyblue'}} />
        <View style={{flex: 2, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
}

class FlexDirectionBasics extends Component {
  render() {
    return (
      // Try setting `flexDirection` to `column`.
      // default is column
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
}

class JustifyContentBasics extends Component {
  render() {
    return (
      // Try setting `justifyContent` to `center`.
      // Try setting `flexDirection` to `row`.
      <View style={{
        flex: 1,
        flexDirection: 'row',
        // flex-start, center, flex-end, space-around, space-between and space-evenly
        justifyContent: 'space-evenly',
      }}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
}

class AlignItemsBasics extends Component {
  render() {
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        // flex-start, center, flex-end, stretch
        alignItems: 'stretch',
      }}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{height: 50, backgroundColor: 'skyblue'}} />
        <View style={{height: 100, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
}

export default class HelloWorldApp extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      // JSX
      <View>
      <NavigationBar title="Hello World"/>
      <ScrollView>      
        <View style={{backgroundColor:"#ecf7f9", height:'100%'}}>
          {/* comment in JSX */}
          <View style={{width: '100%', height: 8}}/>
          
          <Text style={styles.header}>PROPS</Text>
          <Bananas pic={pic}></Bananas>
          <Text>Hello Bananas!</Text>
          <LotsOfGreetings />
          
          <Text style={styles.header}>STATE</Text>
          <Blink text='I love to blink' />
          <Blink text='Yes blinking is so great' />
          
          <Text style={styles.header}>STYLE</Text>
          <LotsOfStyles />
          
          <Text style={styles.header}>SIZE</Text>
          <FlexDimensionsBasics />

          <Text style={styles.header}>LAYOUT</Text>
          <FlexDirectionBasics />
          <JustifyContentBasics />
          <AlignItemsBasics />

          <Text style={styles.header}>TEXT INPUT</Text>
        </View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 16,
    backgroundColor: "white"
  },
});
