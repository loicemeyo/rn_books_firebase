import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { List, ListItem, Text, Card, Button } from 'react-native-elements';
import firebase from '../Firebase';

class BookDetailScreen extends Component {
    static navigationOptions = {
        title: 'Book Details',
      };
      
      constructor() {
        super();
        this.state = {
          isLoading: true,
          book: {},
          key: ''
        };
      }
      
      componentDidMount() {
        const { navigation } = this.props;
        const ref = firebase.firestore().collection('books').doc(JSON.parse(navigation.getParam('bookkey')));
        ref.get().then((doc) => {
          if (doc.exists) {
            this.setState({
              book: doc.data(),
              key: doc.id,
              isLoading: false
            });
          } else {
            console.log("No such document!");
          }
        });
      }
      
      deleteBook(key) {
        const { navigation } = this.props;
        this.setState({
          isLoading: true
        });
        firebase.firestore().collection('books').doc(key).delete().then(() => {
          console.log("Document successfully deleted!");
          this.setState({
            isLoading: false
          });
          navigation.navigate('Book');
        }).catch((error) => {
          console.error("Error removing document: ", error);
          this.setState({
            isLoading: false
          });
        });
      }
  render() {
    this.state.isLoading &&(
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )
      return (
        <ScrollView>
          <Card style={styles.container}>
            <View style={styles.subContainer}>
              <View>
                <Text h3>{this.state.book.title}</Text>
              </View>
              <View>
                <Text h5>{this.state.book.description}</Text>
              </View>
              <View>
                <Text h4>{this.state.book.author}</Text>
              </View>
            </View>
            <View style={styles.detailButton}>
              <Button
                large
                backgroundColor={'#CCCCCC'}
                leftIcon={{name: 'edit'}}
                title='Edit'
                onPress={() => {
                  this.props.navigation.navigate('EditBook', {
                    bookkey: `${JSON.stringify(this.state.key)}`,
                  });
                }} />
            </View>
            <View style={styles.detailButton}>
              <Button
                large
                backgroundColor={'#999999'}
                color={'#FFFFFF'}
                leftIcon={{name: 'delete'}}
                title='Delete'
                onPress={() => this.deleteBook(this.state.key)} />
            </View>
          </Card>
        </ScrollView>
      );
    };
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 20
        },
        subContainer: {
          flex: 1,
          paddingBottom: 20,
          borderBottomWidth: 2,
          borderBottomColor: '#CCCCCC',
        },
        activity: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center'
        },
        detailButton: {
          marginTop: 10
        }
      })
    
}

export default BookDetailScreen;