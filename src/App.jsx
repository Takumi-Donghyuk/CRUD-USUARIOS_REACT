import axios from "axios";
import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import { IconPlus } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import UsersList from "./components/UsersList";

function App() {
  //* Variables
  const BASE_URL = "https://users-crud.academlo.tech";
  //* Estados
  const [modal, setModal] = useState(false)
  const [users, setUsers] = useState([])
  const [userToEdit, setUserToEdit] = useState(null)
  //* Uso de la librería use-form
  const {register, handleSubmit, reset, formState: { errors }} = useForm()
  //* Método Get (leer)
  useEffect(() => {
    axios
      .get(`${BASE_URL}/users/`)
      .then(({ data }) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);
  //* Método Post (crear)
  const createUser = (newUser) => {
    axios
    .post(`${BASE_URL}/users/`, newUser)
    .then(({data: newUser}) => {
      setUsers([...users, newUser])
      handleCloseModal()
    })
    .catch((error) => console.log(error))
  }
  //* Método Delete (eliminar)
  const deleteUser = (id) => {
    axios
    .delete(`${BASE_URL}/users` + `/${id}/`)
    .then(()=> {
      const newUsers=users.filter((user) => user.id !== id)
      setUsers(newUsers)
    })
    .catch((error) => console.log(error))
  }
  //* Método Put (actualizar)
  const handleUpdateUser = (user) => {
    handleOpenModal();
    setUserToEdit(user)
  }

  useEffect(()=>{
    if(userToEdit!==null)
    {
      reset(userToEdit)
    }
  }, [userToEdit])
  
  const updateUser = (user) => {
    axios.put(`${BASE_URL}/users` + `/${userToEdit.id}/`, user)
    .then(({data: updatedUser})=> {
      const newUsers=users.map((user) => 
      user.id === userToEdit.id ? updatedUser : user)
      setUsers(newUsers)
      handleCloseModal()
    })
    .catch((error) => console.log(error))
  }
  //* Funciones
  const handleOpenModal = () => {
    setModal(true)
  }
  const handleCloseModal = () => {
    setModal(false)
    reset({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      birthday: "",
      image_url: ""
    })
    setUserToEdit(null)
  }
  
  //*Renderizado
  return (
    <main className="text-[16px]">
      <header className="flex justify-between p-5">
        <h1 className="text-center font-bold text-[30px]">Usuarios</h1>
        <button onClick={handleOpenModal} className="bg-blue-950 text-white 
         hover:bg-blue-900 transition-colors flex justify-betweem items-center px-3">
          <IconPlus />
          <span className="ml-3">Crear nuevo usuario</span> 
        </button>
      </header>
      <UserCard modal={modal} handleCloseModal={handleCloseModal} register={register}
      handleSubmit={handleSubmit} createUser={createUser} isUpdating={!!userToEdit}
      updateUser={updateUser} errors={errors}/>
      <div className="grid justify-center">
      <UsersList users={users} deleteUser={deleteUser} handleUpdateUser={handleUpdateUser}/>
      </div>
    </main>
  );
}

export default App;
