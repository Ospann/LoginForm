'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import emailValidation from '@/helpers/emailValidation'
import passwordValidation from '@/helpers/passValidation'

type FormData = {
    email: string
    password: string
}

type ValidationErrors = {
    email: string | null
    password: string | null
}

export default function LoginPage() {
    // Initialize form data state
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    })

    // Initialize error state for form validation
    const [error, setError] = useState<string>('')

    // Initialize response message state for API response
    const [responseMessage, setResponseMessage] = useState<string | null>(null)

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
        email: null,
        password: null,
    })

    // Initialize state to control password visibility
    const [showPassword, setShowPassword] = useState(false)

    // Function to handle form input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    // Function to validate the form data
    const validateForm = () => {
        const errors: ValidationErrors = { email: null, password: null }
        if (!emailValidation(formData.email)) {
            errors.email = 'Invalid email format'
        }
        if (!passwordValidation(formData.password)) {
            errors.password =
                'Password must be at least 8 characters long and contain at least one uppercase letter, one digit, and one special character.'
        }
        setValidationErrors(errors)
        return Object.values(errors).every((error) => error === null)
    }

    // Function to handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!validateForm()) return

        // Send a POST request to the login API
        axios
            .post('/api/login', formData)
            .then((res) => {
                // Handle successful API response
                const data = res.data
                const token = data.jwtToken
                localStorage.setItem('token', token)
                setError('')
                setResponseMessage(
                    data.message + ` your token set in LocalStore`,
                )
            })
            .catch((err) => {
                // Handle API error response
                const message = err.response.data.message
                setResponseMessage('')
                setError(message)
            })
    }

    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white rounded-lg p-6"
            >
                <h1 className="text-2xl font-semibold mb-2 text-center">
                    Welcome Back
                </h1>
                <p className="text-gray-500 mb-4 text-center">
                    Enter your credentials to access your account
                </p>
                {error && (
                    <div className="text-red-500 mb-2 text-center">{error}</div>
                )}
                {responseMessage && (
                    <div className="text-green-500 mb-2 text-center">
                        {responseMessage}
                    </div>
                )}
                <div className="mb-4">
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input border border-gray-300 rounded-md px-2 py-1 mt-1 block w-full text-center"
                    />
                    {validationErrors.email && (
                        <div className="text-red-500 mt-2 text-center">
                            {validationErrors.email}
                        </div>
                    )}
                </div>
                <div className="mb-4 relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="form-input border border-gray-300 rounded-md px-2 py-1 mt-1 block w-full text-center pr-10"
                    />
                    <button
                        type="button"
                        className="absolute top-2 right-2"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? (
                            <BsFillEyeSlashFill />
                        ) : (
                            <BsFillEyeFill />
                        )}
                    </button>
                    {validationErrors.password && (
                        <div className="text-red-500 mt-2 text-center">
                            {validationErrors.password}
                        </div>
                    )}
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-lg w-full"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
