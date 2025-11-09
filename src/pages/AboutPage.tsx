import React from "react";
import {
  FaConciergeBell,
  FaPhoneAlt,
  FaUsers,
  FaWineGlassAlt,
} from "react-icons/fa";
import { GiChefToque, GiKnifeFork } from "react-icons/gi";
import { IoLocation } from "react-icons/io5";
import { mapUrl, phone } from "../components/ContactSection/ContactSection";
import colors from "../config/colors";
import { usePopup } from "../hooks/usePopup";

const highlights = [
  {
    title: "Ẩm thực tinh tế",
    description:
      "Từ hải sản tươi sống đến những món ăn đặc sản vùng miền, DATBAN Quán luôn giữ vững chất lượng với nguyên liệu được tuyển chọn kỹ lưỡng mỗi ngày.",
    icon: <FaWineGlassAlt className="text-2xl" />,
  },
  {
    title: "Khung cảnh tuyệt đẹp",
    description:
      "Không gian được thiết kế mở với nhiều góc nhìn thoáng đãng, view đẹp. Thực khách có thể thưởng thức món ăn trong bầu không khí dễ chịu.",
    icon: <FaUsers className="text-2xl" />,
  },
  {
    title: "Đầu bếp kinh nghiệm",
    description:
      "Đội ngũ bếp với hơn 10 năm kinh nghiệm tại các nhà hàng nổi tiếng, luôn sáng tạo thực đơn theo mùa và theo nhu cầu của khách.",
    icon: <GiChefToque className="text-2xl" />,
  },
];

const eventServices = [
  {
    title: "Tiệc sinh nhật & kỷ niệm",
    description:
      "Trang trí theo chủ đề, thực đơn riêng và quà tặng đặc biệt dành cho nhân vật chính trong buổi tiệc.",
  },
  {
    title: "Gặp mặt đối tác",
    description:
      "Không gian riêng tư, dịch vụ chuyên nghiệp, giúp bạn tạo ấn tượng tốt đẹp với đối tác và khách hàng.",
  },
  {
    title: "Tụ họp bạn bè",
    description:
      "Tổ chức ăn uống nhậu nhẹt cùng bạn bè, đồng nghiệp giúp tình cảm đi lên, lưu trữ nhiều kỉ niểm đáng nhớ.",
  },
];

