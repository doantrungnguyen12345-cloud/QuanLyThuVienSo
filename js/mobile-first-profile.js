// =====================================================
// LIBRAVIET MOBILE FIRST PROFILE PATCH
// File: js/mobile-first-profile.js
// File này phải nhúng sau js/script.js
// =====================================================

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

function getUserInitials(name) {
    const text = String(name || '').trim();
    const words = text.split(/\s+/).filter(Boolean);

    if (words.length >= 2) {
        return (words[words.length - 2][0] + words[words.length - 1][0]).toUpperCase();
    }

    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    }

    return 'SV';
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

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    showPage('profilePage');
    renderProfilePage();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
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

// Ghi đè hàm updateUserHeader cũ trong script.js
function updateUserHeader(user) {
    const displayName = document.getElementById('userDisplayName');
    const displayId = document.getElementById('userDisplayId');
    const avatar = document.getElementById('userAvatar');

    if (displayName) displayName.textContent = user?.fullName || 'Sinh viên';
    if (displayId) displayId.textContent = user?.studentId || 'Đang đăng nhập';
    if (avatar) avatar.textContent = getUserInitials(user?.fullName);
}

function updateSmartNavText(lang) {
    const current = lang || (typeof currentLang !== 'undefined' ? currentLang : 'vi');

    const navData = current === 'en'
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

    if (current === 'en') {
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
}

// Bọc lại hàm toggleLang cũ để khi đổi ngôn ngữ không bị mất icon nav
if (typeof toggleLang === 'function') {
    const oldToggleLang = toggleLang;

    toggleLang = function (lang) {
        oldToggleLang(lang);
        setTimeout(() => {
            updateSmartNavText(lang);
            renderProfilePage();
        }, 0);
    };
}

// Bọc lại hàm setNav cũ để đóng menu tài khoản khi chuyển trang
if (typeof setNav === 'function') {
    const oldSetNav = setNav;

    setNav = function (el, page) {
        closeUserDropdown();
        oldSetNav(el, page);
    };
}

document.addEventListener('click', function (event) {
    if (!event.target.closest('.user-menu-wrap')) {
        closeUserDropdown();
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeUserDropdown();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        updateSmartNavText(typeof currentLang !== 'undefined' ? currentLang : 'vi');
        renderProfilePage();
    }, 250);
});