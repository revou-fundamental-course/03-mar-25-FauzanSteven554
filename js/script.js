document.addEventListener("DOMContentLoaded", () => {
    // === HAMBURGER MENU TOGGLE ===
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        // Toggle menu saat hamburger diklik
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("is-active");
        });

        // Tutup menu jika user klik di luar area navigasi
        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove("active");
                hamburger.classList.remove("is-active");
            }
        });
    }

    // === SMOOTH SCROLL ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });

                // Tutup menu jika di mobile
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove("active");
                    hamburger.classList.remove("is-active");
                }
            }
        });
    });

    // === FORM VALIDATION & SIMPAN DATA KE TABEL ===
    const contactForm = document.querySelector(".contact-form");
    const contactTableBody = document.querySelector(".contact-table tbody");
    const clearTableButton = document.getElementById("clear-table");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Ambil data dari form
            const name = document.querySelector("#name").value.trim();
            const dob = document.querySelector("#dob").value;
            const gender = document.querySelector("#gender").value;
            const email = document.querySelector("#email").value.trim();
            const message = document.querySelector("#message").value.trim();
            const timestamp = new Date().toLocaleString("id-ID"); // Waktu pengiriman

            // Validasi input kosong
            if (!name || !dob || !gender || !email || !message) {
                alert("Semua field harus diisi!");
                return;
            }

            // Validasi email sederhana
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Masukkan email yang valid!");
                return;
            }

            // Tambahkan data ke tabel
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${name}</td>
                <td>${dob}</td>
                <td>${gender}</td>
                <td>${email}</td>
                <td>${message}</td>
                <td>${timestamp}</td>
                <td><button class="delete-row">Hapus</button></td>
            `;

            contactTableBody.appendChild(newRow);

            // Alert sukses
            alert(`Pesan dari anda berhasil dikirim!`);
              // note: ${name} berfungsi menampilkan nama si pengirim
              
            // Reset form setelah submit
            this.reset();
            document.querySelector("#name").focus();
        });
    }

    // === HAPUS DATA INDIVIDUAL DARI TABEL ===
    contactTableBody.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-row")) {
            e.target.closest("tr").remove();
        }
    });

    // === HAPUS SEMUA DATA DARI TABEL ===
    if (clearTableButton) {
        clearTableButton.addEventListener("click", function () {
            contactTableBody.innerHTML = "";
        });
    }
});