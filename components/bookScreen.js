import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Text
} from 'react-native';
import { List, ListItem, Button, Icon } from 'react-native-elements';
import firebase from '../Firebase';

class BooksScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Book List',
      headerRight: (
        <Button
          buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
          icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
          onPress={() => {
            navigation.push('AddBook');
          }}
        />
      )
    };
  };
  constructor() {
    super();
    this.ref = firebase.firestore().collection('books');
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      books: []
    };
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  onCollectionUpdate = querySnapshot => {
    const books = [];
    querySnapshot.forEach(doc => {
      const { title, author, publication, description } = doc.data();
      books.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        author,
        publication,
        description
      });
    });
    this.setState({
      books,
      isLoading: false
    });
  };
  render() {
    if(this.state.isLoading){
        return(
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        )
      }
      return (
        <ScrollView style={styles.container}>
          <List>
            {
              this.state.books.map((item, i) => (
                <ListItem
                  key={i}
                  title={item.title}
                  leftIcon={{name: 'book', type: 'font-awesome'}}
                  onPress={() => {
                    this.props.navigation.navigate('BookDetails', {
                      bookkey: `${JSON.stringify(item.key)}`,
                    });
                  }}
                />
              ))
            }
          </List>
        </ScrollView>
      );
    }
    const styles = StyleSheet.create({
        container: {
         flex: 1,
         paddingBottom: 22
        },
        item: {
          padding: 10,
          fontSize: 18,
          height: 44,
        },
        activity: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center'
        }
      })
    };
    

export default BooksScreen;
