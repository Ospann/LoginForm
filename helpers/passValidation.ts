/**
 * Function to check password format
 * @param password 
 * @returns boolean valid password or not
 */
const passwordValidation= (password:string):boolean=>{
    return /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/.test(password);
}

export default passwordValidation;