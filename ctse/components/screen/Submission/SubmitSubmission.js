import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import {firebase} from "../../firebase-config/firebase-config";
import {getDownloadURL, ref} from 'firebase/storage';
import 'firebase/firestore';
import { uploadBytes } from "firebase/storage";
import { db } from "../../firebase-config/firebase-config";
import { storage } from '../../firebase-config/firebase-config';
import { addDoc, collection } from 'firebase/firestore';
import { Card } from 'react-native-paper';


// const storage = getStorage();

// import { db } from "../../firebase-config/firebase-config";

const FileSubmissionScreen = () => {
  const[file,setFile]=useState('');
  const [fileUri, setFileUri] = useState('');
  const [fileName, setFileName] = useState('');
  const [downloadUrl,setDownloadUrl]=useState('');
  const [comments, setComments] = useState('');
  const DataCollectionRef=collection(db,"submission");

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      setFile(result);
      setFileUri(result.uri);
      setFileName(result.name);
    } catch (err) {
      console.log('Error picking document:', err);
    }
  };

  const submitFile = async () => {
    console.log(storage);
    const storageRef = ref(storage,fileName);
    // const storageRef = firebase.storage().ref();
    const fileRef = storageRef.name;
    // console.log(storageRef);   
    // const db = firebase.firestore();
    await uploadBytes(storageRef,file).then((snapshot) => {
      console.log(file)
        setDownloadUrl(getDownloadURL(ref(storage,`${file}`)));
        console.log(downloadUrl)
        console.log('Uploaded a blob or file!');
      });
    addDoc(DataCollectionRef,{
          name: fileName,
      url: downloadUrl,
      comments: comments,
    //   // createdAt: firebase.firestore.FieldValue.serverTimestamp(),

        });
        
    setFileUri('');
    setFileName('');
    setComments('');
    console.log('File submitted successfully!');
  };

  return (
    
      
    <View>
      <Text>Submit a file</Text>
      <Button title="Pick a document" onPress={pickDocument} />
      {fileName ? <Text>{fileName}</Text> : null}
      <TextInput
        placeholder="Add comments (optional)"
        value={comments}
        onChangeText={setComments}
      />
      <Button title="Submit" onPress={submitFile} disabled={!fileUri} />
    </View>
   
    
  );
};
export default FileSubmissionScreen;






