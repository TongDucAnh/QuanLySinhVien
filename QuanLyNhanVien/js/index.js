var employeeList = [];

document.getElementById("btnThemNV").onclick = createEmployee;
function createEmployee() {
  // lấy input
  var tknv = document.getElementById("tknv").value;
  var fullName = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var workDay = document.getElementById("datepicker").value;
  var basicSalary = document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var workTime = document.getElementById("gioLam").value;

  var isValid = validation();
  if (!isValid) {
    return alert("Vui lòng kiểm tra giá trị của các input");
  }

  var foundIndex = findByAc(tknv);
  if (foundIndex !== -1) {
    return alert("Tài khoản này đã bị trùng!");
  }

  var newEmployee = new Employee(
    tknv,
    fullName,
    email,
    password,
    workDay,
    basicSalary,
    position,
    workTime
  );

  employeeList.push(newEmployee);

  console.log(employeeList);

  renderTable();

  saveData();

  reset();
}

function reset() {
  location.reload();
}

function renderTable(data) {
  if (!data || data[""]) {
    data = employeeList;
  }

  var html = "";
  for (var i = 0; i < data.length; i++) {
    var currentEmployee = data[i];

    html += `<tr>
            <td>${currentEmployee.tknv}</td>
            <td>${currentEmployee.fullName}</td>
            <td>${currentEmployee.email}</td>
            <td>${dayjs(currentEmployee.workDay).format("MM/DD/YYYY")}</td>
            <td>${currentEmployee.position}</td>        
            <td>${currentEmployee.totalSalary()}</td>
            <td>${currentEmployee.employeeType()}</td> 
                      
            <td><button class="btn btn-danger" onclick="deleteEmployee('${
              currentEmployee.tknv
            }')">Xóa<buton>
            <button class="btn btn-info" onclick="getEmployeeInfo('${
              currentEmployee.tknv
            }')">Cập nhật<buton></td>
            </tr>`;
  }
  document.getElementById("tableDanhSach").innerHTML = html;
}

function saveData() {
  localStorage.setItem("list", JSON.stringify(employeeList));
}

function getData() {
  var employeeListStr = localStorage.getItem("list");
  console.log(JSON.parse(employeeListStr));
  if (!employeeListStr) return;
  employeeList = mapData(JSON.parse(employeeListStr));

  renderTable();
}

getData();

function mapData(dataFromLocal) {
  var mappedData = [];
  for (var i = 0; i < dataFromLocal.length; i++) {
    var item = dataFromLocal[i];
    // console.log(item);
    var newEmployee = new Employee(
      item.tknv,
      item.fullName,
      item.email,
      item.password,
      item.workDay,
      item.basicSalary,
      item.position,
      item.workTime
    );
    mappedData.push(newEmployee);
  }

  return mappedData;
}

function findByAc(tknv) {
  for (var i = 0; i < employeeList.length; i++) {
    if (employeeList[i].tknv === tknv) {
      return i;
    }
  }

  return -1;
}

function deleteEmployee(tknv) {
  var index = findByAc(tknv);

  if (index === -1) {
    alert("Id không hợp lệ!");
    return;
  }

  employeeList.splice(index, 1);

  renderTable();

  saveData();
}

function findEmployee() {
  var result = [];

  var keyword = document
    .getElementById("searchName")
    .value.toLowerCase()
    .trim();

  for (var i = 0; i < employeeList.length; i++) {
    var currentEmployee = employeeList[i];
    console.log(currentEmployee);
    if (currentEmployee.employeeType().toLowerCase().includes(keyword)) {
      result.push(currentEmployee);
    }
  }

  console.log(result);

  renderTable(result);
}

function getEmployeeInfo(tknv) {
  var index = findByAc(tknv);

  if (index === -1) {
    alert("Id không hợp lệ!");
    return;
  }

  var foundEmployee = employeeList[index];

  document.getElementById("tknv").value = foundEmployee.tknv;
  document.getElementById("name").value = foundEmployee.fullName;
  document.getElementById("email").value = foundEmployee.email;
  document.getElementById("password").value = foundEmployee.password;
  document.getElementById("datepicker").value = foundEmployee.workDay;
  document.getElementById("luongCB").value = foundEmployee.basicSalary;
  document.getElementById("chucvu").value = foundEmployee.position;
  document.getElementById("gioLam").value = foundEmployee.workTime;

  document.getElementById("btnThemNV").style.display = "none";
  document.getElementById("btnThem").click();
}

