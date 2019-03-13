import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import BookScreen from './components/BookScreen';
import BookDetailScreen from './components/BookDetailScreen';
import AddBookScreenfrom './components/AddBookScreen';
import EditBookScreen from './components/EditBookScreen';

const RootStack = createStackNavigator(
  {
    Book: BookScreen,
    BookDetails: BookDetailScreen,
    AddBook: AddBookScreen,
    EditBook: EditBookScreen,
  },
  {
    initialRouteName: 'Book',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#777777',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});