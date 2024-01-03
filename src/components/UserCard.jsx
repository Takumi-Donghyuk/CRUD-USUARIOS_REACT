import { IconArrowsMinimize } from "@tabler/icons-react"


const UserCard = ({modal, handleCloseModal, handleSubmit, register, createUser,
     isUpdating, updateUser, errors}) => {
    //* Funciones
    const submit = (currentUser) => {
        isUpdating ? updateUser(currentUser) : createUser(currentUser)
    }
  return (
    <section className={`fixed bg-black/60 top-0 left-0 right-0 h-screen flex justify-center 
    items-center transition-all ${
        modal ? "visible opacity-100" : "invisible opacity-0"
    }`} 
    >
        <form onSubmit={handleSubmit(submit)} className="grid gap-3 bg-white p-5 rounded-md relative">

            <button onClick={handleCloseModal} type="button" className="absolute top-2 right-2 hover:text-red-500 transition-colors">
                <IconArrowsMinimize size={20}/>
            </button>
            <h2 className="text-center font-semibold">{isUpdating ? "Actualizar usuario" : "Crear usuario"}</h2>

            <label className="grid gap-1">
                <span className="text-sm font-semibold">
                    Nombre <span className="text-red-500">*</span>
                </span>
                <input 
                    className="border-2 rounded-md p-1 outline-none" 
                    type="text" 
                    { ... register("first_name", {
                        required: {
                            value: true,
                            message: "Este campo es requerido"
                        },
                        maxLength: {
                            value: 20,
                            message: "Escriba maximo 20 caracteres"
                        },
                        minLength: {
                            value: 5,
                            message: "Escriba minimo 5 caracteres"
                        }
                    })} />
                    {errors.first_name && (
                    <span className="text-red-500 text-xs">{errors.first_name.message}</span>
                        )}
            </label>

            <label className="grid gap-1">
                <span className="text-sm font-semibold">
                    Apellidos <span className="text-red-500">*</span>
                </span>
                <input 
                    className="border-2 rounded-md p-1 outline-none" 
                    type="text" 
                    { ... register("last_name", {
                        required: {
                            value: true,
                            message: "Este campo es requerido"
                        },
                        maxLength: {
                            value: 20,
                            message: "Escriba maximo 20 caracteres"
                        },
                        minLength: {
                            value: 5,
                            message: "Escriba minimo 5 caracteres"
                        }
                    })} />
                    {errors.last_name && (
                    <span className="text-red-500 text-xs">{errors.last_name.message}</span>
                        )}
            </label>

            <label className="grid gap-1">
                <span className="text-sm font-semibold">
                    Correo <span className="text-red-500">*</span>
                </span>
                <input 
                    className="border-2 rounded-md p-1 outline-none" 
                    type="email"
                    { ... register("email")} />
            </label>

            <label className="grid gap-1">
                <span className="text-sm font-semibold">
                    Contraseña <span className="text-red-500">*</span>
                </span>
                <input 
                    className="border-2 rounded-md p-1 outline-none" 
                    type="password"
                    { ... register("password")}  />
            </label>

            <label className="grid gap-1">
                <span className="text-sm font-semibold">
                    Fecha de nacimiento
                </span>
                <input 
                    className="border-2 rounded-md p-1 outline-none" 
                    type="date"
                    { ... register("birthday")}  />  
            </label>

            <label className="grid gap-1">
                <span className="text-sm font-semibold">
                    Url de la imagen
                </span>
                <input 
                    className="border-2 rounded-md p-1 outline-none" 
                    type="text"
                    { ... register("image_url")}  />
            </label>
            
            <button className="bg-blue-950 text-white p-1 hover:bg-blue-900 
            transition-colors hover:tracking-widest">{isUpdating ? "Guardar cambios" : "Crear"}</button>
        </form>
    </section>
  )
}
export default UserCard