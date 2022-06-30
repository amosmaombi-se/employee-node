const db = require("../config/database");

exports.createSalary = async (req, res) => {
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


  exports.listAllSalaries = async (req, res) => {
    const response = await db.query('SELECT * FROM employees.salary ORDER BY employee_id ASC limit 1000000');
    res.status(200).send(response.rows);
  };

  exports.findSalaryById = async (req, res) => {
    const employee_id = req.params.employee_id;
    const response = await db.query('SELECT * FROM employees.salary WHERE employee_id = $1', [employee_id]);
    res.status(200).send(response.rows);
  }

  exports.updateSalaryById = async (req, res) => {
    const employee_id = parseInt(req.params.employee_id);
    const { amount, from_date, to_date } = req.body;
  
    const response = await db.query(
      "UPDATE employees.salary SET amount = $1, from_date = $2, to_date = $3 WHERE employee_id = $4",
      [amount, from_date, to_date, employee_id]
    );
    res.status(200).send({ message: "Salary Updated Successfully!" });
  };

  exports.deleteSalaryById = async (req, res) => {
    const employee_id = parseInt(req.params.employee_id);
    await db.query('DELETE FROM employees.salary WHERE employee_id = $1', [employee_id]);
    res.status(200).send({ message: 'Salary deleted successfully!', employee_id });
  };