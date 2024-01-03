import { IconEdit, IconGift, IconTrash } from "@tabler/icons-react";

const UsersList = ({users, deleteUser, handleUpdateUser}) => {
    const capitalizeWords = (fullName) => {
        return fullName
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
      }
  return (
    <section className="max-w-[1024px] grid grid-cols-[repeat(auto-fill,_280px)] gap-4 p-4">
        {
            users.map((user) => (
                <article key={user.id} className="border-2 rounded-md p-3 hover:shadow-md transition-shadow">
                    <h2 className="font-bold text-lg line-clamp-1">{`${capitalizeWords(user.first_name)} ${capitalizeWords(user.last_name)}`}</h2>
                    <ul>
                        <li className="grid"><span className="text-gray-400">CORREO</span> {user.email}</li>
                        <li>
                            <span className="text-gray-400">CUMPLEAÑOS</span>
                            <div className="flex items-center gap-2">
                                <IconGift /> {user.birthday} 
                            </div>
                        </li>
                    </ul>
                    <br />
                    <div className="flex justify-end gap-2">
                        <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white border-2 rounded-md p-1"><IconTrash /></button>
                        <button onClick={() => handleUpdateUser(user)} className="bg-white border border-gray-600 text-gray-600 border-2 rounded-md p-1"><IconEdit /></button>
                    </div>
                </article>
            ))
        }
    </section>
  )
}
export default UsersList