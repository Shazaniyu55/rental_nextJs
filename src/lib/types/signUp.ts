export type signUpDetails ={
    email:string,emailVerificationCode:string,
    phone:string
    password:string
    confirmPassword:string
    type:'Agent' | 'Client'
    typeClass:'Individual' | 'Company',
    tc:boolean
  }
 
  