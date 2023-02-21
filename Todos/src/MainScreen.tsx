import React, { useState, useEffect } from 'react';
import { Button, FlatList, SafeAreaView, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite'

import { styles } from "../StyleSheet";

const db = SQLite.openDatabase('db.todoDB');

type Todo = {
  name: string,
  isCompleted: number
}

function MainScreen({ route, navigation }: any) {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    db.transaction(tx => {
        tx.executeSql(
        'CREATE TABLE IF NOT EXISTS todos (name TEXT, isCompleted INTEGER);'
        )
    })

    db.transaction(tx => {
        tx.executeSql('SELECT * FROM todos', [], (_, { rows }) => {
            setTodos(rows._array);
        });
    });

  }, []);

  // On affiche la base de données dans la console
  console.log(todos);

  // Fonction pour aller à la page de création d'une todo
  const goToTodoPage = () => {
    navigation.navigate('Add Todo');
  }

  // Fonction pour supprimer toutes les tâches complétées
  const deleteTodos = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM todos WHERE isCompleted = 1;'
      )
    });
    setTodos(todos.filter(todo => todo.isCompleted === 0));
  }

  // Fonction pour modifier le status d'une tâche (si elle est complétée alors elle devient à faire et inversement)
  const updateTodo = (name: string, isCompleted: number) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE todos set isCompleted = ? WHERE name = ?;', [isCompleted === 1 ? 0 : 1, name]
      )
    });
    setTodos(todos.map(todo => todo.name === name ? {...todo, isCompleted: isCompleted === 1 ? 0 : 1} : todo));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewTop}>
        <Text style={styles.textTitle}>TODO LIST</Text>
      </View>

      <View style={styles.lineTitle}/>

      <View style={styles.viewButtons}>
        <Button
          title='Add todo'
          color='#C1AC95'
          onPress={() => goToTodoPage()}
        />
      </View>

      <View style={styles.viewButtons}>
        <Button
            title='Remove todos'
            color='#9F5540'
            onPress={() => deleteTodos()}
        />
      </View>

      <View style={styles.viewLists}>
        <Text style={styles.textTodoTitle}>Pending</Text>
        <View style={styles.separationLine}/>
        <FlatList
            data={todos.filter(todo => todo.isCompleted === 0)}
            renderItem={({ item }) => (
                <View style={styles.listItem}>
                    <Text style={styles.item} onPress={() => updateTodo(item.name, item.isCompleted)}>{item.name}</Text>
                </View>
            )}
        />
      </View>

      <View style={styles.viewLists}>
        <Text style={styles.textTodoTitle}>Completed</Text>
        <View style={styles.separationLine}/>
        <FlatList
            data={todos.filter(todo => todo.isCompleted === 1)}
            renderItem={({ item }) => (
                <View style={styles.listItemCompleted}>
                    <Text style={styles.itemCompleted} onPress={() => updateTodo(item.name, item.isCompleted)}>{item.name}</Text>
                </View>
            )}
        />
      </View>
    </SafeAreaView>
  );
}

export const mainScreen = MainScreen;