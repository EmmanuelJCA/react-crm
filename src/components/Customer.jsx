

function Customer({customer}) {

    const {name, company, email, phone, id} = customer
    return (
        <tr className="border-b ">
            <td className="p-6 space-y-2">
                <p className="text-2-xl text-grey-800">{name}</p>
                <p>{company}</p>
            </td>
            <td className="p-6">
                <p className="text-gray-600"> <span className="text-grey-800 uppercase font-bold">Email: </span>{email}</p>
                <p className="text-gray-600"> <span className="text-grey-800 uppercase font-bold">Telefono: </span>{phone}</p>
            </td>
            <td className="p-6 flex gap-3">
                <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"
                >
                    Editar
                </button>

                <button
                    type="button"
                    className="text-red-600 hover:text-red-700 uppercase font-bold text-xs"
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}

export default Customer