const storytellingSections = [
  {
    title: "Menu đa dạng – mỗi món ăn là một câu chuyện",
    paragraphs: [
      "Nhắc đến DATBAN Quán là nhắc đến thực đơn phong phú được thay đổi liên tục theo mùa. Từ hải sản tươi rói, món nướng đậm vị đến những món nhậu đặc sản vùng miền, mọi hương vị đều được đội ngũ đầu bếp chăm chút tỉ mỉ trong từng công đoạn. Nguyên liệu được tuyển chọn mỗi ngày, đảm bảo độ tươi ngon và giữ trọn hương vị đặc trưng của từng món ăn. Nhờ vậy, mỗi lần ghé quán, thực khách luôn có cảm giác mới mẻ khi khám phá những món mới trong thực đơn theo mùa, không bị nhàm chán",
      "Các combo được thiết kế cân bằng giữa món khai vị, món chính và lẩu, giúp tiết kiệm thời gian chọn món mà vẫn đảm bảo bữa tiệc đầy đủ. Chỉ cần chia sẻ khẩu vị, đội ngũ bếp sẽ giúp bạn có set menu vừa miệng nhất.",
    ],
    image: "/menu.jpg",
    alt: "Thực đơn DATBAN Quán",
    caption: "Combo tiết kiệm – lựa chọn linh hoạt cho nhóm bạn và gia đình.",
  },
  {
    title: "Không gian mở – góc nào cũng nên thơ",
    paragraphs: [
      "Không chỉ gây ấn tượng bởi những món ăn ngon, DATBAN Quán còn khiến thực khách say mê nhờ không gian mở cùng tầm nhìn tuyệt đẹp. Từ quán, bạn có thể thưởng thức cảnh sông uốn lượn, ánh đèn mờ ảo phản chiếu trên mặt nước, hay ngắm nhìn những tán cây xanh mát tạo cảm giác thư giãn và gần gũi với thiên nhiên. Không gian rộng rãi và thoáng đãng giúp bạn vừa tận hưởng bữa ăn vừa cảm nhận trọn vẹn bầu không khí trong lành và ánh sáng tự nhiên chan hòa",
      "Mỗi góc đều được chăm chút với nhiều concept trang trí: từ phong cách phố cổ đến hơi thở hiện đại. Vậy nên dù bạn thích chụp ảnh sống ảo hay muốn một góc yên tĩnh để trò chuyện, DATBAN Quán đều có thể đáp ứng.",
    ],
    image: "/viewsong.jpg",
    alt: "Không gian DATBAN Quán",
    caption: "View rộng thoáng, đầy cảm hứng cho các buổi tụ họp và check-in.",
  },
  {
    title: "Đội ngũ nhân viên tận tình – dịch vụ tạo nên khác biệt",
    paragraphs: [
      "Từ khâu đặt bàn, sắp xếp chỗ ngồi đến phục vụ tận nơi, đội ngũ nhân viên tại DATBAN Quán luôn chủ động và tận tâm hỗ trợ thực khách. Mỗi thao tác, từ hướng dẫn chọn món, gợi ý set menu phù hợp đến việc chăm sóc bữa ăn tại bàn, đều được thực hiện với sự chu đáo và chuyên nghiệp. Chúng tôi tin rằng sự nhiệt tình, niềm vui trong nụ cười và thái độ thân thiện của nhân viên chính là gia vị vô hình, góp phần làm cho mỗi bữa tiệc tại quán trở nên trọn vẹn, dễ chịu và đáng nhớ.",
      "Đội ngũ bếp và phục vụ thường xuyên được đào tạo để cập nhật xu hướng phục vụ mới, đảm bảo từng món ăn lên bàn đều nóng hổi, đúng chuẩn và mang lại trải nghiệm trọn vẹn nhất cho khách hàng.",
    ],
    image: "/nhanvien.jpg",
    alt: "Nhân viên phục vụ DATBAN Quán",
    caption: "Nhân viên tận tâm chăm sóc từng bàn, giữ lửa cho bữa tiệc.",
  },
];

