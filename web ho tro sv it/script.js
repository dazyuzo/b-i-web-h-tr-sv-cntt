// Đây là danh sách bài viết mẫu
const samplePosts = [
    { title: 'Cách học C++ hiệu quả', content: 'Học C++ có thể gặp rất nhiều khó khăn, nhưng có những phương pháp học hiệu quả để nắm vững kiến thức.', topic: 'cpp' },
    { title: 'Cơ sở dữ liệu MySQL', content: 'MySQL là hệ quản trị cơ sở dữ liệu phổ biến. Cùng tìm hiểu cách làm việc với MySQL.', topic: 'mysql' },
    { title: 'HTML và CSS cơ bản', content: 'HTML và CSS là nền tảng để xây dựng các trang web. Hãy cùng học cách tạo giao diện đơn giản.', topic: 'html' },
    { title: 'Cách tối ưu hóa C++', content: 'Một số chiến lược tối ưu hóa C++ giúp chương trình chạy nhanh hơn và tiết kiệm tài nguyên.', topic: 'cpp' },
    { title: 'Lập trình web với HTML', content: 'Tìm hiểu cách sử dụng HTML để xây dựng các trang web đơn giản.', topic: 'html' }
];

// Hàm tìm kiếm bài viết
function searchPosts() {
    // Lấy giá trị từ ô tìm kiếm chủ đề
    const searchQuery = document.getElementById('searchMenu').value; // Chủ đề tìm kiếm
    // Lấy từ khóa người dùng nhập vào ô tìm kiếm
    const keyword = document.getElementById('searchInput').value.toLowerCase(); // Từ khóa tìm kiếm, chuyển thành chữ thường

    // Lọc ra các bài viết phù hợp với từ khóa và chủ đề
    const filteredPosts = samplePosts.filter(post => {
        // Kiểm tra xem tiêu đề bài viết có chứa từ khóa không
        const titleMatch = post.title.toLowerCase().includes(keyword); 
        // Kiểm tra xem nội dung bài viết có chứa từ khóa không
        const contentMatch = post.content.toLowerCase().includes(keyword); 
        // Kiểm tra xem bài viết có chủ đề phù hợp không (hoặc là tất cả)
        const topicMatch = (searchQuery === 'all') || (post.topic === searchQuery); 

        // Trả về bài viết nếu tiêu đề, nội dung hoặc chủ đề phù hợp
        return (titleMatch || contentMatch) && topicMatch;
    });

    // Hiển thị lại các bài viết sau khi lọc
    displayPosts(filteredPosts);
}

// Hàm hiển thị danh sách bài viết
function displayPosts(posts) {
    const discussionBoard = document.getElementById('discussionBoard');
    // Chuyển danh sách bài viết thành HTML và hiển thị
    discussionBoard.innerHTML = posts.map(post => {
        return `
            <div class="discussion-item">
                <h4>${post.title}</h4>
                <p>${post.content.substring(0, 100)}...</p> <!-- Cắt 100 ký tự đầu tiên của nội dung -->
                <a href="#" onclick="viewPostDetail('${post.title}')">Đọc thêm</a>
            </div>
        `;
    }).join('');
}

// Hàm xem chi tiết bài viết khi nhấp vào "Đọc thêm"
function viewPostDetail(title) {
    // Tìm bài viết theo tiêu đề
    const post = samplePosts.find(p => p.title === title);
    if (post) {
        // Hiển thị chi tiết bài viết trong một thông báo
        alert(`Tiêu đề: ${post.title}\nNội dung: ${post.content}`);
    }
}

// Hiển thị tất cả bài viết khi trang được tải
displayPosts(samplePosts);

// Xử lý sự kiện khi người dùng thêm bài viết mới
document.getElementById('newPostForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Ngừng hành động mặc định khi gửi form

    // Lấy các giá trị từ form nhập liệu
    const title = document.getElementById('postTitle').value; 
    const content = document.getElementById('postContent').value;
    const topic = document.getElementById('postTopic').value;
    
    // Thêm bài viết mới vào danh sách
    samplePosts.push({ title, content, topic });
    // Cập nhật danh sách bài viết sau khi thêm bài mới
    displayPosts(samplePosts);

    // Reset các trường trong form sau khi thêm bài viết mới
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
    document.getElementById('postTopic').value = 'cpp'; // Đặt mặc định chủ đề là C++
});
