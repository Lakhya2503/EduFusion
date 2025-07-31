import { Router } from 'express'

const router = Router()

router.route('/courses/create').post(createCourses)

export default router