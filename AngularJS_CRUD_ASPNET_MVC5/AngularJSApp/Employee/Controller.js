//employee controller 
myapp.controller('employee-controller', function ($scope, employeeService, toaster) {

    //Loads all Employee records when page loads
    loadEmployees();
    
    function loadEmployees() {
        var EmployeeRecords = employeeService.getAllEmployees();
        EmployeeRecords.then(function (d) {
            $scope.Employees = d.data;
        },
        function () {
            //alert("Error occured while fetching employee list...");
            toaster.error("Error", "Error occured while loading employee data");
        });
    }

    //save employee data 
    $scope.save = function () {

        $scope.$broadcast('show-errors-check-validity');

        if ($scope.AddNewForm.$invalid) { 
            return;
        }

        var Employee = {
            EmpNo: $scope.EmpNo,
            EmpName: $scope.EmpName,
            Email: $scope.Email,
            DeptName: $scope.DeptName,
            Designation: $scope.Designation
        };
        var saverecords = employeeService.save(Employee);
        saverecords.then(function (d) {
            if (d.data.success === true) {
                loadEmployees();
               // alert("Employee added successfully");
                toaster.success({ title: "Success", body: "Employee added successfully" });
                $scope.resetSave();
            }
            else {
                //alert("Employee not added.");
                toaster.error("Error", "Employee not added. Try Again...");
            }
        },
        function () {
           // alert("Error occurred while adding employee.");
            toaster.error("Error", "Error occured while adding employee data");
        });

        $('#AddNew').modal('hide');
    }

    //reset controls after save operation
    $scope.resetSave = function () {
        $scope.$broadcast('show-errors-reset');
        $scope.EmpNo = '';
        $scope.EmpName = '';
        $scope.Email = '';
        $scope.DeptName = '';
        $scope.Designation = '';
    }

    //get single record by ID
    $scope.getForUpdate = function (Employee) {
        $scope.UpdateEmpNo = Employee.EmpID;
        $scope.UpdateEmpName = Employee.EmpName;
        $scope.UpdateEmail = Employee.Email;
        $scope.UpdateDeptName = Employee.DeptName;
        $scope.UpdateDesignation = Employee.Designation;
    }

    //get data for delete confirmation
    $scope.getForDelete = function (Employee) {
        $scope.UpdateEmpNo = Employee.EmpID;
        $scope.UpdateEmpName = Employee.EmpName;
    }

    //update Employee data
    $scope.update = function () {

        $scope.$broadcast('show-errors-check-validity');
        if ($scope.UpdateEmployeeForm.$invalid) {
            return;
        }

        var Employee = {
            EmpID: $scope.UpdateEmpNo,
            EmpName: $scope.UpdateEmpName,
            Email: $scope.UpdateEmail,
            DeptName: $scope.UpdateDeptName,
            Designation: $scope.UpdateDesignation
        };
        var updaterecords = employeeService.update(Employee);
        updaterecords.then(function (d) {
            if (d.data.success === true) {
                loadEmployees();
                //alert("Employee updated successfully");
                toaster.success({ title: "Success", body: "Employee updated successfully" });
                $scope.resetUpdate();
            }
            else {
                 //alert("Employee not updated.");
                toaster.error("Error", "Employee not updated. Try again...");
            }
        },
        function () {
            //alert("Error occured while updating employee record");
            toaster.error("Error", "Error occured while updating employee data");
        });

        $('#UpdateModal').modal('hide');
    }

    //reset controls after update
    $scope.resetUpdate = function () {
        $scope.$broadcast('show-errors-reset');
        $scope.UpdateEmpNo = '';
        $scope.UpdateEmpName = '';
        $scope.UpdateEmail = '';
        $scope.UpdateDeptName = '';
        $scope.UpdateDesignation = '';
    }

    //delete Employee record
    $scope.delete = function (UpdateEmpNo) {
        var deleterecord = employeeService.delete($scope.UpdateEmpNo);
        deleterecord.then(function (d) {
            if (d.data.success === true) {
                loadEmployees();
                //alert("Employee deleted succussfully");
                toaster.success({ title: "Success", body: "Employee deleted successfully" });
                $scope.$broadcast('show-errors-reset');
            }
            else {
                //alert("Employee not deleted.");
                toaster.error("Error", "Employee not deleted. Try again...");
            }
        });
    }
});
