const db = require("../config/database");

exports.createEmployee = async (req, res) => {
  const { employee_id, amount, from_date, to_date } = req.body;
  const { rows } = await db.query(
    "INSERT INTO employees.salary (employee_id, amount, from_date,to_date) VALUES ($1, $2, $3, $4)",
    [employee_id, amount, from_date, to_date]
  );

  res.status(201).send({
    message: "Salary added successfully!",
    body: {
      salary: { employee_id, amount, from_date,to_date }
    },
  });
};


  exports.listAllEmployees = async (req, res) => {
    const response = await db.query('SELECT * FROM employees.employee ORDER BY id ASC');
    res.status(200).send(response.rows);
  };

  exports.findEmployeeById = async (req, res) => {
    const employee_id = req.params.id;
    const response = await db.query('SELECT * FROM employees.employee WHERE id = $1', [employee_id]);
    res.status(200).send(response.rows);
  }



  