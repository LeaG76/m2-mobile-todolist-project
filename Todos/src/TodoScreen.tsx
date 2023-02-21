import { CommonActions } from '@react-navigation/native';
import { Button, View, Text, TextInput, SafeAreaView } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { Form } from 'react-native-form-component';
import * as SQLite from 'expo-sqlite'

import { styles } from "../StyleSheet";

const db = SQLite.openDatabase('db.todoDB');

function TodoScreen({ navigation }: any) {
    const { handleSubmit, control } = useForm();

    const addTodoItem = (content: string) => {
        db.transaction((tx) => {
            //tx.executeSql('INSERT INTO todos (name, isCompleted) VALUES (?, 0)', [content]);
            tx.executeSql('SELECT name as count FROM todos WHERE name = ?', [content], (_, result ) => {
                if(result.rows.length == 1) {
                    console.log("Cette tâche existe déjà !");
                } else {
                    console.log("Cette tâche n'existe pas !");
                    tx.executeSql('INSERT INTO todos (name, isCompleted) VALUES (?, 0)', [content]);
                }
            });
        });

        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'Todos' }
                ],
            })
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.addTodoTitle}>CREATE A NEW TODO</Text>
                <Text style={styles.addTodoName}>Name</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value }}) => (
                        <TextInput
                            style={styles.addTodoInput}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    )}
                    name="content"
                    rules={{ required: true }}
                    defaultValue=""
                />
                <View style={styles.viewButtons}>
                    <Button
                        title='Submit'
                        color='#B5CDA3'
                        onPress={handleSubmit(data => addTodoItem(data.content))}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

export const todoScreen = TodoScreen;