// ===== 1 FALLBACK DATA (In case of CORS error when running via file:// protocol) =====
// Tạo danh sách các quyển sách
const fallbackBooks = [
    { id: 1, title: "Cơ Sở Dữ Liệu Nâng Cao", author: "Nguyễn Văn Tuấn", cat: "congnghe", status: "available", cover: "img/cosolythuyet.png", badge: "Mới", isbn: "978-604-1234" },
    { id: 2, title: "Clean Code", author: "Robert C. Martin", cat: "congnghe", status: "available", cover: "img/cleancode.png", badge: null, isbn: "978-0-13-235088" },
    { id: 3, title: "Sức Mạnh Của Thói Quen", author: "Charles Duhigg", cat: "kynang", status: "borrowed", cover: "img/sucmanhthoiquen.png", badge: "Hot", isbn: "978-604-5678" },
    { id: 4, title: "Tư Duy Nhanh & Chậm", author: "Daniel Kahneman", cat: "kynang", status: "available", cover: "img/tuduynhanhcham.png", badge: null, isbn: "978-604-9012" },
    { id: 5, title: "Nhà Giả Kim", author: "Paulo Coelho", cat: "vanhoc", status: "available", cover: "img/nhagiakim.png", badge: "Classic", isbn: "978-604-3456" },
    { id: 6, title: "Dám Nghĩ Lớn", author: "David J. Schwartz", cat: "kynang", status: "reserved", cover: "img/damnghilon.png", badge: null, isbn: "978-604-7890" },
    { id: 7, title: "Python cho Người Mới", author: "Eric Matthes", cat: "congnghe", status: "available", cover: "img/python.png", badge: "Mới", isbn: "978-1-59327" },
    { id: 8, title: "Sapiens: Lược Sử Loài Người", author: "Yuval Noah Harari", cat: "lichsu", status: "available", cover: "img/sapiens.png", badge: "Best", isbn: "978-604-2222" }
];

// Tạo danh sách các phiếu mượn sách
const fallbackBorrowRecords = [
    { bookId: 1, borrowDate: "12/05/2024", dueDate: "26/05/2024", status: "overdue", qr: "QR-LV-001" },
    { bookId: 2, borrowDate: "15/05/2024", dueDate: "29/05/2024", status: "soon", qr: "QR-LV-002" },
    { bookId: 3, borrowDate: "17/05/2024", dueDate: "31/05/2024", status: "ok", qr: "QR-LV-003" }
];

// =====2 E-BOOK CONTENTS STORE =====
const bookContents = {
    1: {
        title: "Cơ Sở Dữ Liệu Nâng Cao",
        chapters: [
            {
                title: "Chương 1: Chỉ mục B-Tree và tối ưu hóa",
                content: `
                    <p>Trong các hệ thống cơ sở dữ liệu quan hệ, hiệu năng truy vấn phụ thuộc rất lớn vào cách chúng ta lập chỉ mục (indexing). Chỉ mục B-Tree (Balanced Tree) là cấu trúc dữ liệu tự cân bằng được sử dụng phổ biến nhất để tăng tốc độ tìm kiếm, chèn, xóa và cập nhật dữ liệu.</p>
                    <p>Một cây B-Tree có cấu trúc gồm các nút gốc, nút trung gian và nút lá. Tất cả dữ liệu thực tế (hoặc con trỏ trỏ đến dòng dữ liệu) thường được lưu ở các nút lá. Điểm đặc biệt của B-Tree là độ sâu của mọi nút lá là như nhau, đảm bảo thời gian truy xuất dữ liệu luôn là O(log N) trong mọi trường hợp.</p>
                    <p><strong>Nguyên tắc tối ưu hóa truy vấn:</strong></p>
                    <ol>
                        <li>Tránh tạo chỉ mục vô tội vạ vì mỗi chỉ mục sẽ làm chậm quá trình ghi (INSERT, UPDATE, DELETE).</li>
                        <li>Sử dụng Composite Index (chỉ mục kết hợp) theo quy tắc tiền tố trái (leftmost prefix).</li>
                        <li>Tránh áp dụng hàm hoặc toán toán tử lên cột có chỉ mục trong mệnh đề WHERE, vì việc này sẽ khiến cơ sở dữ liệu không thể sử dụng chỉ mục đó (gây ra Full Table Scan).</li>
                    </ol>
                `
            },
            {
                title: "Chương 2: Tối ưu hóa câu lệnh SQL",
                content: `
                    <p>Khi viết câu lệnh SQL, Optimizer của cơ sở dữ liệu sẽ phân tích cú pháp và tạo ra một Kế hoạch thực thi (Execution Plan). Kế hoạch này mô tả cụ thể cơ sở dữ liệu sẽ truy cập bảng theo thứ tự nào, sử dụng chỉ mục nào và liên kết các bảng bằng giải thuật gì (Nested Loop, Hash Join, hay Merge Join).</p>
                    <p>Để tối ưu một truy vấn chậm, lập trình viên cần sử dụng lệnh <code>EXPLAIN</code> hoặc <code>EXPLAIN ANALYZE</code> để xem chi tiết kế hoạch thực thi. Các vấn đề thường gặp bao gồm:</p>
                    <ul>
                        <li><strong>Table Scan:</strong> Truy cập toàn bộ bảng do thiếu chỉ mục hoặc chỉ mục không phù hợp.</li>
                        <li><strong>Implicit Type Conversion:</strong> Chuyển đổi kiểu dữ liệu ngầm định (ví dụ so sánh chuỗi với số), ngăn cản sử dụng chỉ mục.</li>
                        <li><strong>Subquery inefficient:</strong> Sử dụng truy vấn con không tối ưu thay vì dùng phép JOIN phù hợp.</li>
                    </ul>
                `
            },
            {
                title: "Chương 3: Giao dịch và Kiểm soát đồng thời",
                content: `
                    <p>Một giao dịch (Transaction) trong cơ sở dữ liệu là một nhóm các thao tác cần được thực hiện thành công hoàn toàn hoặc thất bại hoàn toàn để đảm bảo tính nhất quán dữ liệu. Các đặc tính cốt lõi của giao dịch được viết tắt là ACID:</p>
                    <ul>
                        <li><strong>Atomicity (Tính nguyên tử):</strong> Toàn bộ giao dịch thành công hoặc không có gì xảy ra.</li>
                        <li><strong>Consistency (Tính nhất quán):</strong> Dữ liệu chuyển từ trạng thái hợp lệ này sang trạng thái hợp lệ khác.</li>
                        <li><strong>Isolation (Tính độc lập):</strong> Các giao dịch chạy song song không được ảnh hưởng lẫn nhau.</li>
                        <li><strong>Durability (Tính bền vững):</strong> Khi giao dịch đã được COMMIT, dữ liệu sẽ được ghi nhận vĩnh viễn dù có sự cố sập nguồn.</li>
                    </ul>
                    <p>Để kiểm soát đồng thời khi nhiều người dùng cùng truy cập và sửa đổi một hàng dữ liệu, hệ quản trị cơ sở dữ liệu sử dụng các cơ chế khóa (Locking) như Khóa chia sẻ (Shared Lock - S-Lock) và Khóa độc quyền (Exclusive Lock - X-Lock), hoặc sử dụng đa phiên bản (MVCC - Multi-Version Concurrency Control) để tối đa hóa hiệu năng đọc ghi đồng thời.</p>
                `
            }
        ]
    },
    2: {
        title: "Clean Code",
        chapters: [
            {
                title: "Chương 1: Tên gọi có ý nghĩa",
                content: `
                    <p>Đặt tên là một trong những việc lập trình viên phải làm nhiều nhất khi viết code. Chúng ta đặt tên cho biến, hàm, tham số, class, package, file... Việc đặt tên tốt sẽ giúp code tự giải thích chính nó mà không cần đến quá nhiều comment.</p>
                    <p><strong>Các quy tắc đặt tên sạch:</strong></p>
                    <ol>
                        <li><strong>Thể hiện rõ mục đích:</strong> Đừng đặt tên biến là <code>d</code> cho số ngày đã trôi qua. Hãy đặt là <code>daysSinceCreation</code> hoặc <code>elapsedTimeInDays</code>.</li>
                        <li><strong>Tránh thông tin sai lệch:</strong> Đừng đặt tên một biến là <code>accountList</code> trừ khi nó thực sự là một <code>List</code>. Nếu nó là một mảng hoặc tập hợp thông thường, hãy đặt tên là <code>accounts</code> hoặc <code>accountGroup</code>.</li>
                        <li><strong>Tạo các phân biệt có nghĩa:</strong> Tránh đặt tên kiểu <code>a1</code>, <code>a2</code> hoặc các từ thừa như <code>ProductData</code> và <code>ProductInfo</code> trong cùng một dự án vì chúng không giúp người đọc phân biệt được sự khác nhau giữa chúng.</li>
                    </ol>
                `
            },
            {
                title: "Chương 2: Hàm sạch (Clean Functions)",
                content: `
                    <p>Quy tắc đầu tiên của hàm là: <strong>Chúng phải nhỏ!</strong> Quy tắc thứ hai của hàm là: <strong>Chúng phải nhỏ hơn nữa!</strong> Một hàm chỉ nên dài từ 5 đến 15 dòng.</p>
                    <p><strong>Quy tắc Single Responsibility Principle (SRP):</strong> Mỗi hàm chỉ nên làm duy nhất một việc, làm việc đó thật tốt và chỉ làm việc đó mà thôi. Nếu một hàm chứa các bước có độ trừu tượng khác nhau, hoặc bạn có thể chia nó thành các hàm nhỏ hơn với tên gọi rõ ràng, thì hàm đó đang làm quá nhiều việc.</p>
                    <p><strong>Tham số của hàm:</strong> Số lượng tham số lý tưởng của một hàm là 0 (niladic), tiếp theo là 1 (monadic), và tối đa là 2 (dyadic). Tránh sử dụng từ 3 tham số trở lên (triadic) trừ khi có lý do thực sự đặc biệt. Nếu hàm cần nhiều dữ liệu đầu vào, hãy gom nhóm chúng thành một đối tượng hoặc cấu trúc dữ liệu riêng biệt.</p>
                `
            },
            {
                title: "Chương 3: Comment và Định dạng",
                content: `
                    <p>Comment không thể cứu vãn được một đoạn code tồi. Thay vì viết comment để giải thích đoạn code phức tạp, hãy dành thời gian để tái cấu trúc (refactor) đoạn code đó cho đến khi nó tự sáng tỏ.</p>
                    <p>Tuy nhiên, vẫn có những comment tốt, ví dụ như: comment bản quyền, comment giải thích ý đồ thiết kế đặc biệt không thể làm khác được, comment cảnh báo hậu quả khi chạy một hàm cụ thể, hoặc comment TODO cho những công việc chưa hoàn thiện.</p>
                    <p>Về định dạng code, sự nhất quán là yếu tố quan trọng nhất. Hãy thiết lập một bộ quy tắc định dạng chung cho toàn nhóm (sử dụng các công cụ như Prettier hoặc ESLint) để tất cả các file nguồn đều đồng nhất về thụt lề, khoảng cách và xuống dòng.</p>
                `
            }
        ]
    },
    3: {
        title: "Sức Mạnh Của Thói Quen",
        chapters: [
            {
                title: "Chương 1: Vòng lặp thói quen",
                content: `
                    <p>Thói quen chiếm đến hơn 40% các hành vi hàng ngày của chúng ta. Bộ não con người luôn tìm cách tiết kiệm năng lượng bằng cách biến các hành động lặp đi lặp lại thành những thói quen tự động.</p>
                    <p>Mỗi thói quen đều vận hành thông qua một vòng lặp gồm 3 bước cốt lõi:</p>
                    <ol>
                        <li><strong>Gợi ý (Cue):</strong> Tác nhân kích thích bộ não chuyển sang chế độ tự động và lựa chọn thói quen nào để sử dụng. Gợi ý có thể là một địa điểm, thời gian, trạng thái cảm xúc, hoặc hành động trước đó.</li>
                        <li><strong>Hành động (Routine):</strong> Hành vi thể chất, tinh thần hoặc cảm xúc diễn ra sau gợi ý. Đây chính là bản thân thói quen đó.</li>
                        <li><strong>Phần thưởng (Reward):</strong> Trải nghiệm tích cực giúp bộ não ghi nhớ rằng vòng lặp này xứng đáng được lặp lại trong tương lai.</li>
                    </ol>
                    <p>Hiểu được vòng lặp này là chìa khóa đầu tiên để bạn có thể kiểm soát và thay đổi bất kỳ hành vi nào của bản thân.</p>
                `
            },
            {
                title: "Chương 2: Quy tắc vàng để thay đổi thói quen",
                content: `
                    <p>Để loại bỏ hoàn toàn một thói quen xấu là điều cực kỳ khó khăn. Thay vào đó, quy tắc vàng để thay đổi là: <strong>Giữ nguyên Gợi ý và Phần thưởng, chỉ thay đổi Hành động.</strong></p>
                    <p>Ví dụ, nếu bạn có thói quen ăn đồ ngọt vào lúc 3 giờ chiều (Routine) vì cảm thấy mệt mỏi và cần nghỉ ngơi (Cue), phần thưởng là cảm giác sảng khoái và được trò chuyện với đồng nghiệp (Reward). Để thay đổi thói quen này:</p>
                    <ul>
                        <li>Giữ nguyên gợi ý: Lúc 3 giờ chiều, khi cơ thể bắt đầu uể oải.</li>
                        <li>Giữ nguyên phần thưởng: Cảm giác sảng khoái và được giao tiếp xã hội.</li>
                        <li>Thay đổi Routine: Thay vì đi mua bánh ngọt, hãy đứng dậy đi bộ quanh văn phòng và nói chuyện với một người bạn trong 5 phút.</li>
                    </ul>
                    <p>Phương pháp này đã được chứng minh hiệu quả trong việc hỗ trợ điều trị cai nghiện rượu, cải thiện năng suất lao động và xây dựng lối sống lành mạnh.</p>
                `
            }
        ]
    },
    4: {
        title: "Tư Duy Nhanh & Chậm",
        chapters: [
            {
                title: "Chương 1: Hệ thống 1 và Hệ thống 2",
                content: `
                    <p>Daniel Kahneman mô tả tâm trí con người được vận hành bởi sự tương tác giữa hai hệ thống tư duy khác nhau:</p>
                    <ul>
                        <li><strong>Hệ thống 1 (Tư duy nhanh):</strong> Hoạt động tự động, nhạy bén, diễn ra vô thức và tốn rất ít năng lượng. Hệ thống này giúp chúng ta né tránh nguy hiểm ngay lập tức, nhận diện khuôn mặt người quen, hoặc đọc các từ trên một tấm bảng quảng cáo.</li>
                        <li><strong>Hệ thống 2 (Tư duy chậm):</strong> Hoạt động đòi hỏi sự tập trung cao độ, tính toán logic và nỗ lực tinh thần có ý thức. Hệ thống này được kích hoạt khi chúng ta làm toán phức tạp (như 17 x 24), điền tờ khai thuế, hoặc đỗ xe vào một khoảng trống chật hẹp.</li>
                    </ul>
                    <p>Phần lớn thời gian, Hệ thống 1 chạy tự động và Hệ thống 2 ở chế độ tiết kiệm năng lượng. Tuy nhiên, Hệ thống 1 dễ mắc các lỗi nhận thức có hệ thống (gọi là định kiến hoặc thiên kiến).</p>
                `
            },
            {
                title: "Chương 2: Các thiên kiến nhận thức phổ biến",
                content: `
                    <p>Do Hệ thống 1 luôn cố gắng đưa ra các quyết định nhanh chóng dựa trên kinh nghiệm rút gọn (heuristics), nó thường xuyên tạo ra các sai lầm trong lập luận:</p>
                    <ol>
                        <li><strong>Hiệu ứng mỏ neo (Anchoring Effect):</strong> Xu hướng bị ảnh hưởng quá mức bởi thông tin đầu tiên nhận được khi đưa ra quyết định. Ví dụ, một chiếc áo có giá niêm yết 2 triệu đồng giảm giá xuống 1 triệu đồng sẽ tạo cảm giác "rẻ", ngay cả khi giá trị thực của nó chỉ là 500 nghìn đồng.</li>
                        <li><strong>Thiên kiến xác nhận (Confirmation Bias):</strong> Xu hướng chỉ tìm kiếm, chú ý và tin tưởng vào những thông tin phù hợp với niềm tin sẵn có của bản thân, đồng thời bỏ qua các bằng chứng trái ngược.</li>
                        <li><strong>Hiệu ứng hào quang (Halo Effect):</strong> Việc đánh giá tích cực hoặc tiêu cực toàn bộ nhân cách của một người chỉ dựa trên một đặc điểm nổi bật duy nhất (ví dụ: người có ngoại hình đẹp thường được cho là thông minh và tốt bụng hơn).</li>
                    </ol>
                `
            }
        ]
    },
    5: {
        title: "Nhà Giả Kim",
        chapters: [
            {
                title: "Chương 1: Cậu bé chăn cừu Santiago",
                content: `
                    <p>Santiago là một cậu bé chăn cừu Tây Ban Nha thích đi đây đi đó. Cha mẹ cậu mong muốn cậu trở thành linh mục để mang lại niềm tự hào cho gia đình, nhưng Santiago đã chọn từ bỏ điều đó để đi chăn cừu, bởi vì chăn cừu cho phép cậu tự do đi khắp các vùng đất Andalusia xinh đẹp.</p>
                    <p>Cậu yêu đàn cừu của mình, hiểu rõ tính khí từng con và biết cách tìm cho chúng những đồng cỏ xanh tươi nhất. Tuy nhiên, gần đây cậu liên tục mơ thấy một giấc mơ kỳ lạ: một đứa trẻ dẫn cậu tới Kim Tự Tháp Ai Cập và bảo rằng cậu sẽ tìm thấy một kho báu ẩn giấu tại đó.</p>
                    <p>Giấc mơ lặp đi lặp lại khiến Santiago trăn trở. Cậu quyết định tìm đến một bà lão giải mã giấc mơ ở Tarifa và sau đó gặp một ông lão tự xưng là Vua xứ Salem, người đã dạy cậu về "Vận mệnh của đời mình" (Personal Legend).</p>
                `
            },
            {
                title: "Chương 2: Lên đường tìm kiếm Vận mệnh",
                content: `
                    <p>Nghe theo lời khuyên của nhà vua, Santiago bán đàn cừu của mình và vượt biển sang châu Phi. Ngay khi vừa đặt chân đến Tangier, cậu đã bị lừa sạch số tiền mình có. Trở nên trắng tay ở một đất nước xa lạ, không biết tiếng bản xứ, cậu có lúc đã tuyệt vọng và muốn quay trở lại kiếp chăn cừu.</p>
                    <p>Nhưng cậu nhớ lại những lời khuyên về các điềm báo và quyết tâm tiếp tục. Cậu xin vào làm việc tại một cửa hàng bán pha lê của một người đàn ông lớn tuổi. Nhờ vào sự thông minh và những ý tưởng cải tiến độc đáo của Santiago, cửa hàng pha lê ngày càng ăn nên làm ra, mang lại cho cậu một khoản tiền lớn sau một năm làm việc.</p>
                    <p>Thay vì dùng số tiền đó để mua lại đàn cừu và sống một cuộc đời an nhàn, Santiago một lần nữa lựa chọn dấn thân vào sa mạc Sahara cùng đoàn lữ hành hướng về phía Kim Tự Tháp Ai Cập.</p>
                `
            }
        ]
    },
    6: {
        title: "Dám Nghĩ Lớn",
        chapters: [
            {
                title: "Chương 1: Niềm tin tạo nên sức mạnh",
                content: `
                    <p>Thành công không phụ thuộc nhiều vào tài năng thiên bẩm hay sự may mắn, mà phụ thuộc vào niềm tin của chính bạn. Nếu bạn tin rằng mình có thể làm được, bộ não của bạn sẽ tự động tìm kiếm các giải pháp và con đường để hiện thực hóa niềm tin đó.</p>
                    <p>Ngược lại, nếu bạn mang tư duy hoài nghi và nghĩ rằng mình sẽ thất bại, bạn đang lập trình cho bản thân đi đến thất bại. Sự hoài nghi tạo ra các rào cản tâm lý khiến bạn không dám nỗ lực hết mình.</p>
                    <p><strong>Cách xây dựng niềm tin vững vàng:</strong></p>
                    <ul>
                        <li>Nghĩ đến thành công, đừng nghĩ đến thất bại. Luôn tự nhắc nhở bản thân: "Tôi sẽ làm được".</li>
                        <li>Đừng đánh giá thấp năng lực của bản thân và cũng đừng thổi phồng năng lực của người khác. Bạn giỏi hơn những gì bạn nghĩ.</li>
                        <li>Đặt ra những mục tiêu lớn. Mục tiêu lớn sẽ kích hoạt nguồn năng lượng và động lực to lớn tiềm ẩn bên trong bạn.</li>
                    </ul>
                `
            },
            {
                title: "Chương 2: Đánh bại căn bệnh tự bào chữa",
                content: `
                    <p>Sự bào chữa (Excusitis) là căn bệnh chung của những người thất bại. Họ luôn tìm kiếm các lý do bên ngoài để giải thích cho sự trì trệ của bản thân. Có 4 dạng bào chữa phổ biến nhất:</p>
                    <ol>
                        <li><strong>Bào chữa về sức khỏe:</strong> "Tôi không được khỏe", "Tôi quá mệt mỏi". Hãy nhớ rằng tinh thần tích cực có thể vượt qua mọi hạn chế về thể chất.</li>
                        <li><strong>Bào chữa về trí tuệ:</strong> "Tôi không đủ thông minh". Trong cuộc sống, thái độ ứng xử và lòng nhiệt huyết quan trọng hơn chỉ số IQ thuần túy.</li>
                        <li><strong>Bào chữa về tuổi tác:</strong> "Tôi quá già" hoặc "Tôi quá trẻ". Tuổi tác thực tế không quan trọng bằng tuổi của tâm hồn và khát vọng của bạn.</li>
                        <li><strong>Bào chữa về số phận:</strong> "Số tôi đen đủi". May mắn là kết quả của sự chuẩn bị kỹ lưỡng kết hợp với cơ hội, không phải là sự ngẫu nhiên của số phận.</li>
                    </ol>
                `
            }
        ]
    },
    7: {
        title: "Python cho Người Mới",
        chapters: [
            {
                title: "Chương 1: Biến và Các kiểu dữ liệu cơ bản",
                content: `
                    <p>Python là ngôn ngữ lập trình bậc cao, dễ học và vô cùng mạnh mẽ. Để bắt đầu với Python, chúng ta cần hiểu về cách khai báo biến và lưu trữ dữ liệu.</p>
                    <p>Trong Python, bạn không cần phải khai báo kiểu dữ liệu của biến một cách tường minh. Trình thông dịch của Python sẽ tự động nhận diện kiểu dữ liệu dựa trên giá trị bạn gán cho biến.</p>
                    <pre><code style="background:#F1F5F9; padding:10px; display:block; border-radius:6px; font-family:monospace;"># Khai báo các biến cơ bản
name = "LibraViet"      # Kiểu chuỗi (string)
age = 2                 # Kiểu số nguyên (integer)
rating = 4.8            # Kiểu số thực (float)
is_active = True        # Kiểu logic (boolean)</code></pre>
                    <p>Python hỗ trợ các kiểu dữ liệu tập hợp mạnh mẽ như List (danh sách có thứ tự, có thể thay đổi), Tuple (danh sách không thể sửa đổi), và Dictionary (tập hợp các cặp khóa-giá trị).</p>
                `
            },
            {
                title: "Chương 2: Cấu trúc điều khiển và Hàm",
                content: `
                    <p>Để điều khiển luồng thực thi của chương trình, chúng ta sử dụng cấu trúc rẽ nhánh <code>if-elif-else</code> và các vòng lặp <code>for</code>, <code>while</code>.</p>
                    <pre><code style="background:#F1F5F9; padding:10px; display:block; border-radius:6px; font-family:monospace;"># Sử dụng câu lệnh điều kiện
score = 85
if score >= 90:
    print("Xuất sắc")
elif score >= 80:
    print("Giỏi")
else:
    print("Khá/Trung bình")</code></pre>
                    <p>Định nghĩa hàm trong Python bằng từ khóa <code>def</code>. Hàm giúp tái sử dụng mã nguồn và tổ chức dự án khoa học hơn:</p>
                    <pre><code style="background:#F1F5F9; padding:10px; display:block; border-radius:6px; font-family:monospace;">def greet_user(username):
    """Hiển thị lời chào người dùng."""
    return f"Xin chào, {username}!"

message = greet_user("Nguyễn Văn A")
print(message)</code></pre>
                `
            }
        ]
    },
    8: {
        title: "Sapiens: Lược Sử Loài Người",
        chapters: [
            {
                title: "Chương 1: Cách mạng Nhận thức",
                content: `
                    <p>Khoảng 100.000 năm trước, Trái Đất là nơi sinh sống của ít nhất 6 loài người khác nhau cùng một lúc (bao gồm Homo sapiens, Neanderthal, Homo erectus...). Tuy nhiên, ngày nay chỉ còn lại duy nhất loài người tinh khôn (Homo sapiens) chúng ta tồn tại. Điều gì đã tạo nên sự khác biệt này?</p>
                    <p>Câu trả lời nằm ở **Cách mạng Nhận thức** diễn ra khoảng 70.000 năm trước. Nhờ vào những đột biến gen ngẫu nhiên, Homo sapiens đã phát triển một ngôn ngữ vô cùng độc đáo. Ngôn ngữ này không chỉ dùng để mô tả thế giới vật chất xung quanh (như "Kìa, có con sư tử!"), mà đặc biệt hơn là khả năng **tưởng tượng tập thể**.</p>
                    <p>Homo sapiens là loài duy nhất có thể tin vào những thứ không có thực trong thế giới tự nhiên như: các vị thần, quốc gia, tiền tệ, các điều luật hay các công ty cổ phần. Sự tin tưởng chung vào những huyền thoại này cho phép hàng ngàn, thậm chí hàng triệu người lạ có thể hợp tác linh hoạt với nhau hướng tới mục tiêu chung.</p>
                `
            },
            {
                title: "Chương 2: Cách mạng Nông nghiệp",
                content: `
                    <p>Khoảng 12.000 năm trước, Homo sapiens đã trải qua bước ngoặt vĩ đại thứ hai: chuyển đổi từ cuộc sống săn bắt hái lượm di cư sang trồng trọt và chăn nuôi định cư. Đây được gọi là **Cách mạng Nông nghiệp**.</p>
                    <p>Tác giả Yuval Noah Harari đã đưa ra một góc nhìn đầy khiêu khích: Cách mạng Nông nghiệp thực chất là "vụ lừa đảo lớn nhất lịch sử". Thay vì giải phóng con người, nó trói buộc loài người vào những mảnh ruộng, buộc họ phải lao động cật lực từ sáng đến tối dưới cái nắng gay gắt.</p>
                    <p>Chế độ ăn uống đơn điệu từ lúa mì, gạo, ngô làm giảm chất lượng dinh dưỡng và khiến cơ thể loài người (vốn tiến hóa để chạy nhảy tự do) bị tổn thương cột sống, khớp xương. Tuy nhiên, nông nghiệp lại cho phép dân số tăng lên nhanh chóng và tạo ra của cải dư thừa, đặt nền móng cho các đế chế và các nền văn minh đồ sộ xuất hiện.</p>
                `
            }
        ]
    }
};

