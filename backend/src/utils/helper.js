


export const  secretKeyUse = (trimKey) => {
  let role;

  let secretkey = trimKey ? trimKey?.trim() :  ""

   if(secretkey === process.env.ADMIN_SECRET_KEY) {
        role = "admin"
      } else if(secretkey === process.env.TEACHER_SECRET_KEY){
        role = "teacher"
      } else {
        role = "student"
      }

      return role
}
