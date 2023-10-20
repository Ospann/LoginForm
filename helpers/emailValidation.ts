
/**
 * Function to check email format
 * @param email 
 * @returns boolean valid or not
 */
const emailValidation= (email:string):boolean=>{
    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)
}

export default emailValidation;