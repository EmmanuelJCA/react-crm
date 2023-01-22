import { Form, useNavigate, useLoaderData, redirect } from "react-router-dom"
import Swal from "sweetalert2"
import CustomerForm from "../components/CustomerForm"
import { getCustomer, updateCustomer } from "../api/customers"

export async function loader({params}) {
    const customer = await getCustomer(params.customerId)

    if(Object.values(customer).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'Cliente no encontrado'
        })
    }
    return customer
}

export async function action({request, params}){
    const formData = await request.formData()
    const customerData = Object.fromEntries(formData)

    const email = formData.get('email')

    // Validation

    if(Object.values(customerData).includes('')) {
        return Swal.fire({
            title: 'Todos los campos son obligatorios',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
        })
    }
    
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")

    if(!regex.test(email)) {
        return Swal.fire({
            title: 'Email no valido',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
        })
    }

    await updateCustomer(params.customerId, customerData)
    return redirect('/')
}

function EditCustomer() {
    const navigate = useNavigate()
    const customer = useLoaderData()

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
            <p className='mt-3'>Modifica los campos a editar</p>

            <div className='flex justify-end'>
                <button
                    className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'
                    onClick={() => navigate(-1)}
                >
                    Volver
                </button>
            </div>

            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">

                <Form
                    method="post"
                    noValidate
                >

                    <CustomerForm
                        customer={customer}
                    />
                    <input 
                        type="submit" 
                        className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"     
                        value="Guardar Cambios"           
                    />
                </Form>
                

            </div>
        </>
    )
}

export default EditCustomer
