import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
// import Pedido from './Pedido';

const firebaseConfig = {
  apiKey: "AIzaSyBgrjCk3gNJPIyDrePsULHFOj5ATJmvSf8",
  authDomain: "tareamoviles-5fa22.firebaseapp.com",
  projectId: "tareamoviles-5fa22",
  storageBucket: "tareamoviles-5fa22.appspot.com",
  messagingSenderId: "515047937070",
  appId: "1:515047937070:web:17608bb259983e4350bbbf",
  measurementId: "G-MVCB2KGXKL",
  databaseURL: "https://parcial-61ab0-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {

  const [plant, setPlant] = useState({
    Nombre_c: '',
    nombre: '',
    codigo: '',
    stock: '',
    tipo: ''
  });

  const handleInputChange =(name, value) =>{
    setPlant(prevPlant => ({
      ...prevPlant,
      [name]: value
    }));
  }

 const WritePlantData=()=> {
    set(ref(database, 'Plantas/' + plant.Nombre_c), {
      Nombre_c: plant.Nombre_c,
      nombre: plant.nombre,
      codigo: plant.codigo,
      stock: plant.stock,
      tipo: plant.tipo
    }).then(() => {
      alert('creado');
    }).catch(error => {
      console.error('Error al crear:', error);
    });
  }


  const [pedido, setPedido] = useState({
    fechaSolicitud: new Date(),
    FechaAprobacion: '',
    FechaEntrega: '',
    planta: ''
  });

  const handleInputChangeP =(name, value)=> {
    setPedido(prevPedido => ({
      ...prevPedido,
      [name]: value
    }));
  }
  

  const WritePedido =()=> {
    set(ref(database, 'Pedido/' + pedido.planta), {
      fechaSolicitud: pedido.fechaSolicitud.toString(),
      FechaAprobacion: pedido.FechaAprobacion,
      FechaEntrega: pedido.FechaEntrega,
      planta: plant.nombre
    }).then(() => {
      alert('Pedido creado correctamente');
    }).catch(error => {
      console.error('Error al crear el pedido:', error);
    });
  }



  return (
    <View style={styles.container}>
      {/* Formulario para ingresar la planta */}
      <View style={styles.formContainer}>
        <Text style={styles.h1}>Ingrese su planta</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre cientifico"
          value={plant.Nombre_c}
          onChangeText={(value) => handleInputChange('Nombre_c', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="nombre"
          value={plant.nombre}
          onChangeText={(value) => handleInputChange('nombre', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="codigo"
          value={plant.codigo}
          onChangeText={(value) => handleInputChange('codigo', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="stock"
          value={plant.stock}
          onChangeText={(value) => handleInputChange('stock', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="tipo"
          value={plant.tipo}
          onChangeText={(value) => handleInputChange('tipo', value)}
        />
        <Button title="Guardar" onPress={WritePlantData} />
      </View>

      {/* Formulario para ingresar los detalles del pedido */}
      <View style={styles.formContainer}>
        <Text style={styles.h1}>Ingrese los detalles del pedido</Text>

        <Text>Fecha de solicitud</Text>

        <TextInput
          style={styles.input}
          placeholder="Fecha de solicitud (ddd/mmm/yyyy)"
          value={pedido.fechaSolicitud.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            year: 'numeric'
          })}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de aprobación"
          value={pedido.FechaAprobacion}
          onChangeText={(value) => handleInputChangeP('FechaAprobacion', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de entrega"
          value={pedido.FechaEntrega}
          onChangeText={(value) => handleInputChangeP('FechaEntrega', value)}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Planta"
          value={pedido.planta}
          onChangeText={(value) => handleInputChangeP('planta', value)} // Actualizar la función a handleInputChangeP
        />
        <Button title="Guardar Pedido" onPress={WritePedido} style={styles.button} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', // Cambiado para alinear los formularios horizontalmente
  },
  formContainer: {
    width: '40%', // Reducido el ancho del contenedor del formulario
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginRight: 10, // Agregado margen derecho para separar los formularios
  },
  input: {
    height: 40, // Reducido el alto de los TextInput
    borderColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  h1: {
    fontSize: 32, // Cambiando el tamaño del texto a 32 puntos
    fontWeight: 'bold', // Negrita
    marginBottom: 20, // Espacio inferior
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginTop: 25,
  },
});

