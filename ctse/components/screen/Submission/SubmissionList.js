import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
// const [isClicked, setIsClicked] = useState(false);
const SubmissionList = () => {
  
  const [submissions, setSubmissions] = useState([
    { id: '1', topic: 'Assignment 1', subjectCode: 'COMP101', date: '2022-01-01' },
    { id: '2', topic: 'Quiz 1', subjectCode: 'COMP101', date: '2022-01-08' },
    { id: '3', topic: 'Lab 1', subjectCode: 'COMP101', date: '2022-01-15' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  

  const viewSubmission = (submission) => {
    console.log(`Viewing submission ${submission.topic}...`);
    // setIsClicked(true);
  };

  const handleDelete = (id) => {
    setSubmissions(submissions.filter(submission => submission.id !== id));
    // setIsClicked(true);
  }

  const renderSubmissionCard = ({ item }) => {
    if (item.topic.toLowerCase().includes(searchQuery.toLowerCase())) {
      return (
        <View style={styles.card}>
        <Text style={styles.cardText}>{item.topic}</Text>
        <Text style={styles.cardText}>Subject Code: {item.subjectCode}</Text>
        <Text style={styles.cardText}>Date: {item.date}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[styles.button, styles.viewButton]}
            onPress={() => viewSubmission(item)}
          >
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Submission List</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Submissions..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <FlatList
        data={submissions}
        renderItem={renderSubmissionCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
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
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height:'150px'
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    alignContent:'center'
  },
  viewButton: {
    // backgroundColor: isClicked ? 'green' : 'transparent',
    borderColor: 'green',
    borderWidth:1,
    padding: 8,
    paddingLeft:22,
    paddingRight:22,
    borderRadius: 10,
    alignSelf: 'flex-end',
    left:10,
    marginTop:5,
  },
  deleteButton: {
    // backgroundColor: isClicked ? 'red' : 'transparent',
    borderColor: 'red',
    borderWidth: 1,
    padding: 8,
    paddingLeft:20,
    paddingRight:20,
    borderRadius: 10,
    position: 'absolute', 
    bottom: 0, 
    right: 10, 
  },
  deleteButtonText: {
    // color: isClicked ? '#fff' : 'red',
    alignContent:'center',
    color: 'red',
    fontWeight: 'bold',
  },

  viewButtonText: {
    
    alignContent:'center',
    color: 'green',
    fontWeight: 'bold',
  },
});

export default SubmissionList;
