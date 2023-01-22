export async function getCustomers() {
    const response = await fetch(import.meta.env.VITE_API_URL)
    const result = await response.json()
    return result
}

export async function getCustomer(id) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
    const result = await response.json()
    return result
}

export async function addCustomer(data) {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
        await response.json()
    } catch (error) {
        console.log(error)
    }
}

export async function updateCustomer(id, data) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
        await response.json()
    } catch (error) {
        console.log(error)
    }
}