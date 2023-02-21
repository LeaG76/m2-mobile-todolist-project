import {StyleSheet} from "react-native";

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  viewTop: {
    marginBottom: 5
  },
  textTitle: {
    textAlign: 'center',
    color: '#4D251E',
    fontSize: 26,
    fontWeight: 'bold'
  },
  lineTitle: {
    borderBottomColor: '#4D251E',
    borderBottomWidth: 2,
    marginBottom: 5,
    marginLeft: 100,
    marginRight: 100
  },
  viewButtons: {
    margin: 5
  },
  viewLists: {
    margin: 5
  },
  textTodoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4D251E',
  },
  separationLine: {
    borderBottomColor: '#4D251E',
    borderBottomWidth: 1,
    marginTop: 4,
    marginBottom: 8,
  },
  listItem: {
    paddingVertical: 5
  },
  item: {
    fontSize: 16,
    padding: 5,
  },
  listItemCompleted: {
    paddingVertical: 5
  },
  itemCompleted: {
    fontSize: 16,
    padding: 5,
    backgroundColor: '#B5CDA3'
  },
  addTodoTitle: {
    textAlign: 'center',
    color: '#4D251E',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addTodoName: {
    fontSize: 16,
    color: '#4D251E',
    fontWeight: 'bold',
  },
  addTodoInput: {
    height: 30,
    borderColor: '#4D251E',
    borderWidth: 1,
    paddingLeft: 10,
    margin: 5,
  }
});

export const styles = stylesheet;