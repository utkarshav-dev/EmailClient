import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { addDraft, addEmail, updateEmail } from '../redux/emailSlice';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import MainContainer from '../component/MainContainer';
import Header from '../component/Header';
import { OutlineButton } from '../component/Button';
// import { SENDGRID_API_KEY } from '@env';
import Toast from 'react-native-toast-message';

const SENDGRID_API_KEY = "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";
const SENDGRID_SENDER_EMAIL = "utkarshavasumbkar@gmail.com";

const EmailEditorScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const draft = route.params?.draft || { id: uuidv4(), subject: '', recipient: '', body: '' };
    const [subject, setSubject] = useState(draft.subject);
    const [recipients, setRecipients] = useState(draft.recipient);
    const [body, setBody] = useState(draft.body);
    const [Loading, setLoading] = useState(false);
    const saveDraft = async (draft) => {
        setLoading(true)
        try {
            let drafts = await AsyncStorage.getItem('emailsList');
            drafts = drafts ? JSON.parse(drafts) : [];
            const index = drafts.findIndex(d => d.id === draft.id);
            if (index !== -1) {
                drafts[index] = draft;
            } else {
                drafts.push(draft);
            }
            await AsyncStorage.setItem('emailsList', JSON.stringify(drafts));
            setLoading(false)
            setTimeout(() => {
                Toast.show({
                  type: 'success',
                  position: 'top',
                  text1: 'Draft saved!',
                  text2: 'Your Draft saved successfully.',
                });
                setTimeout(() => {
                  navigation.goBack();
                }, 2000); 
              }, 1000); 
        } catch (error) {
            setLoading(false)
            console.error('Error saving draft:', error);
        }
    };
    const handleSendEmail = async (recipients, subject, body) => {
        setLoading(true)
        try {
            await axios.post("https://api.sendgrid.com/v3/mail/send", {
                personalizations: [{ to: [{ email: recipients }], subject }],
                from: { email: SENDGRID_SENDER_EMAIL },
                content: [{ type: "text/plain", value: body }]
            }, {
                headers: { Authorization: `Bearer ${SENDGRID_API_KEY}`, "Content-Type": "application/json" }
            });
            const sentEmail = { id: draft.id, subject, recipient: recipients, body, status: "Sent" };
            dispatch(updateEmail(sentEmail));
            await saveEmail(sentEmail);
            setLoading(false)
            setTimeout(() => {
                Toast.show({
                  type: 'success',
                  position: 'top',
                  text1: 'Email Sent!',
                  text2: 'Your email has been sent successfully.',
                });
                setTimeout(() => {
                  navigation.goBack();
                }, 2000); 
              }, 1000); 
        } catch (error) {
            setLoading(false)
            console.error("Error sending email:", error.response?.data || error.message);
        }
    };
    const saveEmail = async (email) => {
        try {
            let emails = await AsyncStorage.getItem('emailsList');
            emails = emails ? JSON.parse(emails) : [];
            const index = emails.findIndex(e => e.id === email.id);
            if (index !== -1) {
                emails[index] = email;
            } else {
                emails.push(email);
            }
            await AsyncStorage.setItem('emailsList', JSON.stringify(emails));
            console.log(`Email (${email.status}) saved successfully.`);
        } catch (error) {
            console.error("Error saving email:", error);
        }
    };
    const sendEmail = () => {
        setTimeout(() => {
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Email Sent!',
            text2: 'Your email has been sent successfully.',
          });
          setTimeout(() => {
            navigation.goBack();
          }, 2000); 
        }, 1000); 
      };
    return (
        <MainContainer Loading={Loading}>
            <Header goBackicon={true} onPress={() => navigation.goBack()} />
            <View style={styles.container}>
        
                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginBottom: 15, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', }}>
                    <Text style={{ fontWeight: '400', fontSize: 18, color: 'gray', width: '10%', }}>
                        To
                    </Text>
                    <TextInput editable={draft.status == 'Sent' ? false : true} style={[styles.input, { width: '90%', }]} value={recipients} onChangeText={setRecipients} />
                </View>
                <TextInput placeholderTextColor={'gray'} editable={draft.status == 'Sent' ? false : true} style={[{ marginBottom: 15, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', }, styles.input]} placeholder="Subject" value={subject} onChangeText={setSubject} />
                <TextInput placeholderTextColor={'gray'} editable={draft.status == 'Sent' ? false : true} scrollEnabled style={styles.input} placeholder="Compose email" value={body} onChangeText={setBody} multiline />
            </View>
            {draft.status == 'Sent' ? (<></>) : (<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBlock: 15 }}>
                <OutlineButton right={true} text={'Save Draft'} icon={'arrow-undo'} 
                // onPress={setShowModal(true)}
                onPress={() => saveDraft({
                    id: draft.id,
                    subject: subject,
                    recipient: recipients,
                    body: body,
                    status: "Draft"
                })} 
                />
                <OutlineButton left={true} icon={'arrow-redo'} text={'Send Email'} 
                onPress={() => handleSendEmail(recipients, subject, body)}
                // onPress={()=> sendEmail()}
                 />
            </View>)}
            <Toast />
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    input: { fontWeight: '400', fontSize: 16, color: 'black', },
    bodyInput: { height: 100, borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 },
});

export default EmailEditorScreen;
