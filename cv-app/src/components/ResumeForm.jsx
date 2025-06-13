import { useState } from 'react'

function InputForm( {label, name, value, onChange, type='text'} ) {
    return (
        <div>
            <label>{label} </label>
            <input
                className='border-2 border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
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
        <div >
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
        </div>
    )
}

export default function GeneralInfo() {
    const [personalInfo, setPersonalInfo] = useState({
        firstName: '',
        lastName: '',
        address: '',
        email: ''
    })

    const personalInfoFields = [
        { label: 'First Name', name: 'firstName' },
        { label: 'Last Name', name: 'lastName' },
        { label: 'Address', name: 'address' },
        { label: 'Email', name: 'email' }
    ]

    const handlePersonalInputChange = e => {
        const { value, name } = e.target
        setPersonalInfo(prev => ({
            ...prev, [name] : value
        }))
    }

    //education

    const [educationalInfo, setEducationalInfo] = useState([{
        schoolName: '',
        degree: '',
        startDate: '',
        endDate: ''
    }])

    const educationalInfoFields = [
        { label: 'School Name', name: 'schoolName' },
        { label: 'Degree', name: 'degree' },
        { label: 'Start Date', name: 'startDate', type: 'date' },
        { label: 'End Date', name: 'endDate', type: 'date' }
    ]

    const handleEducationalInputChange = (index, e) => {
        const { value, name } = e.target
        setEducationalInfo(prev => {
            const updated = [...prev]
            updated[index][name] = value
            return updated
        })
    }

    const addEducationEntry = () => {
        setEducationalInfo(prev => [...prev,
            {schoolName: '',
            degree: '',
            startDate: '',
            endDate: ''}
        ])
    }

    const removeEducationEntry = (index) => {
        setEducationalInfo(prev => prev.filter((_, i) => i !== index))
    }
    return (
        <div >
            <FormGenerator
                fields={personalInfoFields}
                data={personalInfo}
                onChange={handlePersonalInputChange}
            />
            {educationalInfo.map((entry, index) => (
                <div key={index}> Education {index + 1}
                    <FormGenerator
                        fields={educationalInfoFields}
                        data={entry}
                        onChange={e => handleEducationalInputChange(index, e)}
                    />
                    <button className='bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded-full font-bold ' type='button' onClick={ () => removeEducationEntry(index)}>Remove Entry</button>
                </div>
            
            ))}
            <button className='bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded-full font-bold' onClick={addEducationEntry}>Add</button>
        </div>
        
    )
}