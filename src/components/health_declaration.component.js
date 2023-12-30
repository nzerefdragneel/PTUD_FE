import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { Component } from "react";
import UserService from "../services/user.service";
import { Navigate, Link } from "react-router-dom";
import authService from "../services/auth.service";
const required = (value) => {
  if (!value) {
    return (
      <div className="text-error-color text-base" role="alert">
        Thông tin này không được bỏ trống !
      </div>
    );
  }
};
export default class Health_Declaration extends Component {
  constructor(props) {
    super(props);
    this.handleEdituser = this.handleEdituser.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    var user = authService.getCurrentUser();
    this.state = {
      userId: user.id,
      username: user.username,
      email: user.email,
      password: "",
      successful: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  handleEdituser(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
    });

    UserService.EditUser(
      this.state.userId,
      this.state.username,
      this.state.email,
      this.state.password
    ).then(
      (response) => {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(response.data));
        this.setState({
          message: response.data.message,
          successful: true,
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage,
        });
      }
    );
  }

  render() {
    const user = authService.getCurrentUser();

    if (user == null) {
      return <Navigate replace to="/" />;
    }
    return (
      <div className="  px-2 py-2  mx-2">
        <div className="flex flex-col  w-full">
          <div className="flex flex-row text-lg justify-center">
            <h2>KHAI BÁO SỨC KHOẺ </h2>
          </div>
        </div>
        <form
          id="healthDeclaration"
          onSubmit={this.handleEdituser}
          ref={(c) => {
            this.form = c;
          }}
        >
          {!this.state.successful && (
            <>
              {/* Chi tiết về người được bảo hiểm  */}
              <div className="sm:col-span-4 p-3 border-solid border-2 border-indigo-600">
                <h4 className="font-medium text-sm ">
                  {" "}
                  CHI TIẾT VỀ SỨC KHOẺ CỦA NGƯỜI ĐƯỢC BẢO HIỂM{" "}
                </h4>
                <label
                  htmlFor="Q1"
                  className="block text-sm font-medium leading-6 text-gray-900 pt-2 "
                >
                  NĐBH có hút thuốc trong vòng 12 tháng gần đây không? Nếu có,
                  vui lòng cho biết số điếu hút bình quân trong 1 ngày
                </label>
                <div className="mt-2">
                  <input
                    id="Q1"
                    name="Q1"
                    type="number"
                    Min="0"
                    autoComplete="0"
                    // value="A"
                    validations={required}
                    placeholder="Số điều/ ngày ( Nếu không hãy nhập 0 ) "
                    className="block w-1/2
                     rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <label
                  htmlFor="Q2"
                  className="block text-sm font-medium leading-6 text-gray-900 pt-2 "
                >
                  Lần cuối cùng NĐBH uống rượu/bia khoảng 5 đơn vị cồn trở lên
                  là từ khi nào? (1 đơn vị cồn = 1 lon bia 330 ml = 1 chén rượu
                  (≈ 40 , 30ml) )
                </label>
                <div className="mt-2">
                  <select
                    name="Q2"
                    id="Q2"
                    form="healthDeclaration"
                    className="block w-10% rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="1 tháng trước">Từ 1 tháng trước</option>
                    <option value="Từ 2-3 tháng trước">
                      Từ 2-3 tháng trước
                    </option>
                    <option value="Từ 4-12 tháng trước ">
                      Từ 4-12 tháng trước{" "}
                    </option>
                    <option value="Trên 12 tháng">Trên 12 tháng</option>
                    <option value="Không uống">Không uống</option>
                    <option value="Luôn uống dưới 5 đơn vị cồn">
                      Luôn uống dưới 5 đơn vị cồn
                    </option>
                  </select>
                </div>

                <label
                  htmlFor="Q3"
                  className="block text-sm font-medium leading-6 text-gray-900 pt-2 "
                >
                  Q3. NĐBH đã từng hoặc đang sử dụng cần sa, ma túy, thuốc
                  phiện, cocain, heroin, morphin, thuốc lắc, hoặc các chất gây
                  nghiện khác mà không có chỉ định của bác sỹ không?
                </label>
                <div className="mt-2">
                  <select
                    name="Q3"
                    id="Q3"
                    form="healthDeclaration"
                    className="block w-1/4 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Có "> Có </option>
                    <option value="Không">Không</option>
                  </select>
                </div>

                <label
                  htmlFor="Q4"
                  className="block text-sm font-medium leading-6 text-gray-900 pt-2 "
                >
                  Q4. NNĐBH có tham gia hoặc dự định tham gia bất kỳ môn thể
                  thao nguy hiểm nào sau đây không: lặn, leo núi, nhảy dù, đua
                  xe, lướt ván hoặc những môn thể thao nguy hiểm khác?
                </label>
                <div className="mt-2">
                  <select
                    name="Q4"
                    id="Q4"
                    form="healthDeclaration"
                    className="block w-1/4 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Có "> Có </option>
                    <option value="Không">Không</option>
                  </select>
                </div>
                <label
                  htmlFor="Q6"
                  className="block text-sm font-medium leading-6 text-gray-900 pt-2 "
                >
                  Q5. NĐBH có cha/mẹ/anh/chị/em ruột được chẩn đoán các bệnh sau
                  trước năm 60 tuổi không? Ung thư, tiểu đường, bệnh tim mạch,
                  bệnh thận đa nang, đa polyp, Alzheimer, Parkinson, xơ cứng bì?
                </label>
                <div className="mt-2">
                  <select
                    name="Q5"
                    id="Q5"
                    form="healthDeclaration"
                    className="block w-1/4 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Có "> Có </option>
                    <option value="Không">Không</option>
                  </select>
                </div>
                <label
                  htmlFor="Q6"
                  className="block text-sm font-medium leading-6 text-gray-900 pt-2 "
                >
                  Q6. Trong vòng 12 tháng tới, NĐBH có dự dịnh đi và ở nước
                  ngoài từ 2 tháng trở lên không?
                </label>
                <div className="mt-2">
                  <select
                    name="Q6"
                    id="Q6"
                    form="healthDeclaration"
                    className="block w-1/4 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Có "> Có </option>
                    <option value="Không">Không</option>
                  </select>
                </div>
                <label
                  htmlFor="Q7"
                  className="block text-sm font-medium leading-7 text-gray-900 pt-2 "
                >
                  Q7. NĐBH đã từng hoặc đang yêu cầu bảo hiểm từ bất kỳ công ty
                  bảo hiểm nào mà bị tăng phí, l
                </label>
                <div className="mt-2">
                  <select
                    name="Q6"
                    id="Q6"
                    form="healthDeclaration"
                    className="block w-1/4 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Có "> Có </option>
                    <option value="Không">Không</option>
                  </select>
                </div>
                <label
                  htmlFor="Q8"
                  className="block text-sm font-medium leading-8 text-gray-900 pt-2 "
                >
                  Q8. NĐBH đã từng được chẩn đoán: Ung thư, dị sản (ung thư tại
                  chỗ), suy thận, đái tháo đường, HIV/AIDS, đột quỵ, cơn thiếu
                  máu não thoáng qua hoặc bất kỳ bệnh nào liên quan đến tim?
                </label>
                <div className="mt-2">
                  <select
                    name="Q8"
                    id="Q8"
                    form="healthDeclaration"
                    className="block w-1/4 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Có "> Có </option>
                    <option value="Không">Không</option>
                  </select>
                </div>

                <label
                  htmlFor="Q9"
                  className="block text-sm font-medium leading-9 text-gray-900 pt-2 "
                >
                  Q9. Trong vòng 5 năm vừa qua, NĐBH có từng được chẩn đoán hoặc
                  đang theo dõi: hen (suyễn), tăng huyết áp, tăng mỡ máu, bệnh
                  tuyến giáp, viêm gan, bệnh tuyến vú, u nang buồng trứng, u xơ
                  tử cung, bệnh phổi tắc nghẽn mạn tính (COPD), bệnh tiền liệt
                  tuyến?
                </label>
                <div className="mt-2">
                  <select
                    name="Q9"
                    id="Q9"
                    form="healthDeclaration"
                    className="block w-1/4 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Có "> Có </option>
                    <option value="Không">Không</option>
                  </select>
                </div>
                <label
                  htmlFor="Q10"
                  className="block text-sm font-medium leading-9 text-gray-900 pt-2 "
                >
                  Q10 .Ngoài các bệnh trên, trong vòng 5 năm vừa qua, NĐBH có
                  bất kỳ vấn đề sức khỏe nào dẫn đến: Nghỉ làm hoặc nghỉ học hơn
                  1 tuần; hoặc Uống thuốc liên tục kéo dài trên 2 tuần; hoặc Nằm
                  viện hoặc tiểu phẫu/phẫu thuật trong ngày; hoặc Có chỉ định
                  theo dõi của bác sỹ?
                </label>
                <div className="mt-2">
                  <select
                    name="Q10"
                    id="Q10"
                    form="healthDeclaration"
                    className="block w-1/4 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Có "> Có </option>
                    <option value="Không">Không</option>
                  </select>
                </div>
                <label
                  htmlFor="Q11"
                  className="block text-sm font-medium leading-9 text-gray-900 pt-2 "
                >
                  Q11 .Trong vòng 5 năm vừa qua, NĐBH có mắc bất kỳ bệnh nào sau
                  đây không: Dengue (sốt xuất huyết), thương hàn, viêm ruột do
                  amip, sốt rét?
                </label>
                <div className="mt-2">
                  <select
                    name="Q11"
                    id="Q11"
                    form="healthDeclaration"
                    className="block w-1/4 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Có "> Có </option>
                    <option value="Không">Không</option>
                  </select>
                </div>
                <label
                  htmlFor="Q12"
                  className="block text-sm font-medium leading-9 text-gray-900 pt-2 "
                >
                  Q12 .Ngoài các bệnh kể trên, NĐBH có đang chờ kết quả hoặc
                  được tư vấn thực hiện bất kỳ xét nghiệm nào không?
                </label>
                <div className="mt-2">
                  <select
                    name="Q12"
                    id="Q12"
                    form="healthDeclaration"
                    className="block w-1/4 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Có "> Có </option>
                    <option value="Không">Không</option>
                  </select>
                </div>
                <label
                  htmlFor="Q13"
                  className="block text-sm font-medium leading-9 text-gray-900 pt-2 "
                >
                  Q13 .Câu hỏi dành cho NỮ: NĐBH có đang mang thai không?
                </label>
                <div className="mt-2">
                  <select
                    name="Q13"
                    id="Q13"
                    form="healthDeclaration"
                    className="block w-1/4 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Có "> Có </option>
                    <option value="Không">Không</option>
                  </select>
                </div>
                <label
                  htmlFor="Q14"
                  className="block text-sm font-medium leading-9 text-gray-900 pt-2 "
                >
                  Q14 .Câu hỏi dành cho TRẺ EM (dưới 2 tuổi): Cân nặng lúc sinh?
                </label>
                <div className="mt-2">
                  <input
                    id="CanNang"
                    name="CanNang"
                    type="number"
                    min="0"
                    max="20"
                    autoComplete="off"
                    validations={required}
                    className="block w-1/2 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4 p-3 border-solid border-2 border-indigo-600">
                <h4 className="font-bold text-sm "> CAM KẾT TƯ VẤN VIÊN </h4>
                <div className="text-sm text-gray-950">
                  <p>
                    Tôi cam kết rằng những thông tin trong TKSK này là những
                    thông tin duy nhất mà BMBH/NĐBH cung cấp cho tôi và tôi cũng
                    đã không hề che giấu hoặc hướng dẫn cho Khách hàng tạo dựng
                    nên bất cứ thông tin nào có thể gây ảnh hưởng đến quyết định
                    chấp nhận bảo hiểm của Công ty đối với Khách hàng. Tôi cũng
                    cam kết đã gặp trực tiếp BMBH/NĐBH để: đối chiếu bản sao các
                    giấy tờ nhân thân/ giấy tờ chứng minh tư cách pháp nhân đã
                    nộp với bản chính; giải thích rõ ràng các câu hỏi về nghề
                    nghiệp, tài chính và sức khỏe trong TKSK này; đồng thời đã
                    tư vấn cho BMBH/NĐBH đúng theo quy định trong điều khoản hợp
                    đồng bảo hiểm của Công ty và đã không đưa ra bất cứ ý kiến
                    nào gây ảnh hưởng đến việc hoàn tất TKSK của Khách hàng. TÔI
                    XIN XÁC NHẬN NHỮNG CHỮ KÝ TRÊN ĐƯỢC THỰC HIỆN TRƯỚC SỰ CHỨNG
                    KIẾN CỦA TÔI.
                  </p>
                </div>
              </div>
              <div className=" flex items-center justify-end gap-x-6">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 my-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Nộp đơn
                </button>
              </div>
            </>
          )}
          {this.state.message && (
            <div className="form-group">
              <div
                className={
                  this.state.successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {this.state.message}
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }
}
