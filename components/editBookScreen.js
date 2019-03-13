import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../Firebase';

class EditBookScreen extends Component {
  static navigationOptions = {
    title: 'Edit Book',
  };
      constructor() {
        super();
        this.state = {
          key: '',
          isLoading: true,
          title: '',
          author: '',
          publication: '',
          description: '',
          
        };
      }
      componentDidMount() {
        const { navigation } = this.props;
        const ref = firebase.firestore().collection('books').doc(JSON.parse(navigation.getParam('bookkey')));
        ref.get().then((doc) => {
          if (doc.exists) {
            const book = doc.data();
            this.setState({
              key: doc.id,
              title: book.title,
              description: book.description,
              author: book.author,
              isLoading: false
            });
          } else {
            console.log("No such document!");
          }
        });
      }
      
      updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
      }
      
      updateBook() {
        this.setState({
          isLoading: true,
        });
        const { navigation } = this.props;
        const updateRef = firebase.firestore().collection('books').doc(this.state.key);
        updateRef.set({
          title: this.state.title,
          description: this.state.description,
          author: this.state.author,
        }).then((docRef) => {
          this.setState({
            key: '',
            title: '',
            description: '',
            author: '',
            isLoading: false,
          });
          this.props.navigation.navigate('Book');
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.setState({
            isLoading: false,
          });
        });
    
}
render() {
this.state.isLoading &&(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    return (
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Title'}
              value={this.state.title}
              onChangeText={(text) => this.updateTextInput(text, 'title')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Description'}
              value={this.state.description}
              onChangeText={(text) => this.updateTextInput(text, 'description')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Author'}
              value={this.state.author}
              onChangeText={(text) => this.updateTextInput(text, 'author')}
          />
        </View>
        <View style={styles.button}>
          <Button
            large
            leftIcon={{name: 'update'}}
            title='Update'
            onPress={() => this.updateBook()} />
        </View>
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
      marginBottom: 20,
      padding: 5,
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
    }
  })
};

export default EditBookScreen;