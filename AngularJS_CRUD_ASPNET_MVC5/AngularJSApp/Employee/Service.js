//Service to get data from employee mvc controller 
myapp.service('employeeService', function ($http) {


    //read employees
    this.getAllEmployees = function () {
        return $http.get('/Employee/GetEmployee');
    }

    //add new employee
    this.save = function (Employee) {
        var request = $http({
            method: 'post',
            url: '/Employee/Insert',
            data: Employee
        });
        return request;
    }

    //update Employee records
    this.update = function (Employee) {
        var updaterequest = $http({
            method: 'post',
            url: '/Employee/Update',
            data: Employee
        });
        return updaterequest;
    }

    //delete record
    this.delete = function (UpdateEmpNo) {
        return $http.post('/Employee/Delete/' + UpdateEmpNo);
    }
});
