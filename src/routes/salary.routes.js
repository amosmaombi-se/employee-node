const router = require('express-promise-router')();
const salaryController = require('../controllers/salary.controller');

router.post('/salary', salaryController.createSalary);

router.get('/salaries', salaryController.listAllSalaries);

router.get('/salaries/:id', salaryController.findSalaryById);

router.put('/salaries/:id', salaryController.updateSalaryById);

router.delete('/salaries/:id', salaryController.deleteSalaryById);

module.exports = router;