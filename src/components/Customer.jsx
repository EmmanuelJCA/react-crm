import { useNavigate, useSubmit, Form, redirect } from "react-router-dom"
import { deleteCustomer } from "../api/customers"
import Swal from "sweetalert2"

export async function action({ params }) {
    await deleteCustomer(params.customerId)
    return redirect('/')
}

function Customer({ customer }) {

    const navigate = useNavigate()
    const submit = useSubmit()

    const { name, company, email, phone, id } = customer
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
                    onClick={() => navigate(`/customers/${id}/edit`)}
                >
                    Editar
                </button>

                <Form
                    method='post'
                    action={`/customers/${id}/destroy`}
                    onSubmit={e => {
                        e.preventDefault()
                        Swal.fire({
                            title: 'Deseas eliminar este registro?',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Si, Eliminar!'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                submit(null, { method: "post", action: `/customers/${id}/destroy` })
                                Swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )
                            }
                        })
                    }}
                >
                    <button
                        type="submit"
                        className="text-red-600 hover:text-red-700 uppercase font-bold text-xs"
                    >
                        Eliminar
                    </button>
                </Form>
            </td>
        </tr>
    )
}

export default Customer
