import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);

  const addItem = () => {
    if (text !== '') {
      if (editId !== null) {
        // If editId is set, update existing item
        setItems(items.map(item => (item.id === editId ? { ...item, text } : item)));
        setEditId(null); // Reset editId after update
      } else {
        // Otherwise, add new item
        setItems([...items, { id: Date.now(), text }]);
      }
      setText('');
    }
  };

  const editItem = (id, text) => {
    setText(text); // Set text input value to the item's text
    setEditId(id); // Set editId to the id of the item being edited
  };

  const deleteItem = id => {
    setItems(items.filter(item => item.id !== id));
    if (editId === id) {
      // Reset text input and editId if the item being edited is deleted
      setText('');
      setEditId(null);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter new item"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button title={editId ? 'Update' : 'Add'} onPress={addItem} />
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => editItem(item.id, item.text)}>
              <Text style={styles.itemText}>{item.text}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteItem(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  input: {
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:20,
    backgroundColor:'lightgrey'
  },
  itemText: {
    fontSize: 16,
    marginRight: 8,
    color:'black',
    fontWeight:'bold'
  },
  deleteButton: {
    fontSize: 16,
    color: 'red',
  },
});

export default App;
