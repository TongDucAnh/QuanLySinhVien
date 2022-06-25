function Employee(
  tknv,
  fullName,
  email,
  password,
  workDay,
  basicSalary,
  position,
  workTime
) {
  this.tknv = tknv;
  this.fullName = fullName;
  this.email = email;
  this.password = password;
  this.workDay = workDay;
  this.basicSalary = basicSalary;
  this.position = position;
  this.workTime = workTime;

  // Hàm tính tổng lương từng loại nhân viên
  this.totalSalary = function () {
    var total;
    if (this.position === "Sếp") {
      total = this.basicSalary * 3;
    } else if (this.position === "Trưởng Phòng") {
      total = this.basicSalary * 2;
    } else {
      total = this.basicSalary * 1;
    }
    return total;
  };

  // Hàm tìm loại nhân viên
  this.employeeType = function () {
    var rank = "";
    if (this.workTime >= "192") {
      rank = "Xuất sắc";
    } else if (this.workTime >= "176") {
      rank = "Giỏi";
    } else if (this.workTime >= "160") {
      rank = "Khá";
    } else if (this.workTime < "160") {
      rank = "Trung Bình";
    }
    return rank ? rank : "Không xác định";
  };
}
