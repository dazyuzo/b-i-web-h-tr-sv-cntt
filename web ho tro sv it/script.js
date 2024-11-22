// Dữ liệu bài viết mẫu
const topics = [
    { id: 1, title: "Lập trình C++ cơ bản", content: "Thảo luận về các khái niệm cơ bản trong lập trình C++.", category: "C/C++" },
    { id: 2, title: "Frontend Development", content: "Chia sẻ tài liệu và kinh nghiệm học HTML, CSS, và JavaScript.", category: "Web Development" },
    { id: 3, title: "Công nghệ AI", content: "Những xu hướng mới nhất trong AI và Machine Learning.", category: "AI" },
];

// Lấy ID từ URL (nếu có)
const urlParams = new URLSearchParams(window.location.search);
const topicId = parseInt(urlParams.get("id"));

// Kiểm tra xem có phải trang chi tiết không
const isDetailPage = topicId > 0;

// Hiển thị phần phù hợp
if (isDetailPage) {
    // Hiện chi tiết nội dung bài viết và ẩn diễn đàn
    document.getElementById("forum-section").style.display = "none";
    document.getElementById("post-section").style.display = "block";

    // Tìm bài viết 
    const topic = topics.find(t => t.id === topicId);
    const postSection = document.getElementById("post-section");

    if (topic) {
        postSection.innerHTML = `
            <h2>${topic.title}</h2>
            <p>${topic.content}</p>
        `;
    } else {
        postSection.innerHTML = "<p>Bài viết không tồn tại.</p>";
    }
} else {
    // Nếu không phải trang chi tiết, hiển thị danh sách chủ đề diễn đàn
    document.getElementById("forum-section").style.display = "block";
    document.getElementById("post-section").style.display = "none";

    // Hiển thị danh sách các chủ đề
    displayTopics(topics);
}

// Thêm chủ đề mới
function addTopic(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const category = document.querySelector('input[name="category"]:checked')?.value || 'Chưa phân loại';
    const newTopic = { id: topics.length + 1, title, content, category };

    // Thêm vào danh sách và cập nhật
    topics.push(newTopic);
    displayTopics(topics);

    // Xóa nội dung sau khi đăng
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
}

// Hàm hiển thị chủ đề
function displayTopics(topicsList) {
    const topicsContainer = document.getElementById("topics");
    topicsContainer.innerHTML = ''; // Xóa nội dung cũ

    topicsList.forEach(topic => {
        const topicElement = document.createElement("div");
        topicElement.classList.add("topic");
        topicElement.innerHTML = `
            <h3><a href="?id=${topic.id}">${topic.title}</a></h3>
            <p>${topic.content}</p>
        `;
        topicsContainer.appendChild(topicElement);
    });
}

// Tính năng tìm kiếm
function searchTopics() {
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(input => input.value);
    
    // Lọc các chủ đề dựa trên lựa chọn
    const filteredTopics = topics.filter(topic => {
        if (selectedCategories.length === 0) return true; // Nếu không chọn gì, hiển thị tất cả
        return selectedCategories.includes(topic.category);
    });

    // Hiển thị kết quả lọc
    displayTopics(filteredTopics);
}

// Thêm sự kiện cho phần tìm kiếm
document.getElementById("search-form").addEventListener("change", searchTopics);