const AboutPage: React.FC = () => {
  const { openPopup } = usePopup();

  return (
    <div className="bg-gray-50 pb-16">
      <section className="px-4 pt-12">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="relative h-56 md:h-72">
            <img
              src="/bannerabout.jpg"
              alt="Không gian DATBAN Quán"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-15" />
          </div>

          <div className="p-8 md:p-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1
                  className="text-3xl md:text-4xl font-extrabold"
                  style={{ color: colors.primary.green }}
                >
                  DATBAN QUÁN
                </h1>
                <p className="text-gray-500 mt-2 text-base md:text-lg">
                  Quán nhậu sáng nhất Hà Nội
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <span
                    className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full text-white"
                    style={{ backgroundColor: colors.primary.green }}
                  >
                    ĐANG MỞ
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">
                    Giờ mở cửa: 60:00 - 22:00
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.primary.yellow }}
                >
                  <FaPhoneAlt className="text-xl text-white" />
                </div>
                <div className="text-sm font-semibold text-[#603A03]">
                  {phone}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 border border-gray-100 rounded-2xl overflow-hidden">
              <div className="py-4 px-6 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Sức chứa
                </p>
                <p className="text-lg md:text-xl font-bold text-gray-900">
                  500 KHÁCH
                </p>
              </div>
              <div className="py-4 px-6 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Diện tích
                </p>
                <p className="text-lg md:text-xl font-bold text-gray-900">
                  1000 M2
                </p>
              </div>
              <div className="py-4 px-6 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Số tầng
                </p>
                <p className="text-lg md:text-xl font-bold text-gray-900">
                  3 TẦNG
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <button
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm"
                style={{
                  backgroundColor: colors.primary.green,
                  color: "white",
                }}
                onClick={() => openPopup("order")}
              >
                <FaConciergeBell className="text-base" />
                Đặt bàn ngay
              </button>

              <a
                href="/menu"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold border transition-all duration-200"
                style={{
                  borderColor: colors.primary.green,
                  color: colors.primary.green,
                }}
              >
                <GiKnifeFork className="text-lg" />
                Xem thực đơn
              </a>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold border transition-all duration-200"
                style={{
                  borderColor: colors.primary.green,
                  color: colors.primary.green,
                }}
              >
                <IoLocation className="text-lg" />
                Xem bản đồ
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 mt-16 space-y-16">
        {storytellingSections.map((block, index) => {
          const isEven = index % 2 === 0;
          return (
            <article
              key={block.title}
              className="bg-white rounded-3xl shadow-md overflow-hidden"
            >
              <div
                className={`flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="md:w-1/2 p-8 md:p-10 space-y-4">
                 
                  <h3 className="text-2xl font-bold text-gray-900">
                    {block.title}
                  </h3>
                  {block.paragraphs.map((para) => (
                    <p
                      key={para}
                      className="text-sm md:text-base text-gray-600 leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>
                <div className="md:w-1/2 flex flex-col">
                  <img
                    src={block.image}
                    alt={block.alt}
                    className="w-full h-64 md:h-full object-cover"
                  />
                  <p className="text-xs text-gray-500 italic px-4 py-3 bg-white">
                    {block.caption}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="max-w-5xl mx-auto px-4 mt-16">
        <div className="text-center mb-10">
          <span className="uppercase tracking-widest text-sm text-orange-500 font-semibold">
            vì sao khách hàng chọn chúng tôi
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-gray-900">
            Hơn một nhà hàng, DATBAN Quán là nơi lưu giữ khoảnh khắc
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl shadow-md p-6 space-y-3 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: colors.primary.green,
                  color: "white",
                }}
              >
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 mt-16">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-10 space-y-5">
              
              <h3 className="text-2xl font-bold text-gray-900">
                Địa điểm lý tưởng cho mọi bữa tiệc của bạn
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Từ tiệc thân mật đến sự kiện doanh nghiệp, DATBAN Quán đồng hành
                cùng bạn với dịch vụ trọn gói: thiết kế không gian, thực đơn
                riêng và đội ngũ phục vụ chuyên nghiệp.
              </p>
              <ul className="space-y-3">
                {eventServices.map((service) => (
                  <li
                    key={service.title}
                    className="flex items-start space-x-3 text-sm text-gray-700"
                  >
                    <span
                      className="mt-1 w-2 h-2 rounded-full"
                      style={{ backgroundColor: colors.primary.yellow }}
                    ></span>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {service.title}
                      </p>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-72 md:h-full">
              <img
                src="daubep.png"
                alt="Sự kiện DATBAN"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-20" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 mt-16">
        <div className="bg-green-700 rounded-2xl py-12 px-6 md:px-12 text-center text-white space-y-6">
          <h3 className="text-3xl font-bold">
            Sẵn sàng đặt bàn cho buổi tụ họp tiếp theo?
          </h3>
          <p className="text-sm md:text-base text-green-100 max-w-3xl mx-auto">
            Đội ngũ DATBAN Quán luôn sẵn sàng hỗ trợ bạn đặt bàn nhanh chóng,
            lựa chọn thực đơn phù hợp và chuẩn bị những chi tiết nhỏ nhất để bữa
            tiệc trở nên hoàn hảo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button
              className="px-6 py-3 rounded-lg font-semibold transition-colors"
              style={{
                backgroundColor: colors.primary.yellow,
                color: colors.primary.green,
              }}
              onClick={() => openPopup("order")}
            >
              Đặt bàn ngay
            </button>
            <a
              href="/menu"
              className="px-6 py-3 rounded-lg font-semibold border transition-colors"
              style={{ borderColor: colors.primary.yellow }}
            >
              Xem thực đơn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