document.getElementById("btnCapNhat").onclick = updateEmployee;
function updateEmployee() {
  // lấy dữ liệu từ input
  var tknv = document.getElementById("tknv").value;
  var fullName = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var workDay = document.getElementById("datepicker").value;
  var basicSalary = document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var workTime = document.getElementById("gioLam").value;

  var index = findByAc(tknv);

  if (index === -1) {
    alert("Id không hợp lệ!");
    return;
  }

  var foundEmployee = employeeList[index];

  foundEmployee.fullName = fullName;
  foundEmployee.email = email;
  foundEmployee.password = password;
  foundEmployee.workDay = workDay;
  foundEmployee.basicSalary = basicSalary;
  foundEmployee.position = position;
  foundEmployee.workTime = workTime;

  renderTable();

  saveData();

  alert("Cập nhật thành công!");

  document.getElementById("btnThemNV").style.display = "block";
  document.getElementById("btnThem").click();

  reset();
}

function validation() {
  if (!isValid) {
    var inpTknv = document.getElementById("tknv");
    var spanTknv = document.getElementById("tbTKNV");

    if (inpTknv.validity.valueMissing) {
      spanTknv.style.display = "block";
      spanTknv.innerHTML = "Tài khoản không được để trống!";
    } else if (inpTknv.validity.tooLong || inpTknv.validity.tooShort) {
      spanTknv.style.display = "block";
      spanTknv.innerHTML = "Tài khoản nhân viên phải từ 4 đến 6 ký số!";
    } else {
      spanTknv.innerHTML = "";
    }

    var inpName = document.getElementById("name");
    var spanName = document.getElementById("tbTen");

    if (inpName.validity.valueMissing) {
      spanName.style.display = "block";
      spanName.innerHTML = "Tên nhân viên không được để trống!";
    } else if (inpName.validity.patternMismatch) {
      spanName.style.display = "block";
      spanName.innerHTML = "Không được nhập số!";
    } else {
      spanName.innerHTML = "";
    }
    var inpEmail = document.getElementById("email");
    var spanEmail = document.getElementById("tbEmail");

    if (inpEmail.validity.valueMissing) {
      spanEmail.style.display = "block";
      spanEmail.innerHTML = "Email không được để trống!";
    } else if (inpEmail.validity.patternMismatch) {
      spanEmail.style.display = "block";
      spanEmail.innerHTML = "Email không đúng định dạng!";
    } else {
      spanEmail.innerHTML = "";
    }

    var inpPassWord = document.getElementById("password");
    var spanPassWord = document.getElementById("tbMatKhau");

    if (inpPassWord.validity.valueMissing) {
      spanPassWord.style.display = "block";
      spanPassWord.innerHTML = "PassWord không được để trống!";
    } else if (inpPassWord.validity.patternMismatch) {
      spanPassWord.style.display = "block";
      spanPassWord.innerHTML =
        "PassWord  6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)!";
    } else {
      spanPassWord.innerHTML = "";
    }
    var inpDate = document.getElementById("datepicker");
    var spanDate = document.getElementById("tbNgay");

    if (inpDate.validity.valueMissing) {
      spanDate.style.display = "block";
      spanDate.innerHTML = "Ngày tháng năm không được để trống!";
    } else if (inpDate.validity.typeMismatch) {
      spanDate.style.display = "block";
      spanDate.innerHTML = "Phải đúng định dạng mm/dd/yyyy!";
    } else {
      spanDate.innerHTML = "";
    }
    var inpSalary = document.getElementById("luongCB");
    var spanSalary = document.getElementById("tbLuongCB");

    if (inpSalary.validity.valueMissing) {
      spanSalary.style.display = "block";
      spanSalary.innerHTML = "Lương không được để trống!";
    } else if (
      inpSalary.validity.rangeUnderflow ||
      inpSalary.validity.rangeOverflow
    ) {
      spanSalary.style.display = "block";
      spanSalary.innerHTML = "Phải đúng định lương cơ bản!";
    } else {
      spanSalary.innerHTML = "";
    }

    var inpPosition = document.getElementById("chucvu");
    var spanPosition = document.getElementById("tbChucVu");

    if (inpPosition.validity.valueMissing) {
      spanPosition.style.display = "block";
      spanPosition.innerHTML = "Chức vụ không được để trống!";
    } else {
      spanPosition.innerHTML = "";
    }

    var inpTime = document.getElementById("gioLam");
    var spanTime = document.getElementById("tbGiolam");

    if (inpTime.validity.valueMissing) {
      spanTime.style.display = "block";
      spanTime.innerHTML = "Giờ làm không được để trống!";
    } else if (
      inpTime.validity.rangeUnderflow ||
      inpTime.validity.rangeOverflow
    ) {
      spanTime.style.display = "block";
      spanTime.innerHTML = "Số giờ làm trong tháng 80 - 200 giờ";
    } else {
      spanTime.innerHTML = "";
    }
  }

  return isValid;
}
