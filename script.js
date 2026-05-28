// ============================================================
// KONFIGURASI
// ============================================================
const API_ENDPOINT = "https://script.google.com/macros/s/AKfycbxJHfRDHmqwr4HPIEgf47dd9-YKtWR88gozoqmB_GagFTA5jXdVV-q8yGP3KIqzUArp/exec";

let currentStudent = null;

// DOM Elements
const phaseLogin = document.getElementById('phaseLogin');
const phaseResult = document.getElementById('phaseResult');
const nisnInput = document.getElementById('nisn');
const submitBtn = document.getElementById('submitBtn');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');

// Tab elements
const tabBtns = document.querySelectorAll('.tab-btn');
const sklContent = document.getElementById('sklContent');
const tkaContent = document.getElementById('tkaContent');

// Print button (hanya untuk TKA)
const printTkaBtn = document.getElementById('printTkaBtn');

// Tahun footer
document.getElementById('year').textContent = new Date().getFullYear();

// Helper format angka
function formatNumber(num) {
  if (isNaN(num) || num === 0) return '0';
  return num.toFixed(2).replace('.', ',');
}

// ============================================================
// RENDER SKL (dengan note pengambilan)
// ============================================================
function renderSkl(student) {
  const tahun = new Date().getFullYear();
  const nilaiSBK = student.seniBudaya !== undefined && student.seniBudaya !== null ? student.seniBudaya : 0;
  
  const html = `
    <div class="skl-template">
      <div class="skl-kop">
        <div class="skl-logo">
          <img src="https://i.ibb.co.com/jP1Y9kH1/smpiau.png" alt="Logo SMP Islam Amanah Ummah">
        </div>
        <div class="skl-kop-text">
          <div class="yayasan">YAYASAN AMANAH UMMAH SURAKARTA</div>
          <div class="sekolah">SMP ISLAM AMANAH UMMAH MOJOLABAN</div>
          <div class="akreditasi">TERAKREDITASI A</div>
          <div class="alamat">Alamat : Gunung Saren RT. 01 RW. 17 Palur Mojolaban Sukoharjo 57554</div>
          <div class="alamat">E-mail : smpiamanahummahskh@gmail.com | Telp (0271) 6881715</div>
        </div>
        <div class="skl-kop-kosong"></div>
      </div>
      
      <div class="skl-judul">
        <div class="surat">SURAT KETERANGAN LULUS</div>
        <div class="nomor">Nomor : 01.005/SMPIAU-B/V/${tahun}</div>
        <div class="jenjang">SEKOLAH MENENGAH PERTAMA</div>
        <div class="tahun">TAHUN AJARAN 2025/2026</div>
      </div>
      
      <div class="skl-isi">
        <p>Yang bertanda tangan di bawah ini, Kepala SMP Islam Amanah Ummah Mojolaban</p>
        
        <div>
          <div class="data-row"><div class="data-label">Nomor Pokok Sekolah Nasional</div><div class="data-value">: 69964035</div></div>
          <div class="data-row"><div class="data-label">Kabupaten</div><div class="data-value">: Sukoharjo</div></div>
          <div class="data-row"><div class="data-label">Provinsi</div><div class="data-value">: Jawa Tengah</div></div>
        </div>
        
        <p>Dengan ini menyatakan bahwa :</p>
        
        <div>
          <div class="data-row"><div class="data-label">Nama Lengkap</div><div class="data-value">: ${escapeHtml(student.nama)}</div></div>
          <div class="data-row"><div class="data-label">Tempat dan Tanggal Lahir</div><div class="data-value">: ${escapeHtml(student.ttl)}</div></div>
          <div class="data-row"><div class="data-label">Nomor Induk Siswa Nasional</div><div class="data-value">: ${escapeHtml(student.nisn)}</div></div>
        </div>
        
       <p style="text-align: center; font-weight: bold; font-size: 12pt; margin: 10px 0;">LULUS</p>
        <p>Berdasarkan Keputusan Kepala SMP Islam Amanah Ummah Mojolaban Nomor : 01.004/SMPIAU-B/V/${tahun} tanggal 2 Juni ${tahun} setelah memenuhi seluruh kriteria sesuai dengan peraturan perundang-undangan, dengan nilai sebagai berikut :</p>
        
        <table class="skl-tabel-nilai">
          <thead><tr><th>No</th><th>Mata Pelajaran</th><th>Nilai</th></tr></thead>
          <tbody>
            <tr><td style="text-align:center">1</td><td>Pendidikan Agama dan Budi Pekerti</td><td style="text-align:center">${formatNumber(student.pai)}</td></tr>
            <tr><td style="text-align:center">2</td><td>Pendidikan Pancasila</td><td style="text-align:center">${formatNumber(student.ppkn)}</td></tr>
            <tr><td style="text-align:center">3</td><td>Bahasa Indonesia</td><td style="text-align:center">${formatNumber(student.bindo)}</td></tr>
            <tr><td style="text-align:center">4</td><td>Matematika</td><td style="text-align:center">${formatNumber(student.mat)}</td></tr>
            <tr><td style="text-align:center">5</td><td>Ilmu Pengetahuan Alam</td><td style="text-align:center">${formatNumber(student.ipa)}</td></tr>
            <tr><td style="text-align:center">6</td><td>Ilmu Pengetahuan Sosial</td><td style="text-align:center">${formatNumber(student.ips)}</td></tr>
            <tr><td style="text-align:center">7</td><td>Bahasa Inggris</td><td style="text-align:center">${formatNumber(student.bing)}</td></tr>
            <tr><td style="text-align:center">8</td><td>Pendidikan Jasmani, Olahraga dan Kesehatan</td><td style="text-align:center">${formatNumber(student.pjok)}</td></tr>
            <tr><td style="text-align:center">9</td><td>Informatika</td><td style="text-align:center">${formatNumber(student.informatika)}</td></tr>
            <tr><td style="text-align:center">10</td><td>Seni dan Budaya</td><td style="text-align:center">${formatNumber(nilaiSBK)}</td></tr>
            <tr><td style="text-align:center">11</td><td>Muatan Lokal<br>a. Bahasa Jawa</td><td style="text-align:center">${formatNumber(student.bjawa)}</td></tr>
            <tr style="font-weight:bold; background:#f9f6ef"><td colspan="2" style="text-align:center">Rata-rata</td><td style="text-align:center">${formatNumber(student.rata_rata)}</td></tr>
          </tbody>
        </table>
        
      </div>
      
      <div class="skl-ttd">
        <p>Sukoharjo, 2 Juni ${tahun}</p>
        <p>Kepala SMP Islam Amanah Ummah</p>
        <div style="height: 35px;"></div>
        <p class="nama-kepsek">Dr. Fauzan Al Anshori, M.Pd</p>
      </div>
      
      <!-- Note Pengambilan SKL -->
      <div class="skl-note">
        <p>⚠️ <strong>Catatan Penting:</strong></p>
        <p>SKL berikut hanyalah tampilan SKL digital ananda. Untuk SKL cetak yang sudah dilegalisasi Kepala Sekolah dapat diambil mulai hari <strong>Senin, 15 Juni 2026</strong> Konfirmasi pengambilan: <a href="https://wa.me/6285702076308" target="_blank">Us Cahya (wa.me/6285702076308)</a>.</p>
        <p></p>
      </div>
    </div>
  `;
  sklContent.innerHTML = html;
}

