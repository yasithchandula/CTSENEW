import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { db } from "../../firebase-config/firebase-config"
// const [isClicked, setIsClicked] = useState(false);
const SubmissionList = () => {
  const navigate = useNavigation();

  const [submissions, setSubmissions] = useState([]);
  // const [submissions, setSubmissions] = useState([
  //   { id: '1', topic: 'Assignment 1', subjectCode: 'COMP101', date: '2022-01-01' },
  //   { id: '2', topic: 'Quiz 1', subjectCode: 'COMP101', date: '2022-01-08' },
  //   { id: '3', topic: 'Lab 1', subjectCode: 'COMP101', date: '2022-01-15' },
  // ]);
  const [searchQuery, setSearchQuery] = useState('');


  const viewSubmission = (submission) => {
    console.log(`Viewing submission ${submission.topic}...`);
    // setIsClicked(true);
  };

  const goToAddSubmission = () => {
    navigate.navigate('Add Submission');
  };

  const handleDelete = (id) => {
    setSubmissions(submissions.filter(submission => submission.id !== id));
    // setIsClicked(true);
  }

  useEffect(() => {
    let subs = []
    getDocs(collection(db, 'Submission'))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          subs.push({ ...doc.data(), id: doc.id })          
        });
        setSubmissions(subs);
      });
  }, []);

  const RenderSubmissionCard = ({ item }) => {
    // console.log(item);
    if (item.asName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return (
        <View key={item.id}>
          <Text style={styles.cardText}>{item.asName}</Text>
          <Text style={styles.cardText}>Subject Code: {item.mCode}</Text>
          {/* <Text style={styles.cardText}>Date: {item.date}</Text> */}
          {/* <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={[styles.button, styles.viewButton]}
              onPress={() => viewSubmission(item)}
            >
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      );
    } else {
      return <View />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Submission List</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={goToAddSubmission}
      >
        <Text style={styles.buttonText}>Add Submission</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Submissions..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <FlatList
        data={submissions}
        // renderItem={renderSubmissionCard}
        renderItem={({ item }) => (
          <RenderSubmissionCard
            item={item}
          />
        )}
        keyExtractor={(item) => item.id}
      // contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e5f5ff',
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 8,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    // alignSelf: 'flex-end',
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  list: {
    marginTop: 10,
  },
  card: {
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 10,
    elevation: 3,
    height: '150px'
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    alignContent: 'center'
  },
  viewButton: {
    // backgroundColor: isClicked ? 'green' : 'transparent',
    borderColor: 'green',
    borderWidth: 1,
    padding: 8,
    paddingLeft: 22,
    paddingRight: 22,
    borderRadius: 10,
    alignSelf: 'flex-end',
    left: 10,
    marginTop: 5,
  },
  deleteButton: {
    // backgroundColor: isClicked ? 'red' : 'transparent',
    borderColor: 'red',
    borderWidth: 1,
    padding: 8,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    right: 10,
  },
  deleteButtonText: {
    // color: isClicked ? '#fff' : 'red',
    alignContent: 'center',
    color: 'red',
    fontWeight: 'bold',
  },

  viewButtonText: {

    alignContent: 'center',
    color: 'green',
    fontWeight: 'bold',
  },
});

export default SubmissionList;
