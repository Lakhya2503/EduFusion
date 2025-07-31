import { Router } from 'express'
import { createCourses } from '../controller/courses.controller.js';

const router = Router()

router.route("/create/new").post(createCourses);

export default router