// ============================================================
// RENDER TKA
// ============================================================
function renderTka(student) {
  const html = `
    <div class="tka-card">
      <div class="tka-title">📊 HASIL TES KEMAMPUAN AGAMA (TKA)</div>
      <div class="tka-score">
        <div class="tka-item">
          <div class="tka-label">📐 TKA MATEMATIKA</div>
          <div class="tka-value">${escapeHtml(student.tka_mat)}</div>
        </div>
        <div class="tka-item">
          <div class="tka-label">📖 TKA BAHASA INDONESIA</div>
          <div class="tka-value">${escapeHtml(student.tka_bindo)}</div>
        </div>
      </div>
      
    </div>
  `;
  tkaContent.innerHTML = html;
}

// ============================================================
// PRINT FUNCTION (khusus untuk TKA)
// ============================================================
function printTkaOnly() {
  const elementsToHide = document.querySelectorAll('.tabs, .action-buttons, .logout-wrap, .status-wrap, .page-header, .card-band, .invitation-section, .page-footer, .barakallah-section');
  elementsToHide.forEach(el => { if (el) el.style.display = 'none'; });
  
  window.print();
  
  setTimeout(() => {
    elementsToHide.forEach(el => { if (el) el.style.display = ''; });
  }, 500);
}

// ============================================================
// LOGIN HANDLER
// ============================================================
async function handleLogin() {
  const nisn = nisnInput.value.trim();
  if (!nisn) {
    loginError.textContent = 'Masukkan NISN';
    loginError.classList.remove('hidden');
    return;
  }
  
  loginError.classList.add('hidden');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Memuat...';
  
  try {
    const response = await fetch(`${API_ENDPOINT}?nisn=${encodeURIComponent(nisn)}`);
    const result = await response.json();
    
    if (!result.success) {
      loginError.textContent = result.error || 'NISN tidak ditemukan';
      loginError.classList.remove('hidden');
      return;
    }
    
    currentStudent = result.data;
    renderSkl(currentStudent);
    renderTka(currentStudent);
    
    phaseLogin.classList.add('hidden');
phaseResult.classList.remove('hidden');

// Tampilkan undangan
document.getElementById('invitationSection').classList.remove('hidden');

// Scroll ke atas halaman
window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    console.error(err);
    loginError.textContent = 'Gagal terhubung ke server. Periksa koneksi internet.';
    loginError.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Lihat Pengumuman';
  }
}

// ============================================================
// TAB SWITCHING
// ============================================================
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.getAttribute('data-tab');
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    document.getElementById('tabSkl').classList.remove('active');
    document.getElementById('tabTka').classList.remove('active');
    document.getElementById(`tab${tabId === 'skl' ? 'Skl' : 'Tka'}`).classList.add('active');
  });
});

// ============================================================
// EVENT LISTENERS
// ============================================================
submitBtn.addEventListener('click', handleLogin);
logoutBtn.addEventListener('click', () => {
  phaseResult.classList.add('hidden');
  phaseLogin.classList.remove('hidden');
  nisnInput.value = '';
  currentStudent = null;
});

printTkaBtn.addEventListener('click', printTkaOnly);

nisnInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleLogin();
});

// ============================================================
// ESCAPE HTML
// ============================================================
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}