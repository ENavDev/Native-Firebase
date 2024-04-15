import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Picker, ScrollView } from 'react-native';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

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

 


  const handleInputChange = (name, value) => {
    setPlant(prevPlant => ({
      ...prevPlant,
      [name]: value
    }));
  }

  const WritePlantData = () => {
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

  const [plantas, setPlantas] = useState([]);
  useEffect(() => {
    const obtenerPlantas = async () => {
      try {
        const snapshot = await get(ref(database, 'Plantas'));
        if (snapshot.exists()) {
          const plantasData = snapshot.val();
          const plantasArray = Object.keys(plantasData).map(key => ({
            id: key,
            ...plantasData[key]
          }));
          setPlantas(plantasArray);
        } else {
          console.log("No hay datos de plantas disponibles");
        }
      } catch (error) {
        console.error("Error al obtener las plantas:", error);
      }
    };

    obtenerPlantas();
  }, []);

  const handleInputChangeP = (name, value) => {
    if (name === 'planta') {
      if (value !== undefined && value !== null && value !== '') {
        setPedido(prevPedido => ({
          ...prevPedido,
          [name]: value
        }));
      }
    } else {
      setPedido(prevPedido => ({
        ...prevPedido,
        [name]: value
      }));
    }
  }

  const [selectedPlant, setSelectedPlant] = useState(null);
  const handlePlantSelection = (value) => {
    const selected = plantas.find(planta => planta.nombre === value);
    setSelectedPlant(selected);
  }

  const WritePedido = () => {
    if (!pedido.planta) {
      alert('Por favor, seleccione una planta antes de hacer el pedido');
      return; 
    }

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
    if (selectedPlant) {
      const plantInfo = `Nombre Científico: ${selectedPlant.Nombre_c}\nNombre: ${selectedPlant.nombre}\nCódigo: ${selectedPlant.codigo}\nStock: ${selectedPlant.stock}\nTipo: ${selectedPlant.tipo}`;
      alert(plantInfo);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.h1}>Ingrese su planta</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre científico"
          value={plant.Nombre_c}
          onChangeText={(value) => handleInputChange('Nombre_c', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={plant.nombre}
          onChangeText={(value) => handleInputChange('nombre', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Código"
          value={plant.codigo}
          onChangeText={(value) => handleInputChange('codigo', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Stock"
          value={plant.stock}
          onChangeText={(value) => handleInputChange('stock', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Tipo"
          value={plant.tipo}
          onChangeText={(value) => handleInputChange('tipo', value)}
        />
        <Button title="Guardar Planta" onPress={WritePlantData} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.h1}>Ingrese los detalles del pedido</Text>
        <Text>Fecha de solicitud: {pedido.fechaSolicitud.toLocaleDateString()}</Text>
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
        <Picker
          selectedValue={pedido.planta}
          style={styles.picker}
          onValueChange={(value) => {
            handleInputChangeP('planta', value);
            handlePlantSelection(value);
          }}
        >
          <Picker.Item label="Seleccione una planta" value="" />
          {plantas.map(planta => (
            <Picker.Item key={planta.id} label={planta.nombre} value={planta.nombre} />
          ))}
        </Picker>

        <Button title="Guardar Pedido" onPress={WritePedido} />
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  formContainer: {
    width: '80%',
    marginBottom: 20,
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
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  picker: {
    height: 40,
    borderRadius: 5,
    marginBottom: 10,
  },
});