let books = [];
let borrowRecords = [];
let historyRecords = [];
let currentLang = 'vi';

let isAvailableOnly = true; // matches 'Còn sách' starting on active state
let isRecommendedOnly = false;

// ===== 3 READER STATE GLOBAL VARIABLES =====
let currentReadingBookId = null;
let currentReadingPage = 0;
let currentFontSize = 16;
let currentReaderTheme = 'light';

// ===== 4 FETCH/SYNC DATA FROM LOCAL STORAGE =====
async function loadData() {
    let storedBooks = null;
    let storedBorrows = null;
    let storedHistory = null;
    try {
        storedBooks = localStorage.getItem('libraviet_books');
        storedBorrows = localStorage.getItem('libraviet_borrow_records');
        storedHistory = localStorage.getItem('libraviet_borrow_history');
    } catch (e) {
        console.error("LocalStorage access blocked", e);
    }

    let isValidDb = false;
    if (storedBooks && storedBorrows) {
        try {
            const parsedBooks = JSON.parse(storedBooks);
            const parsedBorrows = JSON.parse(storedBorrows);
            const parsedHistory = storedHistory ? JSON.parse(storedHistory) : [];
            // Verify that all books have IDs and have been migrated to use local covers (not online unsplash URLs)
            if (Array.isArray(parsedBooks) && parsedBooks.length > 0 && parsedBooks.every(b => b && b.id !== undefined && !b.cover.startsWith("http"))) {
                books = parsedBooks;
                borrowRecords = Array.isArray(parsedBorrows) ? parsedBorrows : [];
                historyRecords = Array.isArray(parsedHistory) ? parsedHistory : [];
                isValidDb = true;
                console.log("Loaded data from localStorage successfully.");
            }
        } catch (e) {
            console.warn("Error parsing localStorage data, re-initializing...", e);
        }
    }

    if (!isValidDb) {
        try {
            const booksResponse = await fetch('data/books.json');
            books = await booksResponse.json();

            const borrowsResponse = await fetch('data/borrows.json');
            borrowRecords = await borrowsResponse.json();
            historyRecords = [];
            console.log("Loaded data via Fetch API successfully.");
        } catch (error) {
            console.warn("Fetch API failed (CORS fallback). Loading local fallback data.", error);
            books = [...fallbackBooks];
            borrowRecords = [...fallbackBorrowRecords];
            historyRecords = [];
        }
        saveToLocalStorage();
    }

    //  Chuẩn hóa và đồng bộ dữ liệu
    // 1. Loại  bỏ các bản ghi mượn trùng lặp (nếu có)
    const seen = new Set();
    borrowRecords = borrowRecords.filter(r => {
        if (seen.has(r.bookId)) return false;
        seen.add(r.bookId);
        return true;
    });

    // 2. Đồng bộ trạng thái sách dựa trên các bản ghi mượn hiện tại    
    books.forEach(b => {
        const hasRecord = borrowRecords.some(r => r.bookId === b.id);
        if (hasRecord) {
            b.status = 'borrowed';
        } else if (b.status === 'borrowed') {
            b.status = 'available';
        }
    });

    normalizeHistoryRecords();
    seedHistoryFromCurrentBorrows();
    saveToLocalStorage();

    // Đoạn cuối này sẽ chạy sau khi dữ liệu đã được tải và đồng bộ hóa, đảm bảo rằng giao diện người dùng hiển thị thông tin chính xác nhất về số lượng sách, trạng thái mượn và các thống kê liên quan.   
    updateStats();

    // Set tag state based on HTML class active
    const availableTag = document.getElementById('tagAvailable');
    if (availableTag) {
        isAvailableOnly = availableTag.classList.contains('on');
    }
    const recommendedTag = document.getElementById('tagRecommend');
    if (recommendedTag) {
        isRecommendedOnly = recommendedTag.classList.contains('on');
    }

    filterBooks();
    renderBorrowTable();
    renderHistoryPage();
}
// Lưu toàn bộ dsach sách và lsu mượn trả vào trình duyệt
function saveToLocalStorage() {
    localStorage.setItem('libraviet_books', JSON.stringify(books));
    localStorage.setItem('libraviet_borrow_records', JSON.stringify(borrowRecords));
    localStorage.setItem('libraviet_borrow_history', JSON.stringify(historyRecords));
}
// Cập nhật số liệu thống kê trên dashboard và số lượng sách theo từng thể loại
function updateStats() {
    let returnedCount = parseInt(localStorage.getItem('libraviet_stat_returned') || '27');
    let points = parseInt(localStorage.getItem('libraviet_stat_points') || '580');
// Lưu ngược lại các giá trị vào bộ nhớ trình duyệt (chuyển về dạng chữ toString) để đảm bảo dữ liệu luôn khới tạo chính xác
    localStorage.setItem('libraviet_stat_returned', returnedCount.toString());
    localStorage.setItem('libraviet_stat_points', points.toString());

    // Cập nhật số liệu thống kê trên giao diện dashboard 
    const statValues = document.querySelectorAll('.stat-row .stat-val');
    if (statValues.length >= 3) {
        statValues[0].textContent = borrowRecords.length;
        statValues[1].textContent = returnedCount;
        statValues[2].textContent = points;
    }

    // Đếm số lượng sách theo thể loại
    const catCounts = {
        all: books.length,
        kynang: books.filter(b => b.cat === 'kynang').length,
        kinhte: books.filter(b => b.cat === 'kinhte').length,
        congnghe: books.filter(b => b.cat === 'congnghe').length,
        vanhoc: books.filter(b => b.cat === 'vanhoc').length,
        khoahoc: books.filter(b => b.cat === 'khoahoc').length,
        lichsu: books.filter(b => b.cat === 'lichsu').length
    };

    const catItems = document.querySelectorAll('.cat-item');
    catItems.forEach(item => {
        let key = 'all';
        const text = item.textContent.toLowerCase();

        if (text.includes('tư duy') || text.includes('kỹ năng') || text.includes('skills')) key = 'kynang';
        else if (text.includes('kinh tế') || text.includes('tài chính') || text.includes('economics') || text.includes('finance')) key = 'kinhte';
        else if (text.includes('công nghệ') || text.includes('technology') || text.includes('tech')) key = 'congnghe';
        else if (text.includes('văn học') || text.includes('literature')) key = 'vanhoc';
        else if (text.includes('khoa học') || text.includes('science')) key = 'khoahoc';
        else if (text.includes('lịch sử') || text.includes('history')) key = 'lichsu';

        const countSpan = item.querySelector('.cat-count');
        if (countSpan) {
            countSpan.textContent = catCounts[key] || 0;
        }
    });
}


