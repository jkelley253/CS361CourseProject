// employee/routes/employeeRoutes.mjs

import express from 'express'; 
import EmployeeController from '../controllers/employeeController.mjs';


const router = express.Router(); 

// route to get all employees
router.get('/', EmployeeController.getActiveEmployees);

export default router;