import { Router } from "express"
import { registerAdmin } from "../controller/admin.controller.js";
import { upload } from '../middleware/multer.middleware.js'

const router = Router()


router.route("/register/admin").post(upload.fields([
    {
        name: 'avatar',
        maxCount : 1
    }
]) ,registerAdmin);

export default router