// ===== HISTORY STORAGE & RENDER =====
function formatDateVN(date) {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return '--/--/----';
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function parseDateVN(value) {
    if (!value) return null;
    if (value instanceof Date) return value;
    const text = String(value).trim();
    const parts = text.split('/');
    if (parts.length === 3) {
        const d = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
        return Number.isNaN(d.getTime()) ? null : d;
    }
    const d = new Date(text);
    return Number.isNaN(d.getTime()) ? null : d;
}

function dateToSortValue(value) {
    const d = parseDateVN(value);
    return d ? d.getTime() : 0;
}

function isWithinLast30Days(value) {
    const d = parseDateVN(value);
    if (!d) return false;
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const cutoff = new Date(today);
    cutoff.setDate(today.getDate() - 30);
    cutoff.setHours(0, 0, 0, 0);
    return d >= cutoff && d <= today;
}

function normalizeHistoryRecords() {
    if (!Array.isArray(historyRecords)) historyRecords = [];
    const seen = new Set();
    historyRecords = historyRecords
        .filter(item => item && item.bookId !== undefined && item.action)
        .map((item, index) => {
            const book = books.find(b => b.id === Number(item.bookId));
            return {
                id: item.id || `HIS-${Date.now()}-${index}`,
                bookId: Number(item.bookId),
                title: item.title || (book ? book.title : 'Sách không xác định'),
                author: item.author || (book ? book.author : ''),
                cover: item.cover || (book ? book.cover : 'img/qr.png'),
                action: item.action === 'return' ? 'return' : 'borrow',
                borrowDate: item.borrowDate || item.transactionDate || formatDateVN(new Date()),
                dueDate: item.dueDate || '',
                returnDate: item.returnDate || '',
                transactionDate: item.transactionDate || item.returnDate || item.borrowDate || formatDateVN(new Date()),
                qr: item.qr || '',
                note: item.note || ''
            };
        })
        .filter(item => {
            const key = `${item.action}-${item.bookId}-${item.transactionDate}-${item.borrowDate}-${item.returnDate}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
}

function seedHistoryFromCurrentBorrows() {
    // Tự tạo nhật ký "đã mượn" cho các phiếu mượn đang có sẵn để trang lịch sử không bị mất dữ liệu cũ.
    borrowRecords.forEach(record => {
        const exists = historyRecords.some(h =>
            h.action === 'borrow' &&
            Number(h.bookId) === Number(record.bookId) &&
            h.borrowDate === record.borrowDate
        );
        if (exists) return;
        const book = books.find(b => b.id === Number(record.bookId));
        if (!book) return;
        historyRecords.push({
            id: `HIS-SEED-${record.bookId}-${String(record.borrowDate).replace(/\D/g, '')}`,
            bookId: book.id,
            title: book.title,
            author: book.author,
            cover: book.cover,
            action: 'borrow',
            borrowDate: record.borrowDate,
            dueDate: record.dueDate,
            returnDate: '',
            transactionDate: record.borrowDate,
            qr: record.qr || getBookQrValue(book),
            note: 'Dữ liệu mượn ban đầu'
        });
    });
}

function addHistoryRecord(action, book, record = {}) {
    if (!book) return;
    const today = formatDateVN(new Date());
    const item = {
        id: `HIS-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        bookId: book.id,
        title: book.title,
        author: book.author,
        cover: book.cover,
        action: action === 'return' ? 'return' : 'borrow',
        borrowDate: record.borrowDate || today,
        dueDate: record.dueDate || '',
        returnDate: action === 'return' ? (record.returnDate || today) : '',
        transactionDate: action === 'return' ? (record.returnDate || today) : (record.borrowDate || today),
        qr: record.qr || getBookQrValue(book),
        note: record.note || ''
    };
    historyRecords.push(item);
    normalizeHistoryRecords();
}

function getHistoryStatus(item) {
    if (item.action === 'borrow') {
        const isStillBorrowed = borrowRecords.some(r => Number(r.bookId) === Number(item.bookId));
        return {
            cls: isStillBorrowed ? '' : 'done',
            text: isStillBorrowed
                ? (currentLang === 'vi' ? 'Đang mượn' : 'Borrowing')
                : (currentLang === 'vi' ? 'Đã trả sau đó' : 'Returned later')
        };
    }

    const due = parseDateVN(item.dueDate);
    const returned = parseDateVN(item.returnDate || item.transactionDate);
    const isLate = due && returned && returned > due;
    return {
        cls: isLate ? 'late' : 'done',
        text: isLate
            ? (currentLang === 'vi' ? 'Trả quá hạn' : 'Returned late')
            : (currentLang === 'vi' ? 'Đã trả đúng hạn' : 'Returned on time')
    };
}

function renderHistoryPage() {
    const tbody = document.getElementById('historyTable');
    if (!tbody) return;

    normalizeHistoryRecords();
    const last30 = historyRecords.filter(item => isWithinLast30Days(item.transactionDate));
    const totalEl = document.getElementById('historyTotal');
    const borrowEl = document.getElementById('historyBorrowCount');
    const returnEl = document.getElementById('historyReturnCount');
    const monthEl = document.getElementById('historyThisMonthCount');
    if (totalEl) totalEl.textContent = historyRecords.length;
    if (borrowEl) borrowEl.textContent = last30.filter(item => item.action === 'borrow').length;
    if (returnEl) returnEl.textContent = last30.filter(item => item.action === 'return').length;
    if (monthEl) monthEl.textContent = last30.length;

    const filter = document.getElementById('historyFilter')?.value || 'last30';
    let list = [...historyRecords];
    if (filter === 'last30') list = list.filter(item => isWithinLast30Days(item.transactionDate));
    if (filter === 'borrow') list = list.filter(item => item.action === 'borrow');
    if (filter === 'return') list = list.filter(item => item.action === 'return');

    list.sort((a, b) => dateToSortValue(b.transactionDate) - dateToSortValue(a.transactionDate));

    const empty = document.getElementById('historyEmpty');
    if (list.length === 0) {
        tbody.innerHTML = '';
        if (empty) empty.style.display = 'block';
        return;
    }
    if (empty) empty.style.display = 'none';

    tbody.innerHTML = list.map(item => {
        const status = getHistoryStatus(item);
        const actionText = item.action === 'borrow'
            ? (currentLang === 'vi' ? 'Đã mượn' : 'Borrowed')
            : (currentLang === 'vi' ? 'Đã trả' : 'Returned');
        const actionIcon = item.action === 'borrow' ? '📥' : '📤';
        return `
<tr>
  <td>
    <div class="history-book-cell">
      <img src="${item.cover}" alt="${escapeQRText(item.title)}" onerror="this.src='img/qr.png'">
      <div>
        <div class="history-book-title">${item.title}</div>
        <div class="history-book-author">${item.author || ''}</div>
      </div>
    </div>
  </td>
  <td><span class="history-badge ${item.action}">${actionIcon} ${actionText}</span><br><small style="color:var(--gray-400);font-size:11px">${item.transactionDate}</small></td>
  <td>${item.borrowDate || '—'}</td>
  <td>${item.dueDate || '—'}</td>
  <td>${item.returnDate || '—'}</td>
  <td><span class="history-status ${status.cls}">${status.text}</span></td>
</tr>`;
    }).join('');
}


function updateHistoryPageLanguage(lang) {
    const hero = document.querySelector('.history-page-hero');
    if (!hero) return;
    const eyebrow = hero.querySelector('.page-eyebrow');
    const title = hero.querySelector('h1');
    const desc = hero.querySelector('p');
    const buttons = hero.querySelectorAll('.page-btn');
    const statCards = document.querySelectorAll('.history-stat-card p');
    const toolbarTitle = document.querySelector('.history-toolbar .section-title');
    const toolbarDesc = document.querySelector('.history-toolbar p');
    const filter = document.getElementById('historyFilter');
    const headers = document.querySelectorAll('.history-table th');
    const empty = document.getElementById('historyEmpty');

    if (lang === 'en') {
        if (eyebrow) eyebrow.textContent = 'LIBRARY LOG';
        if (title) title.textContent = 'Borrow & Return History';
        if (desc) desc.textContent = 'Keep track of the books you borrowed and returned in the last 30 days. The data is saved in your browser for quick review.';
        if (buttons[0]) buttons[0].textContent = '+ Borrow via QR';
        if (buttons[1]) buttons[1].textContent = '← Back home';
        const labels = ['Total transactions', 'Borrowed', 'Returned', 'Last 30 days'];
        statCards.forEach((el, idx) => { if (labels[idx]) el.textContent = labels[idx]; });
        if (toolbarTitle) toolbarTitle.innerHTML = '<span></span>Activity In The Last 30 Days';
        if (toolbarDesc) toolbarDesc.textContent = 'The history updates automatically after every QR borrow or return.';
        if (filter) {
            filter.options[0].text = 'Last 30 days';
            filter.options[1].text = 'All history';
            filter.options[2].text = 'Borrowed only';
            filter.options[3].text = 'Returned only';
        }
        const headerLabels = ['Book', 'Transaction', 'Borrow date', 'Due date', 'Return date', 'Status'];
        headers.forEach((el, idx) => { if (headerLabels[idx]) el.textContent = headerLabels[idx]; });
        if (empty) {
            const h3 = empty.querySelector('h3');
            const p = empty.querySelector('p');
            const btn = empty.querySelector('button');
            if (h3) h3.textContent = 'No history in the last 30 days';
            if (p) p.textContent = 'When you borrow or return books by QR, the system will save them here.';
            if (btn) btn.textContent = 'Scan QR to borrow';
        }
    } else {
        if (eyebrow) eyebrow.textContent = 'NHẬT KÝ THƯ VIỆN';
        if (title) title.textContent = 'Lịch Sử Mượn Trả';
        if (desc) desc.textContent = 'Lưu lại đầy đủ những cuốn sách bạn đã mượn và đã trả trong 30 ngày gần đây. Dữ liệu được lưu trên trình duyệt để bạn dễ theo dõi lại.';
        if (buttons[0]) buttons[0].textContent = '+ Mượn sách qua QR';
        if (buttons[1]) buttons[1].textContent = '← Về trang chủ';
        const labels = ['Tổng giao dịch', 'Lượt mượn', 'Lượt trả', 'Trong 30 ngày'];
        statCards.forEach((el, idx) => { if (labels[idx]) el.textContent = labels[idx]; });
        if (toolbarTitle) toolbarTitle.innerHTML = '<span></span>Hoạt Động Trong Tháng Vừa Qua';
        if (toolbarDesc) toolbarDesc.textContent = 'Lịch sử sẽ tự cập nhật sau mỗi lần mượn hoặc trả sách bằng QR.';
        if (filter) {
            filter.options[0].text = '30 ngày gần đây';
            filter.options[1].text = 'Tất cả lịch sử';
            filter.options[2].text = 'Chỉ sách đã mượn';
            filter.options[3].text = 'Chỉ sách đã trả';
        }
        const headerLabels = ['Sách', 'Giao dịch', 'Ngày mượn', 'Hạn trả', 'Ngày trả', 'Trạng thái'];
        headers.forEach((el, idx) => { if (headerLabels[idx]) el.textContent = headerLabels[idx]; });
        if (empty) {
            const h3 = empty.querySelector('h3');
            const p = empty.querySelector('p');
            const btn = empty.querySelector('button');
            if (h3) h3.textContent = 'Chưa có lịch sử trong tháng vừa qua';
            if (p) p.textContent = 'Khi bạn mượn hoặc trả sách bằng QR, hệ thống sẽ tự lưu lại tại đây.';
            if (btn) btn.textContent = 'Quét QR để mượn sách';
        }
    }
    renderHistoryPage();
}

function updateFooterLanguage(lang) {
    const footer = document.querySelector('footer.site-footer');
    if (!footer) return;
    if (lang === 'en') {
        footer.innerHTML = `
        <div class="footer-main">
            <div class="footer-brand">
                <div class="footer-logo">Libra<span>Viet</span></div>
                <p>A digital library management system for searching books, borrowing by QR code, returning books, and reading online.</p>
                <div class="footer-socials"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Email">@</a><a href="#" aria-label="Website">🌐</a></div>
            </div>
            <div class="footer-col"><h4>Quick links</h4>
                <a href="#" onclick="event.preventDefault(); setNav(document.querySelector('.nav-item:nth-child(1)'), 'all')">Home</a>
                <a href="#" onclick="event.preventDefault(); setNav(document.querySelector('.nav-item:nth-child(2)'), 'catalog')">Book categories</a>
                <a href="#" onclick="event.preventDefault(); setNav(document.querySelector('.nav-item:nth-child(3)'), 'borrow')">Borrowing</a>
                <a href="#" onclick="event.preventDefault(); setNav(document.querySelector('.nav-item:nth-child(4)'), 'history')">Borrow history</a>
            </div>
            <div class="footer-col"><h4>Library services</h4>
                <a href="#" onclick="event.preventDefault(); openQRModal('scan', 'borrow')">Borrow by QR</a>
                <a href="#" onclick="event.preventDefault(); openQRModal('scan', 'return')">Return by QR</a>
                <a href="#" onclick="event.preventDefault(); setNav(document.querySelector('.nav-item:nth-child(2)'), 'catalog')">Read online</a>
                <a href="#" onclick="event.preventDefault(); setNav(document.querySelector('.nav-item:nth-child(5)'), 'recommend')">Book recommendations</a>
            </div>
            <div class="footer-col footer-contact"><h4>Contact</h4>
                <p>📍 Tay Nguyen University</p><p>📞 0262 000 000</p><p>✉️ thuvien@libraviet.edu.vn</p><p>⏰ Mon - Sat: 07:30 - 17:00</p>
            </div>
        </div>
        <div class="footer-bottom"><span>© 2026 LibraViet. Built by LNH Group.</span><span>Terms · Privacy · Student support</span></div>`;
    } else {
        footer.innerHTML = `
        <div class="footer-main">
            <div class="footer-brand">
                <div class="footer-logo">Libra<span>Viet</span></div>
                <p>Hệ thống quản lý thư viện số giúp sinh viên tra cứu, mượn trả sách bằng QR và đọc sách online nhanh chóng.</p>
                <div class="footer-socials"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Email">@</a><a href="#" aria-label="Website">🌐</a></div>
            </div>
            <div class="footer-col"><h4>Liên kết nhanh</h4>
                <a href="#" onclick="event.preventDefault(); setNav(document.querySelector('.nav-item:nth-child(1)'), 'all')">Trang chủ</a>
                <a href="#" onclick="event.preventDefault(); setNav(document.querySelector('.nav-item:nth-child(2)'), 'catalog')">Danh mục sách</a>
                <a href="#" onclick="event.preventDefault(); setNav(document.querySelector('.nav-item:nth-child(3)'), 'borrow')">Sách đang mượn</a>
                <a href="#" onclick="event.preventDefault(); setNav(document.querySelector('.nav-item:nth-child(4)'), 'history')">Lịch sử mượn trả</a>
            </div>
            <div class="footer-col"><h4>Dịch vụ thư viện</h4>
                <a href="#" onclick="event.preventDefault(); openQRModal('scan', 'borrow')">Mượn sách bằng QR</a>
                <a href="#" onclick="event.preventDefault(); openQRModal('scan', 'return')">Trả sách bằng QR</a>
                <a href="#" onclick="event.preventDefault(); setNav(document.querySelector('.nav-item:nth-child(2)'), 'catalog')">Đọc sách online</a>
                <a href="#" onclick="event.preventDefault(); setNav(document.querySelector('.nav-item:nth-child(5)'), 'recommend')">Gợi ý sách hay</a>
            </div>
            <div class="footer-col footer-contact"><h4>Thông tin liên hệ</h4>
                <p>📍 Trường Đại học Tây Nguyên</p><p>📞 0262 000 000</p><p>✉️ thuvien@libraviet.edu.vn</p><p>⏰ Thứ 2 - Thứ 7: 07:30 - 17:00</p>
            </div>
        </div>
        <div class="footer-bottom"><span>© 2026 LibraViet. Xây dựng bởi Nhóm LNH.</span><span>Điều khoản sử dụng · Chính sách bảo mật · Hỗ trợ sinh viên</span></div>`;
    }
}

// ===== 5 RENDER BOOKS =====
function renderBooks(list) {
    const grid = document.getElementById('bookGrid');
    if (!grid) return;

    if (list.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--gray-400); padding: 40px 0;">
            ${currentLang === 'vi' ? '📭 Không tìm thấy sách nào phù hợp' : '📭 No matching books found'}
        </div>`;
        return;
    }
// Tạo giao diện cho từng cuốn sách dựa trên dữ liệu đã được lọc, bao gồm bìa sách, tiêu đề, tác giả, trạng thái và các badge (nếu có). Mỗi thẻ sách sẽ có sự kiện onclick để mở modal hiển thị mã QR hoặc chi tiết sách khi người dùng nhấp vào. Trạng thái của sách sẽ được hiển thị rõ ràng với màu sắc khác nhau để người dùng dễ dàng nhận biết.   
    grid.innerHTML = list.map(b => {
        let badgeText = b.badge;
        if (currentLang === 'en' && badgeText === 'Mới') {
            badgeText = 'New';
        }
        const badgeHtml = badgeText ? `<div class="book-badge">${badgeText}</div>` : '';
        const statusClass = b.status === 'available'
            ? 'status-available'
            : b.status === 'borrowed'
                ? 'status-borrowed'
                : 'status-reserved';
        const statusText = b.status === 'available'
            ? (currentLang === 'vi' ? '✅ Còn sách' : '✅ Available')
            : b.status === 'borrowed'
                ? (currentLang === 'vi' ? 'Đang mượn' : ' Borrowed')
                : (currentLang === 'vi' ? '⏳ Đặt trước' : '⏳ Reserved');
// Mỗi thẻ sách sẽ có sự kiện onclick để mở modal hiển thị mã QR hoặc chi tiết sách khi người dùng nhấp vào. Trạng thái của sách sẽ được hiển thị rõ ràng với màu sắc khác nhau để người dùng dễ dàng nhận biết.    
        return `
<div class="book-card" onclick="openQRModal('detail', ${b.id})">
  ${badgeHtml}
  <div class="book-cover">
    <img src="${b.cover}" alt="${b.title}" onerror="this.src='https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400';">
  </div>
  <div class="book-title">${b.title}</div>
  <div class="book-author">${b.author}</div>
  <span class="book-status ${statusClass}">${statusText}</span>
</div>
`;
    }).join('');
}

// =====6 RENDER BORROW TABLE =====

function renderBorrowTable() {
    const tbody = document.getElementById('borrowTable');
    if (!tbody) return;
    tbody.innerHTML = borrowRecords.map(r => {
        const book = books.find(b => b.id === r.bookId);
        if (!book) return '';
        return `
<tr>
  <td>
    <div style="display:flex;align-items:center;gap:10px">
      <img src="${book.cover}" style="width:30px; height:40px; border-radius:4px; object-fit:cover;" onerror="this.src='https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400';">
      <div>
        <div style="font-weight:600;font-size:13px">${book.title}</div>
        <div style="font-size:11.5px;color:var(--gray-400)">${book.author}</div>
      </div>
    </div>
  </td>
  <td>
    <div class="qr-thumb" onclick="openQRModal('view','${r.qr}',${book.id})" title="${currentLang === 'vi' ? 'Xem mã QR' : 'View QR Code'}">
      ${makeQRsvg(r.qr)}
    </div>
  </td>
  <td>${r.borrowDate}</td>
  <td class="due-date ${r.status === 'overdue' ? 'overdue' : r.status === 'soon' ? 'soon' : ''}">${r.dueDate}
    ${r.status === 'overdue' ? `<br/><span style="font-size:10.5px;font-weight:400">${currentLang === 'vi' ? '⚠️ Quá hạn' : '⚠️ Overdue'}</span>` :
                r.status === 'soon' ? `<br/><span style="font-size:10.5px;font-weight:400">${currentLang === 'vi' ? ' Sắp đến' : ' Soon'}</span>` : ''}
  </td>
  <td><span class="book-status ${r.status === 'overdue' ? 'status-borrowed' : r.status === 'soon' ? 'status-reserved' : 'status-available'}">
    ${r.status === 'overdue' ? (currentLang === 'vi' ? 'Quá hạn' : 'Overdue') :
                r.status === 'soon' ? (currentLang === 'vi' ? 'Sắp hết hạn' : 'Expiring soon') :
                    (currentLang === 'vi' ? 'Đúng hạn' : 'On time')}
  </span></td>
  <td style="display:flex;gap:6px;align-items:center;padding-top:16px">
    <button class="btn-action btn-return" onclick="openQRModal('scan','return',${book.id})">${currentLang === 'vi' ? 'Trả sách' : 'Return'}</button>
    <button class="btn-action btn-renew" onclick="renewBook(${book.id})">${currentLang === 'vi' ? 'Gia hạn' : 'Renew'}</button>
    <button class="btn-action btn-renew" style="background:#FED7AA; color:#EA580C" onclick="openReader(${book.id})">${currentLang === 'vi' ? ' Đọc' : ' Read'}</button>
  </td>
</tr>
`;
    }).join('');
}

// =====7 RENEW BOOK LOGIC =====
function renewBook(bookId) {
    const record = borrowRecords.find(r => r.bookId === bookId);
    if (!record) return;

    const parts = record.dueDate.split('/');
    if (parts.length === 3) {
        const d = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        d.setDate(d.getDate() + 7); // Extend by 7 days

        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();

        record.dueDate = `${dd}/${mm}/${yyyy}`;

        // Update status
        if (record.status === 'overdue') {
            record.status = 'soon';
        } else {
            record.status = 'ok';
        }

        saveToLocalStorage();
        alert(currentLang === 'vi'
            ? `Gia hạn mượn thành công! Hạn trả mới của bạn là: ${record.dueDate}`
            : `Renewed successfully! Your new due date is: ${record.dueDate}`);

        renderBorrowTable();
    }
}

// =====8 REAL SCANNABLE QR SVG GENERATOR =====
// Hàm cũ chỉ vẽ ô vuông giống QR nên điện thoại không đọc được.
// Hàm mới bên dưới tạo QR Code chuẩn Version 4 - Error Correction L,
// đủ để quét bằng camera điện thoại hoặc app quét QR thông thường.
function makeQRsvg(text) {
    const value = String(text || 'LIBRAVIET-QR');
    const qr = buildRealQRCodeMatrix(value);
    const quiet = 4;
    const total = qr.size + quiet * 2;
    let cells = '';

    for (let y = 0; y < qr.size; y++) {
        for (let x = 0; x < qr.size; x++) {
            if (qr.modules[y][x]) {
                cells += `<rect x="${x + quiet}" y="${y + quiet}" width="1" height="1"/>`;
            }
        }
    }

    return `
<svg class="qr-svg real-qr" viewBox="0 0 ${total} ${total}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeQRText(value)}">
    <title>${escapeQRText(value)}</title>
    <rect width="${total}" height="${total}" fill="#ffffff"/>
    <g fill="#111827" shape-rendering="crispEdges">${cells}</g>
</svg>`;
}

function escapeQRText(text) {
    return String(text).replace(/[&<>"]/g, function (ch) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch];
    });
}

function buildRealQRCodeMatrix(text) {
    const version = 4;
    const size = 17 + version * 4;       // Version 4 = 33 x 33 modules
    const dataCodewords = 80;            // QR Version 4-L
    const eccCodewords = 20;
    const mask = 0;

    const modules = Array.from({ length: size }, () => Array(size).fill(false));
    const isFunction = Array.from({ length: size }, () => Array(size).fill(false));

    function setFunctionModule(x, y, dark) {
        modules[y][x] = !!dark;
        isFunction[y][x] = true;
    }

    function drawFinderPattern(x, y) {
        for (let dy = -1; dy <= 7; dy++) {
            for (let dx = -1; dx <= 7; dx++) {
                const xx = x + dx;
                const yy = y + dy;
                if (xx < 0 || xx >= size || yy < 0 || yy >= size) continue;
                const dark = dx >= 0 && dx <= 6 && dy >= 0 && dy <= 6 &&
                    (dx === 0 || dx === 6 || dy === 0 || dy === 6 ||
                        (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4));
                setFunctionModule(xx, yy, dark);
            }
        }
    }

    function drawAlignmentPattern(cx, cy) {
        for (let dy = -2; dy <= 2; dy++) {
            for (let dx = -2; dx <= 2; dx++) {
                const dist = Math.max(Math.abs(dx), Math.abs(dy));
                setFunctionModule(cx + dx, cy + dy, dist === 2 || dist === 0);
            }
        }
    }

    function drawFunctionPatterns() {
        drawFinderPattern(0, 0);
        drawFinderPattern(size - 7, 0);
        drawFinderPattern(0, size - 7);

        // Version 4 chỉ có 1 alignment pattern ở tâm 26,26.
        drawAlignmentPattern(26, 26);

        for (let i = 0; i < size; i++) {
            if (!isFunction[6][i]) setFunctionModule(i, 6, i % 2 === 0);
            if (!isFunction[i][6]) setFunctionModule(6, i, i % 2 === 0);
        }

        drawFormatBits(mask);
    }

    function drawFormatBits(maskValue) {
        // Error correction level L có format bits = 01.
        const eclFormatBits = 1;
        let data = (eclFormatBits << 3) | maskValue;
        let rem = data;
        for (let i = 0; i < 10; i++) {
            rem = (rem << 1) ^ (((rem >>> 9) & 1) ? 0x537 : 0);
        }
        const bits = ((data << 10) | rem) ^ 0x5412;
        const getBit = (val, i) => ((val >>> i) & 1) !== 0;

        for (let i = 0; i <= 5; i++) setFunctionModule(8, i, getBit(bits, i));
        setFunctionModule(8, 7, getBit(bits, 6));
        setFunctionModule(8, 8, getBit(bits, 7));
        setFunctionModule(7, 8, getBit(bits, 8));
        for (let i = 9; i < 15; i++) setFunctionModule(14 - i, 8, getBit(bits, i));

        for (let i = 0; i < 8; i++) setFunctionModule(size - 1 - i, 8, getBit(bits, i));
        for (let i = 8; i < 15; i++) setFunctionModule(8, size - 15 + i, getBit(bits, i));
        setFunctionModule(8, size - 8, true);
    }

    function appendBits(arr, val, len) {
        for (let i = len - 1; i >= 0; i--) arr.push((val >>> i) & 1);
    }

    function getBytes(value) {
        if (typeof TextEncoder !== 'undefined') return Array.from(new TextEncoder().encode(value));
        return value.split('').map(ch => ch.charCodeAt(0) & 0xFF);
    }

    function makeDataCodewords(value) {
        let bytes = getBytes(value);
        const maxBytes = dataCodewords - 3; // mode + length + terminator/padding còn dư an toàn
        if (bytes.length > maxBytes) bytes = bytes.slice(0, maxBytes);

        const bits = [];
        appendBits(bits, 0x4, 4);          // Byte mode
        appendBits(bits, bytes.length, 8); // Character count for version 1-9
        bytes.forEach(b => appendBits(bits, b, 8));

        const capacityBits = dataCodewords * 8;
        appendBits(bits, 0, Math.min(4, capacityBits - bits.length));
        while (bits.length % 8 !== 0) bits.push(0);

        const result = [];
        for (let i = 0; i < bits.length; i += 8) {
            let b = 0;
            for (let j = 0; j < 8; j++) b = (b << 1) | bits[i + j];
            result.push(b);
        }

        for (let pad = 0; result.length < dataCodewords; pad++) {
            result.push(pad % 2 === 0 ? 0xEC : 0x11);
        }
        return result;
    }

    function reedSolomonMultiply(a, b) {
        if (a === 0 || b === 0) return 0;
        return QR_EXP[QR_LOG[a] + QR_LOG[b]];
    }

    function reedSolomonGenerator(degree) {
        let poly = [1];
        for (let i = 0; i < degree; i++) {
            const next = Array(poly.length + 1).fill(0);
            for (let j = 0; j < poly.length; j++) {
                next[j] ^= reedSolomonMultiply(poly[j], 1);
                next[j + 1] ^= reedSolomonMultiply(poly[j], QR_EXP[i]);
            }
            poly = next;
        }
        return poly;
    }

    function computeEcc(data) {
        const gen = reedSolomonGenerator(eccCodewords);
        const msg = data.concat(Array(eccCodewords).fill(0));
        for (let i = 0; i < data.length; i++) {
            const coef = msg[i];
            if (coef !== 0) {
                for (let j = 0; j < gen.length; j++) {
                    msg[i + j] ^= reedSolomonMultiply(gen[j], coef);
                }
            }
        }
        return msg.slice(data.length);
    }

    function applyMask(x, y) {
        return (x + y) % 2 === 0; // Mask pattern 0
    }

    function drawCodewords(codewords) {
        let bitIndex = 0;
        const totalBits = codewords.length * 8;

        for (let right = size - 1; right >= 1; right -= 2) {
            if (right === 6) right = 5;
            for (let vert = 0; vert < size; vert++) {
                const upward = ((right + 1) & 2) === 0;
                const y = upward ? size - 1 - vert : vert;
                for (let j = 0; j < 2; j++) {
                    const x = right - j;
                    if (isFunction[y][x]) continue;
                    let dark = false;
                    if (bitIndex < totalBits) {
                        dark = ((codewords[bitIndex >>> 3] >>> (7 - (bitIndex & 7))) & 1) !== 0;
                        bitIndex++;
                    }
                    modules[y][x] = dark !== applyMask(x, y);
                }
            }
        }
    }

    drawFunctionPatterns();
    const data = makeDataCodewords(text);
    const ecc = computeEcc(data);
    drawCodewords(data.concat(ecc));
    drawFormatBits(mask);

    return { size, modules };
}

const QR_EXP = Array(512).fill(0);
const QR_LOG = Array(256).fill(0);
(function initQRMath() {
    let x = 1;
    for (let i = 0; i < 255; i++) {
        QR_EXP[i] = x;
        QR_LOG[x] = i;
        x <<= 1;
        if (x & 0x100) x ^= 0x11D;
    }
    for (let i = 255; i < 512; i++) QR_EXP[i] = QR_EXP[i - 255];
})();

// =====9 QR MODAL + REAL CAMERA QR SCANNER =====
// Mã QR dán lên sách sẽ có dạng cố định: BOOK-LV-001, BOOK-LV-002...
// Sinh viên bấm "Quét QR" trên web, trình duyệt mở camera và đọc mã QR này.
const qrScannerState = {
    html5: null,
    nativeStream: null,
    nativeRaf: null,
    active: false,
    locked: false,
    scanPurpose: null,
    expectedBookId: null
};

function getBookQrValue(bookOrId) {
    const book = typeof bookOrId === 'object'
        ? bookOrId
        : books.find(b => b.id === Number(bookOrId));
    if (!book) return 'BOOK-LV-000';
    return book.qr || `BOOK-LV-${String(book.id).padStart(3, '0')}`;
}

function getCurrentScannerPurposeText() {
    if (qrScannerState.scanPurpose === 'borrow') {
        return currentLang === 'vi' ? 'mượn sách' : 'borrow book';
    }
    if (qrScannerState.scanPurpose === 'return') {
        return currentLang === 'vi' ? 'trả sách' : 'return book';
    }
    return currentLang === 'vi' ? 'mượn/trả sách' : 'borrow/return book';
}

function normalizeQRText(text) {
    return String(text || '').trim();
}

function findBookByQRText(text) {
    const raw = normalizeQRText(text);
    if (!raw) return null;

    // Trường hợp QR chứa URL: http://.../?book=BOOK-LV-001 hoặc ?bookId=1
    try {
        const url = new URL(raw);
        const bookParam = url.searchParams.get('book') || url.searchParams.get('bookId') || url.searchParams.get('id');
        if (bookParam) {
            const byParam = findBookByQRText(bookParam);
            if (byParam) return byParam;
        }
    } catch (e) {
        // Không phải URL thì bỏ qua.
    }

    // So khớp chính xác với mã QR hoặc ISBN.
    const exact = books.find(b => {
        const bookQr = getBookQrValue(b).toUpperCase();
        return raw.toUpperCase() === bookQr || raw === b.isbn;
    });
    if (exact) return exact;

    // Nhận nhiều dạng mã: BOOK-LV-001, QR-LV-001, BORROW-QR-LV-1-..., RETURN-QR-LV-003...
    const patterns = [
        /BOOK[-_\s]*LV[-_\s]*0*(\d+)/i,
        /QR[-_\s]*LV[-_\s]*0*(\d+)/i,
        /LV[-_\s]*0*(\d+)/i,
        /BOOK\s*[:=]\s*0*(\d+)/i,
        /bookId\s*[=:]\s*0*(\d+)/i,
        /id\s*[=:]\s*0*(\d+)/i
    ];

    for (const pattern of patterns) {
        const match = raw.match(pattern);
        if (match) {
            const id = Number(match[1]);
            const book = books.find(b => b.id === id);
            if (book) return book;
        }
    }

    // Trường hợp nhập mỗi số ID sách, ví dụ: 1
    if (/^\d+$/.test(raw)) {
        const book = books.find(b => b.id === Number(raw));
        if (book) return book;
    }

    return null;
}

function getScannerActionForBook(book, purpose) {
    const isUserBorrowed = borrowRecords.some(r => r.bookId === book.id);

    if (purpose === 'borrow') {
        if (book.status !== 'available') {
            return {
                ok: false,
                message: currentLang === 'vi'
                    ? `Sách "${book.title}" hiện không còn sẵn để mượn.`
                    : `"${book.title}" is not available to borrow.`
            };
        }
        return { ok: true, action: 'borrow' };
    }

    if (purpose === 'return') {
        if (!isUserBorrowed) {
            return {
                ok: false,
                message: currentLang === 'vi'
                    ? `Bạn chưa mượn sách "${book.title}", nên không thể trả sách này.`
                    : `You have not borrowed "${book.title}", so it cannot be returned.`
            };
        }
        return { ok: true, action: 'return' };
    }

    if (book.status === 'available') return { ok: true, action: 'borrow' };
    if (book.status === 'borrowed' && isUserBorrowed) return { ok: true, action: 'return' };

    return {
        ok: false,
        message: currentLang === 'vi'
            ? `Mã QR hợp lệ nhưng sách "${book.title}" đang không thể giao dịch.`
            : `The QR code is valid, but "${book.title}" cannot be processed right now.`
    };
}

function buildScanOptions(extra) {
    let filteredBooks = books;
    let placeholderText = currentLang === 'vi' ? '-- Chọn sách nếu camera lỗi --' : '-- Select book if camera fails --';

    if (extra === 'borrow') {
        filteredBooks = books.filter(b => b.status === 'available');
        placeholderText = currentLang === 'vi' ? '-- Chọn sách cần mượn --' : '-- Select book to borrow --';
    } else if (extra === 'return') {
        filteredBooks = books.filter(b => b.status === 'borrowed' && borrowRecords.some(r => r.bookId === b.id));
        placeholderText = currentLang === 'vi' ? '-- Chọn sách cần trả --' : '-- Select book to return --';
    }

    let optionsHtml = `<option value="">${placeholderText}</option>`;
    if (filteredBooks.length === 0) {
        const emptyMsg = currentLang === 'vi' ? 'Không có sách phù hợp' : 'No matching books';
        optionsHtml += `<option disabled>${emptyMsg}</option>`;
    } else {
        filteredBooks.forEach(b => {
            const qr = getBookQrValue(b);
            optionsHtml += `<option value="${b.id}">${b.title} - ${qr}</option>`;
        });
    }
    return optionsHtml;
}

function openQRModal(mode, extra, bookId) {
    if (!requireLogin()) return;
    stopBookScanner(false);

    const modal = document.getElementById('qrModal');
    const modalBox = modal ? modal.querySelector('.modal') : null;
    const emoji = document.getElementById('qrEmoji');
    const title = document.getElementById('qrTitle');
    const sub = document.getElementById('qrSub');
    const display = document.getElementById('qrDisplay');
    const info = document.getElementById('qrInfo');

    if (!modal || !title || !sub || !display || !info) return;

    if (modalBox) modalBox.classList.toggle('scanner-modal', mode === 'scan');
    display.className = mode === 'scan' ? 'qr-code scanner-camera-box' : 'qr-code';
    info.className = mode === 'scan' ? 'modal-info scanner-info' : 'modal-info';

    let resolvedBookId = bookId;
    if ((mode === 'detail' || mode === 'bookQr') && resolvedBookId === undefined) {
        resolvedBookId = extra;
    }

    const book = books.find(b => b.id === Number(resolvedBookId));

    if (mode === 'scan') {
        const scanPurpose = extra === 'borrow' || extra === 'return' ? extra : null;
        qrScannerState.scanPurpose = scanPurpose;
        qrScannerState.expectedBookId = resolvedBookId ? Number(resolvedBookId) : null;
        qrScannerState.locked = false;

        if (emoji) emoji.textContent = '📷';
        title.textContent = scanPurpose === 'borrow'
            ? (currentLang === 'vi' ? 'Quét QR để mượn sách' : 'Scan QR to borrow')
            : scanPurpose === 'return'
                ? (currentLang === 'vi' ? 'Quét QR để trả sách' : 'Scan QR to return')
                : (currentLang === 'vi' ? 'Quét QR trên sách' : 'Scan book QR');

        sub.textContent = book
            ? (currentLang === 'vi'
                ? `Đưa camera vào mã QR dán trên sách: ${book.title}`
                : `Point the camera at the QR label on: ${book.title}`)
            : (currentLang === 'vi'
                ? 'Cho phép camera, rồi đưa mã QR dán trên sách vào khung quét'
                : 'Allow camera access, then point it at the QR label on the book');

        display.innerHTML = `
<div class="scanner-live-wrap">
    <div id="qrReader" class="qr-reader"></div>
    <video id="nativeQrVideo" class="native-qr-video" muted playsinline></video>
    <div class="scanner-frame" aria-hidden="true">
        <span class="scanner-corner corner-tl"></span>
        <span class="scanner-corner corner-tr"></span>
        <span class="scanner-corner corner-bl"></span>
        <span class="scanner-corner corner-br"></span>
        <span class="scanner-line"></span>
    </div>
</div>`;

        info.innerHTML = `
<div id="scannerStatus" class="scanner-status scanner-status-wait">
   ${currentLang === 'vi' ? 'Bấm nút Bật camera để quét QR trên điện thoại.' : 'Tap Start camera to scan QR on your phone.'}
</div>
<div class="scanner-tools">
    <button class="btn-scan-action scanner-tool-btn" onclick="startBookScanner()">📷 ${currentLang === 'vi' ? 'Bật camera' : 'Start camera'}</button>
    <button class="btn-scan-action scanner-tool-btn scanner-tool-light" onclick="stopBookScanner()">⏹ ${currentLang === 'vi' ? 'Tắt camera' : 'Stop camera'}</button>
</div>
<details class="scanner-fallback-panel">
    <summary>${currentLang === 'vi' ? 'Không quét được? Chọn sách để chạy thử' : 'Camera not working? Select a book for demo'}</summary>

    <div class="scanner-phone-actions">
        <label class="btn-scan-action scanner-upload-btn" for="qrImageInput">
            🖼 ${currentLang === 'vi' ? 'Chọn/chụp ảnh QR trên điện thoại' : 'Choose/capture QR image'}
        </label>
        <input 
            type="file" 
            id="qrImageInput" 
            class="qr-image-input" 
            accept="image/*" 
            capture="environment" 
            onchange="handleQRImageUpload(event)"
        >
    </div>

    <select class="scan-select" id="scanBookSelect" onchange="onScanBookChange(this.value)">
        ${buildScanOptions(scanPurpose)}
    </select>
    <button class="btn-scan-action" id="btnExecuteScan" onclick="triggerSimulatedScan()" disabled>
        ${currentLang === 'vi' ? 'Xác nhận giao dịch' : 'Confirm transaction'}
    </button>
</details>
<div class="scanner-note">
   ${currentLang === 'vi'
    ? 'Lưu ý: trên điện thoại phải mở bằng link HTTPS như Vercel/Netlify. Không mở bằng file://, http://IP máy tính, Zalo hoặc Messenger.'
    : 'Note: on phone, open with HTTPS such as Vercel/Netlify. Do not use file://, local IP, Zalo or Messenger.'}
</div>`;

       modal.classList.add('open');

showScannerStatus(currentLang === 'vi'
    ? 'Bấm nút <strong>Bật camera</strong>, cho phép quyền camera, rồi đưa mã QR vào khung.'
    : 'Tap <strong>Start camera</strong>, allow camera permission, then put the QR inside the frame.',
    'wait'
);

return;
    }

    if (mode === 'bookQr') {
        if (emoji) emoji.textContent = '🔖';
        title.textContent = currentLang === 'vi' ? 'Mã QR dán lên sách' : 'Book label QR code';
        sub.textContent = book ? book.title : '';
        const bookQr = book ? getBookQrValue(book) : 'BOOK-LV-000';
        display.innerHTML = makeQRsvg(bookQr);
        info.innerHTML = book
            ? (currentLang === 'vi'
                ? `<strong>Mã sách:</strong> <code>${bookQr}</code><br/><strong>ISBN:</strong> ${book.isbn}<br/><br/>In mã QR này rồi dán lên sách. Khi sinh viên bấm <strong>Quét QR</strong>, camera đọc mã này và hệ thống tự nhận ra sách.`
                : `<strong>Book code:</strong> <code>${bookQr}</code><br/><strong>ISBN:</strong> ${book.isbn}<br/><br/>Print this QR code and place it on the book. When students tap <strong>Scan QR</strong>, the camera reads this code and identifies the book.`)
            : '';
    } else if (mode === 'borrow') {
        if (emoji) emoji.textContent = '📥';
        title.textContent = currentLang === 'vi' ? 'Mượn Sách Qua QR' : 'Borrow Book via QR';
        sub.textContent = currentLang === 'vi' ? 'Mã QR dán trên sách' : 'QR label on book';
        display.innerHTML = makeQRsvg(book ? getBookQrValue(book) : 'BOOK-LV-000');
        info.innerHTML = currentLang === 'vi'
            ? `Mã QR trên màn hình là mã dán lên sách. Để mượn thật, hãy bấm <strong>Quét QR</strong> và mở camera để quét mã trên sách.`
            : `This QR is the book label code. To borrow, tap <strong>Scan QR</strong> and scan the label with the camera.`;
    } else if (mode === 'return') {
        if (emoji) emoji.textContent = '📤';
        title.textContent = currentLang === 'vi' ? 'Trả Sách Qua QR' : 'Return Book via QR';
        sub.textContent = book ? book.title : (currentLang === 'vi' ? 'Quét mã QR dán trên sách' : 'Scan the QR label on the book');
        display.innerHTML = makeQRsvg(book ? getBookQrValue(book) : 'BOOK-LV-000');
        info.innerHTML = book
            ? (currentLang === 'vi'
                ? `<strong>${book.title}</strong><br/>Tác giả: ${book.author}<br/><br/>Bấm <strong>Quét QR</strong> để mở camera và quét mã dán trên sách.`
                : `<strong>${book.title}</strong><br/>Author: ${book.author}<br/><br/>Tap <strong>Scan QR</strong> to open the camera and scan the book label.`)
            : '';
    } else if (mode === 'view') {
        if (emoji) emoji.textContent = '🔖';
        title.textContent = currentLang === 'vi' ? 'Mã QR Của Bạn' : 'Your QR Code';
        sub.textContent = book ? book.title : extra;
        display.innerHTML = makeQRsvg(extra || 'QR-LV-000');
        info.innerHTML = book
            ? (currentLang === 'vi'
                ? `<strong>ISBN:</strong> ${book.isbn}<br/><strong>Mã mượn:</strong> ${extra}<br/><br/>Đây là mã giao dịch mượn/trả. Mã dán lên sách là <code>${getBookQrValue(book)}</code>.`
                : `<strong>ISBN:</strong> ${book.isbn}<br/><strong>Borrow code:</strong> ${extra}<br/><br/>This is the borrow transaction code. The book label code is <code>${getBookQrValue(book)}</code>.`)
            : (currentLang === 'vi' ? 'Mã QR cá nhân của bạn cho lần mượn này.' : 'Your personal QR code for this borrow transaction.');
    } else if (mode === 'detail') {
        if (emoji) emoji.textContent = '📖';
        title.textContent = book ? book.title : (currentLang === 'vi' ? 'Chi tiết sách' : 'Book Details');
        sub.textContent = book ? book.author : '';
        display.innerHTML = book
            ? `<img src="${book.cover}" style="max-height:160px; border-radius:8px; border:2px solid var(--orange);" onerror="this.src='https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400';">`
            : makeQRsvg('BOOK-LV-000');

        if (book) {
            const isUserBorrowed = borrowRecords.some(r => r.bookId === book.id);
            const labelButton = `<button class="btn-action btn-renew" style="padding:8px 16px; margin-top:8px; margin-left:8px;" onclick="openQRModal('bookQr', null, ${book.id});">🔖 ${currentLang === 'vi' ? 'Mã QR dán sách' : 'Book QR'}</button>`;
            let actionButtons = '';

            if (book.status === 'available') {
                actionButtons = currentLang === 'vi'
                    ? `<button class="btn-action btn-return" style="padding:8px 16px; margin-top:8px;" onclick="openQRModal('scan', 'borrow', ${book.id});">📷 Quét để mượn</button>
                       <button class="btn-action btn-renew" style="padding:8px 16px; margin-top:8px; margin-left:8px;" onclick="openReader(${book.id});">Đọc online</button>${labelButton}`
                    : `<button class="btn-action btn-return" style="padding:8px 16px; margin-top:8px;" onclick="openQRModal('scan', 'borrow', ${book.id});">📷 Scan to borrow</button>
                       <button class="btn-action btn-renew" style="padding:8px 16px; margin-top:8px; margin-left:8px;" onclick="openReader(${book.id});">Read Online</button>${labelButton}`;
            } else if (book.status === 'borrowed') {
                if (isUserBorrowed) {
                    actionButtons = currentLang === 'vi'
                        ? `<button class="btn-action btn-return" style="padding:8px 16px; margin-top:8px;" onclick="openQRModal('scan', 'return', ${book.id});">📷 Quét để trả</button>
                           <button class="btn-action btn-renew" style="padding:8px 16px; margin-top:8px; margin-left:8px;" onclick="openReader(${book.id});">Đọc online</button>${labelButton}`
                        : `<button class="btn-action btn-return" style="padding:8px 16px; margin-top:8px;" onclick="openQRModal('scan', 'return', ${book.id});">📷 Scan to return</button>
                           <button class="btn-action btn-renew" style="padding:8px 16px; margin-top:8px; margin-left:8px;" onclick="openReader(${book.id});">Read Online</button>${labelButton}`;
                } else {
                    actionButtons = currentLang === 'vi'
                        ? `<button class="btn-action btn-renew" style="padding:8px 16px; margin-top:8px;" onclick="openReader(${book.id});">Đọc online</button>${labelButton}`
                        : `<button class="btn-action btn-renew" style="padding:8px 16px; margin-top:8px;" onclick="openReader(${book.id});">Read Online</button>${labelButton}`;
                }
            } else {
                actionButtons = currentLang === 'vi'
                    ? `<button class="btn-action btn-renew" style="padding:8px 16px; margin-top:8px;" onclick="openReader(${book.id});">Đọc online</button>${labelButton}`
                    : `<button class="btn-action btn-renew" style="padding:8px 16px; margin-top:8px;" onclick="openReader(${book.id});">Read Online</button>${labelButton}`;
            }

            info.innerHTML = currentLang === 'vi'
                ? `<strong>Thể loại:</strong> ${book.cat}<br/><strong>ISBN:</strong> ${book.isbn}<br/><strong>Mã QR sách:</strong> <code>${getBookQrValue(book)}</code><br/><strong>Trạng thái:</strong> ${book.status === 'available' ? 'Còn sách' : book.status === 'borrowed' ? 'Đang mượn' : 'Đã đặt trước'}<br/><br/>${actionButtons}`
                : `<strong>Category:</strong> ${book.cat}<br/><strong>ISBN:</strong> ${book.isbn}<br/><strong>Book QR:</strong> <code>${getBookQrValue(book)}</code><br/><strong>Status:</strong> ${book.status === 'available' ? 'Available' : book.status === 'borrowed' ? 'Borrowed' : 'Reserved'}<br/><br/>${actionButtons}`;
        } else {
            info.innerHTML = '';
        }
    }

    modal.classList.add('open');
}

function closeModal() {
    stopBookScanner(false);
    const modal = document.getElementById('qrModal');
    if (modal) modal.classList.remove('open');
}

function closeModalOutside(e) {
    const modal = document.getElementById('qrModal');
    if (e.target === modal) closeModal();
}

// =====10 REAL QR CODE SCANNER EVENTS =====
let html5QrcodeLoadPromise = null;

function loadHtml5QrcodeScript() {
    if (window.Html5Qrcode) return Promise.resolve(true);
    if (html5QrcodeLoadPromise) return html5QrcodeLoadPromise;

    html5QrcodeLoadPromise = new Promise(resolve => {
        const script = document.createElement('script');
        let finished = false;
        const done = ok => {
            if (finished) return;
            finished = true;
            resolve(ok);
        };
        script.src = 'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js';
        script.async = true;
        script.onload = () => done(true);
        script.onerror = () => done(false);
        document.head.appendChild(script);
        setTimeout(() => done(!!window.Html5Qrcode), 5000);
    });

    return html5QrcodeLoadPromise;
}

function isCameraContextAllowed() {
    // Camera chỉ chạy tốt trên HTTPS hoặc localhost
    // Trên điện thoại nếu mở bằng http://IP-máy-tính thường sẽ bị chặn
    return window.isSecureContext 
        || location.protocol === 'https:' 
        || location.hostname === 'localhost' 
        || location.hostname === '127.0.0.1';
}

function showScannerStatus(message, type = 'wait') {
    const el = document.getElementById('scannerStatus');
    if (!el) return;
    el.className = `scanner-status scanner-status-${type}`;
    el.innerHTML = message;
}

async function startBookScanner(purpose) {
    if (purpose !== undefined) qrScannerState.scanPurpose = purpose;
    qrScannerState.locked = false;

    const readerEl = document.getElementById('qrReader');
    const videoEl = document.getElementById('nativeQrVideo');
    if (!readerEl && !videoEl) return;

    await stopBookScanner(false);
    qrScannerState.locked = false;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showScannerStatus(currentLang === 'vi'
            ? 'Trình duyệt này không hỗ trợ mở camera. Hãy dùng Chrome/Edge hoặc quét trên điện thoại.'
            : 'This browser does not support camera access. Use Chrome/Edge or scan on a phone.', 'error');
        return;
    }

    if (!isCameraContextAllowed()) {
    showScannerStatus(currentLang === 'vi'
        ? 'Trình duyệt đang chặn camera vì web chưa chạy bằng HTTPS/localhost. Trên điện thoại hãy deploy lên Vercel/Netlify hoặc dùng ngrok HTTPS. Tạm thời bạn có thể bấm <strong>Chọn/chụp ảnh QR trên điện thoại</strong> ở bên dưới.'
        : 'The browser is blocking the camera because this page is not served via HTTPS/localhost. On phone, deploy to Vercel/Netlify or use ngrok HTTPS. You can still use <strong>Choose/capture QR image</strong> below.', 
        'error'
    );
    return;
}

    showScannerStatus(currentLang === 'vi' ? 'Đang xin quyền camera...' : 'Requesting camera permission...', 'wait');

    showScannerStatus(currentLang === 'vi' ? 'Đang tải thư viện quét QR...' : 'Loading QR scanner library...', 'wait');
    await loadHtml5QrcodeScript();

    if (window.Html5Qrcode) {
        try {
            if (videoEl) videoEl.style.display = 'none';
            if (readerEl) readerEl.style.display = 'block';

            const config = { fps: 10, qrbox: { width: 230, height: 230 }, aspectRatio: 1.333 };
            if (window.Html5QrcodeSupportedFormats) {
                config.formatsToSupport = [Html5QrcodeSupportedFormats.QR_CODE];
            }

            qrScannerState.html5 = new Html5Qrcode('qrReader');
            await qrScannerState.html5.start(
                { facingMode: 'environment' },
                config,
                decodedText => handleScannedQRCode(decodedText),
                () => { }
            );
            qrScannerState.active = true;
            showScannerStatus(currentLang === 'vi'
                ? `Camera đang quét. Hãy đưa mã QR dán trên sách vào khung.`
                : 'Camera is scanning. Put the book QR label inside the frame.', 'ok');
            return;
        } catch (err) {
            await stopBookScanner(false);
            console.warn('Html5Qrcode scanner failed, trying native scanner:', err);
        }
    }

    // Fallback cho Chrome/Edge có BarcodeDetector API.
    if ('BarcodeDetector' in window) {
        try {
            if (readerEl) readerEl.style.display = 'none';
            if (videoEl) videoEl.style.display = 'block';

            const supported = await BarcodeDetector.getSupportedFormats();
            if (!supported.includes('qr_code')) throw new Error('QR format is not supported');

            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { ideal: 'environment' } },
                audio: false
            });
            qrScannerState.nativeStream = stream;
            videoEl.srcObject = stream;
            await videoEl.play();

            const detector = new BarcodeDetector({ formats: ['qr_code'] });
            qrScannerState.active = true;
            showScannerStatus(currentLang === 'vi'
                ? 'Camera đang quét bằng BarcodeDetector. Đưa QR vào khung.'
                : 'Camera is scanning with BarcodeDetector. Put the QR inside the frame.', 'ok');

            const scanFrame = async () => {
                if (!qrScannerState.active || qrScannerState.locked) return;
                try {
                    const codes = await detector.detect(videoEl);
                    if (codes && codes.length) {
                        handleScannedQRCode(codes[0].rawValue || codes[0].rawValueText || '');
                        return;
                    }
                } catch (err) {
                    console.warn('Native QR detect failed:', err);
                }
                qrScannerState.nativeRaf = requestAnimationFrame(scanFrame);
            };
            scanFrame();
            return;
        } catch (err) {
            await stopBookScanner(false);
            console.warn('Native BarcodeDetector scanner failed:', err);
        }
    }

    showScannerStatus(currentLang === 'vi'
        ? 'Không mở được trình quét QR tự động. Hãy kiểm tra quyền camera, internet để tải thư viện quét QR, hoặc dùng phần chọn sách bên dưới để chạy thử.'
        : 'Could not start automatic QR scanning. Check camera permission, internet connection for the QR library, or use the selector below for demo.', 'error');
}

async function stopBookScanner(resetStatus = true) {
    qrScannerState.active = false;

    if (qrScannerState.html5) {
        try {
            await qrScannerState.html5.stop();
        } catch (e) { }
        try {
            await qrScannerState.html5.clear();
        } catch (e) { }
        qrScannerState.html5 = null;
    }

    if (qrScannerState.nativeRaf) {
        cancelAnimationFrame(qrScannerState.nativeRaf);
        qrScannerState.nativeRaf = null;
    }

    if (qrScannerState.nativeStream) {
        qrScannerState.nativeStream.getTracks().forEach(track => track.stop());
        qrScannerState.nativeStream = null;
    }

    const videoEl = document.getElementById('nativeQrVideo');
    if (videoEl) videoEl.srcObject = null;

    if (resetStatus) {
        showScannerStatus(currentLang === 'vi' ? 'Camera đã tắt.' : 'Camera stopped.', 'wait');
    }
}

async function handleScannedQRCode(decodedText) {
    if (qrScannerState.locked) return;
    qrScannerState.locked = true;

    const raw = normalizeQRText(decodedText);
    showScannerStatus(currentLang === 'vi'
        ? `Đã quét được: <code>${escapeQRText(raw)}</code>`
        : `Scanned: <code>${escapeQRText(raw)}</code>`, 'ok');

    await stopBookScanner(false);

    const book = findBookByQRText(raw);
    if (!book) {
        showScanError(currentLang === 'vi'
            ? 'Không tìm thấy sách tương ứng với mã QR này.'
            : 'No book matches this QR code.', raw);
        return;
    }

    if (qrScannerState.expectedBookId && book.id !== Number(qrScannerState.expectedBookId)) {
        const expected = books.find(b => b.id === Number(qrScannerState.expectedBookId));
        showScanError(currentLang === 'vi'
            ? `Bạn đang chọn "${expected ? expected.title : 'sách khác'}" nhưng QR vừa quét là "${book.title}".`
            : `You selected "${expected ? expected.title : 'another book'}" but scanned "${book.title}".`, raw);
        return;
    }

    const action = getScannerActionForBook(book, qrScannerState.scanPurpose);
    if (!action.ok) {
        showScanError(action.message, raw);
        return;
    }

    showScannedBookConfirm(book, raw, action.action);
}

function showScannedBookConfirm(book, raw, action) {
    const display = document.getElementById('qrDisplay');
    const info = document.getElementById('qrInfo');
    const title = document.getElementById('qrTitle');
    const sub = document.getElementById('qrSub');
    const emoji = document.getElementById('qrEmoji');

    if (emoji) emoji.textContent = action === 'borrow' ? '📥' : '📤';
    if (title) title.textContent = action === 'borrow'
        ? (currentLang === 'vi' ? 'Xác nhận mượn sách' : 'Confirm borrowing')
        : (currentLang === 'vi' ? 'Xác nhận trả sách' : 'Confirm returning');
    if (sub) sub.textContent = book.title;

    if (display) {
        display.className = 'qr-code scanner-result-box';
        display.innerHTML = `
<div class="scan-book-result">
    <img src="${book.cover}" alt="${book.title}" onerror="this.src='https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400';">
    <div class="scan-result-check">✓</div>
</div>`;
    }

    if (info) {
        info.className = 'modal-info scanner-info';
        info.innerHTML = `
<div class="scan-result-card">
    <div><strong>${currentLang === 'vi' ? 'Mã đã quét:' : 'Scanned code:'}</strong> <code>${escapeQRText(raw)}</code></div>
    <div><strong>${currentLang === 'vi' ? 'Sách:' : 'Book:'}</strong> ${book.title}</div>
    <div><strong>${currentLang === 'vi' ? 'Tác giả:' : 'Author:'}</strong> ${book.author}</div>
    <div><strong>${currentLang === 'vi' ? 'Thao tác:' : 'Action:'}</strong> ${action === 'borrow' ? (currentLang === 'vi' ? 'Mượn sách' : 'Borrow') : (currentLang === 'vi' ? 'Trả sách' : 'Return')}</div>
</div>
<div class="scanner-tools scanner-tools-confirm">
    <button class="btn-scan-action scanner-tool-btn" onclick="completeScannedBookTransaction(${book.id})">
        ${action === 'borrow' ? '📥' : '📤'} ${currentLang === 'vi' ? 'Xác nhận' : 'Confirm'}
    </button>
    <button class="btn-scan-action scanner-tool-btn scanner-tool-light" onclick="resetScanner()">
        🔄 ${currentLang === 'vi' ? 'Quét lại' : 'Scan again'}
    </button>
</div>`;
    }
}

function showScanError(message, raw) {
    const display = document.getElementById('qrDisplay');
    const info = document.getElementById('qrInfo');
    const title = document.getElementById('qrTitle');
    const sub = document.getElementById('qrSub');
    const emoji = document.getElementById('qrEmoji');

    if (emoji) emoji.textContent = '⚠️';
    if (title) title.textContent = currentLang === 'vi' ? 'Không thể xử lý mã QR' : 'Could not process QR';
    if (sub) sub.textContent = currentLang === 'vi' ? 'Vui lòng kiểm tra lại mã trên sách' : 'Please check the QR label on the book';

    if (display) {
        display.className = 'qr-code scanner-result-box scanner-error-box';
        display.innerHTML = '<div class="scan-error-icon">!</div>';
    }

    if (info) {
        info.className = 'modal-info scanner-info';
        info.innerHTML = `
<div class="scan-error-message">${message}</div>
${raw ? `<div class="scan-error-code"><strong>${currentLang === 'vi' ? 'Mã đã quét:' : 'Scanned code:'}</strong> <code>${escapeQRText(raw)}</code></div>` : ''}
<div class="scanner-tools scanner-tools-confirm">
    <button class="btn-scan-action scanner-tool-btn" onclick="resetScanner()">🔄 ${currentLang === 'vi' ? 'Quét lại' : 'Scan again'}</button>
</div>`;
    }
}

function resetScanner() {
    openQRModal('scan', qrScannerState.scanPurpose, qrScannerState.expectedBookId || undefined);
}

function completeScannedBookTransaction(bookId) {
    const btn = document.querySelector('.scanner-tools-confirm .btn-scan-action');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = `⚡ ${currentLang === 'vi' ? 'Đang xử lý...' : 'Processing...'}`;
    }
    setTimeout(() => executeTransaction(Number(bookId)), 250);
}
async function handleQRImageUpload(event) {
    const input = event && event.target;
    const file = input && input.files && input.files[0];

    if (!file) return;

    showScannerStatus(currentLang === 'vi'
        ? 'Đang đọc mã QR từ ảnh bạn chọn...'
        : 'Reading QR code from selected image...', 
        'wait'
    );

    await stopBookScanner(false);
    await loadHtml5QrcodeScript();

    if (!window.Html5Qrcode) {
        showScannerStatus(currentLang === 'vi'
            ? 'Không tải được thư viện đọc QR. Hãy kiểm tra internet hoặc thử dùng camera trên HTTPS.'
            : 'Could not load the QR reader library. Check internet or try camera on HTTPS.', 
            'error'
        );

        input.value = '';
        return;
    }

    try {
        const tempId = 'qrImageFileReader';
        let tempReader = document.getElementById(tempId);

        if (!tempReader) {
            tempReader = document.createElement('div');
            tempReader.id = tempId;
            tempReader.style.display = 'none';
            document.body.appendChild(tempReader);
        }

        const imageScanner = new Html5Qrcode(tempId);
        const decodedText = await imageScanner.scanFile(file, true);

        try {
            await imageScanner.clear();
        } catch (e) {}

        handleScannedQRCode(decodedText);

    } catch (err) {
        console.warn('QR image scan failed:', err);

        showScannerStatus(currentLang === 'vi'
            ? 'Không đọc được QR từ ảnh này. Hãy chụp rõ mã QR, đủ sáng, không bị nghiêng quá nhiều.'
            : 'Could not read a QR code from this image. Take a clearer, brighter photo of the QR code.', 
            'error'
        );

    } finally {
        input.value = '';
    }
}
function onScanBookChange(bookId) {
    const btn = document.getElementById('btnExecuteScan');
    if (!btn) return;

    if (!bookId) {
        btn.disabled = true;
        btn.innerHTML = currentLang === 'vi' ? 'Xác nhận giao dịch' : 'Confirm transaction';
        return;
    }

    const book = books.find(b => b.id === Number(bookId));
    const action = book ? getScannerActionForBook(book, qrScannerState.scanPurpose) : { ok: false };
    btn.disabled = !action.ok;
    btn.innerHTML = action.ok
        ? `${action.action === 'borrow' ? '📥' : '📤'} ${currentLang === 'vi' ? 'Xác nhận' : 'Confirm'}`
        : (currentLang === 'vi' ? 'Không thể giao dịch' : 'Cannot process');
}

function triggerSimulatedScan() {
    const select = document.getElementById('scanBookSelect');
    if (!select || !select.value) return;
    const bookId = Number(select.value);
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    handleScannedQRCode(getBookQrValue(book));
}

function executeTransaction(bookId) {
    const book = books.find(b => b.id === Number(bookId));
    if (!book) return;

    if (book.status === 'available') {
        const parts = new Date();
        const borrowDateStr = String(parts.getDate()).padStart(2, '0') + '/' + String(parts.getMonth() + 1).padStart(2, '0') + '/' + parts.getFullYear();

        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + 14);
        const dueDateStr = String(returnDate.getDate()).padStart(2, '0') + '/' + String(returnDate.getMonth() + 1).padStart(2, '0') + '/' + returnDate.getFullYear();

        const qrCodeValue = 'QR-LV-' + String(bookId).padStart(3, '0');

        const newRecord = {
            bookId: book.id,
            borrowDate: borrowDateStr,
            dueDate: dueDateStr,
            status: 'ok',
            qr: qrCodeValue
        };

        borrowRecords.push(newRecord);
        book.status = 'borrowed';
        addHistoryRecord('borrow', book, newRecord);

        saveToLocalStorage();
        updateStats();
        filterBooks();
        renderBorrowTable();
        renderHistoryPage();

        showScanResult(true, book, qrCodeValue);
    } else if (book.status === 'borrowed') {
        const recordIndex = borrowRecords.findIndex(r => r.bookId === book.id);
        if (recordIndex !== -1) {
            const returnedRecord = {
                ...borrowRecords[recordIndex],
                returnDate: formatDateVN(new Date())
            };
            addHistoryRecord('return', book, returnedRecord);
            borrowRecords.splice(recordIndex, 1);
            book.status = 'available';

            let returnedCount = parseInt(localStorage.getItem('libraviet_stat_returned') || '27') + 1;
            let points = parseInt(localStorage.getItem('libraviet_stat_points') || '580') + 50;

            localStorage.setItem('libraviet_stat_returned', returnedCount.toString());
            localStorage.setItem('libraviet_stat_points', points.toString());

            saveToLocalStorage();
            updateStats();
            filterBooks();
            renderBorrowTable();
            renderHistoryPage();

            showScanResult(false, book, null);
        } else {
            showScanError(currentLang === 'vi'
                ? `Không tìm thấy phiếu mượn của sách "${book.title}".`
                : `No borrow record found for "${book.title}".`, getBookQrValue(book));
        }
    } else {
        showScanError(currentLang === 'vi'
            ? `Sách "${book.title}" chưa thể giao dịch.`
            : `"${book.title}" cannot be processed right now.`, getBookQrValue(book));
    }
}

function triggerDirectTransaction(bookId) {
    executeTransaction(Number(bookId));
}

function showScanResult(isBorrow, book, qrCodeValue) {
    const emoji = document.getElementById('qrEmoji');
    const title = document.getElementById('qrTitle');
    const sub = document.getElementById('qrSub');
    const display = document.getElementById('qrDisplay');
    const info = document.getElementById('qrInfo');
    const modalBox = document.querySelector('#qrModal .modal');

    if (modalBox) modalBox.classList.remove('scanner-modal');
    if (display) display.className = 'qr-code';
    if (info) info.className = 'modal-info';

    if (isBorrow) {
        if (emoji) emoji.textContent = '🎉';
        title.textContent = currentLang === 'vi' ? 'Mượn Sách Thành Công!' : 'Borrow Successful!';
        sub.textContent = book.title;
        display.innerHTML = makeQRsvg(qrCodeValue);
        info.innerHTML = currentLang === 'vi'
            ? `Chúc mừng bạn đã mượn thành công cuốn <strong>${book.title}</strong>.<br/>Mã giao dịch: <code>${qrCodeValue}</code>.<br/>Mã QR dán trên sách: <code>${getBookQrValue(book)}</code>.<br/>Hạn trả sách là 14 ngày kể từ hôm nay.`
            : `You have successfully borrowed <strong>${book.title}</strong>.<br/>Transaction code: <code>${qrCodeValue}</code>.<br/>Book label QR: <code>${getBookQrValue(book)}</code>.<br/>Return deadline is 14 days from today.`;
    } else {
        if (emoji) emoji.textContent = '✅';
        title.textContent = currentLang === 'vi' ? 'Trả Sách Thành Công!' : 'Return Successful!';
        sub.textContent = book.title;
        display.innerHTML = `<div style="padding:20px; font-size:64px; color:#16A34A">🎉</div>`;
        info.innerHTML = currentLang === 'vi'
            ? `Cảm ơn bạn đã trả cuốn sách <strong>${book.title}</strong>!<br/><strong style="color:#16A34A">+50 Điểm tích lũy</strong> đã được cộng vào tài khoản của bạn.`
            : `Thank you for returning <strong>${book.title}</strong>!<br/><strong style="color:#16A34A">+50 Points</strong> have been added to your account.`;
    }
}

// =====11 E-BOOK READER CONTROLLER FUNCTIONS =====
function openReader(bookId) {
    if (!requireLogin()) return;
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    const contentData = bookContents[bookId];
    if (!contentData) {
        alert(currentLang === 'vi'
            ? 'Rất tiếc! Nội dung trực tuyến của cuốn sách này đang được cập nhật.'
            : 'Sorry! The online content for this book is currently being updated.');
        return;
    }

    currentReadingBookId = bookId;

    const savedProgress = localStorage.getItem(`libraviet_reading_progress_${bookId}`);
    currentReadingPage = savedProgress ? parseInt(savedProgress) : 0;

    currentFontSize = parseInt(localStorage.getItem('libraviet_reader_font_size') || '16');
    currentReaderTheme = localStorage.getItem('libraviet_reader_theme') || 'light';

    document.getElementById('readerBookTitle').textContent = book.title;
    document.getElementById('readerBookAuthor').textContent = book.author;

    document.getElementById('fontSizeIndicator').textContent = currentFontSize + 'px';

    const sidebarList = document.getElementById('readerChaptersList');
    if (sidebarList) {
        sidebarList.innerHTML = contentData.chapters.map((ch, idx) => `
            <li class="${idx === currentReadingPage ? 'active' : ''}" onclick="jumpToPage(${idx})">
                ${currentLang === 'vi' ? 'Chương' : 'Chapter'} ${idx + 1}: ${ch.title.split(': ')[1] || ch.title}
            </li>
        `).join('');
    }

    applyReaderTheme(currentReaderTheme);
    renderReaderContent();

    const overlay = document.getElementById('readerOverlay');
    if (overlay) {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    closeModal();
}

function closeReader() {
    const overlay = document.getElementById('readerOverlay');
    if (overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }
    const sidebar = document.querySelector('.reader-sidebar');
    if (sidebar) {
        sidebar.classList.remove('mobile-open');
    }
    currentReadingBookId = null;
}

function toggleReaderSidebar() {
    const sidebar = document.querySelector('.reader-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('mobile-open');
    }
}

function renderReaderContent() {
    if (currentReadingBookId === null) return;

    const contentData = bookContents[currentReadingBookId];
    if (!contentData) return;

    const chapter = contentData.chapters[currentReadingPage];
    const contentArea = document.getElementById('readerContent');
    if (contentArea && chapter) {
        contentArea.innerHTML = `
            <h2 style="font-family:'Playfair Display', serif; font-size: 26px; margin-bottom: 24px;">${chapter.title}</h2>
            <div>${chapter.content}</div>
        `;
        contentArea.style.fontSize = currentFontSize + 'px';
    }

    const pageNumSpan = document.getElementById('readerPageNum');
    if (pageNumSpan) {
        pageNumSpan.textContent = `${currentLang === 'vi' ? 'Chương' : 'Chapter'} ${currentReadingPage + 1} / ${contentData.chapters.length}`;
    }

    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');

    if (prevBtn) prevBtn.disabled = (currentReadingPage === 0);
    if (nextBtn) nextBtn.disabled = (currentReadingPage === contentData.chapters.length - 1);

    const sidebarItems = document.querySelectorAll('#readerChaptersList li');
    sidebarItems.forEach((item, idx) => {
        if (idx === currentReadingPage) {
            item.classList.add('active');
            item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } else {
            item.classList.remove('active');
        }
    });

    localStorage.setItem(`libraviet_reading_progress_${currentReadingBookId}`, currentReadingPage.toString());
}

function nextPage() {
    if (currentReadingBookId === null) return;
    const contentData = bookContents[currentReadingBookId];
    if (!contentData) return;

    if (currentReadingPage < contentData.chapters.length - 1) {
        currentReadingPage++;
        renderReaderContent();
        document.querySelector('.reader-content-wrap').scrollTop = 0;
    }
}

function prevPage() {
    if (currentReadingPage > 0) {
        currentReadingPage--;
        renderReaderContent();
        document.querySelector('.reader-content-wrap').scrollTop = 0;
    }
}

function jumpToPage(pageIndex) {
    currentReadingPage = pageIndex;
    renderReaderContent();
    document.querySelector('.reader-content-wrap').scrollTop = 0;

    // Close mobile TOC drawer if open
    const sidebar = document.querySelector('.reader-sidebar');
    if (sidebar) {
        sidebar.classList.remove('mobile-open');
    }
}

function changeFontSize(delta) {
    const newSize = currentFontSize + delta;
    if (newSize >= 12 && newSize <= 28) {
        currentFontSize = newSize;
        const contentArea = document.getElementById('readerContent');
        if (contentArea) {
            contentArea.style.fontSize = currentFontSize + 'px';
        }
        const indicator = document.getElementById('fontSizeIndicator');
        if (indicator) {
            indicator.textContent = currentFontSize + 'px';
        }
        localStorage.setItem('libraviet_reader_font_size', currentFontSize.toString());
    }
}

function changeReaderTheme(theme) {
    currentReaderTheme = theme;
    applyReaderTheme(theme);
    localStorage.setItem('libraviet_reader_theme', theme);
}

function applyReaderTheme(theme) {
    const overlay = document.getElementById('readerOverlay');
    if (!overlay) return;

    overlay.className = 'reader-overlay open reader-theme-' + theme;

    document.querySelectorAll('.theme-dot').forEach(dot => {
        dot.classList.remove('active');
        if (dot.classList.contains('theme-' + theme)) {
            dot.classList.add('active');
        }
    });
}

// =====12 SEARCH =====
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') doSearch();
    });
}

function doSearch() {
    showPage('homePage');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const catalogNav = document.querySelector('.nav-item:nth-child(2)');
    if (catalogNav) catalogNav.classList.add('active');

    const q = document.getElementById('searchInput').value.toLowerCase().trim();
    const banner = document.getElementById('searchBanner');
    if (!q) {
        renderBooks(books);
        if (banner) banner.classList.remove('show');
        return;
    }
    const results = books.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.isbn.includes(q)
    );
    renderBooks(results);
    if (banner) {
        banner.textContent = currentLang === 'vi'
            ? `🔍 Tìm thấy ${results.length} kết quả cho "${q}"`
            : `🔍 Found ${results.length} results for "${q}"`;
        banner.classList.add('show');
    }
}

// =====13 FILTER / TABS =====
function switchTab(el, tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    let list = [...books];
    if (tab === 'new') list = list.filter(b => b.badge === 'Mới' || b.id > 5);
    else if (tab === 'return') list = list.filter(b => b.status === 'available').slice(0, 4);
    renderBooks(list);
}

function filterCat(el, cat) {
    showPage('homePage');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const catalogNav = document.querySelector('.nav-item:nth-child(2)');
    if (catalogNav) catalogNav.classList.add('active');

    document.querySelectorAll('.cat-item').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    const list = cat === 'all' ? books : books.filter(b => b.cat === cat);
    renderBooks(list);
    const banner = document.getElementById('searchBanner');
    if (banner) banner.classList.remove('show');

    // Sync category dropdown if exists
    const genreSelect = document.getElementById('genreSelect');
    if (genreSelect) {
        if (cat === 'all') genreSelect.selectedIndex = 0;
        else {
            const catMap = {
                kynang: 1, congnghe: 2, kinhte: 3, vanhoc: 4
            };
            genreSelect.selectedIndex = catMap[cat] || 0;
        }
    }
}

function toggleTag(el, type) {
    el.classList.toggle('on');
    if (type === 'available') {
        isAvailableOnly = el.classList.contains('on');
    } else if (type === 'recommend') {
        isRecommendedOnly = el.classList.contains('on');
    }
    filterBooks();
}

function filterBooks() {
    const genreSelect = document.getElementById('genreSelect');
    const sortSelect = document.getElementById('sortSelect');

    let filtered = [...books];

    // 1. Genre filter
    if (genreSelect) {
        const genre = genreSelect.value;
        if (genre !== 'Tất cả thể loại' && genre !== 'All categories') {
            const genreMap = {
                'Tư duy – Kỹ năng': 'kynang', 'Skills': 'kynang',
                'Công nghệ': 'congnghe', 'Technology': 'congnghe',
                'Kinh tế': 'kinhte', 'Economics': 'kinhte',
                'Văn học': 'vanhoc', 'Literature': 'vanhoc'
            };
            const mappedCat = genreMap[genre];
            if (mappedCat) {
                filtered = filtered.filter(b => b.cat === mappedCat);
            }
        }
    }

    // 2. Available status filter
    if (isAvailableOnly) {
        filtered = filtered.filter(b => b.status === 'available');
    }

    // 3. Recommended status filter
    if (isRecommendedOnly) {
        filtered = filtered.filter(b => b.badge !== null);
    }

    // 4. Sort select
    if (sortSelect) {
        const sortVal = sortSelect.value;
        if (sortVal.includes('Tên A-Z') || sortVal.includes('Name A-Z')) {
            filtered.sort((a, b) => a.title.localeCompare(b.title, 'vi'));
        } else if (sortVal.includes('Mới nhất') || sortVal.includes('Newest')) {
            filtered.sort((a, b) => b.id - a.id);
        } else if (sortVal.includes('Phổ biến') || sortVal.includes('Popular')) {
            filtered.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
        }
    }

    renderBooks(filtered);
}

// =====14 NAVIGATION =====
let bannerCurrentIndex = 0;
let bannerInterval = null;

function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(page => {
        page.classList.remove('active-page');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active-page');
    }
}

function scrollToElement(selector) {
    const target = document.querySelector(selector);
    if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    }
}

function setNav(el, page) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if (el) el.classList.add('active');

    if (page === 'borrow') {
        showPage('borrowPage');
        renderBorrowTable();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    if (page === 'history') {
        showPage('historyPage');
        renderHistoryPage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    // Các mục còn lại sẽ quay về trang chủ rồi mới xử lý nội dung bên trong
    showPage('homePage');

    if (page === 'all') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'catalog') {
        scrollToElement('#bookGrid');
    } else if (page === 'recommend') {
        const recTag = document.getElementById('tagRecommend');
        if (recTag && !recTag.classList.contains('on')) {
            toggleTag(recTag, 'recommend');
        }
        scrollToElement('#bookGrid');
    }
}

function showBannerSlide(index) {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dot');
    if (!slides.length) return;
    bannerCurrentIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === bannerCurrentIndex);
    });
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === bannerCurrentIndex);
    });
}

function nextBannerSlide() {
    showBannerSlide(bannerCurrentIndex + 1);
}

function goToBannerSlide(index) {
    showBannerSlide(index);
    resetBannerInterval();
}

function resetBannerInterval() {
    if (bannerInterval) {
        clearInterval(bannerInterval);
    }
    bannerInterval = setInterval(nextBannerSlide, 2000);
}

function initBannerSlider() {
    showBannerSlide(0);
    resetBannerInterval();
}

// =====15 FORM VALIDATION =====
function validateSuggestForm(event) {
    event.preventDefault();

    const name = document.getElementById('sugName').value.trim();
    const id = document.getElementById('sugID').value.trim();
    const email = document.getElementById('sugEmail').value.trim();

    let isValid = true;

    if (name.length < 2) {
        document.getElementById('errName').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('errName').style.display = 'none';
    }

    const idRegex = /^SV\d{6}$/i;
    if (!idRegex.test(id)) {
        document.getElementById('errID').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('errID').style.display = 'none';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('errEmail').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('errEmail').style.display = 'none';
    }

    if (isValid) {
        document.getElementById('sugSuccess').style.display = 'block';
        document.getElementById('suggestForm').reset();
        setTimeout(() => {
            document.getElementById('sugSuccess').style.display = 'none';
        }, 3000);
    }
}

// =====16 LANGUAGE SWITCH =====
function toggleLang(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`lang-${lang}`).classList.add('active');

    // Update elements
    const catItems = document.querySelectorAll('.cat-item');
    if (lang === 'en') {
        document.getElementById('searchInput').placeholder = 'Search books, authors, ISBN...';
        document.querySelector('.logo').innerHTML = 'Libra<span>Viet</span>';
        document.querySelector('.nav-item:nth-child(1)').innerText = 'Home';
        document.querySelector('.nav-item:nth-child(2)').innerText = 'Categories';
        document.querySelector('.nav-item:nth-child(3)').innerText = 'Borrowing';
        document.querySelector('.nav-item:nth-child(4)').innerText = 'History';
        document.querySelector('.nav-item:nth-child(5)').innerText = 'Recommendations';

        // Header actions
        const btnQr = document.querySelector('.btn-qr');
        if (btnQr) btnQr.innerText = 'Scan QR';

        // Stats Card
        const statsCard = document.querySelector('.stats-card');
        if (statsCard) {
            statsCard.querySelector('.sidebar-title').innerText = 'My Stats';
            const labels = statsCard.querySelectorAll('.stat-label');
            if (labels.length >= 3) {
                labels[0].innerText = 'Borrowing';
                labels[1].innerText = 'Returned';
                labels[2].innerText = 'Points';
            }
        }

        // Categories Card
        const catCard = document.querySelector('.categories-card');
        if (catCard) {
            catCard.querySelector('.sidebar-title').innerText = 'Categories';
        }

        // Translate Category list items
        catItems.forEach(item => {
            const countSpan = item.querySelector('.cat-count');
            const count = countSpan ? countSpan.outerHTML : '';
            const text = item.textContent.toLowerCase();
            if (text.includes('tất cả') || text.includes('all')) {
                item.innerHTML = `All ${count}`;
            } else if (text.includes('tư duy') || text.includes('kỹ năng') || text.includes('skills')) {
                item.innerHTML = `Skills ${count}`;
            } else if (text.includes('kinh tế') || text.includes('tài chính') || text.includes('economics')) {
                item.innerHTML = `Economics ${count}`;
            } else if (text.includes('công nghệ') || text.includes('technology')) {
                item.innerHTML = `Technology ${count}`;
            } else if (text.includes('văn học') || text.includes('literature')) {
                item.innerHTML = `Literature ${count}`;
            } else if (text.includes('khoa học') || text.includes('science')) {
                item.innerHTML = `Science ${count}`;
            } else if (text.includes('lịch sử') || text.includes('history')) {
                item.innerHTML = `History ${count}`;
            }
        });

        // Reminders Card
        const remindersCard = document.querySelector('.reminders-card');
        if (remindersCard) {
            remindersCard.querySelector('.sidebar-title').innerText = 'Reminders';
            const contentDiv = remindersCard.querySelector('div[style*="font-size:13px"]');
            if (contentDiv) {
                contentDiv.innerHTML = `
                    📌 <strong style="color:var(--orange-deep)">Database System</strong><br />
                    &nbsp;&nbsp;Due date: <span style="color:#DC2626;font-weight:600">25/05</span> (6 days left)<br /><br />
                    📌 <strong style="color:var(--orange-deep)">Clean Code</strong><br />
                    &nbsp;&nbsp;Due date: 01/06 (13 days left)
                `;
            }
        }

        // Form
        document.querySelector('.sidebar-title-suggest').innerText = 'Suggest Book';
        document.getElementById('sugName').placeholder = 'Full name...';
        document.getElementById('sugID').placeholder = 'Student ID (e.g. SV123456)...';
        document.getElementById('sugEmail').placeholder = 'Email...';
        document.getElementById('sugTitle').placeholder = 'Suggested book title...';
        document.querySelector('#suggestForm button').innerText = 'Submit Suggestion';
        document.getElementById('sugSuccess').innerText = 'Submitted successfully!';

        // Form errors
        document.getElementById('errName').innerText = 'Name must be at least 2 characters';
        document.getElementById('errID').innerText = 'Format: SVxxxxxx (6 digits)';
        document.getElementById('errEmail').innerText = 'Invalid email address';

        // Main content headers
        document.querySelectorAll('.hero-copy h1').forEach(el => el.innerHTML = 'Smart Digital<br />Library');
        document.querySelectorAll('.hero-copy p').forEach(el => el.innerText = 'Search, borrow, and return books with a single QR scan. Manage your reading efficiently.');
        document.querySelector('.hero-btn-primary').innerHTML = 'Borrow via QR';
        document.querySelector('.hero-btn-secondary').innerHTML = 'Return via QR';

        document.querySelector('.tab:nth-child(1)').innerText = 'Bestsellers';
        document.querySelector('.tab:nth-child(2)').innerText = 'New Releases';
        document.querySelector('.tab:nth-child(3)').innerText = 'Recently Returned';

        document.querySelector('.section-title').innerHTML = '<span></span>Popular Books';
        document.querySelector('.view-all').innerText = 'View all →';

        // Dropdown option values update
        const genreSelect = document.getElementById('genreSelect');
        if (genreSelect) {
            genreSelect.options[0].text = 'All categories';
            genreSelect.options[1].text = 'Skills';
            genreSelect.options[2].text = 'Technology';
            genreSelect.options[3].text = 'Economics';
            genreSelect.options[4].text = 'Literature';
        }
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.options[0].text = 'Sort: Newest';
            sortSelect.options[1].text = 'Sort: Name A-Z';
            sortSelect.options[2].text = 'Sort: Popular';
        }

        // Tags
        const tagAvailable = document.getElementById('tagAvailable');
        if (tagAvailable) tagAvailable.innerText = '✅ Available';
        const tagRecommend = document.getElementById('tagRecommend');
        if (tagRecommend) tagRecommend.innerText = '🌟 Recommended';

        // Table Headers
        const tableHeaders = document.querySelectorAll('.borrow-table th');
        if (tableHeaders.length === 6) {
            tableHeaders[0].innerText = 'Book';
            tableHeaders[1].innerText = 'QR Code';
            tableHeaders[2].innerText = 'Borrow Date';
            tableHeaders[3].innerText = 'Due Date';
            tableHeaders[4].innerText = 'Status';
            tableHeaders[5].innerText = 'Actions';
        }

        document.querySelector('.borrow-table-wrap').previousElementSibling.querySelector('.section-title').innerHTML = '<span></span>Currently Borrowed';
        document.querySelector('.borrow-table-wrap').previousElementSibling.querySelector('.view-all').innerText = 'View History →';

        // Reader elements translations
        const readerClose = document.querySelector('.reader-close-btn');
        if (readerClose) readerClose.title = 'Close Reader';
        const readerPrev = document.getElementById('prevPageBtn');
        if (readerPrev) readerPrev.innerText = '← Previous Chapter';
        const readerNext = document.getElementById('nextPageBtn');
        if (readerNext) readerNext.innerText = 'Next Chapter →';
        const readerTocTitle = document.querySelector('.reader-sidebar h4');
        if (readerTocTitle) readerTocTitle.innerText = 'Table of Contents';
        const mobToc = document.querySelector('.mobile-toc-btn');
        if (mobToc) mobToc.title = 'Table of Contents';

        // Footer
        updateFooterLanguage('en');
        updateHistoryPageLanguage('en');
    } else {
        document.getElementById('searchInput').placeholder = 'Tìm kiếm sách, tác giả, ISBN...';
        document.querySelector('.logo').innerHTML = 'Libra<span>Viet</span>';
        document.querySelector('.nav-item:nth-child(1)').innerText = 'Trang chủ';
        document.querySelector('.nav-item:nth-child(2)').innerText = 'Danh mục sách';
        document.querySelector('.nav-item:nth-child(3)').innerText = 'Sách đang mượn';
        document.querySelector('.nav-item:nth-child(4)').innerText = 'Lịch sử';
        document.querySelector('.nav-item:nth-child(5)').innerText = 'Gợi ý cho bạn';

        // Header actions
        const btnQr = document.querySelector('.btn-qr');
        if (btnQr) btnQr.innerText = 'Quét QR';

        // Stats Card
        const statsCard = document.querySelector('.stats-card');
        if (statsCard) {
            statsCard.querySelector('.sidebar-title').innerText = 'Thống kê của tôi';
            const labels = statsCard.querySelectorAll('.stat-label');
            if (labels.length >= 3) {
                labels[0].innerText = 'Đang mượn';
                labels[1].innerText = 'Đã trả';
                labels[2].innerText = 'Điểm tích lũy';
            }
        }

        // Categories Card
        const catCard = document.querySelector('.categories-card');
        if (catCard) {
            catCard.querySelector('.sidebar-title').innerText = 'Danh mục';
        }

        // Translate Category list items
        catItems.forEach(item => {
            const countSpan = item.querySelector('.cat-count');
            const count = countSpan ? countSpan.outerHTML : '';
            const text = item.textContent.toLowerCase();
            if (text.includes('all') || text.includes('tất cả')) {
                item.innerHTML = `Tất cả ${count}`;
            } else if (text.includes('skills') || text.includes('tư duy')) {
                item.innerHTML = `Tư duy – Kỹ năng ${count}`;
            } else if (text.includes('economics') || text.includes('kinh tế')) {
                item.innerHTML = `Kinh tế – Tài chính ${count}`;
            } else if (text.includes('technology') || text.includes('công nghệ')) {
                item.innerHTML = `Công nghệ ${count}`;
            } else if (text.includes('literature') || text.includes('văn học')) {
                item.innerHTML = `Văn học ${count}`;
            } else if (text.includes('science') || text.includes('khoa học')) {
                item.innerHTML = `Khoa học ${count}`;
            } else if (text.includes('history') || text.includes('lịch sử')) {
                item.innerHTML = `Lịch sử ${count}`;
            }
        });

        // Reminders Card
        const remindersCard = document.querySelector('.reminders-card');
        if (remindersCard) {
            remindersCard.querySelector('.sidebar-title').innerText = 'Nhắc nhở';
            const contentDiv = remindersCard.querySelector('div[style*="font-size:13px"]');
            if (contentDiv) {
                contentDiv.innerHTML = `
                    📌 <strong style="color:var(--orange-deep)">Cơ sở dữ liệu</strong><br />
                    &nbsp;&nbsp;Hạn trả: <span style="color:#DC2626;font-weight:600">25/05</span> (còn 6 ngày)<br /><br />
                    📌 <strong style="color:var(--orange-deep)">Clean Code</strong><br />
                    &nbsp;&nbsp;Hạn trả: 01/06 (còn 13 ngày)
                `;
            }
        }

        // Form
        document.querySelector('.sidebar-title-suggest').innerText = 'Đề xuất sách mới';
        document.getElementById('sugName').placeholder = 'Họ và tên...';
        document.getElementById('sugID').placeholder = 'Mã SV (VD: SV123456)...';
        document.getElementById('sugEmail').placeholder = 'Email...';
        document.getElementById('sugTitle').placeholder = 'Tên sách đề xuất...';
        document.querySelector('#suggestForm button').innerText = 'Gửi đề xuất';
        document.getElementById('sugSuccess').innerText = 'Gửi đề xuất thành công!';

        // Form errors
        document.getElementById('errName').innerText = 'Họ tên từ 2 ký tự';
        document.getElementById('errID').innerText = 'Định dạng SVxxxxxx (6 số)';
        document.getElementById('errEmail').innerText = 'Email không hợp lệ';

        // Main content headers
        document.querySelectorAll('.hero-copy h1').forEach(el => el.innerHTML = 'Thư Viện Số<br />Thông Minh');
        document.querySelectorAll('.hero-copy p').forEach(el => el.innerText = 'Tìm kiếm, mượn và trả sách chỉ với 1 cú quét QR. Quản lý việc đọc sách hiệu quả.');
        document.querySelector('.hero-btn-primary').innerHTML = 'Mượn sách qua QR';
        document.querySelector('.hero-btn-secondary').innerHTML = 'Trả sách qua QR';

        document.querySelector('.tab:nth-child(1)').innerText = '🔥 Bán chạy';
        document.querySelector('.tab:nth-child(2)').innerText = '🆕 Mới nhất';
        document.querySelector('.tab:nth-child(3)').innerText = '🔄 Vừa được trả';

        document.querySelector('.section-title').innerHTML = '<span></span>Top Sách Phổ Biến';
        document.querySelector('.view-all').innerText = 'Xem tất cả →';

        // Dropdown option values update
        const genreSelect = document.getElementById('genreSelect');
        if (genreSelect) {
            genreSelect.options[0].text = 'Tất cả thể loại';
            genreSelect.options[1].text = 'Tư duy – Kỹ năng';
            genreSelect.options[2].text = 'Công nghệ';
            genreSelect.options[3].text = 'Kinh tế';
            genreSelect.options[4].text = 'Văn học';
        }
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.options[0].text = 'Sắp xếp: Mới nhất';
            sortSelect.options[1].text = 'Sắp xếp: Tên A-Z';
            sortSelect.options[2].text = 'Sắp xếp: Phổ biến';
        }

        // Tags
        const tagAvailable = document.getElementById('tagAvailable');
        if (tagAvailable) tagAvailable.innerText = '✅ Còn sách';
        const tagRecommend = document.getElementById('tagRecommend');
        if (tagRecommend) tagRecommend.innerText = '🌟 Đề xuất';

        // Table Headers
        const tableHeaders = document.querySelectorAll('.borrow-table th');
        if (tableHeaders.length === 6) {
            tableHeaders[0].innerText = 'Sách';
            tableHeaders[1].innerText = 'Mã QR';
            tableHeaders[2].innerText = 'Ngày mượn';
            tableHeaders[3].innerText = 'Hạn trả';
            tableHeaders[4].innerText = 'Trạng thái';
            tableHeaders[5].innerText = 'Thao tác';
        }

        document.querySelector('.borrow-table-wrap').previousElementSibling.querySelector('.section-title').innerHTML = '<span></span>Sách Đang Mượn';
        document.querySelector('.borrow-table-wrap').previousElementSibling.querySelector('.view-all').innerText = 'Xem lịch sử →';

        // Reader elements translations
        const readerClose = document.querySelector('.reader-close-btn');
        if (readerClose) readerClose.title = 'Đóng trình đọc';
        const readerPrev = document.getElementById('prevPageBtn');
        if (readerPrev) readerPrev.innerText = '← Trang trước';
        const readerNext = document.getElementById('nextPageBtn');
        if (readerNext) readerNext.innerText = 'Trang sau →';
        const readerTocTitle = document.querySelector('.reader-sidebar h4');
        if (readerTocTitle) readerTocTitle.innerText = 'Mục Lục';
        const mobToc = document.querySelector('.mobile-toc-btn');
        if (mobToc) mobToc.title = 'Mục lục';

        // Footer
        updateFooterLanguage('vi');
        updateHistoryPageLanguage('vi');
    }

    // Apply updates inside reader if open
    if (currentReadingBookId !== null) {
        document.getElementById('fontSizeIndicator').textContent = currentFontSize + 'px';
        const pageNumSpan = document.getElementById('readerPageNum');
        const contentData = bookContents[currentReadingBookId];
        if (pageNumSpan && contentData) {
            pageNumSpan.textContent = `${currentLang === 'vi' ? 'Chương' : 'Chapter'} ${currentReadingPage + 1} / ${contentData.chapters.length}`;
        }

        // Rerender chapters sidebar text
        const sidebarList = document.getElementById('readerChaptersList');
        if (sidebarList && contentData) {
            sidebarList.innerHTML = contentData.chapters.map((ch, idx) => `
                <li class="${idx === currentReadingPage ? 'active' : ''}" onclick="jumpToPage(${idx})">
                    ${currentLang === 'vi' ? 'Chương' : 'Chapter'} ${idx + 1}: ${ch.title.split(': ')[1] || ch.title}
                </li>
            `).join('');
        }
    }

    filterBooks();
    renderBorrowTable();
};



// ===== AUTH: ĐĂNG KÝ / ĐĂNG NHẬP KHÔNG DÙNG DATABASE =====
const AUTH_USERS_KEY = 'libraviet_auth_users';
const AUTH_SESSION_KEY = 'libraviet_current_user';

function getAuthUsers() {
    try {
        const raw = localStorage.getItem(AUTH_USERS_KEY);
        const users = raw ? JSON.parse(raw) : [];
        return Array.isArray(users) ? users : [];
    } catch (e) {
        return [];
    }
}

function saveAuthUsers(users) {
    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
    try {
        const raw = localStorage.getItem(AUTH_SESSION_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        return null;
    }
}

function saveCurrentUser(user) {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
}

function normalizeText(value) {
    return String(value || '').trim();
}

function normalizeAccount(value) {
    return normalizeText(value).toLowerCase();
}

function simpleEncodePassword(password) {
    // Demo localStorage: chỉ mã hóa base64 để tránh nhìn trực tiếp, không phải bảo mật thật.
    try {
        return btoa(unescape(encodeURIComponent(password)));
    } catch (e) {
        return password;
    }
}

function showAuthMessage(message, type = 'error') {
    const box = document.getElementById('authMessage');
    if (!box) return;
    box.className = `auth-message show ${type}`;
    box.textContent = message;
}

function clearAuthMessage() {
    const box = document.getElementById('authMessage');
    if (!box) return;
    box.className = 'auth-message';
    box.textContent = '';
}

function switchAuthMode(mode) {
    const isRegister = mode === 'register';
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const title = document.getElementById('authTitle');
    const subtitle = document.getElementById('authSubtitle');

    if (loginForm) loginForm.classList.toggle('auth-hidden', isRegister);
    if (registerForm) registerForm.classList.toggle('auth-hidden', !isRegister);
    if (loginTab) loginTab.classList.toggle('active', !isRegister);
    if (registerTab) registerTab.classList.toggle('active', isRegister);

    if (title) title.textContent = isRegister ? 'Đăng ký' : 'Đăng nhập';
    if (subtitle) subtitle.textContent = isRegister
        ? 'Tạo tài khoản mới. Sau khi đăng ký thành công, bạn cần đăng nhập để vào hệ thống.'
        : 'Nhập tài khoản đã đăng ký để vào hệ thống.';

    clearAuthMessage();
}

function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const willShow = input.type === 'password';
    input.type = willShow ? 'text' : 'password';
    if (btn) btn.textContent = willShow ? 'Ẩn' : 'Hiện';
}

function handleRegister(event) {
    event.preventDefault();

    const fullName = normalizeText(document.getElementById('regFullName')?.value);
    const studentId = normalizeText(document.getElementById('regStudentId')?.value).toUpperCase();
    const email = normalizeAccount(document.getElementById('regEmail')?.value);
    const password = document.getElementById('regPassword')?.value || '';
    const confirmPassword = document.getElementById('regConfirmPassword')?.value || '';

    if (fullName.length < 2) {
        showAuthMessage('Vui lòng nhập họ tên hợp lệ.');
        return;
    }
    if (!/^SV\d{6}$/i.test(studentId)) {
        showAuthMessage('Mã sinh viên phải có dạng SV123456.');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showAuthMessage('Email không hợp lệ.');
        return;
    }
    if (password.length < 6) {
        showAuthMessage('Mật khẩu phải có tối thiểu 6 ký tự.');
        return;
    }
    if (password !== confirmPassword) {
        showAuthMessage('Mật khẩu nhập lại không khớp.');
        return;
    }

    const users = getAuthUsers();
    const existed = users.some(u => normalizeAccount(u.email) === email || normalizeAccount(u.studentId) === normalizeAccount(studentId));
    if (existed) {
        showAuthMessage('Email hoặc mã sinh viên này đã được đăng ký. Vui lòng đăng nhập hoặc dùng tài khoản khác.');
        return;
    }

    const newUser = {
        id: 'USER-' + Date.now(),
        fullName,
        studentId,
        email,
        password: simpleEncodePassword(password),
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveAuthUsers(users);

    const registerForm = document.getElementById('registerForm');
    if (registerForm) registerForm.reset();
    const loginAccount = document.getElementById('loginAccount');
    if (loginAccount) loginAccount.value = studentId;

    switchAuthMode('login');
    showAuthMessage('Đăng ký tài khoản thành công. Vui lòng đăng nhập để vào giao diện chính.', 'success');
}

function handleLogin(event) {
    event.preventDefault();

    const account = normalizeAccount(document.getElementById('loginAccount')?.value);
    const password = document.getElementById('loginPassword')?.value || '';
    const users = getAuthUsers();
    const found = users.find(u => normalizeAccount(u.email) === account || normalizeAccount(u.studentId) === account);

    if (!found || found.password !== simpleEncodePassword(password)) {
        showAuthMessage('Tài khoản hoặc mật khẩu không đúng. Bạn cần đăng ký thành công trước khi đăng nhập.');
        return;
    }

    const sessionUser = {
        id: found.id,
        fullName: found.fullName,
        studentId: found.studentId,
        email: found.email,
        loginAt: new Date().toISOString()
    };
    saveCurrentUser(sessionUser);

    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.reset();
    clearAuthMessage();
    enterMainApp(sessionUser);
}

function updateUserHeader(user) {
    const displayName = document.getElementById('userDisplayName');
    const displayId = document.getElementById('userDisplayId');
    const avatar = document.getElementById('userAvatar');

    if (displayName) displayName.textContent = user?.fullName || 'Sinh viên';
    if (displayId) displayId.textContent = user?.studentId || 'Đang đăng nhập';
    if (avatar) {
        const words = normalizeText(user?.fullName).split(/\s+/).filter(Boolean);
        const initials = words.length >= 2
            ? (words[words.length - 2][0] + words[words.length - 1][0])
            : (words[0]?.slice(0, 2) || 'SV');
        avatar.textContent = initials.toUpperCase();
    }
}

function enterMainApp(user) {
    updateUserHeader(user);
    document.body.classList.remove('auth-locked');
    const authPage = document.getElementById('authPage');
    if (authPage) authPage.style.display = 'none';
    showPage('homePage');
    const firstNav = document.querySelector('.nav-item');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if (firstNav) firstNav.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAuthScreen(message) {
    stopBookScanner(false);
    if (typeof closeReader === 'function') closeReader();
    document.body.classList.add('auth-locked');
    const authPage = document.getElementById('authPage');
    if (authPage) authPage.style.display = '';
    switchAuthMode('login');
    if (message) showAuthMessage(message, 'error');
}

function logoutUser() {
    localStorage.removeItem(AUTH_SESSION_KEY);
    showAuthScreen('Bạn đã đăng xuất. Vui lòng đăng nhập để tiếp tục sử dụng hệ thống.');
}

function initAuth() {
    const user = getCurrentUser();
    if (user && user.id) {
        enterMainApp(user);
    } else {
        showAuthScreen();
    }
}

function requireLogin() {
    const user = getCurrentUser();
    if (!user || !user.id) {
        showAuthScreen('Vui lòng đăng ký/đăng nhập trước khi sử dụng chức năng này.');
        return false;
    }
    return true;
}

// =====17 INIT =====
document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    loadData();
    initBannerSlider();
});
// ===== PROFILE DROPDOWN + PROFILE PAGE PATCH =====

function toggleUserDropdown(event) {
    if (event) event.stopPropagation();

    const wrap = document.querySelector('.user-menu-wrap');
    const btn = document.getElementById('userMenuBtn');
    if (!wrap) return;

    const willOpen = !wrap.classList.contains('open');
    wrap.classList.toggle('open', willOpen);

    if (btn) {
        btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    }
}

function closeUserDropdown() {
    const wrap = document.querySelector('.user-menu-wrap');
    const btn = document.getElementById('userMenuBtn');

    if (wrap) wrap.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
}

function escapeHTML(value) {
    return String(value || '').replace(/[&<>"']/g, function (ch) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[ch];
    });
}

function getUserInitials(name) {
    const text = String(name || '').trim();
    const words = text.split(/\s+/).filter(Boolean);

    if (words.length >= 2) {
        return (words[words.length - 2][0] + words[words.length - 1][0]).toUpperCase();
    }

    return (words[0]?.slice(0, 2) || 'SV').toUpperCase();
}

function formatDateTimeVN(value) {
    if (!value) return '---';

    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '---';

    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');

    return `${dd}/${mm}/${yyyy} ${hh}:${mi}`;
}

function openProfilePage() {
    if (!requireLogin()) return;

    closeUserDropdown();

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    showPage('profilePage');
    renderProfilePage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderProfilePage() {
    const user = getCurrentUser();
    if (!user || !user.id) return;

    const users = getAuthUsers();
    const savedUser = users.find(u => u.id === user.id) || user;

    const returnedCount = parseInt(localStorage.getItem('libraviet_stat_returned') || '27');
    const points = parseInt(localStorage.getItem('libraviet_stat_points') || '580');

    const avatarBig = document.getElementById('profileAvatarBig');
    const nameEl = document.getElementById('profileName');
    const studentIdEl = document.getElementById('profileStudentId');
    const emailEl = document.getElementById('profileEmail');
    const userIdEl = document.getElementById('profileUserId');
    const createdAtEl = document.getElementById('profileCreatedAt');
    const loginAtEl = document.getElementById('profileLoginAt');
    const borrowingEl = document.getElementById('profileBorrowingCount');
    const returnedEl = document.getElementById('profileReturnedCount');
    const pointsEl = document.getElementById('profilePointsCount');

    if (avatarBig) avatarBig.textContent = getUserInitials(user.fullName);
    if (nameEl) nameEl.textContent = user.fullName || 'Sinh viên';
    if (studentIdEl) studentIdEl.textContent = user.studentId || '---';
    if (emailEl) emailEl.textContent = user.email || savedUser.email || '---';
    if (userIdEl) userIdEl.textContent = user.id || '---';
    if (createdAtEl) createdAtEl.textContent = formatDateTimeVN(savedUser.createdAt);
    if (loginAtEl) loginAtEl.textContent = formatDateTimeVN(user.loginAt);
    if (borrowingEl) borrowingEl.textContent = Array.isArray(borrowRecords) ? borrowRecords.length : 0;
    if (returnedEl) returnedEl.textContent = returnedCount;
    if (pointsEl) pointsEl.textContent = points;
}

// Ghi đè hàm updateUserHeader cũ để cập nhật avatar, tên, mã SV đẹp hơn
function updateUserHeader(user) {
    const displayName = document.getElementById('userDisplayName');
    const displayId = document.getElementById('userDisplayId');
    const avatar = document.getElementById('userAvatar');

    if (displayName) displayName.textContent = user?.fullName || 'Sinh viên';
    if (displayId) displayId.textContent = user?.studentId || 'Đang đăng nhập';
    if (avatar) avatar.textContent = getUserInitials(user?.fullName);
}

function updateSmartNavText(lang = currentLang) {
    const navData = lang === 'en'
        ? [
            ['🏠', 'Home'],
            ['📚', 'Categories'],
            ['📖', 'Borrowing'],
            ['🕘', 'History'],
            ['⭐', 'Recommendations']
        ]
        : [
            ['🏠', 'Trang chủ'],
            ['📚', 'Danh mục sách'],
            ['📖', 'Sách đang mượn'],
            ['🕘', 'Lịch sử'],
            ['⭐', 'Gợi ý cho bạn']
        ];

    document.querySelectorAll('.nav-item').forEach((item, index) => {
        const data = navData[index];
        if (!data) return;

        item.innerHTML = `
            <span class="nav-icon">${data[0]}</span>
            <span class="nav-label">${data[1]}</span>
        `;
    });

    const profileLabel = document.getElementById('dropdownProfileLabel');
    const logoutLabel = document.getElementById('dropdownLogoutLabel');
    const profileTitle = document.getElementById('profilePageTitle');
    const profileDesc = document.getElementById('profilePageDesc');

    if (lang === 'en') {
        if (profileLabel) profileLabel.textContent = 'Profile';
        if (logoutLabel) logoutLabel.textContent = 'Log out';
        if (profileTitle) profileTitle.textContent = 'Profile';
        if (profileDesc) profileDesc.textContent = 'Manage your account information, borrow statistics, and reward points.';
    } else {
        if (profileLabel) profileLabel.textContent = 'Trang cá nhân';
        if (logoutLabel) logoutLabel.textContent = 'Đăng xuất';
        if (profileTitle) profileTitle.textContent = 'Trang Cá Nhân';
        if (profileDesc) profileDesc.textContent = 'Quản lý thông tin tài khoản, thống kê mượn trả và điểm tích lũy của bạn.';
    }

    if (document.getElementById('profilePage')?.classList.contains('active-page')) {
        renderProfilePage();
    }
}

document.addEventListener('click', function (event) {
    if (!event.target.closest('.user-menu-wrap')) {
        closeUserDropdown();
    }

    if (event.target.id === 'lang-vi' || event.target.id === 'lang-en') {
        setTimeout(() => updateSmartNavText(currentLang), 0);
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeUserDropdown();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        updateSmartNavText(currentLang);
        renderProfilePage();
    }, 200);
});