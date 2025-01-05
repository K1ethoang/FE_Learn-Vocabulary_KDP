import React from "react";
import BuildingScreen from "../exceptions/BuildingScreen";
import { Card } from "antd";

const PrivacyScreen = () => {
  return (
    <div className="flex justify-center items-center">
      <Card
        title="Chính Sách Quyền Riêng Tư"
        bordered={false}
        className="max-w-4xl w-full shadow-lg  text-base"
      >
        <p className="text-gray leading-relaxed text-base">
          Chúng tôi tại KDP cam kết bảo vệ quyền riêng tư của bạn. Chính sách
          này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá
          nhân của bạn khi sử dụng nền tảng học tiếng Anh của chúng tôi.
        </p>

        <h4 className="text-lg font-semibold mt-4">
          1. Thông Tin Chúng Tôi Thu Thập
        </h4>
        <p className="text-gray">
          - Thông tin tài khoản: Tên, email, mật khẩu (được mã hóa).
          <br />- Thông tin học tập: Lịch sử học, kết quả bài kiểm tra.
        </p>

        <h4 className="text-lg font-semibold mt-4">
          2. Cách Chúng Tôi Sử Dụng Thông Tin
        </h4>
        <p className="text-gray">
          - Cung cấp dịch vụ học tiếng Anh tốt hơn.
          <br />
          - Cá nhân hóa nội dung
          <br />- Phân tích để cải thiện nền tảng.
        </p>

        <h4 className="text-lg font-semibold mt-4">3. Bảo Mật Thông Tin</h4>
        <p className="text-gray">
          Chúng tôi sử dụng các công nghệ mã hóa và tường lửa hiện đại để bảo vệ
          thông tin cá nhân của bạn. Chỉ có nhân viên được ủy quyền mới có quyền
          truy cập dữ liệu này.
        </p>

        <h4 className="text-lg font-semibold mt-4">4. Quyền Của Người Dùng</h4>
        <p className="text-gray">
          Bạn có quyền truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình
          bất cứ lúc nào bằng cách liên hệ với chúng tôi qua email:
          <a href="mailto:support@kdp-english.gmail.com">
            support@kdp-english.gmail.com
          </a>
        </p>

        <h2 className="text-lg font-semibold mt-4">5. Liên Hệ</h2>
        <p className="text-gray">
          Nếu bạn có bất kỳ câu hỏi nào về chính sách quyền riêng tư, vui lòng
          liên hệ với chúng tôi:
          <br />
          Email:{" "}
          <a href="http://support@kdp-english.com">support@kdp-english.com</a>
          <br />
          Điện thoại: <a href="tel:+">(+84)234567890</a>
        </p>
      </Card>
    </div>
  );
};

export default PrivacyScreen;
