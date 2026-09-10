const calculateAge = (dob) => {
    const years = Math.floor((Date.now() - new Date(dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    return Math.max(1, years)
}

export default calculateAge