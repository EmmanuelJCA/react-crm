import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Swal from "sweetalert2"
import CustomerForm from "../components/CustomerForm"
import { addCustomer } from "../api/customers"

export async function action({request}) {
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

    await addCustomer(customerData)

    return redirect('/')
}

function NewCustomer() {

    const navigate = useNavigate()

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
            <p className='mt-3'>Registra un nuevo cliente</p>

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

                    <CustomerForm />
                    <input 
                        type="submit" 
                        className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"     
                        value="Registrar cliente"           
                    />
                </Form>
                

            </div>
        </>
    )
}

export default NewCustomer
