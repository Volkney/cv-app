import { useState } from 'react'

function InputForm( {label, name, value, onChange, type='text'} ) {
    return (
        <div className='w-200'>
            <label>{label} </label>
            <input
                className='w-full border-2 border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
                name={name}
                value={value}
                onChange={onChange}
                type={type}
            />
        </div>
    )
}

function FormGenerator({fields, data, onChange}) {
    return (
        <>
            {fields.map(field => (<p key={field.name}>{field.label} : {data[field.name]}</p>))}
            {fields.map(field => (
                <InputForm
                label={field.label}
                key={field.name}
                name={field.name}
                value={data[field.name]}
                onChange={onChange}
                type={field.type}
                />))}
        </>
    )
}

export default function GeneralInfo() {
    const [personalInfo, setPersonalInfo] = useState({
        firstName: '',
        lastName: '',
        address: '',
        email: ''
    })

    const generalInfo = [
        { label: 'First Name', name: 'firstName' },
        { label: 'Last Name', name: 'lastName' },
        { label: 'Address', name: 'address' },
        { label: 'Email', name: 'email' }
    ]

    const handleInputChange = e => {
        const { value, name } = e.target
        setPersonalInfo(prev => ({
            ...prev, [name] : value
        }))
    }
    return (
        <FormGenerator
            fields={generalInfo}
            data={personalInfo}
            onChange={handleInputChange} />
    )
}