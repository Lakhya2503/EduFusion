import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { USER_TEMPORARY_TOKEN_EXPIRY } from '../utils/constant.js'

const userSchema = new Schema(
  {
        username : {
           type : String,
           required: true,
           lowercase : true,
           trim :  true
        },
        studentId : {
            type : String,
        },
        fullName : {
            type : String
        },
        email : {
           type : String,
           required: true,
        },
        password : {
          type : String,
          required : true
        },
        avatar : {
            type : String  // clodinary uri
        },
        bio : {
          type : String,
        },
        gender : {
            type : String
        },
        phonNum : {
          type : String
        },
        studyIn : {
            type : String
        },
        domain : {
          type : String
        },
        isActive : {
          type : Boolean,
          default  : true
        },
        role : {
           type : String,
           required : true,
           default : "student",
           enum : ["admin", "teacher", "student"]
        },
         isEmailVerified : {
            type : Boolean,
            default  : false
        },
         refreshToken : {
            type : String,
            default : ""
        } ,
        forgetPasswordToken : {
          type :  String,
        },
        forgetPasswordExpiry : {
          type :  Date,
        },
        emailVerificationToken : {
          type : String
        },
        emailVerificationExpiry : {
           type : Date
        }
  }, { timestamps : true }
)

userSchema.pre("insertMany", function (next, docs) {
  docs.forEach(doc => {
    if (doc.password) {
      doc.password = bcrypt.hashSync(doc.password, 10);
    }
  });
  next();
});

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect  = function(password) {
    return bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    const payload = {
        _id : this._id,
        email : this.email,
        fullName : this.fullName
    }

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function() {
    const payload = {
        _id : this._id
    }

    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    })
}

userSchema.methods.generateTemporaryToken = function() {
      const unHashedToken = crypto.randomBytes(20).toString("hex")
      const hashToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex")

        const tokenExpiry = Date.now() + USER_TEMPORARY_TOKEN_EXPIRY

        return {
            unHashedToken,
            hashToken,
            tokenExpiry
        }
}


const User = model("User", userSchema)
export default User;
